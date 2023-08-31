function matrixChainOrder(p) {
  const n = p.length - 1
  const m = []
  const s = []
  for (let i = 1; i <= n; i++) {
    m[i] = []
    m[i][i] = 0
    s[i] = []
    for (let j = 1; j <= n; j++) {
      s[i][j] = 0
    }
  }
  for (let l = 2; l <= n; l++) {
    for (let i = 1, j = l; j <= n; i++, j++) {
      m[i][j] = Infinity
      for (let k = i; k <= j - 1; k++) {
        const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j]
        if (q < m[i][j]) {
          m[i][j] = q
          s[i][j] = k
        }
      }
    }
  }
  function fn(s, i, j) {
    if (i === j) return `A${i}`
    return `(${fn(s, i, s[i][j])}${fn(s, s[i][j] + 1, j)})`
  }
  console.log(fn(s, 1, n))
  return m[1][n]
}

const p = [10, 100, 5, 50, 1]
console.log(matrixChainOrder(p))
// 1750
