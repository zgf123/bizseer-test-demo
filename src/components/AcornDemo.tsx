import React from 'react'
import * as acorn from 'acorn'

const obj = {
  b: 1,
  func() {
    console.log(this.b)
  },
}

obj.func.bind({ b: 2 })()
// const obj2 = {
//   b: 2,
// }

const code = `const fn = a => {
  let i = 1;
  return a + i;
};`
const ast = acorn.parse(code, { ecmaVersion: 'latest' })

console.log(ast)

// console.log(acorn.Parser(ast))

const AcornDemo = () => {
  return <>123</>
}

export default AcornDemo
