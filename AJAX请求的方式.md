# 发送AJAX请求的方式

## 1. 原生XMLHttpRequest（可以与Promise相结合），demo如下
```javascript
  function MyPromiseAjax(url){

    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.open("GET",url,true)
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(xhr.responseText)
                }
            }
        }
        xhr.send(null)
    })
}
```
## 2. Fetch
### 阮一峰 https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html
### fetch()的功能与 XMLHttpRequest 基本相同，但有三个主要的差异：
#### fetch()使用 Promise，不使用回调函数，因此大大简化了写法，写起来更简洁。
#### fetch()采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
#### fetch()通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。
```javascript
fetch('https://jsonplaceholder.typicode.com/todos/1').then(response => {
    console.log(response);
    return response.json();
}).then(json => {
    console.log(json);
})
```
## 3. Axios
### Axios特点
1. 基于 promise 的异步 ajax 请求库，支持promise所有的API
2. 浏览器端/node 端都可以使用，浏览器中创建XMLHttpRequests
3. 支持请求／响应拦截器
4. 支持请求取消
5. 可以转换请求数据和响应数据，并对响应回来的内容自动转换成 JSON类型的数据
6. 批量发送多个请求
7. 安全性更高，客户端支持防御 XSRF，就是让你的每个请求都带一个从cookie中拿到的key, 根据浏览器同源策略，假冒的网站是拿不到你cookie中得key的，这样，后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略。
