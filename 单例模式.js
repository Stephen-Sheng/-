// IIFE闭包
const CreatingSingleton = (function(){
  let instance
  return function(name){
    if(instance){
      return instance
    }
    this.name = name
    return instance = this
  }
})()

CreateSingleton.prototype.getName = function() {
    console.log(this.name);
}

let Winner = new CreateSingleton('Winner');
let Looser = new CreateSingleton('Looser');

console.log(Winner === Looser); // true
console.log(Winner.getName());  // 'Winner'
console.log(Looser.getName());  // 'Winner'
