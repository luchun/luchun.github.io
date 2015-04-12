---
layout: post
title: particular self-enclosed module
---
## particular self-enclosed module

这种设计模式的中文名称我忘了叫什么，不过挺常见，对于不大的项目来说很实用，是以前我使用的最多的模式。拥有内部方法和参数，已经公共方法公共参数，既有对外的接口也有私有成员。并且简单改造就是一个单例。

典型的构成如下

```
var namespace = (function(){

    //define within the local scope
    var privateMethod1 = function(){}
    var privateMethod2 = function(){}
    var privateproperty1 = "foobar";
    
    return {
        //the object literal returned here can have as many
        //nested depths as you wish, however as ,emtioned,
        //this way of doing things works bes for smaller,
        //limited-scope applications in my personal opinion
        
        publicMethod1:privateMethod1,
        //nested namespace with public property2
        properties:{
            publicProperty1:privateProperty2
        
        },
        
        //another tested namespace
        utils:{
            publicMethod2:privateMethod2
        }
    }
})()
```
注释中称：这种模式只适合小的项目