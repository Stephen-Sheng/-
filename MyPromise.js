



//1. 初始化，异步调用
//2. then,catch链式调用
//3. API:race,all,resolve,reject
class MyPromise{

    state = 'pending'
    value = undefined
    reason = undefined
    resolveCallbacks = []
    rejectCallbacks = []

    constructor(fn){
        const resolveHandler = (value) => {
            if(this.state === 'pending'){
                this.state = 'fulfilled'
                this.value = value
                this.resolveCallbacks.forEach((fn) => fn(this.value))
            }
        }
        const rejectHandler = (reason) => {
            if(this.state === 'pending'){
                this.state = 'rejected'
                this.reason = reason
                this.rejectCallbacks.forEach((fn) => fn(this.reason))
            }
        }
        try {
            fn(resolveHandler,rejectHandler)
        } catch (error) {
            rejectHandler(error)
        }
    }

    then(fn1,fn2){

        fn1 = typeof fn1 === 'function' ? fn1 : (v) => v
        fn2 = typeof fn2 === 'function' ? fn2 : (e) => e

        if(this.state === 'pending'){
            return new MyPromise((resolve,reject) => {
                this.resolveCallbacks.push(() => {
                    try {
                        const newValue = fn1(this.value)
                        resolve(newValue)
                    } catch (error) {
                        reject(error)
                    }
                })
                this.rejectCallbacks.push(() => {
                    try {
                        const newReason = fn2(this.reason)
                        reject(newReason)
                    } catch (error) {
                        reject(error)
                    }
                })
            })

        }else if(this.state === 'fulfilled'){
            return new MyPromise((resolve,reject) => {
                try {
                    const newValue = fn1(this.value)
                    resolve(newValue)
                } catch (error) {
                    reject(error)
                }
            })
        }else{
            return new MyPromise((resolve,reject) => {
                try {
                    const newReason = fn2(this.reason)
                    reject(newReason)
                } catch (error) {
                    reject(error)
                }
            })
        }

    }
    catch(fn){
        return this.then(null,fn)
    }
}

MyPromise.resolve = function(value){
    return new MyPromise((resolve,reject) => resolve(value))
}
MyPromise.reject = function(reason){
    return new MyPromise((resolve,reject) => reject(reason))
}
MyPromise.all = function(promiseArr){
    return new MyPromise((resolve,reject) => {
        const result = []
        const length = promiseArr.length
        let count = 0
        promiseArr.forEach((item) => {
            item.then((data) => {
                result.push(data)
                count++
                if(count === length){
                    resolve(result)
                }
            }).catch((error) => {
                reject(error)
            })
        })
    })
}
MyPromise.race = function(promiseArr){
    let resolved = false
    return new MyPromise((resolve,reject) => {
        promiseArr.forEach((item) => {
            item.then((data) => {
                if(!resolved){
                    resolve(data)
                    resolved = true
                }
            }).catch((error)=>{
                reject(error)
            })
        })
    })
}

const p1 = new MyPromise((resolve,reject)=>{
    setTimeout(()=>resolve(100))
}).then((data)=> console.log(data+1))
