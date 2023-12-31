import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";

const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");


const tiposDeErro = [
    'valueMissing', //quando não tem valor no campo
    'typeMismatch', //O tipo de dado inserido não é igual ao tipo de dado que o elemento espera elemento 
    'patternMismatch', //Contem a expressão regular e caso não esteja no padrao ele não sera valido.
    'tooShort', //Caso não atinja o minLenght ele da erro
    'customError' //Erros customizados.
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

camposDoFormulario.forEach(
    (campo) =>{
        // blur -> ele fica verificando quando o elemento perder o foco.
        campo.addEventListener("blur", () => verificaCampo(campo));
        /**
         * Previni o comportamento padrão de campo invalido
         * Lista de eventos -> https://www.w3schools.com/jsref/dom_obj_event.asp
         */
        campo.addEventListener("invalid", evento=> evento.preventDefault())
    }
);



function verificaCampo(campo){
    let mensagem = "";
    /**
     * Defini o setCustomValidity como "", para que a mensagem do CPF e idade sejam apagadas.
     */
    campo.setCustomValidity('');
    //console.log(campo.validity());
    if(campo.name == "cpf" && campo.value.length >= 11){
        ehUmCPF(campo);
    }
    if(campo.name == "aniversario" && campo.value != ""){
        ehMaiorDeIdade(campo);
    }
    tiposDeErro.forEach(erro =>{
        /**
         * Verifica se o campo.validity com erro é verdadeiro se for exibe a mensagem.
         */
        if(campo.validity[erro]){
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })
    
    /**
     * pegamos o nó pai do input que no caso é o fieldset e pesquisamos nele um elemento que contem a classe '.mensagem-erro'
     */
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadedorDeInput = campo.checkValidity(); //Checa se o campo está valido ou não.

    if(!validadedorDeInput){
        mensagemErro.textContent = mensagem;
    }else{
        mensagemErro.textContent = "";
    }
}


formulario.addEventListener("submit", (e)=>{
    e.preventDefault();

    const listaRespostas ={
        /**
         * Por exemplo, se você tem um elemento <input> com o atributo name="nome" e o usuário digita algo nesse campo, você pode obter o valor digitado usando evento.target.elements["nome"].value
         */
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    window.location.href = './abrir-conta-form-2.html';
})