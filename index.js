function lcs(s1, s2) {
  const vector = [[]]
  for (let i = 1; i <= s1.length; i++) {
    let [prev, cur] = [[], []]
    for (let j = 1; j <= s2.length; j++) {
      if (!vector[j]) vector[j] = []
      ;[prev, cur] = [cur, vector[j]]
      if (s1[i - 1] === s2[j - 1]) {
        vector[j] = [...prev, s2[j - 1]]
      } else {
        let a = vector[j - 1]
        let b = cur
        vector[j] = a.length > b.length ? a : b
      }
    }
  }
  return vector.pop()
}

console.log(lcs('bsbininm', 'jmjkbkjkv'))
