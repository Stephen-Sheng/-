function isEqual(obj1,obj2){
  if(!isObj(obj1) || !isObj(obj2)) return obj1 === obj2
 
  if(obj1 === obj2) return true
  const len1 = Reflect.ownKeys(obj1).length
  const len2 = Reflect.ownKeys(obj2).length
  if(len1 !== len2) return false
  
  for(let key in obj1){
    let res = isEqual(obj1[key],obj2[key])
    if(!res) return false
  }
  return true

  function isObj(obj){
    if(obj !== "object" || obj == null) return false
    return true
  }
}
