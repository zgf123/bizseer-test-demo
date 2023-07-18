function lcs(s1, s2) {
  const cache = Array.from({ length: s1.length }, () => new Array(s2.length))
  function makeLcs(s1, s2) {
    if (!s1.length || !s2.length) return ''
    const i = s1.length - 1
    const j = s2.length - 1
    if (cache[i][j]) return cache[i][j]
    if (s1[0] === s2[0]) {
      return (cache[i][j] = s1[0] + makeLcs(s1.slice(1), s2.slice(1)))
    } else {
      const res1 = makeLcs(s1, s2.slice(1))
      const res2 = makeLcs(s1.slice(1), s2)
      return (cache[i][j] = res1.length > res2.length ? res1 : res2)
    }
  }
  return makeLcs(s1, s2)
}

console.time()
console.log(lcs('pmjghexybyrgzczy', 'hafcdqbgncrcbihkd'))
// console.log(lcs('abcde', 'ace'))
console.timeEnd()
