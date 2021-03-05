---
layout: post
title: 微信浏览器中的几个坑

---

本周在开发中遇到了几个问题，都是和微信浏览器相关的。
<!-- more -->
我使用的是`autoprefixer`这个工具进行CSS兼容的，配置中android为4.4，我的手机为android5.0。在手机上的Chrome动画很好，而微信浏览器却有问题。上网查看后发现微信X5内核大概是android4.2。`transition:-webkit-transform；`最低支持到android4.3。所以微信浏览器中无法动画，将`autoprefixer`配置修改为`android:4.2`之后编译出来的代码就是`-webkit-transition:-webkit-transform;`在微信浏览器中终于好了。

另一个问题是`transitionEnd`事件，好像也是andorid4.4之后可以不用前缀了，在微信浏览器中无法触发，我将事件改为`webkitTransitionEnd`后，虽然微信浏览器可以绑定该事件，却一直没有触发到，上网查了一下，微信浏览器只支持`transition: all`，也就是只有动画属性为`all`时才会触发，我的代码是`transition:opacity`所以无法触发，多亏已经有同行踩过这个坑并且分享了经验，不然又要浪费我的很多事件。

还有一个问题，这次代码我没有引入`jQuery`，因为我的程序只在移动端运行，移动端浏览器对HTML5支持度很高。HTML5的`Element`上有个属性对象`classList`，可以操作一个`dom`上的`class`，它有`add`(添加),`remove`(移除)，`contain`(判断是否包含),`toggle`(切换)等方法，使用`classList`非常方便，完全可以不用`jQuery`操作DOM的class了。其中`add`方法是支持多个参数的，即`dom.classList.add(class1,class2,class3...)`；而我意外发现微信浏览器竟然只会将将第一个参数添加到dom上，完全不管有没有多个参数。导致我排查了半天问题。

当然微信浏览器内核使用的是android4.2，有很多问题，比如对svg的支持很有限等等，就不记录了。


    

 