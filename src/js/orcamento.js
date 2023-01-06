// Criando objeto despesa
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (const i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

// Criando Bd e indices dinamicos
class Bd {
    constructor() {
        const id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        const proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        const id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }

    // Recuperando dados salvos
    carregarRegistro() {

        const despesas = Array()

        const id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++) {
            // retornando despesa como objeto 
            const despesa = JSON.parse(localStorage.getItem(i))

            // Pulando itens removidos 
            if (despesa == null) {
                continue
            }

            despesas.push(despesa)
        }
        return despesas
    }

    // Pesquisando dados salvos
    pesquisar(despesa) {

        let despesasFiltradas = Array()
        despesasFiltradas = this.carregarRegistro()

        //ano
        if (despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        //mes
        if (despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        //dia
        if (despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        //tipo
        if (despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        //descricao
        if (despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        //valor
        if (despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
    }
}
const bd = new Bd()

// Cadastrando Despesas
function cadastrarDespesa() {

    const ano = document.getElementById('ano')
    const mes = document.getElementById('mes')
    const dia = document.getElementById('dia')
    const tipo = document.getElementById('tipo')
    const descricao = document.getElementById('descricao')
    const valor = document.getElementById('valor')

    const despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {

        bd.gravar(despesa)

        //dialog de sucesso
        document.getElementById('modal-header').className = 'modal-header text-success'
        document.getElementById('titulo_modal').innerHTML = 'Dados Salvos'
        document.getElementById('texto-modal').innerHTML = 'Despesa salva com sucesso.'
        document.getElementById('btn_modal').className = 'btn btn-success'
        $('#registroDespesa').modal('show')

        // limpando campos
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    } else {
        //dialog de erro
        document.getElementById('modal-header').className = 'modal-header text-danger'
        document.getElementById('titulo_modal').innerHTML = 'Erro ao salvar dados'
        document.getElementById('texto-modal').innerHTML = 'Houve algum erro ao preencher os dados.'
        document.getElementById('btn_modal').className = 'btn btn-danger'
        $('#registroDespesa').modal('show')
    }
}

// Carregando despesas
function listaDespesas() {

    let despesas = Array()

    despesas = bd.carregarRegistro()

    const listaDespesas = document.getElementById('listaDespesas')

    //percorrendo array e listando dinamicamente
    despesas.forEach(d => {

        // criando linhas da tabela
        const linha = listaDespesas.insertRow()

        // criando colunas da tabela
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        // ajustando tipo
        switch (parseInt(d.tipo)) {
            case 1: d.tipo = 'Alimentação'
                break
            case 2: d.tipo = 'Educação'
                break
            case 3: d.tipo = 'Lazer'
                break
            case 4: d.tipo = 'Saúde'
                break
            case 5: d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}

function pesquisarDespesa() {
    const ano = document.getElementById('ano').value
    const mes = document.getElementById('mes').value
    const dia = document.getElementById('dia').value
    const tipo = document.getElementById('tipo').value
    const descricao = document.getElementById('descricao').value
    const valor = document.getElementById('valor').value

    const despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    bd.pesquisar(despesa)
}