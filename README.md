# Captura Orbital - NDVI

## Objetivo do Jogo
Captura Orbital é um simulador focado em sensoriamento remoto. O jogador deve acionar o sensor do satélite no exato momento em que ele sobrevoa a zona de interesse florestal para coletar dados do Índice de Vegetação (NDVI). O objetivo é conseguir 3 coletas bem-sucedidas antes que a bateria se esgote em 5 órbitas.

## Tecnologias Utilizadas
- HTML5 (Estruturação de painéis)
- CSS3 (Estilização de interface radar/telemetria)
- JavaScript Vanilla (Lógica de trajetória orbital, colisão e DOM)

## Instruções de Instalação e Execução
O jogo roda inteiramente no lado do cliente. Não é necessário instalar nenhuma dependência. Clone o repositório e abra o arquivo `index.html` em qualquer navegador.

Link para a versão publicada: [INSERIR SEU LINK DO GITHUB PAGES AQUI]

## Regras
1. Clique em "Iniciar Órbita" para o satélite começar a se mover.
2. Observe a trajetória do satélite (🛰️) no painel.
3. Clique em "Capturar Imagem" quando ele estiver dentro da área verde delimitada.
4. Coletas fora da área verde desperdiçam uma carga de bateria sem render dados.
5. O limite operacional é de 5 cargas (tentativas).
6. Condição de Sucesso (Vitória): Coletar 3 ou mais amostras.
7. Condição de Falha (Derrota): Coletar menos de 3 amostras.

## Informações do Estudante
```json
{
"nome": "Captura Orbital - NDVI",
"descricao": "Simulador web de sensoriamento remoto onde o usuário atua no controle de missão, capturando dados de vegetação quando o satélite cruza a área de cobertura.",
"autores": "Heitor Ramos Vieira Rocha",
"turma": "10A"
}