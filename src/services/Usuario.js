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
          { email: { [Op.iLike]: emailNome } },
          { nome: { [Op.iLike]: emailNome } }
        ]
      }
    });
  }
}

module.exports = UsuarioService;