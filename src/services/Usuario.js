const BaseService = require('./BaseService');
const { Op } = require("sequelize");

class UsuarioService extends BaseService {

  constructor(AbstractClass) {
    super(AbstractClass);
    this.AbstractClass = AbstractClass;
  }

  async ObterCompletoPorEmailOuNome(emailNome) {
    if (!emailNome)
      return undefined;
    return await this.AbstractClass.findOne({
      where: {
        [Op.or]: [
          { email: emailNome },
          { nome: emailNome }
        ]
      }
    });
  }
}

module.exports = UsuarioService;