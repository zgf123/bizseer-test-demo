function matrixChainOrder(p) {
  const n = p.length - 1
  const m = []
  const s = []
  const cache = []
  for (let i = 1; i <= n; i++) {
    m[i] = []
    m[i][i] = 0
    cache[i] = []
    cache[i][i] = 'A' + i
  }

  for (let i = 0; i <= n; i++) {
    s[i] = []
    for (let j = 0; j <= n; j++) {
      s[i][j] = 0
    }
  }

  for (let l = 2; l <= n; l++) {
    for (let i = 1; i <= n - l + 1; i++) {
      const j = i + l - 1
      m[i][j] = Infinity
      for (let k = i; k <= j - 1; k++) {
        const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j]
        if (q < m[i][j]) {
          m[i][j] = q
          s[i][j] = k
          cache[i][j] = `(${cache[i][k]}${cache[k + 1][j]})`
        }
      }
    }
  }

  let res = ''
  function printOptimalParenthesis(s, i, j) {
    if (i === j) {
      res += 'A' + i + ''
    } else {
      res += '('
      printOptimalParenthesis(s, i, s[i][j])
      printOptimalParenthesis(s, s[i][j] + 1, j)
      res += ')'
    }
  }
  printOptimalParenthesis(s, 1, n)

  console.log(cache[1][n])
  console.log(res)
  return m[1][n]
}

const p = [10, 100, 5, 50, 1]
console.log(matrixChainOrder(p))
// 1750
