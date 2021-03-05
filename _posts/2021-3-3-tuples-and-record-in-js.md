---
layout: post
title: JavaScript中的Tuples和Records
---
今天看到Babel7.13发布，主要更新是开始支持元组和记录，就了解了一下这两个原始类型
<!-- more -->
不可变性是函数式编程中的常见术语，也是函数式编程的一个核心原则。不可变性对象意味一个变量一旦声明，它的值就永远不能改变。如
```javascript
const arr = [0,1,2,3]
arr.shift()
// arr = [1,2,3]
const list = Immutable.List([0,1,2,3])
list.shift()
// list = [0,1,2,3]
```
前者会改变数组，第二个方案会返回一个新的List，比原List少了第一位，原List不会改变。
在JavaScript中并没有真正的不可变性对象，所以我们需要通过变通的方式实现不可变性，或者是相信其他人不会改变某个值。

现在有了一个新的ECMAScript提案--目前在第二阶段，将引入两个新的不可变性数据类型：元组和记录。

## 元组(Tuples)
元组和记录有相同的语法，通过在对象或数组前加#前缀来定义，如下：
```javascript
const arr = [] // 正常的数组
const tuple = #[] // 这是一个元组
```
使用元组时，有几项注意事项
* 数组中不能有空洞，如 [1,,2]不可以
* 只能是原始类型或其他元组/记录
* 支持类似Array的实例方法，但有一点改变

例如，会使数组发生突变的操作被替换了为返回新的数组。
如，没有`push`方法，替代的可以使用`pushed`,它会返回一个新的元组、包含了被推入的值；
`with`返回改变给定键位的值后的元组。
```
const tuple = #['🍄', '🍅', '🥕'];

// Both returns a new tuple
tuple.pushed('🥒');  // returns #['🍄', '🍅', '🥕', '🥒'];
tuple.with(0, '🌳'); // returns #['🌳', '🍅', '🥕']
```

可以用`Tuple.from`从现有的数组创建元组
```
Tuple.from(['🍄', '🍅', '🥕']);

// Likewise, you can turn a tuple into an ordinary array:
Array.from(tuple);
```
但是当用非原始类型来替换现有元组时，会报错
```
const tuples = #['🍄', '🍅', '🥕'];

// TypeError: Callback to Tuple.prototype.map may only return primitives, Records or Tuples
tuples.map(tuple => new Button(tuple));
```

## 记录
类似元组，记录可以通过#来创建
// This is a regular object
const obj = { ... };

// This is a record
const record = #{
tuple: #['🍄', '🍅', '🥕'] // Records can also contain tuples
};
使用记录时，有一些规则
* 不能使用__proto__标识符
* 不允许有方法，和元组一样，只能包含原始类型

也可以通过`Record`或 `Record.fromEntries` 来创建新的记录
```
const record = Record({
    mushroom: '🍄',
    tomato: '🍅',
    carrot: '🥕'
});

// Or
const record = Record.fromEntries(#['🍄', '🍅', '🥕']);
```
因为他们是新的数据类型，所以使用`typeof`会返回"record"
```
typeof #{ ... } // return "record"
typeof #[ ... ] // returns "tuple"
```

## 结尾
Babel7.13.0开始支持元组和记录