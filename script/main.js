'use strict';


const limparForm = () => {
    //Preenchendo os forms com as info colhidas pela api
    document.getElementById('endereco').value = ""
    document.getElementById('bairro').value = ""
    document.getElementById('cidade').value = ""
    document.getElementById('estado').value = ""
}

const preencherForm = (endereco) => {
    //Preenchendo os forms com as info colhidas pela api
    document.getElementById('endereco').value = endereco.logradouro
    document.getElementById('bairro').value = endereco.bairro
    document.getElementById('cidade').value = endereco.localidade
    document.getElementById('estado').value = endereco.uf
}

const verificar = (endereco) => {
    if (endereco.hasOwnProperty('erro')) {
        //caso não encontre o cep limpar labels e informar erro
        document.getElementById('endereco').value = "CEP não encontrado"
    } else {
        //caso haja CEP executar função para preencher
        preencherForm(endereco)
    }
}

const eNumero = (numero) => /^[0-9]+$/.test(numero); //verifica se os valores estão entre 0 e 9

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparForm()

    //função para retornar o json com as informações da API
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`
    if (cepValido(cep)) {
        fetch(url).then(response => response.json()).then(verificar)
    } else {
        document.getElementById('endereco').value = "CEP incorreto"
    }
    
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep)