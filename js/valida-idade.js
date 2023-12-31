export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date (campo.value);


    if(!validaIdade(dataNascimento)){
        /**
         * Defini uma mensagem de erro customizada.
         * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/setCustomValidity
         */
        campo.setCustomValidity('O usuário não é maio de idade');
    }

    
}

function validaIdade(data){
    //Obtem a tada atual usando o contrutor de Date
    const dataAtual = new Date();
    //Pega a data passada pelo parametro da função, e adicionamos mais 18 aos anos para que possamos verificar é maior de 18 ou nao.
    const dataMais18 = new Date(data.getUTCFullYear() + 18 , data.getUTCMonth(), data.getUTCDate());

     
    return dataAtual >= dataMais18;
}