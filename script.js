const main = document.querySelector('.main')

const cards = [
    'images/0.jpg','images/1.jpg','images/2.jpg','images/3.jpg',
    'images/4.jpg','images/5.jpg','images/6.jpg','images/7.jpg'
]

card = [...cards, ...cards]

card.sort(() => Math.random() - 0.5)

let userClick = []
let check = []
let scores = 0
let gamePairs = card.length/2

const createCard = () =>{
    const game = document.createElement('div')
    game.classList = "main__game"

    main.appendChild(game)

    card.forEach(item => {
        const card = document.createElement('div')
        card.classList = "main__card"
    
        const front = document.createElement('img')
        front.setAttribute('src', item)
        front.classList = "card"

        const back = document.createElement('div')
        back.classList = "card__back"

        game.appendChild(card)
        card.appendChild(front)
        card.appendChild(back)      

        card.addEventListener('click',(event) =>{
            card.classList.add("answer")
            flipCard(event)
            
        }); 
    
    })
}

const flipCard = (event) =>{
    const clickCard = event.target
    const clickDiv = event.target.parentElement
    
    userClick = userClick.concat(clickCard)
    check = check.concat(clickDiv)
   
    if (userClick.length === 1) {check[0].style.pointerEvents = "none"}
    {check[0].style.pointerEvents = null}

    if (userClick.length === 2) {setTimeout(checkMatch,500)}   
   
}

const checkMatch = () =>{
    const mainScore= document.querySelector('.main__score')
 
    if (userClick[0].getAttribute("src") === userClick[1].getAttribute("src"))
    {
        check.forEach(item =>item.style.pointerEvents = "none")
      
        scores ++
        mainScore.textContent = "Scores: " + scores
    }
    else
    {  
        check.forEach(item => item.classList.remove("answer") )
    }

    userClick = []
    check = []

    restatGame(mainScore)
}

const score = () => {
    const points = document.createElement('div')
    points.classList = "main__score"
    points.textContent = "Scores: " + scores
  
    main.appendChild(points)
}

const restatGame = (mainScore) => {
    const answer= document.querySelectorAll('.answer')

    if (scores === gamePairs) 
    {
        alert("koniec gry !")
        scores = 0
        mainScore.textContent = "Scores: " + scores
       answer.forEach(item =>item.classList.remove("answer"))
      answer.forEach(item => item.style.pointerEvents = null)
    } 
}

score()
createCard()