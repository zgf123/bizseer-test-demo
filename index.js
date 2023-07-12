function lcsequense(s1, s2) {
  let cache = []
  let solution = []
  for (let i = 0; i <= s1.length; i++) {
    cache[i] = []
    solution[i] = []
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0 || j == 0) {
        cache[i][j] = 0
        solution[i][j] = '0'
      } else if (s1[i - 1] === s2[j - 1]) {
        cache[i][j] = cache[i - 1][j - 1] + 1
        solution[i][j] = 'diagonal'
      } else {
        const a = cache[i - 1][j]
        const b = cache[i][j - 1]
        cache[i][j] = a > b ? a : b
        solution[i][j] = a > b ? 'top' : 'left'
      }
    }
  }

  let res = []
  let i = s1.length
  let j = s2.length
  let p = solution[i][j]
  while (p !== '0') {
    if (solution[i][j] === 'diagonal') {
      res.unshift(s1[i - 1])
      i--
      j--
    } else if (solution[i][j] === 'left') {
      j--
    } else if (solution[i][j] === 'top') {
      i--
    }
    p = solution[i][j]
  }

  return res.join('')
}

console.log(lcsequense('afbsfd', 'fdsand'))
