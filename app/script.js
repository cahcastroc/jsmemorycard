const memoryCard = document.querySelector("#board")
let cardsHtml = ""
let startTime,endTime, time, min
let flipCards, block
let firstCard, secondCard
let pairs = 0
let times =[]
let storage = window.sessionStorage

let cards = [
    {id: "android1" , img:"android.jpg"},
    {id: "android2", img:"android.jpg"},
    {id:"apple1", img:"apple.jpg"},
    {id:"apple2", img:"apple.jpg"},
    {id:"css31", img:"css3.jpg"},
    {id:"css32", img:"css3.jpg"},    
    {id:"html51", img:"html5.jpg"},
    {id:"html52", img:"html5.jpg"},
    {id:"js1", img:"js.jpg"},
    {id:"js2", img:"js.jpg"},
    {id:"node1", img:"node.jpg"},
    {id:"node2", img:"node.jpg"},
    {id:"pyhton1", img:"python.jpg"},
    {id:"python2", img:"python.jpg"},
    {id:"windows1", img:"windows.jpg"},
    {id:"windows2", img:"windows.jpg"},
    ]

function drawBoard(){
    cards.forEach(card => {
        cardsHtml += ` 
        <div class="orgCard" data-card= "${card.img}">
            <img class ="front" id="${card.id}" src="img/${card.img}">
            <img class ="back" id="back${card.id}" src="img/versocarta.jpg">
        </div>
        `        
    });

    memoryCard.innerHTML = cardsHtml
    loadVisibleFront()
    hiddenBack ()
}

function loadVisibleFront(){ 
    cards.forEach (card => {
        document.getElementById(`${card.id}`).classList.add("load-visible-front")
    })
} 

function hiddenBack (){
    cards.forEach (card => {
        document.getElementById(`back${card.id}`).classList.add("hidden-back")
    })
}

function startGame(){
    startTime = new Date()
    cardsHtml= "" //reset board
    drawBoard()  
    flipCards = document.querySelectorAll(".orgCard")
    shuffle()
    block = true

    setTimeout(() => {
        removeClassHiddenBack()
        removeClassVisibleFront()
        block = false
    }, 3000);


    flipCards.forEach(c => c.addEventListener("click", flip)) 
    pairs = 0

}

function shuffle(){
    flipCards = document.querySelectorAll(".orgCard")
    flipCards.forEach(card => {
        let order = Math.floor(Math.random()*16)        
        card.style.order = order
    });
}

function removeClassHiddenBack(){ 
    cards.forEach (card => {
    document.getElementById(`back${card.id}`).classList.remove("hidden-back")
    })
}

function removeClassVisibleFront(){
    cards.forEach (card => {
        document.getElementById(`${card.id}`).classList.remove("load-visible-front")
})
}

function flip(){
    if (block == true){
        return false
    }
    
    this.classList.add("flip-card")       
  

    if (!firstCard){
	    firstCard = this
	    firstCard.removeEventListener('click', flip)
	    return false;
    }

    secondCard = this
    checkPair()
}

function checkPair (){
    let pair = firstCard.dataset.card == secondCard.dataset.card ? true : false

    if(!pair){
        timeTurnCard ()
    }else{
        match(pair)
        pairs +=2

        if(pairs==cards.length){
            setTimeout(() => {
                endGame()
            }, 30);
        }
    }

}

function timeTurnCard(){
    block = true

    setTimeout(() => {
        firstCard.classList.remove("flip-card")
        firstCard.addEventListener("click", flip)  
        secondCard.classList.remove("flip-card")
        block = false
        firstCard= null
        secondCard = null
    }, 1500);
}

function match (pair){
    if(pair == true){
        firstCard.removeEventListener("click", flip)
        secondCard.removeEventListener("click", flip)
        block = false
        firstCard= null
        secondCard = null
    }
}

function endGame(){
    let endTime = new Date ()
    time = endTime - startTime

    alert (`Fim de Jogo. Seu tempo: ${time}`)
    times.push(time)

    storage.setItem('times', JSON.stringify(times))


}

function btnTimes(){
    times = JSON.parse(storage.getItem('times'))

    for (let i = 0; i <= times.length; i++) {
        min = Math.min(...times)
    }
    alert(`Melhor tempo: ${min} milisegundos.`)
}
