const objSatelite = document.getElementById('satelite');
const cintoOrbital = document.querySelector('.orbita');

let posicaoSatelite = 0;
let vetorDirecao = 1;
const velocidadeOrbita = 15;

function atualizarOrbita() {
    const larguraTotal = cintoOrbital.clientWidth;
    const tamanhoSat = objSatelite.clientWidth;

    // Movimenta o satélite
    posicaoSatelite += velocidadeOrbita * vetorDirecao;

    // Inverte a direção se bater nas bordas
    if (posicaoSatelite >= larguraTotal - tamanhoSat) {
        vetorDirecao = -1; 
    } else if (posicaoSatelite <= 0) {
        vetorDirecao = 1; 
    }

    objSatelite.style.left = posicaoSatelite + 'px';
}

// Inicia o movimento provisoriamente para testes
setInterval(atualizarOrbita, 30);