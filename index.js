const arr = [3, 2, -1, 5, 2, 1, 1, 0]

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return arr
  const index = partition(arr, left, right)
  quickSort(arr, left, index - 1)
  quickSort(arr, index + 1, right)
  return arr
}

function partition(arr, left, right) {
  const pivot = arr[left]
  let index = left + 1
  for (let i = index; i <= right; i++) {
    if (arr[i] < pivot) {
      ;[arr[i], arr[index]] = [arr[index], arr[i]]
      index++
    }
  }
  index--
  ;[arr[left], arr[index]] = [arr[index], arr[left]]
  return index
}

console.log(quickSort(arr))
