let fullfilledXCells = []
let fullfilled0Cells = []
let target, coord, n

const winningCombinations = [
        ['cell1', 'cell2', 'cell3'],
        ['cell1', 'cell5', 'cell9'],
        ['cell1', 'cell4', 'cell7'],
        ['cell9', 'cell6', 'cell3'],
        ['cell9', 'cell8', 'cell7'],
        ['cell2', 'cell5', 'cell8'],
        ['cell3', 'cell6', 'cell9'],
        ['cell3', 'cell5', 'cell7'],
        ['cell4', 'cell5', 'cell6']
]
const figureIcon = document.getElementsByClassName('figureIcon')
const figure = document.getElementsByClassName('figure')
const field = document.getElementById('field')
const deletion = document.getElementById('deletion')
const playButton = document.getElementById('playButton')
const turn = document.getElementById('turn')
const selectionBox = document.getElementById('selectionBox')
const winner = document.getElementById('winner')
const wraper = document.getElementById('wraper')
const player = document.getElementById('player')


field.addEventListener('click', chooseFigure)
figure[0].addEventListener('click', printX)
figure[1].addEventListener('click', print0)
deletion.addEventListener('click', startAgain)
playButton.addEventListener('click', () => turn.style.display = 'none')

function chooseFigure (event) {

    target = event.target
    if (target.tagName != 'TD') return

    coord = target.getBoundingClientRect() 

    selectionBox.style.left = coord.left + 17 + 'px'
    selectionBox.style.top = coord.top + 50 + 'px'
    selectionBox.style.display = 'block'
    field.removeEventListener('click', chooseFigure)
    field.addEventListener('click', playWithSelectedFigure)
}

function playWithSelectedFigure (event) {

    target = event.target
    if (target.tagName != 'TD') return
    coord = target.getBoundingClientRect() 

    if (n === 'X') {
        printX()
    } else {
        print0()
    }
}

function printX () {

    let crossik = document.createElement('div')
    crossik.classList.add('crossik', 'figureIcons')
    crossik.style.left = coord.left + 'px'
    crossik.style.top = coord.top + 'px'
    field.append(crossik)

    selectionBox.style.display = 'none'

    fullfilledXCells.push(target.id)

    setTimeout( () => {
        if (checkCells(fullfilledXCells)) {
            player.innerHTML = '0`'
            turn.style.display = 'block'
            n = '0'
        }
    }, 100)
}

function print0 () {

    let nullik = document.createElement('div')
    nullik.classList.add('nullik', 'figureIcons')

    nullik.style.left = coord.left + 'px'
    nullik.style.top = coord.top + 'px'

    field.append(nullik)

    selectionBox.style.display = 'none'

    fullfilled0Cells.push(target.id)

    setTimeout( () => {
        if (checkCells(fullfilled0Cells)) {
            player.innerHTML = 'X`'
            turn.style.display = 'block'
            n = 'X'
        }
    }, 100)
}

function checkCells (array) {

    if (array.length < 3) return true

    for (let combo of winningCombinations) {
        let counter = 0
        for (let i = 0; i <= combo.length; i++) {
            if (array.includes(combo[i])) {
                counter++
            }
        }
        if (counter >= 3) {
            if (array === fullfilledXCells) {
                winner.innerHTML = 'X win!'
                wraper.style.display = 'block'
                return false
            } else if (array === fullfilled0Cells) {
                winner.innerHTML = '0 win!'
                wraper.style.display = 'block'
                return false
            } else {
                alert('Oops... Error occured.')
                return false
            }
        }
    }

    if (array.length === 5) {
        winner.innerHTML = 'No winners'
        wraper.style.display = 'block'
        return false
    } else {
        return true
    }
}

function startAgain () {
    let cells = document.getElementsByClassName('figureIcons')
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.display = 'none'
    }
    field.removeEventListener('click', playWithSelectedFigure)
    field.addEventListener('click', chooseFigure)
    fullfilledXCells = []
    fullfilled0Cells = []
    wraper.style.display = 'none'
}
