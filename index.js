function sudokuSolver(matrix) {
  return solveSudoku(matrix) ? matrix : null
}
function solveSudoku(matrix) {
  let x = 0
  let y = 0
  let isBlank = false
  for (x = 0; x < matrix.length; x++) {
    for (y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] === 0) {
        isBlank = true
        break
      }
    }
    if (isBlank === true) break
  }
  if (isBlank === false) return true
  for (let num = 1; num <= 9; num++) {
    if (isSafe(matrix, x, y, num)) {
      matrix[x][y] = num
      if (solveSudoku(matrix)) return true
      matrix[x][y] = 0
    }
  }
  return false
}
function isSafe(matrix, x, y, num) {
  for (let j = 0; j < matrix.length; j++) {
    if (matrix[x][j] === num) return false
  }
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][y] === num) return false
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (matrix[x - (x % 3) + i][y - (y % 3) + j] === num) return false
    }
  }
  return true
}

const sudokuGrid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
]
console.log(sudokuSolver(sudokuGrid))
