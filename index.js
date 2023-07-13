function lcs(s1, s2) {
  let res = []
  let diagonal = []
  let top = []
  let left = []
  for (let i = 0; i < s1.length; i++) {
    for (let j = 0; j < s2.length; j++) {
      if (s1[i] === s2[j]) {
        res = [...diagonal, s1[i - 1]]
      } else {
        res = top.length > left.length ? top : left
      }
      top = res
    }
    left = res
  }
  return res
}

console.log(lcs('acbaed', 'abcadf'))
