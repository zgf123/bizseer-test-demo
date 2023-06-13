function minCoinChange(coins, sum) {
  const cache = []
  for (let i = 0; i < coins.length; i++) {
    cache[i] = []
    for (let j = 0; j <= sum; j++) {
      const amount = j - coins[i]
      if (amount >= 0 && cache[i][amount] >= 0) {
        cache[i][j] = 1 + cache[i][amount]
      } else {
        cache[i][j] = i >= 1 ? cache[i - 1][j] : 0
      }
    }
  }
  return cache
}

console.log(minCoinChange([1, 3, 5, 8], 58))
