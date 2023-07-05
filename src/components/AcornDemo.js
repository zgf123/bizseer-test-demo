"use strict";
exports.__esModule = true;
var react_1 = require("react");
var acorn = require("acorn");
var obj = {
    b: 1,
    func: function () {
        console.log(this.b);
    }
};
obj.func.bind({ b: 2 })();
// const obj2 = {
//   b: 2,
// }
var code = "const fn = a => {\n  let i = 1;\n  return a + i;\n};";
var ast = acorn.parse(code, { ecmaVersion: 'latest' });
console.log(ast);
// console.log(acorn.Parser(ast))
var AcornDemo = function () {
    return <>123</>;
};
exports["default"] = AcornDemo;
