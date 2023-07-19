//store the order of flashes as an array of random numbers
let order = []
//the order the player put the light in
let playerOrder = []
//number of flashes have appeared
let flash
//game is on/off true/false
let turn
let good //player's play is true or false
let compTurn //computer turn
let intervalId
let strict = false //strict mode on/off
let noise = true //sound would be played or not
let on = false //game is off by default
let win

//assign all the buttons to according variable to manipulate events
const turnCounter = document.getElementById('turn')
const topLeft = document.getElementById('topleft')
const topRight = document.getElementById('topright')
const bottomLeft = document.getElementById('bottomleft')
const bottomRight = document.getElementById('bottomright')
const strictButton = document.getElementById('strict')
const onButton = document.getElementById('on')
const startButton = document.getElementById('start')

//event for the strict button
strictButton.addEventListener('change', (evt) => {
  if (strictButton.checked == true) {
    strict = true
  } else {
    strict = false
  }
})

//event for the on button
onButton.addEventListener('click', (evt) => {
  if (onButton.checked == true) {
    on = true
    turnCounter.innerHTML = '-'
  } else {
    on = false
    turnCounter.innerHTML = ''
    clearColor()
    clearInterval(intervalId) //stop flashing color
  }
})

//event for the start button
startButton.addEventListener('click', (evt) => {
  if (on || win) {
    play()
  }
})

//play function to run the game
function play() {
  //reset variables
  win = false
  order = []
  playerOrder = []
  flash = 0
  intervalId = 0
  turn = 1
  turnCounter.innerHTML = 1 //counter back to first round
  good = true //no wrong move yet

  //get the order upto 20 turns
  for (let i = 0; i < 20; i++) {
    //push a random number between 1&4 to the order array
    order.push(Math.floor(Math.random() * 4) + 1)
  }
  compTurn = true //computer turn first
  intervalId = setInterval(gameTurn, 800)
}

function gameTurn() {
  on = false //computer turn, player cant click
  if (flash == turn) {
    //number of turn = number of light flashed
    clearInterval(intervalId)
    compTurn = false
    clearColor()
    on = true //player can now click
  }

  if (compTurn) {
    clearColor()
    setTimeout(() => {
      if (order[flash] == 1) one()
      if (order[flash] == 2) two()
      if (order[flash] == 3) three()
      if (order[flash] == 4) four()
      flash++
    }, 200)
  }
}

function one() {
  if (noise) {
    //make a noise
    let audio = document.getElementById('clip1')
    audio.play()
  }
  noise = true
  topLeft.style.backgroundColor = 'lightgreen'
}

function two() {
  if (noise) {
    //make a noise
    let audio = document.getElementById('clip2')
    audio.play()
  }
  noise = true
  topRight.style.backgroundColor = 'tomato'
}

function three() {
  if (noise) {
    //make a noise
    let audio = document.getElementById('clip3')
    audio.play()
  }
  noise = true
  bottomLeft.style.backgroundColor = 'yellow'
}

function four() {
  if (noise) {
    //make a noise
    let audio = document.getElementById('clip4')
    audio.play()
  }
  noise = true
  bottomRight.style.backgroundColor = 'lightskyblue'
}

function clearColor() {
  //back to initial color
  topLeft.style.backgroundColor = 'darkgreen'
  topRight.style.backgroundColor = 'darkred'
  bottomLeft.style.backgroundColor = 'goldenrod'
  bottomRight.style.backgroundColor = 'darkblue'
}

topLeft.addEventListener('click', (evt) => {
  if (on) {
    playerOrder.push(1)
    check()
    one()
  }
  if (!win) {
    setTimeout(() => {
      clearColor()
    }, 300)
  }
})

topRight.addEventListener('click', (evt) => {
  if (on) {
    playerOrder.push(2)
    check()
    two()
  }
  if (!win) {
    setTimeout(() => {
      clearColor()
    }, 300)
  }
})

bottomLeft.addEventListener('click', (evt) => {
  if (on) {
    playerOrder.push(3)
    check()
    three()
  }
  if (!win) {
    setTimeout(() => {
      clearColor()
    }, 300)
  }
})

bottomRight.addEventListener('click', (evt) => {
  if (on) {
    playerOrder.push(4)
    check()
    four()
  }
  if (!win) {
    setTimeout(() => {
      clearColor()
    }, 300)
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
    good = false
  }

  if (playerOrder.length == 20 && good) {
    winGame()
  }

  if (good == false) {
    flashColor()
    turnCounter.innerHTML = 'WRONG!'
    setTimeout(() => {
      turnCounter.innerHTML = turn
      clearColor()

      if (strict) {
        play()
      } else {
        compTurn = true
        flas = 0
        playerOrder = []
        good = true
        intervalId = setInterval(gameTurn, 800)
      }
    }, 800)
    noise = false
  }

  if (turn == playerOrder.length && good && !win) {
    turn++
    playerOrder = []
    compTurn = true
    flash = 0
    turnCounter.innerHTML = turn
    intervalId = setInterval(gameTurn, 800)
  }
}

function flashColor() {
  topLeft.style.backgroundColor = 'lightgreen'
  topRight.style.backgroundColor = 'tomato'
  bottomLeft.style.backgroundColor = 'yellow'
  bottomRight.style.backgroundColor = 'lightskyblue'
}

function winGame() {
  flashColor()
  turnCounter.innerHTML = 'WON'
  on = false
  win - true
}
