---
layout: post
title: 使用Github fetch polyfill

---
看了一下 fetch 以及github 实现的polyfill
<!-- more -->
[http://github.github.io/fetch/](http://github.github.io/fetch/)

[https://github.com/github/fetch](https://github.com/github/fetch)

全局的 `fetch` 函数 是一种比XMLHttpRequest更简单的方式进行 requests 和处理 responses。

## 安装 

通过 Bower 安装 

    bower install fetch
    
旧款浏览器需要安装 Promise polyfill

    bower install es6-promise
    
也可以通过 `npm` 安装

    npm install whatwg-fetch --save
    
对于node.js 环境 可以使用 [node-fetch](https://github.com/bitinn/node-fetch)

在webpack中使用，查看 [Using WebPack with shims and polyfills](http://mts.io/2015/04/08/webpack-shims-polyfills/)

## 用法

fetch方法支持任何HTTP方法。

### HTML

    fetch('/users.html)
        .then(function(response){
            return response.text()
        }).then(function(body){
            document.body.innerHTML = body
        })

### JSON

    fetch('/users.json')
        .then(function(response){
            return response.json()
        }).then(function(json){
            console.log('parsed json', json)
        }).catch(function(ex){
            console.log('parseing failed', ex)
        })

### Response metadata

    fetch('/users.json').then(function(response){
        console.log(response.headers.get('Content-Type'))
        console.log(response.headers.get('Date'))
        console.log(response.status)
        console.log(response.statusText)
    })

### Post form

    var form = document.querySelector('form')
    
    fetch('/users',{
        method: 'POST',
        body: new FormData(form)
    })

### Post JSON

    fetch('/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            name: 'Hubot',
            login: 'hubot'
        })
    })
    
### File upload

    var input = document.querySelector('input[type="file"]')
    
    var data = new FormData()
    data.append('file', input.files[0])
    data.append('user', 'hubot')
    
    fetch('/avatars', {
        method: 'POST',
        body: data
    })
    
## 注意事项

`fetch` 和 `jQuery.ajax()`主要有两点不同：

*   `fetch()` 返回的Promise 不会reject HTTP错误状态即使response 是HTTP 404 或 500。替代性的，他会正常resolve。他只会reject 网络错误，或者有什么事情组织了request完成。
*   默认，`fetch` 不会发送任何cookies到服务器。可能会导致依赖user session的站点发生未认证的请求。

### Handling HTTP error statuses
  
    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }

    function parseJSON(response) {
      return response.json()
    }

    fetch('/users')
      .then(checkStatus)
      .then(parseJSON)
      .then(function(data) {
        console.log('request succeeded with JSON response', data)
      }).catch(function(error) {
        console.log('request failed', error)
      })

### Sending cookies

    fetch('/users', {
      credentials: 'same-origin'
    })


## Request
    
    Synopsis: new Request(url, options)

#### URL (String or Request)

#### Options

*  `method` (String) - HTTP request method. Default: "GET"
*  `body` (String, Blob, FormData) - HTTP request body
*  `headers` (Object, Headers) - Default: {}
*  `credentials` (String) - Authentication credentials mode. Default: "omit"
    1.   "omit" - don't include authentication credentials (e.g. cookies) in the request
    2.   "same-origin" - include credentials in requests to the same site
    3.   "include" - include credentials in requests to all sites

  #### Body types
  
  JSON.stringify(data)  可以用来序列化JSON
  
## Response
    
### Properties

*  status (number) - HTTP response code in the 100–599 range
*  statusText (String) - Status text as reported by the server, e.g. "Unauthorized"
*  ok (boolean) - True if status is HTTP 2xx
*  headers (Headers)
*  url (String)
  
### Body methods

*  text() - yields the response text as String
*  json() - yields the result of JSON.parse(responseText)
*  blob() - yields a Blob
*  arrayBuffer() - yields an ArrayBuffer
*  formData() - yields FormData that can be forwarded to another request
 