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
      if (!data.ErrorStatus) {
        let stages = data.data.row
        // Remover etapas que operador não tenha ação
        stages = stages.filter(e => ![stageSituation.finished.id, stageSituation.cancelled.id].includes(e.Status.value))
        if (stages.length > 0) {
          let Ids = stages.map(s => s.OrdemId.value)
          ordens = await pluneERPService.getOrders({ Ids })
          // Remover ordens finalizadas ou canceladas
          ordens.data.row = ordens.data.row.filter(o => ![stageSituation.finished.id, stageSituation.cancelled.id].includes(o.Status.value))
        } else {
          ordens = { data: { row: [] } }
        }
        return res.json(ordens);
      } else {
        res.status(400).json(data.ErrorStatus)
      }
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async getOrdemById(req, res) {
    try {
      const { id } = req.params
      let ordem
      ordem = await pluneERPService.getOrders({ Ids: [id] })
      return res.json(ordem);
    } catch (e) {
      res.status(500).json(e.message)
    }
  },


};

const stageSituation = {
  started: { id: 30, value: "Iniciado" },
  paused: { id: 60, value: "Pausado" },
  finished: { id: 40, value: "Finalizado" },
  freeToStart: { id: 20, value: "Liberado para iniciar" },
  inspect: { id: 180, value: "Inspeção" },
  waitingLiberation: { id: 10, value: "Aguardando liberação" },
  cancelled: { id: 50, value: "Cancelada" },
}