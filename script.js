const main = document.querySelector('.main')

const card = [
    'images/0.jpg','images/1.jpg','images/2.jpg','images/3.jpg',
    'images/4.jpg','images/5.jpg','images/6.jpg','images/7.jpg'
]

const cards = [...card, ...card]

cards.sort(() => Math.random() - 0.5)

let selectedCards = []
let selectedDivCards = []
let score = 0
let cardPairs = cards.length / 2

const game = document.createElement('div')
game.classList = "main__game"
main.appendChild(game)
 
const renderGame= item => {
    const mainCard = document.createElement('div')
    mainCard.classList = "main__card"

    const front = document.createElement('img')
    front.setAttribute('src', item)
    front.classList = "card"

    const back = document.createElement('div')
    back.classList = "card__back"

    game.appendChild(mainCard)
    mainCard.appendChild(front)
    mainCard.appendChild(back)      

    mainCard.addEventListener('click', event => {
        mainCard.classList.add("answer")
        flipCard(event)
    })
}

cards.forEach(item => renderGame(item));

const flipCard = event => {
    const mainCards = document.querySelectorAll('.main__card')

    const clickCard = event.target
    const clickDivCard = event.target.parentElement

    selectedCards = selectedCards.concat(clickCard)
    selectedDivCards = selectedDivCards.concat(clickDivCard)

    const [divOne] = selectedDivCards

    if (selectedCards.length === 1) {
        divOne.style.pointerEvents = "none"
    }

    if (selectedCards.length === 2) {
        setTimeout(checkCards,800),
        mainCards.forEach(element => element.style.pointerEvents = "none")
    }   
   
}

const checkCards = () => {
    const mainScore= document.querySelector('.main__score')
    const mainCards = document.querySelectorAll('.main__card')

    const [cardOne,cardTwo] = selectedCards
 
    if (cardOne.getAttribute("src") === cardTwo.getAttribute("src")) {
        selectedDivCards.forEach(item => item.style.pointerEvents = "none" && item.classList.add("hit"))
        mainCards.forEach(element => element.style.pointerEvents = null);

        score++
        mainScore.textContent = "Scores: " + score
    }
    else {  
        selectedDivCards.forEach(item => item.classList.remove("answer"))
        mainCards.forEach(element => element.style.pointerEvents = null);
    }

    selectedCards = []
    selectedDivCards = []

    restartGame(mainScore)
}

const createScore = () => {
    const points = document.createElement('div')
    points.classList = "main__score"
    points.textContent = "Scores: " + score

    main.appendChild(points)
}

const restartGame = mainScore => {
    const resetCards = document.querySelectorAll('.answer')

    if (score === cardPairs) {
        alert("The End Game!")

        score = 0
        mainScore.textContent = "Scores: " + score

        resetCards.forEach(item => {
            item.classList.remove("answer","hit")
            item.style.pointerEvents = null
        })
    } 
}

createScore()