/*
 * @Author: Yutong Sheng
 * @Date: 2022-10-28 15:21:36
 * @Last Modified by: Yutong Sheng
 * @Last Modified time: 2022-11-02 22:07:12
 */
function deepClone(obj) {
  if (typeof obj !== "object" || obj == null) return obj;

  let result;
  if (obj instanceof Date) return new Date(obj);
  else if (obj instanceof RegExp) return new RegExp(obj);
  else {
    result = new obj.constructor();
  }

  Reflect.ownKeys(obj).forEach((key) => {
    result[key] = deepClone(obj[key]);
  });
  return result;
}

function isEqual(obj1, obj2) {
  if (!isObj(obj1) || !isObj(obj2)) return obj1 === obj2;

  if (obj1 === obj2) return true;

  const len1 = Reflect.ownKeys(obj1).length;
  const len2 = Reflect.ownKeys(obj2).length;
  if (len1 !== len2) return false;
  for (let key in obj1) {
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) return false;
  }
  return true;

  function isObj(obj) {
    if (typeof obj !== "object" || obj == null) return false;
    return true;
  }
}

function instanceOf(left, right) {
  const rightProto = right.prototype;

  while (Reflect.getPrototypeOf(left)) {
    if (Reflect.getPrototypeOf(left) === rightProto) return true;
    left = Reflect.getPrototypeOf(left);
  }
}

// Function.prototype.bind = function () {
//   let args = Array.from(arguments);
//   let newThis = args.shift();
//   newThis.func = this;
//   return function () {
//     newThis.func(args);
//   };
// };
function loadImg(path) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("err"));
    img.src = path;
  });
}

class MyPromise {
  state = "pending";
  value = undefined;
  reason = undefined;
  resolveCallbacks = [];
  rejectCallbacks = [];

  constructor(fn) {
    const resolveHandler = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.resolveCallbacks.forEach((callback) => callback(this.value));
      }
    };
    const rejectHandler = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.rejectCallbacks.forEach((callback) => callback(this.reason));
      }
    };
    try {
      fn(resolveHandler, rejectHandler);
    } catch (error) {
      rejectHandler(error);
    }
  }

  then(fn1, fn2) {
    fn1 = typeof fn1 === "function" ? fn1 : (v) => v;
    fn2 = typeof fn2 === "function" ? fn2 : (r) => r;

    return new MyPromise((resolve, reject) => {
      if (this.state === "pending") {
        this.resolveCallbacks.push(() => {
          try {
            const newValue = fn1(this.value);
            resolve(newValue);
          } catch (error) {
            reject(error);
          }
        });
        this.rejectCallbacks.push(() => {
          try {
            const newReason = fn2(this.reason);
            reject(newReason);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === "fulfilled") {
        try {
          const newValue = fn1(this.value);
          resolve(newValue);
        } catch (error) {
          reject(error);
        }
      } else {
        try {
          const newReason = fn2(this.reason);
          reject(newReason);
        } catch (error) {
          reject(error);
        }
      }
    });
  }
  catch(fn) {
    return this.then(null, fn);
  }
}

// Function.prototype.apply = () => {
//   let args = Array.from(arguments)
//   const newThis = args.shift()
//   newThis.fn = this
//   const res = newThis.fn(...args)
//   Reflect.deleteProperty(newThis,fn)
//   return res
// }
function flat(arr){
  
  const isDeep = arr.some(item => item instanceof Array)
  if(!isDeep){
      return arr
  }

  let res = Array.prototype.concat.apply([],arr)
  return flat(res)

}

function processData(tasks,max){
  let len = tasks.length
  let result = []
  let count = 0
  let pool = []

  for(let i = 1;i<=max;i++){
    const task = tasks.shift()
    pool.push(task)
    run(task)
  }

  function run(task){
    return task.then((res) => {
      result.push(res)
      pool.splice(pool.indexOf(task),1)
      count++
      
      if(tasks.length){
        const next = tasks.shift()
        run(next)
      }

      if(count >= len) console.log(result);
    })
  }
}

const CreateSingleton = (function(){
  let instance
  return function(name){
    if(instance) return instance
    this.name = name
    return instance = this
  }
})();
const obj = {x:1,y:2}
for(let key of Reflect.ownKeys(obj)){
  console.log(key);
}
