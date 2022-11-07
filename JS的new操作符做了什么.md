# new操作符具体干了什么呢?其实很简单，就干了三件事情。
```
let obj = new Base();
```
1. 创建一个空对象obj
```
let obj = {}
```
2. 将obj上的隐式原型__proto__指向父类的显式原型prototype
```
let obj.__proto__ = Base.prototype
```
3. 将Base函数对象的this指针替换成obj，然后再调用Base的构造器
```
Base.call(obj)
```
一个崭新的实例诞生了！
```
function myNew(Fn,...args){
    const obj = Object.create(Fn.prototype)
    Fn.apply(obj,args)
    return obj
}
```
