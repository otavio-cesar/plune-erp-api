const { Ordem } = require("../db/models");
const PluneERPService = require("../services/PluneERPService");
const pluneERPService = new PluneERPService()
const OrdemService = require("../services/Ordem");

const ordemService = new OrdemService(Ordem);

module.exports = {

  async getOrdemPlune(req, res) {
    let ordens = await pluneERPService.getOrders({})
    return res.json(ordens);
  },

  async getOrdemPluneByLineProduction(req, res) {
    try {
      const { linhaprocessoprodutivoids } = req.headers
      let ordens
      const data = await pluneERPService.getStage({ LinhaProcessoProdutivoIds: linhaprocessoprodutivoids })
      const stages = data.data.row
      if (stages.length > 0) {
        let Ids = stages.map(s => s.OrdemId.value)
        ordens = await pluneERPService.getOrders({ Ids })
      } else {
        ordens = { data: { row: [] } }
      }
      return res.json(ordens);
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async patchRefugar(req, res) {
    try {
      const { OrdemId, ProdutoId, QuantidadeRefugada } = req.body
      if (!QuantidadeRefugada) {
        return res.status(400).json({ message: 'Quantidade refugada não informada' });
      }
      await ordemService.createOrUpdate(OrdemId, ProdutoId, QuantidadeRefugada)
        .then(async (data) => { console.log(data) })
        .catch(err => { return res.status(400).json({ message: 'Erro ao salvar refugo', detail: err.message }) })
      return res.status(201).json({});
    } catch (e) {
      res.status(500).json({ message: "Erro no servidor", detail: e.message })
    }
  },

};