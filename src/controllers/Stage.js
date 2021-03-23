const { Etapa } = require("../db/models");
const PluneERPService = require("../services/PluneERPService");
const EtapaService = require("../services/Etapa");

const etapaService = new EtapaService(Etapa);
const pluneERPService = new PluneERPService()

module.exports = {

  async getStagePluneByIdOrder(req, res) {
    const { id } = req.params
    const stages = await pluneERPService.getStage({ OrdemId: id })
    return res.json(stages);
  },

  async patchStageSituation(req, res) {
    try {
      const { OrdemId, ProcessoId, ProdutoId, Status, MotivoParadaId, QuantidadeProduzida, IsInspecao } = req.body
      if (Status == 40 && !QuantidadeProduzida) {
        return res.status(400).json({ message: 'Quantidade produzida não informada' });
      }
      if (!IsInspecao) {
        await etapaService.createOrUpdate(OrdemId, ProcessoId, QuantidadeProduzida, null)
          .then(async (data) => { console.log(data) })
          .catch(err => { return res.status(400).json({ message: 'Erro ao salvar quantidade', detail: err }) });
      } else {
        await etapaService.createOrUpdate(OrdemId, ProcessoId, null, QuantidadeProduzida)
          .then(async (data) => { console.log(data) })
          .catch(err => { return res.status(400).json({ message: 'Erro ao salvar quantidade', detail: err }) });
      }
      const stages = await pluneERPService.patchStageSituation({ OrdemId, ProcessoId, ProdutoId, Status, MotivoParadaId })
      if (stages.ErrorStatus2)
        return res.status(400).json({ message: 'Erro ao atualizar', detail: stages.ErrorStatus });
      else
        return res.status(201).json(stages);
    } catch (e) {
      res.status(500).json(e.message)
    }
  },

  async getPossibleStageSituation(req, res) {
    try {
      const stages = await pluneERPService.getPossibleStageSituation()
      return res.json(stages);
    } catch (e) {
      res.status(500).json(e.message)
    }
  }

};