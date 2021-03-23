const fetch = require("node-fetch");
const apiUrl = 'https://solucao-teste10.plune.com.br/'
const user = 'REST/Company.CompanyUsers/'
const order = 'JSON/PCP.OrdemProducaoItem/'
const linha = 'JSON/PCP.UsuarioPCPLinhaProducao/'
const stage = 'JSON/PCP.OrdemProducaoItemProcessoProdutivo/'
const possibleSitutuation = '/JSON/PCP.MotivoParada/'

const cookie = "UltraClassLogin=teste10:Ultra.Users:rodrigo-maximo@hotmail.com:@yuGUdGnHDxdvunpyAGGtt_MnMLsY6LLzCL9cgE_EbicGmNgpaJsgdz1WJnfXAr5O8xBJXETmULZ5N3Hw3SY_vQ:pt_br:::992"
const FilialId = "896"

class PluneERPService {

    constructor() { }

    async getUsers() {
        const res = await fetch(`${apiUrl}${user}Browse`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        return await res.json()
    }

    async getOrders(params) {
        let _params = ''
        if (params.ProdutoId) {
            _params = `PCP.OrdemProducaoItem.ProdutoId=${params.ProdutoId}&`
        }
        if (params.Ids) {
            _params = `PCP.OrdemProducaoItem.Id=${params.Ids.join(',')}&`
            _params += `PCP.OrdemProducaoItem.BrowseLimit=0&`
        }
        const res = await fetch(`${apiUrl}${order}Browse?${_params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        return await res.json()
    }

    async getStage(params) {
        let _params = ''
        if (params.LinhaProcessoProdutivoIds) {
            _params = `PCP.OrdemProducaoItemProcessoProdutivo.LinhaProcessoProdutivoId=${params.LinhaProcessoProdutivoIds}&`
            _params += `PCP.OrdemProducaoItemProcessoProdutivo.BrowseLimit=0&`
        }
        if (params.OrdemId) {
            _params += `PCP.OrdemProducaoItemProcessoProdutivo.OrdemId=${params.OrdemId}&`
            _params += `PCP.OrdemProducaoItemProcessoProdutivo.BrowseLimit=0&`
            _params += `_PCP.OrdemProducaoItemProcessoProdutivo.OrderDesc=0&`
            _params += `_PCP.OrdemProducaoItemProcessoProdutivo.Order=OrdemProcessoId&`
        }
        const res = await fetch(`${apiUrl}${stage}Browse?${_params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        return await res.json()
    }

    async getProductionLine(params) {
        let _params = ''
        if (params.UserPCPId) {
            _params = `PCP.UsuarioPCPLinhaProducao.UserPCPId=${params.UserPCPId}&`
        }
        const res = await fetch(`${apiUrl}${linha}?${_params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        return await res.json()
    }

    async patchStageSituation(params) {
        let _params = ''
        if (params.OrdemId && params.ProcessoId && params.ProdutoId && params.Status) {
            _params = `OrdemId=${params.OrdemId}&`
            _params += `ProcessoId=${params.ProcessoId}&`
            _params += `ProdutoId=${params.ProdutoId}&`
            _params += `Status=${params.Status}&`
            _params += `FilialId=${FilialId}&`
        }
        if (params.MotivoParadaId)
            _params += `MotivoParadaId=${params.MotivoParadaId}&`
        const res = await fetch(`${apiUrl}${stage}Update?${_params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        return await res.json()
    }

    async getPossibleStageSituation() {
        const res = await fetch(`${apiUrl}${possibleSitutuation}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        return await res.json()
    }

}

module.exports = PluneERPService