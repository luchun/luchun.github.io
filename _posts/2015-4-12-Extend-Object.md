---
layout: post
title: Extend function
---
## 一个简单的extend方法

从《 EssentialJavaScript Design Patterns 》中学习到一个，就是如果某个属性是对象，则继续深复制。

```
function extend(destination,source){
    var toString = Object.prototype.toString,
        objTest = toString.call({});
    for( var property pertyin source) {
        if(source[property] && objTest == toString.call(source[pro])){
            destination[property] = destination[property] || {}
            extend(destination[property],source[property]);
        }else{
            destination[property] = source[property]
        }
    }
    return destination;
};

```

对于理解递归或者是对象扩展都挺好，遗憾的是不能像jQuery 那样扩展多个，以及合并两个到一个空对象中去。

