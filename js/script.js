import ehUmCPF from "./valida-cpf.js";

const camposDoFormulario = document.querySelectorAll("[required]");

camposDoFormulario.forEach(
    (campo) =>{
        // blur -> ele fica verificando quando o elemento perder o foco.
        campo.addEventListener("blur", () => verificaCampo(campo));
    }
);

function verificaCampo(campo){
    if(campo.name == "cpf" && campo.value.length >= 11){
        ehUmCPF(campo);
    }
}
