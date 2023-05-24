const arr = [9, 6, 8, 7, 5, 2, 3, 1, 4]

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return arr
  const index = partition(arr)
  quickSort(arr, 0, index - 1)
  quickSort(arr, index + 1, arr.length)
  return arr
}

function partition(arr, left, right) {
  const index = arr(pivot)
}

console.log(quickSort(arr))
