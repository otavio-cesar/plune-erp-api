const BaseService = require('./BaseService');
const { Op } = require("sequelize");

class EtapaService extends BaseService {

  constructor(AbstractClass) {
    super(AbstractClass);
    this.AbstractClass = AbstractClass;
  }

  async pathQuantidadeProduzidaEtapa(OrdemId, ProcessoId) {
    return await this.AbstractClass.findOne({
      where: {
        [Op.and]: [
          { OrdemId },
          { ProcessoId }
        ]
      }
    });
  }

  async createOrUpdate(OrdemId, ProcessoId, QuantidadeProduzida, QuantidadeInspecionada) {
    var data = { OrdemId, ProcessoId, QuantidadeProduzida, QuantidadeInspecionada }
    await this.AbstractClass.findOne({
      where: { [Op.and]: [{ OrdemId }, { ProcessoId }] }
    }).then(obj => {
      if (!obj) {
        this.AbstractClass.create(data)
      } else {
        this.AbstractClass.update({ QuantidadeProduzida, QuantidadeInspecionada }, { where: { [Op.and]: [{ OrdemId }, { ProcessoId }] } });
      }
    });
  }


}

module.exports = EtapaService;