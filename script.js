const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const iconPlayPause = document.querySelector('.app__card-primary-butto-icon')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const tempoNaTela = document.querySelector('#timer')

const musicaFocoInput = document.querySelector('#alternar-musica')
//Vai pegar o ID da musica para utilizar na função
//Está sendo criado um elemento audio com o objeto 'Audio'
const musica = new Audio ('/fokus-curso/sounds/luna-rise-part-one.mp3') 
const play = new Audio ('/fokus-curso/sounds/play.wav') 
const pause = new Audio ('/fokus-curso/sounds/pause.mp3') 
const beep = new Audio ('/fokus-curso/sounds/beep.mp3') 
//Vai fazer a musica ficar em loop
musica.loop = true

let tempoDecorridoEmSegundos = 1500
let intervaloId = null

//Evento para fazer a musica parar ou continuar
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

// addEventListener ele ta adicionando o evento de 'click'
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')

})
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})


function alterarContexto (contexto){
    mostrarTempo()
    //Remove a classe 'active' de acordo com o contexto
    botoes.forEach(function (contexto){
        /* O classList é uma propriedade do JavaScript que representa uma lista de classes CSS.
         Ele fornece métodos que facilitam a adição, remoção e verificação de classes */
        contexto.classList.remove('active')
    })

// setAttribute está fazendo a alteração da classe ao apertar o botão
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/fokus-curso/imagens/${contexto}.png`)

    //Condição para fazer a alteração do titulo
    switch (contexto) {
        case 'foco':
            //innerHTML vai inserir um novo elemento 
            titulo.innerHTML = `            
             Otimize sua produtividade,<br>
            <strong class="app__title-strong">foque no que importa.</strong>`
            
            break;
            case 'descanso-curto': 
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`

            break;
            case 'descanso-longo': 
            titulo.innerHTML = `
            Hora de voltar a superfície!<br>
            <strong class="app__title-strong">Faça uma pausa longa!</strong>`
    
        default:
            break;
    }

}

// Aplica a contagem regressiva
const contagemRegresiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        zerar()
        return
    }
     tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

//Aciona a contagem regressiva ao clicar
startPauseBt.addEventListener('click', startOrPause)

// Automatiza o processo de contagem regressiva
function startOrPause() {
    //Condição para pausar o temporizador
    if(intervaloId){
        pause.play()
        zerar()
        return
    }
    play.play()
    intervaloId = setInterval(contagemRegresiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iconPlayPause.setAttribute('src', `/fokus-curso/imagens/pause.png`)
}

//Função para zerar novamente o temporizador intervaloId
function zerar(){
    //Vai interromper a execução de algum código
    clearInterval(intervaloId)
    intervaloId = null
    iniciarOuPausarBt.textContent = "Começar"
    iconPlayPause.setAttribute('src', `/fokus-curso/imagens/play_arrow.png`)
}

//Função para aparecer uma contagem regressiva na tela
function mostrarTempo(){
    //Vai formatar o tempo de 25 min
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()