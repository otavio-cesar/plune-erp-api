const fetch = require("node-fetch");
const apiUrl = 'https://solucao-teste10.plune.com.br/'
const user = 'REST/PCP.User/'
const order = 'JSON/PCP.OrdemProducaoItem/'
const linha = 'JSON/PCP.UsuarioPCPLinhaProducao/'
const stage = 'JSON/PCP.OrdemProducaoItemProcessoProdutivo/'
const possibleSitutuation = '/JSON/PCP.MotivoParada/'

const cookie = "UltraClassLogin=teste10:Ultra.Users:rodrigo-maximo@hotmail.com:@ZscNM1quB8EmwezME38AiRGpKmuCTXC_IH0pC9LrOUGESsVg-gSycRy4U3ig46btUyuiOHIa8ddp5pJ9Wd43-g:pt_br:::992"
const FilialId = "896"

var iconv = require('iconv-lite');

class PluneERPService {

    constructor() { }

    async getUsers() {
        let _params = ''
        _params += `_PCP.User.BrowseLimit=0&`
        const res = await fetch(`${apiUrl}${user}Browse?${_params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        var decoded = iconv.decode(await res.buffer(), 'iso-8859-1');
        return JSON.parse(decoded)
    }

    async getOrders(params) {
        let _params = ''
        if (params.ProdutoId) {
            _params = `PCP.OrdemProducaoItem.ProdutoId=${params.ProdutoId}&`
        }
        if (params.Ids) {
            _params = `PCP.OrdemProducaoItem.Id=${params.Ids.join(',')}&`
            _params += `PCP.OrdemProducaoItem.BrowseLimit=0&`
            _params += `_PCP.OrdemProducaoItem.OrderDesc=1&`
            _params += `_PCP.OrdemProducaoItem.Order=Id&`
        }
        const res = await fetch(`${apiUrl}${order}Browse?${_params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        var decoded = iconv.decode(await res.buffer(), 'iso-8859-1');
        return JSON.parse(decoded)
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
        var decoded = iconv.decode(await res.buffer(), 'iso-8859-1');
        return JSON.parse(decoded)
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
        var decoded = iconv.decode(await res.buffer(), 'iso-8859-1');
        return JSON.parse(decoded)
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
        var decoded = iconv.decode(await res.buffer(), 'iso-8859-1');
        return JSON.parse(decoded)
    }

    async getPossibleStageSituation() {
        const res = await fetch(`${apiUrl}${possibleSitutuation}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookie
            },
        })
        var decoded = iconv.decode(await res.buffer(), 'iso-8859-1');
        return JSON.parse(decoded)
    }

}

module.exports = PluneERPService