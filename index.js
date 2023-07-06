function minCoinChange(coins, sum) {
  const cache = []

  for (let i = 0; i <= sum; i++) {
    cache[i] = []
    for (let j = 0; j < coins.length; j++) {
      const coin = coins[j]
      const amount = i - coin
      if (amount === 0) {
        cache[i] = [coin]
      } else if (amount > 0 && cache[amount].length) {
        const newmin = [...cache[amount], coin]
        if (!cache[i].length || newmin.length < cache[i].length) {
          cache[i] = newmin
        }
      }
    }
  }

  return cache[sum]
}

console.log(minCoinChange([1, 3, 4, 5], 7))
