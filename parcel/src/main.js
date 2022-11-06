import foo from './foo'
import './style/index.css'
import './style/index.scss'
import duck from './assets/duck.gif'


const image = document.createElement('img')
image.src = duck
image.style.width = '100px'
image.style.height = '100px'

// parcel 支持动态导入
import('jquery').then($ => {
  $(document.body).append('<h1 class="title">Hello Parcel~</h1>')
})


document.body.appendChild(image)
foo.bar();

class Person {
  constructor (name) {
    this.name = name
  }
  say () {
    console.log(`my name is ${this.name}`)
  }
}
const person = new Person('zhangsan')
person.say()


const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello symboll')
  }, 1000);
})

p.then(res => console.log(res))