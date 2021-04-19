const fetch = require("node-fetch");
const iconv = require('iconv-lite');
const user = 'REST/PCP.User/'
const order = 'JSON/PCP.OrdemProducaoItem/'
const linha = 'JSON/PCP.UsuarioPCPLinhaProducao/'
const stage = 'JSON/PCP.OrdemProducaoItemProcessoProdutivo/'
const possibleSitutuation = '/JSON/PCP.MotivoParada/'

const apiUrl = 'https://solucao-teste10.plune.com.br/'
// const cookie = "UltraClassLogin=teste10:Ultra.Users:rodrigo-maximo@hotmail.com:@rCc5M1fgy5Rh5QOWrrWfK9KA-3t5S8WPki0L7ni-TRCxNt6dglqpspQvifULv2_HLMAAku8l0aTdW5Hbp9oo_g:pt_br:::992"
const FilialId = "896"

class PluneERPService {
    cookie
    constructor() { }

    setParametros(headers) {
        this.cookie = headers['token-pcp']
    }

    async getUsers() {
        let _params = ''
        _params += `_PCP.User.BrowseLimit=0&`
        _params += `_PCP.User.OrderDesc=0&`
        _params += `_PCP.User.Order=Id&`
        const res = await fetch(`${apiUrl}${user}Browse?${_params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: this.cookie
            },
        })
        var decoded = iconv.decode(await res.buffer(), 'iso-8859-1');
        return JSON.parse(decoded)
    }

    async getOrders(params) {
        let _params = ''
        _params += `PCP.OrdemProducaoItem.BrowseLimit=0&`
        _params += `_PCP.OrdemProducaoItem.OrderDesc=1&`
        _params += `_PCP.OrdemProducaoItem.Order=Id&`
        if (params.ProdutoId) {
            _params = `PCP.OrdemProducaoItem.ProdutoId=${params.ProdutoId}&`
        }
        if (params.Ids) {
            _params = `PCP.OrdemProducaoItem.Id=${params.Ids.join(',')}&`
        }
        const res = await fetch(`${apiUrl}${order}Browse?${_params}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: this.cookie
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
                cookie: this.cookie
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
                cookie: this.cookie
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
                cookie: this.cookie
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
                cookie: this.cookie
            },
        })
        var decoded = iconv.decode(await res.buffer(), 'iso-8859-1');
        return JSON.parse(decoded)
    }

}

module.exports = PluneERPService