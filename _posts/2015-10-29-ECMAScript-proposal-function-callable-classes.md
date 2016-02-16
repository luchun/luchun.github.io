---
layout: post
title: ECMAScript proposal function callable classes
---
## ECMAScript 建议：函数可调用的类

原文 [ECMAScript proposal: function-callable classes](http://www.2ality.com/2015/10/call-constructor-esprop.html)

本文介绍了建议性ECMAScript功能：[调用构造函数](https://github.com/tc39/ecma262/blob/master/workingdocs/callconstructor.md)

### 1. 类在ES6中不能作为函数调用

在ECMAScript6中，类不能像普通函数一样调用：

```js
    class Point {
        constructor(x, y){
            this.x = x;
            this.y = y;
        }
    }
    let p1 = new Point(1, 2) //OK
    let p2 = Point(3, 4) //TypeError

```

ES6,并没有明确反对类被像函数一样调用，这个错误只有在处理函数通过类调用时抛出。

### 2. ES6中的函数可调用的构造函数

如果你想实现一个构造函数Point 可以像函数一样调用同时可以像构造函数一样调用，你只能使用ES6中的构造函数。

```js
  
  function Point(x, y){
    if(!new.target) {
        //Point was function-called
        return new Point(x, y);
    }
    this.x = x;
    this.y = y;
  }
  let p1 = new Point(1, 2); //OK
  let p2 = Point(3, 4); //OK
  
```

### 函数可调用的 类 通过 建议的 call constructor

建议是允许类处理函数调用通过预处理方法 call constructor()

```js
  
  function Point(x, y){
    constructor(x. y){
        this.x = x;
        this.y = y;
    }
    call constructor(x, y){
        return new Point(x, y);
    
    }
  }
  
  let p1 = new Point(1, 2); //OK
  let p2 = Point(3, 4); //OK
  
```
注意事项：
* 一个call constructor 不能被子类继承，你必须在每个想被可以函数式调用的类中放置它
* super()调用在一个call constructor中会产生编译错误（）就像它在其他普通方法中.这样是为了保持选项打开读写等保证super()在call constructor中的功能

### 4. 可能添加到建议中的功能
#### 4.1 新的meta属性
在这个建议的未来某个版本中，两个peta属性可能会被添加进来：
* class.current 指向当前的类(一个函数)
* class.extends 指向当前类的父类.

class.current 将会帮助从call constructor 中指向 constructor

```js
  
 class Foo(){
    constructor(...){
        ...
    }
    call constructor(...args){
        return new class.current(...args)
    }
 }
  
```

4.2 通过修饰符使类 函数可调用化

另一种可能是 一个类型修饰符 来使 类变得函数可调用，比如

```js
  
 @callConstructor  
 class Foo(){
    constructor(...){
        ...
    }
 }
  
```


































