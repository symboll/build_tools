import './style/main.css';
import style from './style/index.less';
import './style/index.scss'

// style
const div = document.createElement('div')
div.innerHTML = 'hello '
div.classList.add('title')
div.classList.add(style.title)

document.body.appendChild(div)


// es6
const print =() => {
  console.log('hello');
}
div.addEventListener('click', print , false)

const p = new Promise((resolve) => {
  setTimeout(() => {
    resolve('promise is wroking')
  }, 5000);
})
p.then(res => { console.log(res)})


const classDecorator = (target) =>{
  console.log('target:',target.name)
}
const methodsDecorator = (target, name, descriptor)=> {
  console.log(target, name, descriptor)
}

@classDecorator
class Person {
  count = 1;
  #age = 12;
  constructor(name) {
    this.name = name
  }

  @methodsDecorator
  say () {
    console.log(`hello ${this.name}`);
  }

  getAge () {
    console.log('#age:',this.#age);
  }
}

const person = new Person('zhangsan')
person.say()
person.getAge()
console.log('count: ',person.count)


