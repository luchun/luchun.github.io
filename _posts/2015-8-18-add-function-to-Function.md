---
layout: post
title: 一道扩展Function以实现Functional 编程的语言基础题
---
##一道扩展Function以实现Functional 编程的语言基础题

原题地址在 [codewars](http://www.codewars.com/kata/527176c487961e5900000106/train/javascript)

今年函数式编程又火了起来，一本2013年在国外出版的《Functional Javascript》今年被翻译引进至国内，又火了一把。
下面是这道题的介绍
Build a function pipe to achieve this with JS. An example use could be:
创建一个pipe函数，使下面的代码可以执行

```js

var addOne = function(e) {
    return e + 1;
};

var square = function(e) {
    return e * e;
};

var result = [1,2,3,4,5].map(addOne.pipe(square)) //-> [4,9,16,25,36]

```
说实话我对函数式编程是有一些恐惧的，毕竟复杂的逻辑与嵌套，无法像面向对象那样做到清晰可辨。不过这道题还好，略加思考给出了答案。

```js

var addOne = function(e) {
    return e + 1;
};

var square = function(e) {
    return e * e;
};
Function.prototype.pipe = function(f){
    return function(e){
        var s1 = this(e);
        return f(s1)
    }.bind(this)
};
var result = [1,2,3,4,5].map(addOne.pipe(square)) //-> [4,9,16,25,36]

```
我记录下这道题的原因有2，一是做这道题时，对this引用又产生了怀疑，在原型中this指向实例，那么我如何执行实例呢，毕竟实例不是一个明显的对象。尝试了下this()，就可以执行实例。这让我对this有了不一样的认识，莫非this是指向，this()在这里就是addOne()。
第二点是我第一次写这么多return的嵌套，就像我之前的观点一样，两个return 嵌套在一起，真的让我有点迷糊的。在调用中执行了pipe，并且返回的对象将接收来自map遍历的参数，所以它一定是一个function，在这个function中需要返回结果给map遍历，所以必须是一个原始类型的值。
就是这样。