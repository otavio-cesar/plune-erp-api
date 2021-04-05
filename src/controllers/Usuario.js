const { Usuario } = require("../db/models/index");
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

    const data = await pluneERPService.getProductionLine({ UserPCPId: usuario.UserPCPId })
    const productionLine = data.data.row.map(p => p.LinhaId)

    const userResult = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      permissao: usuario.permissao,
      productionLine
    };

    res.setHeader('Token', token)

    return res.json(userResult);
  },

  async getUsersPlune(req, res) {
    try {
      let data = await pluneERPService.getUsers();
      if (!data.ErrorStatus) {
        const usuarios = await usuarioService.ObterTodos();
        let result = data.data.row.map(up => {
          const u = usuarios.find(u => u.dataValues.UserPCPId == up.Id.value)?.dataValues
          return {
            Id: up.Id,
            Nome: up.Nome,
            email: u?.email ?? ''
          }
        })
        return res.json(result)
      } else {
        res.status(500).json({ message: 'Erro no servidor Plune', detail: data.ErrorStatus })
      }
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

};