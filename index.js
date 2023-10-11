function ratInMaze(maze) {
  let solution = Array.from({ length: maze.length }, () => new Array(maze[0].length).fill(0))
  return findPath(maze, solution, 0, 0) ? solution : null
}

function findPath(maze, solution, x, y) {
  let isSafe = x >= 0 && y >= 0 && x < maze.length && y < maze[0].length && maze[x][y] === 1
  if (isSafe) {
    solution[x][y] = 1
    if (x === maze.length - 1 && y === maze[0].length - 1) return true
    if (findPath(maze, solution, x + 1, y)) return true
    if (findPath(maze, solution, x, y + 1)) return true
    solution[x][y] = 0
  }
  return false
}
const maze = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0],
  [1, 1, 1, 1, 1],
]
console.log(ratInMaze(maze))
