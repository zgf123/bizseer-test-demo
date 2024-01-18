function getPos(curIndex, maxIndex) {
  if (curIndex > maxIndex) return
  let gap = 1
  let maxDeep = Math.floor(Math.log2(maxIndex + 1))
  let count = Math.pow(2, maxDeep) - 1
  function getIndex(idx) {
    if (idx < count) return (getIndex(2 * idx + 1) + getIndex(2 * idx + 2)) / 2
    return (idx - count) * gap * 2
  }
  return getIndex(curIndex)
}

function printTree(arr) {
  let len = arr.length
  let wid = 1
  let matrix = []
  for (let i = 0; i < len; i++) {
    let index = getPos(i, len - 1)
    let deep = Math.floor(Math.log2(i + 1))
    if (!matrix[deep]) matrix[deep] = []
    matrix[deep][index] = arr[i].padStart(wid, '0')
  }
  let str = ''
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      str += matrix[i][j] ?? ' '.repeat(wid)
    }
    str += '\n'
  }
  return str
}

let arr = new Array(10).fill(0).map((item, index) => index + '')
console.log(printTree(arr))
