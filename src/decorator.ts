const a = 1
export default a

// // 装饰器工厂
// function logClass() {
//   return function (target: any) {
//     // 需要return一个函数
//     console.log(target) // 类本身
//     // console.log(params) // 传入的参数
//   }
// }

// @logClass() // 使用装饰器工厂方法时用 @logClass('aa')
// class HttpClient {
//   public apiUrl: string | undefined
//   construcor() {
//     this.apiUrl = '我是构造函数里面的apiUrl'
//   }

//   getData() {
//     console.log(this.apiUrl)
//   }
// }
