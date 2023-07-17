function lcs(s1, s2) {
  if (s1.length === 0 || s2.length === 0) return ''
  if (s1[0] === s2[0]) {
    return s1[0] + lcs(s1.slice(1), s2.slice(1))
  } else {
    const res1 = lcs(s1, s2.slice(1))
    const res2 = lcs(s1.slice(1), s2)
    return res1.length > res2.length ? res1 : res2
  }
}

console.log(lcs('acbaed', 'abcadf'))
