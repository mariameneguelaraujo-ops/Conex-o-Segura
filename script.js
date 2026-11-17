
// CONTROLE DE ACESSIBILIDADE
let lendo = false;
let falaAtual = null;
let tamanhoTexto = 16;

const botaoLeitura = document.getElementById("botaoLeitura");

// Atualiza o estado da leitura
function finalizarLeitura() {
    lendo = false;
    falaAtual = null;

    botaoLeitura.textContent = "🔊 Ouvir página";
    botaoLeitura.setAttribute("aria-pressed", "false");
}

// FUNÇÃO DE LEITURA EM VOZ ALTA
function lerEmVozAlta() {

    // Se já estiver lendo, pausa ou continua
    if (lendo === true) {

        if (speechSynthesis.paused === true) {

            speechSynthesis.resume();

            botaoLeitura.textContent = "⏸ Pausar leitura";

        } else {

            speechSynthesis.pause();

            botaoLeitura.textContent = "▶ Continuar leitura";
        }

        return;
    }

    // Captura o conteúdo principal
    const conteudo = document.querySelector("main");
    const texto = conteudo.innerText;

    // Cancela qualquer leitura anterior
    speechSynthesis.cancel();

    // Cria uma nova leitura
    falaAtual = new SpeechSynthesisUtterance(texto);

    falaAtual.lang = "pt-BR";
    falaAtual.rate = 1;
    falaAtual.pitch = 1;

    // Quando terminar, atualiza o estado
    falaAtual.onend = finalizarLeitura;

    // Caso ocorra algum erro
    falaAtual.onerror = finalizarLeitura;

    // Atualiza o estado antes de iniciar
    lendo = true;

    botaoLeitura.textContent = "⏸ Pausar leitura";
    botaoLeitura.setAttribute("aria-pressed", "true");

    // Inicia a leitura
    speechSynthesis.speak(falaAtual);
}

// AUMENTAR E DIMINUIR TEXTO
function alterarTexto(valor) {

    tamanhoTexto += valor;

    // Limita o tamanho mínimo e máximo
    if (tamanhoTexto < 12) {
        tamanhoTexto = 12;
    }

    if (tamanhoTexto > 28) {
        tamanhoTexto = 28;
    }

    document.querySelector("main").style.fontSize =
        tamanhoTexto + "px";
}

// LIMPA A LEITURA QUANDO A PÁGINA É FECHADA
window.addEventListener("pagehide", function() {
    speechSynthesis.cancel();
    lendo = false;
    falaAtual = null;
});
