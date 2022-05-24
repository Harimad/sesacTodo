const obj = require('./index')
console.log(obj)

//비구조화 할당
const { a, b } = require('./index')
console.log(a) // 1
b() // hello

// const { dummy } = require('./index')
// console.log(dummy) // 2
