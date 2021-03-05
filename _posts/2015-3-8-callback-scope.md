---
layout: post
title: 关于回调函数的进一步理解
---
在以前的学习中，我知道了回调是一种更合理的异步执行方式，是作为中级程序员必须掌握的技能。
今天我在读《javascript patterns》时获取到了更进一步的知识
<!-- more -->
当传递给函数的回调不是一个函数，而是一个对象的方法时，例如有以下的对象

```
var myapp = {};
myapp.color = "green";
myapp.paint = function(node){
    node.style.color = this.color
}
```

同样，有这样一个接收回调函数的函数
```
var findNodes = function(callback){
    //...
    
    if(typeof callback === "function"){
        callback(found);
    }
}
```
当我们如下使用这个函数的时候，问题就发生了
```
findNodes(myapp.paint)
```

这是因为 myapp.paint中的this.color是未定义的。确切的说在函数findNodes中this指向的是全局对象，当findNodes是其他对象的方法时，this指向的该对象。
函数的this是执行环境，而不是定义环境。

###如何解决这个问题

将回调函数的定义对象一起传递进来。
修改findNodes的定义如下

```
 var findNodes = function(callback,callback_obj){
    if(typeof callback ==="function"){
        callback.call(callback_obj,found)
    }
 }
 
 ```
 这样我们利用call或者apply方法可以修改this的特性，巧妙的改变一下this
 
 ```
 findNodes(myapp.paint,paint)
 ```
 