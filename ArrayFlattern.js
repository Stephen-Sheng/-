function flattern(arr){
    if(!arr.some((value) => value instanceof Array)) return arr

    let res = Array.prototype.concat.apply([],arr)
    return flattern(res)
}
