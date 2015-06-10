---
layout: post
title: 理解Function.prototype.bind
---
## 2015/2/27 理解Function.prototype.bind

最近在看一本新书《Programming javascript Applications》，讲到调用其它对象的方法，以前我们使用call和apply,

```js
    someMethod.call(context,argument1,argument2);
    someMethod.apply(context,[argumentsArray]);
```
两者的区别就是前者将参数依次传入，后者将参数作为数组传入
平时用的比较多的就是用toString来判断类型

```js
    console.log(Object.prototype.toString.call([]))
    // [object Array]
```
由于js自带的typeof 不能区分Object和Array等，所以就有人想出了这个办法，网上有详细的说明，不再多说。
今年还用到过Math.max来取数组中最大值

```js
    Math.max.apply(null,[2,5,3])
    //5
```
以此来弥补Array方法的不足。

call和apply是存在很久的方法了，今天学习的是另一个方法：bind

```js
    var lightbulb = {
        toggle:function toggle(){
            this.isOn = !this.isOn;
            return this.isOn;
        },
        isOn:true
    },
    lightswitch = document.getElementById("lightswitch");
    lightswitch.addEventListener('click',lightbulb.toggle,false);
```
测试时会发现，第一次点击返回的是true,这是因为addEventListener的回掉中的this指向的是dom来源，在这里也就是这个id为lightswitch的按钮。它上边没有isOn属性，第一次!isOn得到的是true。如果是更复杂的回掉，将引发更大的错误。那么我们怎么把this指向lightbulb对象呢。使用bind

```js
    var lightbulb = {
        toggle:function toggle(){
            this.isOn = !this.isOn;
            return this.isOn;
        },
        isOn:true
    },
    lightswitch = document.getElementById("lightswitch");
    lightswitch.addEventListener('click',lightbulb.toggle.bind(lightbulb),false);
    
```

可以看出来，bind接受的是一个作为上下文this的参数。当然可以在后边添加更多的参数
在网上还有一个更明显的例子，这里借用一下

```js
    var foo = {
        x: 3
        }
 
    var bar = function(){
        console.log(this.x);
        }
 
    bar(); 
    // undefined
 
    var boundFunc = bar.bind(foo);
 
    boundFunc(); 
    // 3
```