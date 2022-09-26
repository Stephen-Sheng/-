const ids = [1, 8, 2, 7, 3, 4, 0, 5, 6]

sendData(ids, 3)

// n表示同时发送的条数
function sendData (ids, n) {
  // 补全你的代码
  let pool = []
  let result = []
  const length = ids.length
  let count = 0

  // 为每次任务注册then回调
  let run = (task) => {
    return task.then((res) => {
      result[res[0]] = res[1] // 将结果以id为下标放入result数组
      pool.splice(pool.indexOf(task), 1)
      count++

      if (ids.length) { // 判断待完成任务列表是否还有任务, 有则放入池子
        const next = upload(ids.shift())
        pool.push(next)
        run(next)
      }

      if (count === length) { // 任务全部完成, 输出结果数组
        console.log(result)
      }
    })
  }


  for (let i = 0; i < n; i++) {
    const task = upload(ids.shift())
    pool.push(task)
    run(task)
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
