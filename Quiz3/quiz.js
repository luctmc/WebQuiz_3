
function atualizarCorCronometro() {
    const cronometro = document.getElementById('cronometro' + perguntaAtual);
    if (tempoRestante > 30) {
        cronometro.classList.add('verde');
        cronometro.classList.remove('amarelo', 'vermelho');
    } else if (tempoRestante > 15) {
        cronometro.classList.add('amarelo');
        cronometro.classList.remove('verde', 'vermelho');
    } else {
        cronometro.classList.add('vermelho');
        cronometro.classList.remove('verde', 'amarelo');
    }
}

function iniciarCronometro() {
    document.getElementById('cronometro' + perguntaAtual).textContent = tempoRestante;
    atualizarCorCronometro();
    cronometroId = setInterval(function() {
        tempoRestante--;
        document.getElementById('cronometro' + perguntaAtual).textContent = tempoRestante;
        atualizarCorCronometro();
        if (tempoRestante <= 0) {
            clearInterval(cronometroId);
            avancarPergunta();
        }
    }, 1000); 
}

function verificarResposta(pergunta, elemento) {
    clearInterval(cronometroId);
    const respostaEscolhida = elemento.getAttribute('data-resposta');
    if (respostaEscolhida === respostasCorretas[pergunta]) {
        elemento.classList.add('correta');
        pontuacao++;
    } else {
        elemento.classList.add('incorreta');
    }
    setTimeout(avancarPergunta, 1000);
}

function avancarPergunta() {
    document.getElementById('pergunta' + perguntaAtual).classList.add('oculto');
    perguntaAtual++;
    tempoRestante = 50;
    if (perguntaAtual <= 5) { // Supondo que você tenha 5 perguntas
        document.getElementById('pergunta' + perguntaAtual).classList.remove('oculto');
        iniciarCronometro();
    } else {
        exibirResultado();
    }
}

function exibirResultado() {
    let resultadoTexto = `Você acertou ${pontuacao} de 5 perguntas.`;
    let trofeu = "";
    if (pontuacao === 5) {
        trofeu = "🏆";
    }
    document.getElementById('resultado').textContent = resultadoTexto;
    document.getElementById('trofeu').textContent = trofeu;
    document.getElementById('resultadoFinal').classList.remove('oculto');
}

function refazerQuiz() {
    perguntaAtual = 1;
    pontuacao = 0;
    document.getElementById('resultadoFinal').classList.add('oculto');
    let opcoes = document.querySelectorAll('.opcao');
    opcoes.forEach(opcao => {
        opcao.classList.remove('correta', 'incorreta');
    });
    document.getElementById('pergunta1').classList.remove('oculto');
    iniciarCronometro();
}

let tempoRestante = 50;
let cronometroId;
let perguntaAtual = 1;
let pontuacao = 0;
const respostasCorretas = {
    1: 'c',
    2: 'c',
    3: 'b',
    4: 'b',
    5: 'b'
};

window.onload = iniciarCronometro;
