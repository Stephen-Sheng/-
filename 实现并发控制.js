const ids = [1, 8, 2, 7, 3, 4, 0, 5, 6]

sendData(ids, 3)

// n表示同时发送的条数
function sendData (ids, n) {
  let pool = []
  let result = []
  let len = ids.length
  let count = 0

  // 先把任务池填满
  for(let i = 0;i<n;i++){
    const task = upload(ids.shift())
    pool.push(task)
    run(task)
  }
  //为每个任务设置完成后的回调
  function run(task){
    return task.then((res)=>{
        result[res[0]] = res[1]
        count++
        pool.splice(pool.indexOf(task),1)
      // 任务队列中是否还有没放入池中的任务
        if(ids.length){
            const next = upload(ids.shift())
            pool.push(next)
            run(next)
        }
      // 任务完成后计数
        if(count === len) console.log(result);
    })
  }
}

// upload 方法每次只能上传一个id
// isSuccess表示每次任务的执行结果
const isSuccess = "some result..."
function upload (id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("任务", id, "完成")
      return resolve([id, isSuccess])
    }, id * 1000)
  })
}
