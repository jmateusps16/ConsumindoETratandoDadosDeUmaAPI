async function buscarEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    if (cep != null && cep.trim() !== '' && !isNaN(cep) && cep.trim().length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                const mensagem = "Cep não existe!";
                mensagemErro.innerHTML = mensagem;
                throw new Error(mensagem);
            } else {
                var cidade = document.getElementById('cidade');
                var logradouro = document.getElementById('endereco');
                var bairro = document.getElementById('bairro');
                var estado = document.getElementById('estado');

                cidade.value = data.localidade;
                logradouro.value = data.logradouro;
                bairro.value = data.bairro;
                estado.value = data.uf;
                return data;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    } else {
        if (cep.trim().length !== 8) {
            mensagemErro.innerHTML = "Cep deve conter 8 números";
        } else {
            const mensagem = "Nenhum valor informado no cep ou valor não é numérico";
            mensagemErro.innerHTML = mensagem;
            return console.error(mensagem)
        }
    }
}

var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscarEndereco(cep.value));

// AQUI É PASSADO UM ARRAY NA REQUISIÇÃO E ARMAZENA OS DADOS
// let ceps = ['53403505', '53570450'];
// let conjuntoCeps = ceps.map(cep => buscarEndereco(cep));

// Promise.all(conjuntoCeps)
//     .then(resposta => console.log(resposta))
//     .catch(error => console.error("Erro na requisição: ",error));

//AQUI É OUTRA FORMA DE USAR COM O FETCH SEM USAR O ASYNC/AAWAIT
// var consultaCep = fetch('https://viacep.com.br/ws/01001000/json/')
//     .then(response => response.json())
//     .then(r => {
//         if (r.erro) {
//             throw Error('Cep não existe!');
//         } else {
//             console.log(r)
//         }
//     })
//     .catch(err => console.log(err))
//     .finally(mensagem => console.log('Processamento concluído!'));
// console.log(consultaCep);