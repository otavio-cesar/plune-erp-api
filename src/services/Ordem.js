const BaseService = require('./BaseService');
const { Op } = require("sequelize");

class OrdemService extends BaseService {

  constructor(AbstractClass) {
    super(AbstractClass);
    this.AbstractClass = AbstractClass;
  }
  
}

module.exports = OrdemService;