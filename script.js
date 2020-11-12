const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
// A player can win if he marks all the cell at the same column, row or diagonal line
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6] 
]
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
// Initiate the circle turn to false
// So the X's player goes first
let circleTurn

// Start the game at first time
startGame()

// Restart the game from the second time
restartButton.addEventListener('click', startGame)

function startGame() {
    // Set the turn initially for X's
    circleTurn = false
    cellElements.forEach(cell => {
        // Clear the play board for the next game
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        // Make sure each cell is clicked once time
        cell.addEventListener('click', handleClick, { once : true })
    })
    setBoardHoverClass()
    // Switch off the winning message to start the new game
    winningMessageElement.classList.remove('show')
}



function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    // Place Mark
    placeMark(cell, currentClass)
    // Check For Win
    if (checkWin(currentClass)) {
        // Set variable draw to false 
        endGame(false) 
    } else if (isDraw()) {
        // If draw then end the game
        endGame(true)
    } else {
        // If the game has not ended yet, swap the turn
        // and hover according to the current turn
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

// Alternatively change the hover according to the current turn
function setBoardHoverClass() {
    // Remove the previous turn
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    // Switch the turn
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    // Look up through all the winning combinations 
    return WINNING_COMBINATIONS.some(combination => {
        // Return true if every cell having index in the combination
        // has the same mark 
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}