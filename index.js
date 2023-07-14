function lcs(s1, s2) {
  let left = Array.from({ length: s2.length + 1 }, () => [])
  for (let i = 1; i <= s1.length; i++) {
    let temp = [[]]
    for (let j = 1; j <= s2.length; j++) {
      temp = [...temp, left[j]]
      if (s1[i - 1] === s2[j - 1]) {
        left[j] = [...temp[j - 1], s2[j - 1]]
      } else {
        let a = left[j]
        let b = left[j - 1]
        left[j] = a.length > b.length ? a : b
      }
    }
  }

  return left
}

console.log(lcs('abc', 'ab'))
