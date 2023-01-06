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

            despesa.id = i
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
        return despesasFiltradas
    }

    // Remover despesas
    remover(id) {
        localStorage.removeItem(id)
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
function listaDespesas(despesas = Array(), filtro = false) {

    if (despesas.length == 0 && filtro == false) {
        despesas = bd.carregarRegistro()
    }

    let listaDespesas = document.getElementById("listaDespesas")
    listaDespesas.innerHTML = ''
    despesas.forEach(function (d) {

        //Criando a linha (tr)
        const linha = listaDespesas.insertRow();

        //Criando as colunas (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        //Ajustar o tipo
        switch (d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break

        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

        // botão de exclusão 
        const btn = document.createElement('button')
        btn.className = 'btn - btn-danger'
        btn.innerHTML = '<i class="fas fa-times" />'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function () {

            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)

            window.location.reload()
        }

        linha.insertCell(4).append(btn)
    })

}


function pesquisarDespesa() {

    let ano = document.getElementById("ano").value
    let mes = document.getElementById("mes").value
    let dia = document.getElementById("dia").value
    let tipo = document.getElementById("tipo").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    this.listaDespesas(despesas, true)

}