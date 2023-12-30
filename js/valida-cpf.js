export default function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\.|-/g, "");
    validaNumerosRepetidos(cpf);
    validaPrimeiroDigito(cpf);
    console.log(validaNumerosRepetidos(cpf))
}

function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numerosRepetidos.includes(cpf);
}

function validaPrimeiroDigito(cpf){
    let soma = 0;
    let multiplicador = 10;
    for(let tamanho=0; tamanho < 9; tamanho++){
        soma += cpf[tamanho]*multiplicador;
        multiplicador--;
    }

    soma = (soma *10) % 11;


    if(soma ==10 || soma == 11){
        soma = 0;
    }

    return soma != cpf[9];
}