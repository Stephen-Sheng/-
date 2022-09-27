function mySetInterval(fn,delay){
  let a = {
    clear:function(){
      clearTimeout(a.timer)
    }
  }
  (function run(){
    fn()
    // 递归调用run
    a.timer = setTimeout(run,delay)
  })()
  return a
}
