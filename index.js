function knapSack(goods, capacity) {
  const pack = []
  function makePack(weight) {
    if (pack[weight]) return pack[weight]
    let temp = []
    for (let i = 0; i < goods.length; i++) {
      const [w, v] = goods[i]
      if (weight - w >= 0) {
        const subpack = makePack(weight - w)
        const oldValue = temp.reduce((prev, cur) => (prev += cur[1]), 0)
        const newValue = subpack.reduce((prev, cur) => (prev += cur[1]), 0) + v
        if (newValue > oldValue) temp = [...subpack, goods[i]]
      }
    }
    return (pack[weight] = temp)
  }
  return makePack(capacity)
}

const goods = [
  [2, 3],
  [2, 5],
  [3, 18],
]
console.log(knapSack(goods, 11))
