function knapSack(goods, capacity) {
  const pack = []
  for (let i = 0; i < goods.length; i++) {
    pack[i] = []
    for (let w = 0; w <= capacity; w++) {
      pack[i][w] = i > 0 ? pack[i - 1][w] : 0
      let [weight, value] = goods[i]
      if (w >= weight) {
        const newValue = value + pack[i][w - weight]
        if (newValue > pack[i][w]) pack[i][w] = newValue
      }
    }
  }
  const res = []
  let i = goods.length - 1
  let k = capacity
  while (i >= 0 && pack[i][k]) {
    if (i > 0 && pack[i][k] === pack[i - 1][k]) {
      i--
    } else {
      res.push(goods[i])
      k -= goods[i][0]
    }
  }
  const maxValue = pack[goods.length - 1][capacity]
  return { maxValue, res }
}

const capacity = 11
const goods = [
  [2, 3],
  [2, 5],
  [3, 18],
]
console.log(knapSack(goods, capacity))
