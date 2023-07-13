const roll = document.getElementById('roll')
const hold = document.getElementById('hold')
const scoreboard1 = document.getElementById('score')
const currentScoreboard1 = document.getElementById('currentScore1')
const currentScoreboard2 = document.getElementById('currentScore2')
const scoreboard2 = document.getElementById('scoreTwo')
const newGame = document.getElementById('newGame')
const die = document.getElementById('die')
const turnVisuals = document.getElementById('turnVisuals') 
const bgOne = document.getElementById('bgP1')
const bgTwo = document.getElementById('bgP2')
const playOneWins = document.getElementById('playerOneWins')
const playTwoWins = document.getElementById('playerTwoWins') //Initialisation des éléments

let score1 = 0
let score2 = 0
let currentScore1 = 0
let currentScore2 = 0 //Initialisation des scores

let ctx
let ctxTurn //On initialise les ctx pour canvas
if (die.getContext && turnVisuals.getContext) {
    ctx = die.getContext('2d')
    ctxTurn = turnVisuals.getContext('2d') //Les ctx

    const game = { //Toutes les infos de notre jeu
        'player': 0,
        'ongoing': false,
        'win': false,
        'playerOneWins': 0,
        'playerTwoWins': 0
    }

    const winCheck = () => { // La fonction gérant une victoire
        if (score1 >= 100) {
            game.playerOneWins += 1
            game.win = 1
            playOneWins.innerHTML = `${game.playerOneWins} victoires`
        } else if (score2 >= 100) {
            game.playerTwoWins += 1
            game.win = 2
            playTwoWins.innerHTML = `${game.playerTwoWins} victoires`
        }
        if (game.win != false) {
            alarm(`Le joueur ${game.win} a gagné`)
            score1 = 0 //On remet toutes les valeurs à 0 pour une nouvelle partie
            score2 = 0
            scoreboard1.innerHTML = 0
            currentScore1 = 0
            currentScoreboard1.innerHTML = 0
            scoreboard2.innerHTML = 0
            currentScore2 = 0
            currentScoreboard2.innerHTML = 0
            game.ongoing = false
            game.player = 0
            ctx.beginPath()
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, 100, 100)
            bgOne.classList.remove('bg-light')
            bgTwo.classList.remove('bg-light')
            ctxTurn.beginPath()
            ctxTurn.fillStyle = 'white' 
            ctxTurn.clearRect(0, 0, 150, 50)
        }
    }

    const dieRoll = () => { //Fonction renvoyant un entier de 1 à 6
        return Math.ceil(Math.random()*6)
    }

    const alarm = (message) => {
        let divis = document.createElement('div')
        divis.style.fontSize = '2rem'
        divis.style.background = '#f8f9fa'
        divis.style.boxShadow = '10px'
        divis.style.border = '1px solid black'
        divis.style.borderRadius = '10px'
        divis.style.zIndex = '2'
        divis.style.height = '40vh'
        divis.style.width = '40vw'
        divis.style.minWidth = '200px'
        divis.style.position = 'absolute'
        divis.style.top = '25%'
        divis.style.left = '30%'
        divis.innerHTML = message

        let btn = document.createElement('button')
        btn.innerHTML = 'Fermer'
        btn.style.border = '0'
        btn.style.background = 'none'
        btn.style.float = 'right'
        divis.appendChild(btn)
        btn.addEventListener('click', () => {
            document.body.removeChild(divis)
        })
        document.body.appendChild(divis)
    }

    const rollCalc = (player) => { //Le calcul du résultat et la création du dé
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, 100, 100) //On crée un nouveau dé vide
        ctx.fillStyle = '#e35d6a' 
        let die = dieRoll()
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
                currentScoreboard1.innerHTML = `${currentScore1}` //Sinon, on ajoute le score
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
            ctxTurn.clearRect(0, 0, 150, 50) //On vide le panneau de tour
            ctxTurn.fillStyle = '#e35d6a'
            ctxTurn.moveTo(22, 13)
            ctxTurn.arc(12, 13, 10, 0, Math.PI*2) //On fait un cercle pour indiquer le tour
            ctxTurn.fill()
            bgOne.classList.add('bg-light') //On met en place le bg-light sur la moitié appropriée
            bgTwo.classList.remove('bg-light')
        } else {  
            ctxTurn.beginPath()          
            ctxTurn.fillStyle = 'white'
            ctxTurn.clearRect(0, 0, 150, 50)
            ctxTurn.fillStyle = '#e35d6a'
            ctxTurn.moveTo(148, 13)
            ctxTurn.arc(138, 13, 10, 0, Math.PI*2)
            ctxTurn.fill()
            bgOne.classList.remove('bg-light')
            bgTwo.classList.add('bg-light')
        }
    }
    
    roll.addEventListener('click', () => { //Bouton jet de dé
        if (game.ongoing) {
            rollCalc(game.player)
        }
    })

    newGame.addEventListener('click', () => { //Fonction lançant le jeu
        if (game.ongoing == false) {
            game.ongoing = true
            score1 = 0
            score2 = 0
            scoreboard1.innerHTML = 0
            scoreboard2.innerHTML = 0
            alarm('La partie a commencé')
            game.player = 1
            turnVisual(game.player)
        }
    })

    hold.addEventListener('click', () => {
        if (game.ongoing) {
            if (game.player == 1) {
                score1 += currentScore1
                scoreboard1.innerHTML = score1
                currentScore1 = 0
                currentScoreboard1.innerHTML = 0 //On met les scores en place
                game.player = 2
            }
            else {
                score2 += currentScore2
                scoreboard2.innerHTML = score2
                currentScore2 = 0
                currentScoreboard2.innerHTML = 0
                game.player = 1
            }
            turnVisual(game.player) // On appelle la fonction pour indiquer à qui c'est le tour
            winCheck()
        }
    })


} else {
    alert('Désolé, le site ne fonctionne pas sans canvas ! ')
}
