---
layout: post
title: 温故知新： Array
---
又重新翻看了一下MDN上数组的介绍,《JavaScript权威指南》第七章，《ES6标准入门》第七章。
总结一下JavaScript中数组的一些细节，主要是在工作长时间不使用而遗漏的细节。
<!-- more -->
## 1. `delete` 数组成员

<img src="{{ site.baseurl }}/images/arrayreview/WX20190705-104015@2x.png" alt="delete"/>

数组成员是可以被删除的，但不会缩短数组的长度。

## 2. `Array.from(arrayLike[, mapFn[, thisArg]])`

`Array.from` 有参数二 `mapFn` ，存在时则新数组中的每个元素都会执行该回调。

如想要生成`['每月1日', ..., '每月31日']`这个数组，可以使用 `Array.from({length: 30}, (v,i) => `每月${i+1}日`)`

这里传了一个`{length: 30}`的对象。`Array.from`支持类似数组的对象。所谓类似数组的对象，本质特征就是必须有`length`属性。
因此，任何有`length`属性的对象，都可以通过`Array.from`生成数组。

`Array.from` 参数三 是 `thisArg`, 在`mapFn`执行时的`this`对象。效果和bind一样。

<img src="{{ site.baseurl }}/images/arrayreview/WX20190705-105511@2x.png" alt="delete"/>

`Array.from` 将类数组转为数组， 也可以用扩展运算符 `[...args]` 将类数组转为数组。 
**ES5中是可以用 `Array.prototype.slice`将类数组转为数组的** 

## `Array.isArray` 

 用于确定传递的值是否是一个 `Array`。 语法是 `Array.isArray(obj)`
 
不使用 `typeof` 是因为 `typeof [] === 'object'` 

还有一种老方法是 `Object.prototype.toString.call(obj) === '[object Array]';` 也可以判定`obj`是否为数组

`Array.isArray(Array.prototype); ` 记住：数组的原型也是一个数组

instanceof 不能检测 iframes 

````js
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]
Array.isArray(arr);  // true
arr instanceof Array; // false
````


## `Array.of`

Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

语法 `Array.of(element0[, element1[, ...[, elementN]]])`

Array.of() 和 Array 构造函数之间的区别在于处理整数参数

````js
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
````

## `Array.prototype.concat()`

用于合并多个数组 语法 `var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])`

它不会改变现有数组，而是返回一个新数组。

要注意它是浅拷贝。对新数组中对象引用的修改，会影响到原数组。

## `Array.prototype.copyWithin()`

浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

语法 `arr.copyWithin(target[, start[, end]])`

三个参数都是索引位，复制内容到该位置/开始复制元素的起始位置/开始复制元素的结束位置

```js
let numbers = [1, 2, 3, 4, 5];

numbers.copyWithin(-2);
// [1, 2, 3, 1, 2]  将自身复制，复制到倒数第二位开始。

numbers.copyWithin(0, 3);
// [4, 5, 3, 4, 5] 从第三位开始复制，复制到0开始。即 '4,5'复制后，粘贴到0开始。由于'4,5'是两位，所以'1,2'被替换了。
```

## `Array.prototype.entries()`

返回一个新的Array Iterator 迭代器对象，该对象包含数组中每个索引的键/值对。
它的原型上有个`next()`方法，可用于与遍历迭代器取得的原数组的 `[key, value]`

````js
var array1 = ['a', 'b', 'c'];

var iterator1 = array1.entries();

console.log(iterator1.next().value);
// expected output: Array [0, "a"]

console.log(iterator1.next().value);
// expected output: Array [1, "b"]

````

## `Array.prototype.every()`

测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

语法 `arr.every(callback[, thisArg])`

**若收到一个空数组，此方法在一切情况下都会返回 true。**

## `Array.prototype.fill()`

用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

语法 `arr.fill(value[, start[, end]])`

## `Array.prototype.filter()`

创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 

语法 `var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])`

## `Array.prototype.find()`

返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

语法 `arr.find(callback(element[, index[, array]])[, thisArg])`

## `Array.prototype.findIndex()`

返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

语法 `arr.findIndex(callback(element[, index[, array]])[, thisArg])`

## `Array.prototype.flat()`

会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

语法 `var newArray = arr.flat([depth])`

 depth 指定要提取嵌套数组的结构深度，默认值为 1。
 
 该方法会移除数组中的空项

````js
var arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity 作为深度，展开任意深度的嵌套数组
arr3.flat(Infinity); 
// [1, 2, 3, 4, 5, 6]
````

## `Array.prototype.flatMap()`

首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。

语法 

```js
var new_array = arr.flatMap(function callback(currentValue[, index[, array]]) {
    // 返回新数组的元素
}[, thisArg])
```

返回 一个新的数组，其中每个元素都是回调函数的结果，并且结构深度 depth 值为1。
   
````js
var arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]); 
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

// 只会将 flatMap 中的函数返回的数组 “压平” 一层
arr1.flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]
````

## `Array.prototype.forEach()`

对数组的每个元素执行一次提供的函数。 无返回值。

语法 `arr.forEach(callback(element[, index[, array]])[, thisArg])`

## `Array.prototype.includes()`

用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

**对象数组不能使用includes方法来检测。**

语法 `arr.includes(valueToFind[, fromIndex])`

## `Array.prototype.indexOf()`

返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。

语法 `arr.indexOf(valueToFind[, fromIndex])`

## `Array.prototype.join()`

将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

语法 `arr.join([separator])`


## `Array.prototype.keys()`

返回一个包含数组中每个索引键的Array Iterator(迭代器)对象。

```js
var array1 = ['a', 'b', 'c'];
var iterator = array1.keys(); 
iterator.next() // {value: 0, done: false}  
[...iterator] // [0, 1, 2]
```

## `Array.prototype.lastIndexOf()`

返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。

语法 `arr.lastIndexOf(searchElement[, fromIndex = arr.length - 1])`

## `Array.prototype.map()`

创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

语法

````js
var new_array = arr.map(function callback(currentValue[, index[, array]]) {
 // Return element for new_array 
}[, thisArg])
````

## `Array.prototype.pop()`

从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

## `Array.prototype.push()`

将一个或**多个**元素添加到数组的末尾，并返回该数组的新长度。

语法: `arr.push(element1, ..., elementN)`

**返回值是数组新的length属性**

## `Array.prototype.reduce()`

对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

语法 `arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])`

callback接收四个参数:
* accumulator: 累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue（见于下方）
* currentValue: 数组中正在处理的元素
* currentIndex: (可选)数组中正在处理的当前元素的索引。 如果提供了initialValue，则起始索引号为0，否则为1。
* array: (可选) 调用reduce()的数组

**initialValue** : 作为第一次调用 callback函数时的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错。

所以要注意以下情况

````js
[1,2,3,4].reduce((a,b) => a + 2 * b)
// 19 由于没有提供初始 initialValue，直接将1作为第一次执行的a。 1 + 2*2 + 2*3 + 2*4
[1,2,3,4].reduce((a,b) => a + 2 * b, 0)
// 20 提供了初始值0  0 + 2*1 + 2*2 + 2*3 + 2*4
````

提供初始值通常更安全

## `Array.prototype.reduceRight()`

接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值, 将其结果汇总为单个返回值。

对于从左至右遍历的相似方法请参阅 `Array.prototype.reduce()`

## `Array.prototype.reverse()`

reverse() 方法将数组中元素的位置颠倒,并返回该数组。该方法会改变原数组。


## `Array.prototype.shift()`

从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。

**返回值**: 从数组中删除的元素; 如果数组为空则返回undefined 。 
         
## `Array.prototype.slice()`

返回一个新的数组对象，这一对象是一个由 begin和 end（不包括end）决定的原数组的浅拷贝。原始数组不会被改变

语法

````js
arr.slice();
// [0, end]

arr.slice(begin);
// [begin, end]

arr.slice(begin, end);
// [begin, end)
````

slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个新数组。你只需将该方法绑定到这个对象上。
 一个函数中的 arguments 就是一个类数组对象的例子。

````js
function list() {
  return Array.prototype.slice.call(arguments);
}

var list1 = list(1, 2, 3); // [1, 2, 3]
````

## `Array.prototype.some()`

测试是否至少有一个元素可以通过被提供的函数方法。该方法返回一个Boolean类型的值。

**对于空数组上的任何条件，此方法返回false。**

语法： `arr.some(callback(element[, index[, array]])[, thisArg])`

## `Array.prototype.sort()`

将数组中的元素进行排序并返回排序后的数组。**当不带参数调用`sort()`时，数组元素以字母表顺序(Unicode码点)排序。**

语法： `arr.sort([compareFunction(firstEl, secondEl)])`

如果指明了 compareFunction ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

* 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
* 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
* 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。

## `Array.prototype.splice()`

通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

语法 `array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`

返回值 : 由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。

````js
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
var removed = myFish.splice(2, 0, "drum");

// 运算后的 myFish: ["angel", "clown", "drum", "mandarin", "sturgeon"]
// 被删除的元素: [], 没有元素被删除

var myFish = ['angel', 'clown', 'drum', 'sturgeon'];
var removed = myFish.splice(2, 1, "trumpet");

// 运算后的 myFish: ["angel", "clown", "trumpet", "sturgeon"]
// 被删除的元素: ["drum"]
````

## `Array.prototype.toLocaleString()`

返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。

````js
var array1 = [1, 'a', new Date('21 Dec 1997 14:12:00 UTC')];
var localeString = array1.toLocaleString('en', {timeZone: "UTC"});

console.log(localeString);
// expected output: "1,a,12/21/1997, 2:12:00 PM",
// This assumes "en" locale and UTC timezone - your results may vary
````

语法： `arr.toLocaleString([locales[,options]]);`

## `Array.prototype.toString()`

返回一个字符串，表示指定的数组及其元素。

```js
var array1 = [1, 2, 'a', '1a'];

console.log(array1.toString());
// expected output: "1,2,a,1a"

```

## `Array.prototype.unshift()`

将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。

语法： `arr.unshift(element1, ..., elementN)`

返回值： 数组的新`length`

## `Array.prototype.values()`

返回一个新的 Array Iterator(迭代器) 对象，该对象包含数组每个索引的值

````js
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();
console.log(eArr.next().value); // w
console.log(eArr.next().value); // y
````

