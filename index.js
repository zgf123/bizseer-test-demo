const arr = [6, 7, 811, 5, 9, 31, 4, 1, 2]

var counter = []
function sort(arr) {
  var mod = 10
  var dev = 1
  const maxDigit = Math.ceil(Math.log10(Math.max(...arr)))
  for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
    for (var j = 0; j < arr.length; j++) {
      const buketIndex = Math.floor((arr[j] % mod) / dev)
      counter[buketIndex]
        ? counter[buketIndex].push(arr[j])
        : (counter[buketIndex] = []).push(arr[j])
    }
    var pos = 0
    for (var j = 0; j < counter.length; j++) {
      var value = null
      if (counter[j] != null) {
        while ((value = counter[j].shift()) != null) {
          arr[pos++] = value
        }
      }
    }
  }
  return arr
}

console.log(sort(arr))
