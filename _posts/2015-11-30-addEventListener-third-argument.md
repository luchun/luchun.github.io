---
layout: post
title: addEventListener third argument
---
## addEventListener第三个参数useCapture

  `addEventListener()` 方法有第三个参数，它是一个布尔型参数，通常设置为`false`.我通常不考虑这个参数，使用默认的`false`设置，那这个参数是什么呢？

这是一个可选的参数，叫做`useCapture`。详细点说，通过这个参数你可以决定使用事件冒泡或者是事件捕获。比如有一个父元素和一个子元素，都对同一个事件有回调，那么哪一个会先执行呢？又一个很好的StackOverflow回答做出了漂亮的解释：
选择冒泡，事件先被内部元素捕获再传递到外部元素。
选择捕获，事件先辈外部元素捕获再传递给内部元素。
在`addEventListener`中使用`capturing`，你需要这么写代码：

    el.addEventListener('click', doSomething, true);


注意将第三个参数设置为`true`而不是通常的`false`。

[Event order by PPK](http://www.quirksmode.org/js/events_order.html)

[Bubbling and capturing by Ilya Kantor](http://javascript.info/tutorial/bubbling-and-capturing)
