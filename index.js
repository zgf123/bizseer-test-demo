const arr = [6, 7, 28, 5, 9, 3, 4, 11, 2]

function radixSort(arr) {
  const max = Math.max(...arr)
  const maxDigit = Math.ceil(Math.log10(max))
  let radixBase = 10
  let bitSignificance = 1
  for (let i = 0; i < maxDigit; i++, radixBase *= 10, bitSignificance *= 10) {
    const buketArr = []
    for (let j = 0; j < arr.length; j++) {
      const index = Math.floor((arr[j] % radixBase) / bitSignificance)
      if (!buketArr[index]) buketArr[index] = []
      buketArr[index].push(arr[j])
    }
    arr = []
    for (let j = 0; j < buketArr.length; j++) {
      if (buketArr[j]) arr.push(...buketArr[j])
    }
  }

  return arr
}

console.log(radixSort(arr))
