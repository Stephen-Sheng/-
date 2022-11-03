# ES5 --- 组合继承

## 构造继承（对象冒充）

```
function ClassB(sColor, sName) {
    //this.newMethod = ClassA;
    //this.newMethod(color);
    //delete this.newMethod;
    ClassA.call(this, sColor);

    this.name = sName;
    this.sayName = function () {
        alert(this.name);
    };
}

function ClassA(sColor) {
    this.color = sColor;
    this.sayColor = function () {
        alert(this.color);
    };
}
```
缺点：无法继承原型上的属性和方法

## 原型链继承
```
function ClassA(sColor) {
    this.color = sColor;
}

ClassA.prototype.sayColor = function () {
    alert(this.color);
};

function ClassB(sColor, sName) {
    this.name = sName;
}

ClassB.prototype = new ClassA();

ClassB.prototype.sayName = function () {
    alert(this.name);
};
```
缺点：
- 要新增原型中属性或方法，必须要先new一个实例。
- 无法多继承
- 创建子类实例时，无法向父类构造函数传参（无法继承构造函数中的属性）

# ES6 --- extends

extends 是通过调用父类的方法创建初始对象，在此基础上，再根据子类的构造函数对该对象进行调整； ES5 的继承（组合继承），实质是先创造子类的实例对象 this ，再利用 call 或者 apply ，将父类的属性添加到 this。