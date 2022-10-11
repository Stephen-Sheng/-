Function.prototype.Mybind = function(){

    const args = Array.from(arguments)
    const newThis = args.shift()
    const self = this

    return function(){
        return self.call(newThis,...args)
    }
}


Function.prototype.call = () => {
    let args = Array.from(arguments)
    const newThis = args.shift()
    newThis.fn = this
    const res = newThis.fn(...args)
    Reflect.deleteProperty(newThis,fn)
    return res
}


Function.prototype.apply = () => {
    let args = Array.from(arguments)
    const newThis = args.shift()
    newThis.fn = this
    const res = newThis.fn(args)
    Reflect.deleteProperty(newThis,fn)
    return res
}
  
