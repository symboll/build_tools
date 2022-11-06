const Inject = (target) => {
  console.log(target)
}

@Inject
class Person {
  constructor (name) {
    this.name = name
  }

  say () {
    console.log(`Im ${this.name}`)
  }
}

let name = 'zhangsan'
console.log(name)


const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
  }, 1000);
})

p.then(res => {
  console.log('res', res)
})
