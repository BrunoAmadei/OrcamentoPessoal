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
            if(this[i] == '' || this[i] == undefined || this[i] == null){
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
            id = 0
        }
    }
    // Próximo Id
    getProximoId() {
        const proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    // Salvando despesas 
    gravar(d) {

        let id = localStorage.getItem('id')

        if (id === null) {
            id = 0
        } else {
            id = this.getProximoId()
        }

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)


    }
}
const bd = new Bd

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
      //  bd.gravar(despesa)
      alert('Dados Válidos')
    } else {
        alert('Dados Inválidos')
    }
}


