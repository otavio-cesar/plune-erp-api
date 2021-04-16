const { Etapa } = require("../db/models");
const PluneERPService = require("../services/PluneERPService");
const EtapaService = require("../services/Etapa");
const { Op } = require("sequelize");

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
      const { OrdemId, ProcessoId, ProdutoId, Status, MotivoParadaId, QuantidadeProduzida, QuantidadeInspecionada, QuantidadeRefugada, ObservacaoRefugo } = req.body
      await Etapa.findOne({ where: { [Op.and]: [{ OrdemId }, { ProcessoId }] } })
        .then(async obj => {
          if (!obj) {
            Etapa.create({ OrdemId, ProcessoId, QuantidadeProduzida, QuantidadeInspecionada, QuantidadeRefugada, ObservacaoRefugo })
          } else {
            if (QuantidadeProduzida)
              Etapa.update({ ...obj, QuantidadeProduzida }, { where: { [Op.and]: [{ OrdemId }, { ProcessoId }] } });
            if (QuantidadeInspecionada)
              Etapa.update({ ...obj, QuantidadeInspecionada }, { where: { [Op.and]: [{ OrdemId }, { ProcessoId }] } });
            if (QuantidadeRefugada)
              Etapa.update({ ...obj, QuantidadeRefugada, ObservacaoRefugo }, { where: { [Op.and]: [{ OrdemId }, { ProcessoId }] } });
          }
        })
        .catch(e => {
          return res.status(500).json({ message: 'Ops, erro no servidor', detail: e.message })
        });
      if (!QuantidadeProduzida && !QuantidadeRefugada) {
        const stages = await pluneERPService.patchStageSituation({ OrdemId, ProcessoId, ProdutoId, Status, MotivoParadaId })
        if (stages.ErrorStatus2)
          return res.status(400).json({ message: 'Erro ao atualizar', detail: stages.ErrorStatus });
        else
          return res.status(201).json(stages);
      } else {
        return res.status(201).json({});
      }
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