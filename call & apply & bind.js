/*
 * @Author: Yutong Sheng 
 * @Date: 2022-11-02 16:35:31 
 * @Last Modified by: Yutong Sheng
 * @Last Modified time: 2022-11-02 16:36:12
 */
Function.prototype.Mybind = function(){

    const args = Array.from(arguments)
    const newThis = args.shift()
    newThis.fn = this

    return function(){
        return newThis.fn(...args)
    }
}

Function.prototype.myCall = function(){
    let args = Array.from(arguments)
    const newThis = args.shift()
    newThis.fn = this
    const res = newThis.fn(...args)
    Reflect.deleteProperty(newThis,'fn')
    return res
}

Function.prototype.myApply = function(){
    let args = Array.from(arguments)
    const newThis = args.shift()
    newThis.fn = this
    const res = newThis.fn(args)
    Reflect.deleteProperty(newThis,fn)
    return res
}

const obj1 = {x:1,y:2}
const obj2 = {x:3,y:4}
function print(){
    console.log(this.x);
}

