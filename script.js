const objSatelite = document.getElementById('satelite');
const zonaAlvo = document.getElementById('zona-alvo');
const btnIniciar = document.getElementById('btn-iniciar');
const btnCapturar = document.getElementById('btn-capturar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const painelSucesso = document.getElementById('coletas-sucesso');
const painelBateria = document.getElementById('bateria');
const avisoStatus = document.getElementById('status-missao');
const cintoOrbital = document.querySelector('.orbita');

// Variáveis de estado
let imagensColetadas = 0;
let cargaBateria = 5;
let loopRastreamento;
let missaoAtiva = false;

// Variáveis de movimento do satélite
let posicaoSatelite = 0;
let vetorDirecaoSat = 1;
let velocidadeSatelite = 15; // Velocidade inicial

// Variáveis de movimento do alvo (Nova Mecânica)
let posicaoAlvo = 100; // Posição inicial
let vetorDirecaoAlvo = 1;
let velocidadeAlvo = 6; // Mais lento que o satélite para ser jogável

function atualizarPainel() {
    painelSucesso.innerText = imagensColetadas;
    painelBateria.innerText = cargaBateria;
}

function atualizarCenario() {
    const larguraTotal = cintoOrbital.clientWidth;
    const tamanhoSat = objSatelite.clientWidth;
    const tamanhoAlvo = zonaAlvo.clientWidth;

    // 1. Move o Satélite
    posicaoSatelite += velocidadeSatelite * vetorDirecaoSat;
    if (posicaoSatelite >= larguraTotal - tamanhoSat) {
        vetorDirecaoSat = -1; 
    } else if (posicaoSatelite <= 0) {
        vetorDirecaoSat = 1; 
    }
    objSatelite.style.left = posicaoSatelite + 'px';

    // 2. Move a Zona Alvo (Sua ideia aplicada)
    posicaoAlvo += velocidadeAlvo * vetorDirecaoAlvo;
    if (posicaoAlvo >= larguraTotal - tamanhoAlvo) {
        vetorDirecaoAlvo = -1;
    } else if (posicaoAlvo <= 0) {
        vetorDirecaoAlvo = 1;
    }
    zonaAlvo.style.left = posicaoAlvo + 'px';
}

function iniciarMissao() {
    imagensColetadas = 0;
    cargaBateria = 5;
    velocidadeSatelite = 15; // Reseta a velocidade
    atualizarPainel();
    
    btnIniciar.style.display = 'none';
    btnReiniciar.style.display = 'none';
    btnCapturar.disabled = false;
    
    avisoStatus.innerText = "Satélite em órbita. Aguarde o alinhamento...";
    missaoAtiva = true;
    
    loopRastreamento = setInterval(atualizarCenario, 30);
}

function realizarCaptura() {
    if (!missaoAtiva) return;

    clearInterval(loopRastreamento);
    btnCapturar.disabled = true;

    const coordsSat = objSatelite.getBoundingClientRect();
    const coordsAlvo = zonaAlvo.getBoundingClientRect();

    const centroSensor = coordsSat.left + (coordsSat.width / 2);
    
    if (centroSensor >= coordsAlvo.left && centroSensor <= coordsAlvo.right) {
        imagensColetadas++;
        avisoStatus.innerText = "Leitura de NDVI realizada com sucesso!";
        avisoStatus.style.color = "#66fcf1";
        
        // Aumenta a dificuldade (Satélite fica mais rápido a cada acerto)
        velocidadeSatelite += 4; 
    } else {
        avisoStatus.innerText = "Falha: Captura fora da zona florestal.";
        avisoStatus.style.color = "#c5c6c7";
    }

    cargaBateria--;
    atualizarPainel();

    setTimeout(() => {
        if (cargaBateria > 0) {
            avisoStatus.innerText = "Recalibrando sensor para a próxima volta...";
            avisoStatus.style.color = "#45a29e";
            btnCapturar.disabled = false;
            loopRastreamento = setInterval(atualizarCenario, 30);
        } else {
            encerrarOperacao();
        }
    }, 1500);
}

function encerrarOperacao() {
    missaoAtiva = false;
    btnCapturar.style.display = 'none';
    btnReiniciar.style.display = 'inline-block';
    
    if (imagensColetadas >= 3) {
        avisoStatus.innerText = `Missão Concluída! ${imagensColetadas} lotes processados.`;
        avisoStatus.style.color = "#66fcf1";
    } else {
        avisoStatus.innerText = `Missão Falhou. Dados insuficientes (${imagensColetadas} coletas).`;
        avisoStatus.style.color = "#c5c6c7";
    }
}

function resetarSistema() {
    btnCapturar.style.display = 'inline-block';
    iniciarMissao();
}

btnIniciar.addEventListener('click', iniciarMissao);
btnCapturar.addEventListener('click', realizarCaptura);
btnReiniciar.addEventListener('click', resetarSistema);