const roll = document.getElementById('roll')
const hold = document.getElementById('hold')
const scoreboard1 = document.getElementById('score')
const currentScoreboard1 = document.getElementById('currentScore1')
const currentScoreboard2 = document.getElementById('currentScore2')
const scoreboard2 = document.getElementById('scoreTwo')
const newGame = document.getElementById('newGame')
const die = document.getElementById('die')
const turnVisuals = document.getElementById('turnVisuals') //Initialisation des éléments

let score1 = 0
let score2 = 0
let currentScore1 = 0
let currentScore2 = 0 //Initialisation des scores
let ongoingGame = false

let ctx
let ctxTurn //On initialise les ctx pour canvas
if (die.getContext && turnVisuals.getContext) {
    ctx = die.getContext('2d')
    ctxTurn = turnVisuals.getContext('2d')
    const game = {
        'player': 0
    }


    const dieRoll = () => { //Fonction renvoyant un entier de 1 à 6
        return Math.ceil(Math.random()*6)
    }

    const rollCalc = (player) => {
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 100, 100) //On crée un nouveau dé vide
        ctx.fillStyle = '#e35d6a' 
        let die = dieRoll()
        console.log(die)
        switch (die) { //En fonction du résultat du dé, on génère la face avec canvas
            case 1:
                ctx.moveTo(60, 50)
                ctx.arc(50, 50, 10, 0, Math.PI*2)
                ctx.fill()
                break;
            case 2:
                ctx.moveTo(40, 50)
                ctx.arc(30, 50, 10, 0, Math.PI*2)
                ctx.moveTo(80, 50)
                ctx.arc(70, 50, 10, 0, Math.PI*2)
                ctx.fill()
                break;
            case 3:
                ctx.moveTo(30, 20)
                ctx.arc(20, 20, 10, 0, Math.PI*2)
                ctx.moveTo(60, 50)
                ctx.arc(50, 50, 10, 0, Math.PI*2)
                ctx.moveTo(90, 80)
                ctx.arc(80, 80, 10, 0, Math.PI*2)
                ctx.fill()
                break;
            case 4:
                ctx.moveTo(35, 20)
                ctx.arc(25, 20, 10, 0, Math.PI*2)
                ctx.moveTo(85, 20)
                ctx.arc(75, 20, 10, 0, Math.PI*2)
                ctx.moveTo(35, 80)
                ctx.arc(25, 80, 10, 0, Math.PI*2)
                ctx.moveTo(85, 80)
                ctx.arc(75, 80, 10, 0, Math.PI*2)
                ctx.fill()
                break;
            case 5:
                ctx.moveTo(35, 20)
                ctx.arc(25, 20, 10, 0, Math.PI*2)
                ctx.moveTo(85, 20)
                ctx.arc(75, 20, 10, 0, Math.PI*2)
                ctx.moveTo(60, 50)
                ctx.arc(50, 50, 10, 0, Math.PI*2)
                ctx.moveTo(35, 80)
                ctx.arc(25, 80, 10, 0, Math.PI*2)
                ctx.moveTo(85, 80)
                ctx.arc(75, 80, 10, 0, Math.PI*2)
                ctx.fill()
                break;
            case 6:
                ctx.moveTo(40, 20)
                ctx.arc(30, 20, 10, 0, Math.PI*2)
                ctx.moveTo(80, 20)
                ctx.arc(70, 20, 10, 0, Math.PI*2)
                ctx.moveTo(40, 50)
                ctx.arc(30, 50, 10, 0, Math.PI*2)
                ctx.moveTo(80, 50)
                ctx.arc(70, 50, 10, 0, Math.PI*2)
                ctx.moveTo(40, 80)
                ctx.arc(30, 80, 10, 0, Math.PI*2)
                ctx.moveTo(80, 80)
                ctx.arc(70, 80, 10, 0, Math.PI*2)
                ctx.fill()
                break;
        }
        if (player == 1) { //On vérifie le numéro du joueur
            if (die == 1) {
                currentScore1 = 0
                hold.click() //Si le dé renvoie 1, c'est la fin du tour
            } else {
                currentScore1 += die
                currentScoreboard1.innerHTML = `${currentScore1}`
            }
        } else {
            if (die == 1) {
                currentScore2 = 0
                currentScoreboard2.innerHTML = '0'
                hold.click()
            } else {
                currentScore2 += die
                currentScoreboard2.innerHTML = `${currentScore2}`
            }
        }
    }

    const turnVisual = (player) => {
        if (player == 1) {
            ctxTurn.beginPath()
            ctxTurn.fillStyle = 'white' 
            ctxTurn.clearRect(0, 0, 150, 50)
            ctxTurn.fillStyle = '#e35d6a'
            ctxTurn.moveTo(20, 10)
            ctxTurn.arc(10, 10, 10, 0, Math.PI*2)
            ctxTurn.fill()
        } else {  
            ctxTurn.beginPath()          
            ctxTurn.fillStyle = 'white'
            ctxTurn.clearRect(0, 0, 150, 50)
            ctxTurn.fillStyle = '#e35d6a'
            ctxTurn.moveTo(150, 10)
            ctxTurn.arc(140, 10, 10, 0, Math.PI*2)
            ctxTurn.fill()
        }
    }
    
    roll.addEventListener('click', () => {
        if (ongoingGame) {
            rollCalc(game.player)
        }
    })

    newGame.addEventListener('click', () => {
        if (ongoingGame == false) {
            ongoingGame = true
            score1 = 0
            score2 = 0
            scoreboard1.innerHTML = 0
            scoreboard2.innerHTML = 0
            alert('La partie a commencé')
            game.player = 1
            turnVisual(game.player)
        }
    })

    hold.addEventListener('click', () => {
        if (ongoingGame) {
            if (game.player == 1) {
                score1 += currentScore1
                scoreboard1.innerHTML = score1
                currentScore1 = 0
                currentScoreboard1.innerHTML = 0
                game.player = 2
            }
            else {
                score2 += currentScore2
                scoreboard2.innerHTML = score2
                currentScore2 = 0
                currentScoreboard2.innerHTML = 0
                game.player = 1
            }
            turnVisual(game.player)
        }
    })


} else {
    alert('Désolé, le site ne fonctionne pas sans canvas ! ')
}
