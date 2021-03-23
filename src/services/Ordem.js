const BaseService = require('./BaseService');
const { Op } = require("sequelize");

class OrdemService extends BaseService {

  constructor(AbstractClass) {
    super(AbstractClass);
    this.AbstractClass = AbstractClass;
  }

  async createOrUpdate(OrdemId, ProdutoId, QuantidadeRefugada) {
    var data = { OrdemId, ProdutoId, QuantidadeRefugada }
    await this.AbstractClass.findOne({
      where: { [Op.and]: [{ OrdemId }, { ProdutoId }] }
    }).then(obj => {
      if (!obj) {
        this.AbstractClass.create(data)
      } else {
        this.AbstractClass.update({ QuantidadeRefugada: QuantidadeRefugada }, { where: { [Op.and]: [{ OrdemId }, { ProdutoId }] } });
      }
    });
  }


}

module.exports = OrdemService;