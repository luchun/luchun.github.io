---
layout: post
title: 三款HTTP工具
---
三款HTTP工具
<!-- more -->
### [axios](https://github.com/mzabriskie/axios)

    axios.get('/user', {
        params:{
            ID: 12345
        }
    })
    .then(function(response){
        console.log(response)
    })
    .catch(function(error){
        console.log(error)
    });
    
    // 多个请求
    
    function getUserAccount(){
        return axios.get('/user/12345');
    }
    function getUserPermissions(){
        return axios.get('/user/12345/permissions')
    }
    axios.all([getUserAccount(), getUserPermissions()])
        .then(axios.spread(function(acct, perms){
            // Both requests are now complete
        }))
        

基于Promise

### [superagent](https://github.com/visionmedia/superagent)

不喜欢 Promise,而喜欢回调 ？

### [fetch](https://github.com/github/fetch)

使用即将到来的标准http ?
