async function gerarRequisicaoCep(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
    
        if(data.erro) {
            throw new Error('Cep não existe!');
        } else {
            return data;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

let ceps = ['53403505', '53570450'];
let conjuntoCeps = ceps.map(cep => gerarRequisicaoCep(cep));

Promise.all(conjuntoCeps)
    .then(resposta => console.log(resposta))
    .catch(error => console.error("Erro na requisição: ",error));

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