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
        //o i retorna os indices do array ou os atributos de um objeto
        for (let i in this) {
            if (this[i] === undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        //setando valor zero pro id, caso ele seja === null
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        //o get item recupera um dado de localStorage
        //o set insere
        let proximoId = localStorage.getItem('id')//null
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        //usando o localstorage
        //preciso converter o  objeto literal para jason antes
        //ao usar o setItem, qualquer alteracao na chave despesa irá sobrepor o objeto
        //preciso criar ao inves de modificar
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id)
    }
    recuperarTodosRegistros() {
        //array de despesas
        let despesas = Array()

        let id = localStorage.getItem('id')
        //recuperando todas as despesas cadastradas em localStorage
        for (let i = 1; i <= id; i++) {
            //recuperar despesa
            //mas antes preciso retirar o formato json e converter em objeto
            let despesa = JSON.parse(localStorage.getItem(i))
            //verificando se indices foram pulados/excluidos
            //nesse caso iremos pular

            if (despesa === null) {
                continue//se for null ele ira avancar para a interação seguinte
            }

            despesa.id = i
            despesas.push(despesa)
        }
        return despesas
    }

    pesquisar(despesa) {
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        console.log(despesa)
        console.log(despesasFiltradas)
        //ano
        if (despesa.ano != '') {
            console.log('filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        //mes

        if (despesa.mes != '') {
            console.log('filtro de mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        //dia
        if (despesa.dia != '') {
            console.log('filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        console.log(despesasFiltradas)
        //tipo

        if (despesa.tipo != '') {
            console.log('filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
  
        //descricao
        if (despesa.descricao != '') {
            console.log('filtro de descricao')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        //valor
        if (despesa.valor != '') {
            console.log('filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        return despesasFiltradas
    }
    remover(id){
        localStorage.removeItem(id)
    }
}

let bd = new Bd()


function cadastrarDespesas() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')
    //a forma abaixo é a melhor
    //console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)
    //da pra fazer assim e colocar o value no document.Get.. console.log(mes)
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
    //despesa.validarDados() precisa ser executado antes de bd.gravar(despesa)
    //pois eu preciso validar os dados antes de salva-los
    if (despesa.validarDados()) {
        bd.gravar(despesa) //se for true mostrar dialog de sucesso
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso'
        document.getElementById('modal_btn').innerHTML = 'Voltar'
        document.getElementById('modal_btn').className = 'btn btn-success'

        $('#modalRegistraDespesa').modal('show')
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } else {
        //exibindo o modal pro usuário, caso caia em false 
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente'
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        $('#modalRegistraDespesa').modal('show')
    }
}

function carregaListaDespesas(despesas = Array(), filtro = false) {
    //se o tamanho do array de despesas for === 0, mostrarei todos os registros
    if(despesas.length === 0 && filtro == false){
    despesas = bd.recuperarTodosRegistros()
    }
    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ''
    //percorrer o array despesas, listando cada uma das despesas de forma automatica
    despesas.forEach(function (d) {
        console.log(d)
        //criando a linha (tr)
        let linha = listaDespesas.insertRow()

        //criar as colunas (td)
        //a criação de colunas parte apartir da coluna 0
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        switch (d.tipo) {
            //a comparação do switch é por identico ===
            //logo como d.tipo recebe uma string, preciso passar o numero dentro de uma string
            case '1':
                d.tipo = 'Alimentação'
                break;
            case '2':
                d.tipo = 'Educação'
                break;
            case '3':
                d.tipo = 'Lazer'
                break;
            case '4':
                d.tipo = 'Saúde'
                break;
            case '5':
                d.tipo = 'Transporte'
                break;
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        //criando botao de exclusao
        //é melhor criar o botão pelo js, pois a cada linha ele será acrescentado

        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function () {
            //remover a despesa
            //abaixo eu retirei o id_despesa_ por vazio
            //justamente para pegar só o id e remover
            let id = this.id.replace('id_despesa_', '')
            //alert(id)
            bd.remover(id)
            //recarregando a pagina após a remoção
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
        console.log(d)

    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    let despesas = bd.pesquisar(despesa)
    
    carregaListaDespesas(despesas, true)
}