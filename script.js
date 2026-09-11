const objSatelite = document.getElementById('satelite');
const zonaAlvo = document.getElementById('zona-alvo');
const btnIniciar = document.getElementById('btn-iniciar');
const btnCapturar = document.getElementById('btn-capturar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const painelSucesso = document.getElementById('coletas-sucesso');
const painelBateria = document.getElementById('bateria');
const avisoStatus = document.getElementById('status-missao');
const cintoOrbital = document.querySelector('.orbita');

let imagensColetadas = 0;
let cargaBateria = 5;
let posicaoSatelite = 0;
let vetorDirecao = 1;
let loopRastreamento;
let missaoAtiva = false;
const velocidadeOrbita = 15;

function atualizarPainel() {
    painelSucesso.innerText = imagensColetadas;
    painelBateria.innerText = cargaBateria;
}

function atualizarOrbita() {
    const larguraTotal = cintoOrbital.clientWidth;
    const tamanhoSat = objSatelite.clientWidth;

    posicaoSatelite += velocidadeOrbita * vetorDirecao;

    if (posicaoSatelite >= larguraTotal - tamanhoSat) {
        vetorDirecao = -1; 
    } else if (posicaoSatelite <= 0) {
        vetorDirecao = 1; 
    }

    objSatelite.style.left = posicaoSatelite + 'px';
}

function iniciarMissao() {
    imagensColetadas = 0;
    cargaBateria = 5;
    atualizarPainel();
    
    btnIniciar.style.display = 'none';
    btnReiniciar.style.display = 'none';
    btnCapturar.disabled = false;
    
    avisoStatus.innerText = "Satélite em órbita. Aguarde o alinhamento...";
    missaoAtiva = true;
    
    loopRastreamento = setInterval(atualizarOrbita, 30);
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
    } else {
        avisoStatus.innerText = "Falha: Captura realizada sobre o oceano.";
        avisoStatus.style.color = "#c5c6c7";
    }

    cargaBateria--;
    atualizarPainel();

    setTimeout(() => {
        if (cargaBateria > 0) {
            avisoStatus.innerText = "Recalibrando sensor para a próxima volta...";
            avisoStatus.style.color = "#45a29e";
            btnCapturar.disabled = false;
            loopRastreamento = setInterval(atualizarOrbita, 30);
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
        avisoStatus.innerText = `Missão Concluída! ${imagensColetadas} lotes de dados NDVI processados.`;
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