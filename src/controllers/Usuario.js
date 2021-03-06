const { Usuario, Parametro } = require("../db/models/index");
var jwt = require("jsonwebtoken");
const EnumPermissao = require("../util/EnumPermissao");
const UsuarioService = require("../services/Usuario");
const constants = require("../util/constants.json");
const PluneERPService = require("../services/PluneERPService");

const usuarioService = new UsuarioService(Usuario);
const pluneERPService = new PluneERPService()

module.exports = {

  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Usuário ou senha não informado!" });
    }

    const usuario = await usuarioService.ObterCompletoPorEmailOuNome(username);
    if (!usuario) {
      return res.status(400).json({ error: "Usuario não encontrado!" });
    }

    if (usuario.senha !== password) {
      return res.status(400).json({ error: "Senha inválida!" });
    }

    const token = jwt.sign(
      { email: usuario.email, senha: usuario.senha },
      constants.jwtConst,
      {
        expiresIn: 60 * 60 * 24 * 120, // ultimo digito é numero de dias
      }
    );

    res.setHeader('Token', token)

    let token_pcp = await Parametro.findOne({ where: { chave: 'token-pcp' } })
    if (!token_pcp.valor)
      throw new Error('Token pcp não definido no banco de dados')
    token_pcp = token_pcp.valor

    let userResult = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      permissao: usuario.permissao,
      token_pcp
    };

    let data
    try {
      data = await pluneERPService.getProductionLine({ UserPCPId: usuario.UserPCPId })
    } catch (e) {
      return res.json(userResult);
    }

    if (!data.ErrorStatus || (data.ErrorStatus && usuario.permissao == EnumPermissao.Admin)) {
      const productionLine = data.data.row.map(p => p.LinhaId)

      userResult = {
        ...userResult,
        productionLine
      };

      return res.json(userResult);
    } else {
      if (data.ErrorStatus.includes("Erro ao inicializar Ultra::Session em Ultra::SOA#new: Login: Sessão expirou")) {
        return res.status(401).json({ error: 'Token de acesso ao Plune é inválido', detail: data.ErrorStatus })
      } else {
        return res.status(400).json({ error: 'Plune ERP gerou um erro', detail: data.ErrorStatus })
      }
    }
  },

  async getUsersPlune(req, res) {
    try {
      pluneERPService.setParametros(req.headers)
      let data = await pluneERPService.getUsers();
      if (!data.ErrorStatus) {
        const usuarios = await usuarioService.ObterTodos();
        let result = data.data.row.map(up => {
          const u = usuarios.find(u => u.dataValues.UserPCPId == up.Id.value)?.dataValues
          return {
            Id: up.Id,
            Nome: up.Nome,
            email: u?.email ?? '',
            senha: u?.senha ?? '',
            permissao: u?.permissao ?? ''
          }
        })
        return res.json(result)
      } else {
        res.status(500).json({ message: 'Erro no servidor Plune', detail: data.ErrorStatus })
      }
    } catch (e) {
      return res.status(500).json({ message: e.message == 'Unexpected token C in JSON at position 0' ? 'Token inválido' : e.message })
    }
  },

  async salvarUsuarioPCP(req, res) {
    const { UserPCPId, email, nome, permissao, senha } = req.body;
    var crypto = require("crypto");
    var hash = crypto.randomBytes(8).toString('hex');
    try {
      await Usuario.findOne({ where: { UserPCPId } })
        .then(async obj => {
          if (!obj) {
            Usuario.create({ UserPCPId, email, nome, permissao, senha })
          } else {
            Usuario.update({ ...obj, senha, email, permissao }, { where: { UserPCPId } });
          }
          return res.status(201).json({})
        })
        .catch(e => {
          return res.status(500).json({ message: 'Ops, erro no servidor', detail: e.message })
        });
    } catch (e) {
      return res.status(500).json({ message: 'Ops, erro no servidor', detail: e.message })
    }
  },

  async alteraToken(req, res) {
    const { token } = req.body;
    try {
      await Parametro.findOne({ where: { chave: 'token-pcp' } })
        .then(async obj => {
          if (!obj) {
            Parametro.create({ chave: 'token-pcp', valor: token })
          } else {
            Parametro.update({ ...obj, valor: token }, { where: { chave: 'token-pcp' } });
          }
          return res.status(201).json({})
        })
    } catch (e) {
      return res.status(500).json({ message: 'Ops, erro no servidor', detail: e.message })
    }
  },

  async getToken(req, res) {
    try {
      await Parametro.findOne({ where: { chave: 'token-pcp' } })
        .then(async obj => {
          return res.status(200).json(obj.valor)
        })
    } catch (e) {
      return res.status(500).json({ message: 'Ops, erro no servidor', detail: e.message })
    }
  },

};