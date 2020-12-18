document.addEventListener('DOMContentLoaded', startGame)
// Define your `board` object here!



function createBoard(rowSize, colSize, mineNum) {

  mineNum = document.getElementById("changeMine").value

  let board = { cells: [] }

  for (let i = 0; i < colSize; i++) {
    for (let j = 0; j < rowSize; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: false,
        isMarked: false,
        hidden: true
      })
    }
  }

  let boardSize = rowSize * colSize

  for (let i = 0; i < mineNum; i++) {
    board.cells[Math.floor(Math.random() * boardSize)].isMine = true
  }
  return board
}

let board = createBoard(5, 5)


function startGame() {
  
  lib.initBoard()

  board.cells.forEach(cell => {
    cell.surroundingMines = countSurroundingMines(cell)  })

  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)
}



// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin() {

  let isMineCount = 0
  let isMarkedCount = 0
  let markedMine = 0
  let isHiddenCount = 0
  let bang = false;
  board.cells.forEach(cell => {

    if (cell.hidden) {
      isHiddenCount++
    }

    if (!cell.hidden && cell.isMine) {
      bang = true;
    }

    if (cell.isMarked) {
      isMarkedCount++
    }

    if (cell.isMine) {
      isMineCount++
    }

    if (cell.isMine && cell.isMarked) {
      markedMine++
    }

  })
  // console.log("Marked " + markedMine)
  // console.log("isMine " + isMineCount)
  // console.log("isMarked " + isMarkedCount)
  // console.log("isHidden " + isHiddenCount)
  if (markedMine === isMineCount && markedMine === isMarkedCount) {
    return lib.displayMessage('You win!')
  }
  if (isHiddenCount === isMineCount && !bang) {
    return lib.displayMessage('You win!')
  }

  // lib.displayMessage('You win!') 
}


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  let count = 0
  surrounding.forEach(cell => {
    if (cell.isMine) {
      count ++
    }
  })
  return count
}

function resetBoard() {
  
let cellCount = document.getElementById("board").childElementCount



}