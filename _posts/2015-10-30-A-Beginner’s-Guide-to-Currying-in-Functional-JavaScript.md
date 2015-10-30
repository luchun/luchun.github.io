---
layout: post
title: A Beginner’s Guide to Currying in Functional JavaScript
---
## 新手指南： 函数式编程之柯里化

原文 [A Beginner’s Guide to Currying in Functional JavaScript](http://www.sitepoint.com/currying-in-functional-javascript)



柯里化，或者叫部分应用，是一项熟悉传统javascript的人感到陌生的函数式技术.但使用正确的话，它能使你的函数式javascript更具备可读性.

### 更具可读性更具弹性

函数式Javascript的一个优点是更简短,更紧凑的代码，可以用更少的行来完成任务，以及更少的重复。有时这会降低可读性，直到你熟悉了函数式的工作方式之前，这种写作方式都会很难读很难理解。

如果你之前遇到过这个词，但是从来不知道他是什么意思，你可能会觉得它是异国的，刺激的技术。其实柯里化是一个简单的概念，他处理函数参数，为开发者解决一些熟悉的问题提供灵活的选择。

简而言之，柯里化是一种方式构建函数允许参数部分应用化.这意味着你可以传递函数希望的所有参数并获取结果，或者是传递部分参数然后获得一个需要剩余部分的函数，它真的很简单。

柯里化是Haskell或者Scala语言的元素，这类语言围绕函数化构建.javascript具有函数化能力，但柯里化默认并没有构建.我们可以通过一些函数化技巧，使柯里化在js中工作。

为了给你一个直观感受,我们创建第一个柯里化函数，使用熟悉的语法

```js
   var greet = function(greeting, name) {
    console.log(greeting + ', ' + name);
   };
   greet('Hello', 'Heidi');

```

这个函数需要同时传递名字和问候语作为参数才能正确工作，但是我们可以使用嵌套的柯里化来重写这个函数，这样基础函数只需要一个问候语，然后他返回另一个需要名字参数的函数.

### 我们第一个柯里化

```js
   var greetCurried = function(greeting) {
    return function(name) {
        console.log(greeting + ', ' + name);
    };
   };

```

这个微小的调整，我们写的函数可以让我们创建一个新的功能，对任何类型的问候，新函数可以传递任何我们需要的人名.


```js
   var greetHello = greetCurried('Hello');
   greetHello('Heidi'); //'Hello, Heidi'
   greetHello('Eddie'); // 'Hello, Eddie'

```

我们也可以直接调用原始的函数，通过两个括号，并依次传递参数

```js
  greetCurried('Hi there')('Howard'); // 'Hi there, Howard'


```

### 柯里化所有的事情

炫酷的是，我们学会了如何修改哦我们传统代码来处理参数，我们可以处理很多参数像我们想的那样：

```js
    var greetDeeplyCurried = function(greeting) {
        return function(separator){
            return function(emphasis){
                return function(name) {
                    console.log(greeting + separator + name + emphasis)
                }
            }
        }
    
    }


```
我们处理四个参数与处理两个参数有一样的弹性，不管嵌套的多深，我们都可以创建自定义函数。

```js
    var greetAwkwardly = greetDeeplyCurried('Hello')('...')('?')
    greetAwkwardly('Heidi'); //'Hello...Heidi?'
    greetAwkwardly('Eddie'); //'Hello...Eddie?'

```

### 柯里化传统函数

你已经了解了柯里化的为例，尤其是你需要创建十分细节化的自定义函数时，唯一的问题是语法，在创建柯里化函数时，你需要嵌套很多的return function，在调用时需要很多的括号，然后每个括号里包含着函数，这看起来很麻烦。

为解决这个问题，一个方式是创建一个快捷的柯里化函数，接收一个需要嵌套return的现存函数的名字,柯里化函数会返回一个柯里化后的函数。

```js
    var curryIt = function(uncurried){
        var parameters = Array.prototype.slice.call(arguments, 1);
        return function(){
            return uncurried.apply(this, parameters.concat(
                Array.prototype.slice.call(arguments, 0)
            ))
        
        }
    }

```
使用时，我们传递一个需要任意多参数的函数，我们得到的将是一个等待其他参数的函数。
```js
  var greeter = function(greeting, separator, emphasis, name) {
  console.log(greeting + separator + name + emphasis);
};
var greetHello = curryIt(greeter, "Hello", ", ", ".");
greetHello("Heidi"); //"Hello, Heidi."
greetHello("Eddie"); //"Hello, Eddie."

```
### 深入理解柯里化

我们的研究无法处理所有的边缘情况，如丢失可选的参数，但是它做了合理的工作，只要我们严格传递参数。

一些函数化函数组件如[Randa](http://ramdajs.com/0.18.0/index.html)具有更大的柯里化函数处理。
