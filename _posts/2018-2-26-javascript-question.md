---
layout: post
title: 前端面试问题 - JavaScript
---

## 解释事件委托
事件委托是一种涉及将事件侦听器添加到父元素而不是将它们添加到后代元素的技术。每当后代元素的触发事件由于冒泡到达绑定DOM，侦听器就会触发。
这种技术的好处是：
* 内存占用减少，因为父元素只需要一个单独的处理程序，而不必为每个后代附加事件处理程序。
* 没有必要从已删除的元素中解除绑定处理程序，并将新事件绑定到新元素。

## 解释JavaScript 中的 `this` 是如何工作的

对`this`没有简单的解释;它是JavaScript中最令人困惑的概念之一。简单解释是`this`值取决于函数的调用方式。
* 如果在调用函数时使用 `new`关键字，则函数内部`this`是一个全新的对象。
* 如果`apply`，`call`或`bind`用于调用/创建一个函数，则函数内部`this`是作为参数传入的对象。
* 如果一个函数作为一个方法被调用，比如`obj.method()` - `this`是该函数是作为其属性的对象。
* 如果一个函数被调用为一个自由函数调用，意味着它在没有上述任何条件的情况下被调用，那么`this`是全局对象。在浏览器中，它是`window`对象。如果在严格模式下（`'use strict'`），`this`将是`undefined `的而不是全局对象。
* 如果适用上述多个规则，则较高的规则将胜出，并将设置`this`值。
* 如果函数是ES2015箭头函数，它将忽略上面的所有规则，并在创建时接收其作用域中的`this`值。

## 解释原型继承是如何工作的
这是一个非常常见的JavaScript面试问题。所有JavaScript对象都有一个 `prototype` 属性，即对另一个对象的引用。
当在对象上访问属性时，如果在该对象上找不到该属性，JavaScript引擎将查看该对象的原型和原型的原型等等，直到它找到在其中一个原型上定义的属性，或者直到它到达原型链的末端。

## 请解释为什么以下内容不能用作IIFE：`function foo(){} ()`;.需要修改哪些内容才能使其成为IIFE？

IIFE代表立即调用函数表达式。JavaScript解析器读取` function foo(){ }(); ` 作为函数` function foo(){ } ` 和`()`;
其中前者是一个函数声明，后者（一对括号）是尝试调用函数，但没有指定名称，因此它会引发`Uncaught SyntaxError: Unexpected token ).`。

这里有两种方法可以修复它，包括添加更多的括号：`(function foo(){ })()` 和 `(function foo(){ }())`。 这些函数不会在全局范围中公开，如果您不需要在本体内引用它们，甚至可以省略它的名称。

## 变量值之间有什么区别：`null`，`undefined `或未声明？你将如何去检查这些状态？

将值指定给之前未使用`var`，`let`或`const`创建的标识符时，会创建未声明的变量。未声明的变量将在当前范围之外的全局范围内定义。在严格模式下，当您尝试分配给未声明的变量时，会引发ReferenceError。
就像全局变量不好一样，未声明的变量很糟糕。不惜一切代价避免它们！要检查它们，请将其用法放在`try / catch`块中。
```javascript
function foo() {
  x = 1; // Throws a ReferenceError in strict mode
}

foo();
console.log(x); // 1
```
`undefined` 的变量是已声明的变量，但未分配值。它是`undefined`类型的。
如果函数没有返回任何值，而执行的结果被分配给一个变量，变量的值也是`undefined`。
要检查它，请使用严格等于（`===`）运算符或`typeof`来比较`'undefined'`字符串。
请注意，您不应该使用抽象相等运算符来检查，因为如果值为null，它也会返回true。
```javascript
var foo;
console.log(foo); // undefined
console.log(foo === undefined); // true
console.log(typeof foo === 'undefined'); // true

console.log(foo == null); // true. Wrong, don't use this to check!

function bar() {}
var baz = bar();
console.log(baz); // undefined
```
一个变量为`null`将被显式分配给`null`值。它没有表示任何价值，并且与已经明确分配的意义上的`undefined`不同。
要检查`null`，只需使用严格的相等运算符进行比较。请注意，如上所述，您不应该使用抽象相等运算符（`==`）来检查，因为如果值未定义，它也会返回`true`。
```javascript
var foo = null;
console.log(foo === null); // true

console.log(foo == undefined); // true. Wrong, don't use this to check!
```
作为一种个人习惯，我从不会将我的变量不声明或未分配。如果我不打算使用它，我会在声明后明确地给它们分配`null`。

## 什么是封闭，以及如何/为什么要使用封闭？
闭包是函数和声明该函数的词法环境的组合。词汇“词法”一词指的是词汇范围界定使用源代码中声明变量的位置来确定变量可用的位置。
即使在外部函数返回后，闭包也是可以访问外部（封闭）函数的变量作用域链的函数。

## 你能描述`.forEach`循环和`.map()`循环之间的主要区别，以及为什么你会选择一个和另一个？
为了理解两者之间的差异，我们来看看每个函数的作用。
`forEach`
* 遍历数组中的元素
* 为每个元素执行回调
* 不返回值
```javascript
const a = [1, 2, 3];
const doubled = a.forEach((num, index) => {
  // Do something with num and/or index.
});

// doubled = undefined
```
`map`
* 遍历数组中的元素
* 通过调用每个元素上的函数将每个元素“映射”到一个新元素，从而创建一个新数组。
```javascript
const a = [1, 2, 3];
const doubled = a.map(num => {
  return num * 2;
});

// doubled = [2, 4, 6]
```
`.forEach`和`.map()`之间的主要区别在于`.map()`返回一个新数组。如果您需要结果，但不希望改变原始数组，则`.map()`是明确的选择。如果你只需要迭代一个数组，`forEach`是一个不错的选择。

## 匿名函数的典型用例是什么？
它们可以用于IIFE来封装局部范围内的一些代码，以便在其中声明的变量不会泄漏到全局范围。
```javascript
(function() {
  // Some code here.
})();
```
作为一次使用的回调，不需要在其他地方使用。当处理程序在调用它们的代码内部进行定义时，代码看起来更具自包含性和可读性，而不必搜索其他位置来查找函数体。
```javascript
setTimeout(function() {
  console.log('Hello world!');
}, 1000);
```
函数式编程结构或Lodash的参数（类似于回调函数）。
```javascript
const arr = [1, 2, 3];
const double = arr.map(function(el) {
  return el * 2;
});
console.log(double); // [2, 4, 6]
```
##宿主对象和原生对象有什么区别？
原生对象是由ECMAScript规范定义的JavaScript语言的一部分，如`String`，`Math`，`RegExp`，`Object`，`Function`等。
宿主对象由运行时环境（浏览器或Node）提供，例如`window`，`XMLHTTPRequest`等。

## 区别：`function Person(){}`，`var person = Person()`和`var person = new Person()`？
这个问题很含糊。我最好的猜测是它在JavaScript中询问构造函数。从技术上讲，`function Person(){}`只是一个正常的函数声明。惯例是使用首字母大写的函数作为构造函数。
`var person = Person()`调用Person作为函数，而不是作为构造函数。如果该函数旨在用作构造函数，则这样调用是常见的错误。通常情况下，构造函数不返回任何东西，因此像调用普通函数一样的调用构造函数将返回`undefined `。
`var person = new Person()`将使用`new`操作符创建 `Person` 对象的一个实例,并继承`Person.prototype`。另一种方法是使用`Object.create`，比如：`Object.create（Person.prototype）`。
```javascript
function Person(name) {
  this.name = name;
}

var person = Person('John');
console.log(person); // undefined
console.log(person.name); // Uncaught TypeError: Cannot read property 'name' of undefined

var person = new Person('John');
console.log(person); // Person { name: "John" }
console.log(person.name); // "john"
```
## `.call`和`.apply`有什么区别？
`.call`和`.apply`都用于调用函数，第一个参数将用作函数中的值。 不过，`.call`需要用逗号分隔的参数作为下一个参数，而`.apply`需要将参数数组作为下一个参数。 
```javascript
function add(a, b) {
  return a + b;
}

console.log(add.call(null, 1, 2)); // 3
console.log(add.apply(null, [1, 2])); // 3
```

## 解释 `Function.prototype.bind`
bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。
```javascript
fun.bind(thisArg[, arg1[, arg2[, ...]]])
```
## 什么时候使用`document.write()`？
`document.write()`将一个文本字符串写入由`document.open()`打开的文档流中。当`document.write()`在页面加载后执行时，它将调用`document.open()`，它清除整个文档（`<head>`和`<body>`被删除！），并用字符串中给定的参数值替换内容。因此它通常被认为是危险的并且容易被误用。

## 功能检测，功能推断和使用UA字符串有什么区别？
特征检测
功能检测包括确定浏览器是否支持某个代码块，以及是否运行不同的代码（取决于它是否执行），以便浏览器始终可以提供工作体验，而不会在某些浏览器中出现崩溃/错误。 例如：
```javascript
if ('geolocation' in navigator) {
  // Can use navigator.geolocation
} else {
  // Handle lack of feature
}
```
Modernizr是处理特征检测的优秀库。

特征推断
特征推断检查功能就像特征检测一样，但使用另一个功能，因为它假设它也会存在，例如：
```javascript
if (document.getElementsByTagName) {
  element = document.getElementById(id);
}
```
UA字符串
这是一个浏览器报告的字符串，它允许网络协议对等方识别请求软件用户代理的应用程序类型，操作系统，软件供应商或软件版本。 它可以通过`navigator.userAgent`访问。 然而，这个字符串很难解析并且可能被欺骗。 例如，Chrome报告Chrome和Safari。 因此，要检测Safari，您必须检查Safari字符串以及是否存在Chrome字符串。 避免这种方法。

## 尽可能详细地解释Ajax
Ajax（asynchronous JavaScript and XML）是一组使用客户端上的许多Web技术创建异步Web应用程序的Web开发技术。 借助Ajax，Web应用程序可以异步\向服务器发送数据和从服务器检索数据，而不会干扰现有页面的显示和行为。 通过将数据交换层与表示层分离，Ajax允许网页和扩展Web应用程序动态更改内容，而无需重新加载整个页面。 实际上，现代实现通常将JSON替换为XML。
`XMLHttpRequest` API通常用于异步通信，近来有新的`fetch `API。

## 使用Ajax有什么优点和缺点？
优点
* 交互性更好。来自服务器的新内容可以动态更改，无需重新加载整个页面。
* 减少与服务器的连接，因为脚本和样式表只需要被请求一次。
* 状态可以维护在一个页面上。 JavaScript变量和DOM状态将持续存在，因为主容器页面未被重新加载。
* 基本上大部分SPA的优点
缺点
* 动态网页很难收藏
* 如果JavaScript已在浏览器中被禁用，则不起作用
* 有些网络爬虫不执行JavaScript，也不会看到JavaScript加载的内容
* 基本上大部分SPA的缺点

## 解释JSONP是如何工作的（以及它如何不是真正的Ajax）
JSONP（带填充的JSON）是一种通常用于绕过Web浏览器中的跨域策略的方法，因为不允许从当前页面到跨域的Ajax请求。
JSONP通过`<script>`标记向一个跨域的请求发送请求，通常使用回调查询参数，例如：`https://example.com?callback=printData`。 然后服务器将数据包装在一个名为`printData`的函数中并将其返回给客户端。
```javascript
<!-- https://mydomain.com -->
<script>
function printData(data) {
  console.log(`My name is ${data.name}!`);
}
</script>

<script src="https://example.com?callback=printData"></script>

// File loaded from https://example.com?callback=printData
printData({ name: 'Yang Shun' });
```
客户端必须在其全局范围内具有printData函数，并且在收到来自跨域的响应时，该函数将由客户端执行。
JSONP可能不安全，并具有一些安全隐患。 由于JSONP真的是JavaScript，它可以完成JavaScript所能做的一切，因此您需要信任JSONP数据的提供者。
现在，CORS是推荐的方法，JSONP被视为hack。

## 解释 "提升"
提升是用于解释代码中变量声明行为的术语。 使用`var`关键字声明或初始化的变量将声明“提升”到当前作用域的顶部。 但是，只有声明会被提升，赋值（如果有的话）将保持原样。 我们用几个例子来解释一下。
```javascript
// var declarations are hoisted.
console.log(foo); // undefined
var foo = 1;
console.log(foo); // 1

// let/const declarations are NOT hoisted.
console.log(bar); // ReferenceError: bar is not defined
let bar = 2;
console.log(bar); // 2
```
函数表达式的body将会被提升，以变量声明的形式写入的函数只有声明被提升。
```javascript
// Function Declaration
console.log(foo); // [Function: foo]
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
console.log(foo); // [Function: foo]

// Function Expression
console.log(bar); // undefined
bar(); // Uncaught TypeError: bar is not a function
var bar = function() {
  console.log('BARRRR');
};
console.log(bar); // [Function: bar]
```

## 描述事件冒泡
当一个事件在DOM元素上触发时，如果附加了一个监听器，它将尝试处理事件，然后事件冒泡到其父代并发生同样的事情。 这种冒泡发生在元素的祖先到文档的整个过程中。 事件冒泡是事件委托的机制。

## “attribute”和“property”之间有什么区别？
`attribute` 在HTML标记中定义，但 `property` 在DOM上定义。 为了说明这种差异，假设我们在HTML中有这个文本字段：`<input type =“text”value =“Hello”>`。
```javascript
const input = document.querySelector('input');
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello
```
但是将你想输入框中输入 `World` ，他将成为
```javascript
console.log(input.getAttribute('value')); // Hello
console.log(input.value); // Hello World!
```
## 文档`load`事件和文档`DOMContentLoaded`事件之间的区别？
`DOMContentLoaded`事件在初始HTML文档被完全加载和解析时触发，而不等待样式表，图像和子帧完成加载。
`window` 的 `load` 事件仅在DOM和所有相关资源和资产已加载后才会触发。

## `==` 和 `===` 有什么区别？
`==` 是抽象的相等运算符，而 `===` 是严格的相等运算符。在进行任何必要的类型转换后，`==`运算符将进行比较。`===`运算符不会进行类型转换，所以如果两个值不是相同类型`===`将简单地返回`false`。当使用`==`时，可能发生意外的事情，例如：
```javascript
1 == '1'; // true
1 == [1]; // true
1 == true; // true
0 == ''; // true
0 == '0'; // true
0 == false; // true
```
我的建议是绝对不要使用`==`运算符，除非为了便于与`null`或`undefined`进行比较，其中如果a为`null`或`undefined`，则`a == null`将返回`true`。
```javascript
var a = null;
console.log(a == null); // true
console.log(a == undefined); // true
```

## 解释关于JavaScript的同源策略
同源策略阻止JavaScript通过域边界发出请求。 源被定义为URI方案，主机名和端口号的组合。 此策略可防止一个页面上的恶意脚本通过该页面的文档对象模型访问另一个网页上的敏感数据。

## 实现以下功能 `duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]`
```javascript
function duplicate(arr) {
  return arr.concat(arr);
}

duplicate([1, 2, 3, 4, 5]); // [1,2,3,4,5,1,2,3,4,5]
```

## 为什么称为三元表达式，“三元”这个词表示什么？
“三元”表示三个，三元表达式接受三个操作数，测试条件，“then”表达式和“else”表达式。 三元表达式不是特定于JavaScript，我不确定它为什么甚至在这个列表中。

## 什么是 `"use strict";` ？使用它有什么优点和缺点？
`"use strict";` 是用于对整个脚本或单个函数启用严格模式的语句。严格模式是加入JavaScript受限变体的一种方式。

优点：
* 使它无法意外地创建全局变量
* 将拼写错转成异常
* 试图删除不可删除的属性会抛出错误（在之前尝试没有任何效果）
* 要求函数参数名称是唯一的
* 在全局范围内`this`是未定义的
* 捕获了一些常见的编码错误，抛出异常
* 禁用混淆或糟糕的功能
缺点:
* 许多开发人员可能习惯使用禁用的功能
* 无法再访问 `function.caller` 和 `function.arguments`
* 以不同严格模式编写的脚本串联可能会导致问题

## 创建一个for循环迭代到100，同时输出3的倍数的“fizz”，5的倍数“buzz”和3和5倍数的“fizzbuzz”。

```javascript
for (let i = 1; i <= 100; i++) {
  let f = i % 3 == 0,
    b = i % 5 == 0;
  console.log(f ? (b ? 'FizzBuzz' : 'Fizz') : b ? 'Buzz' : i);
}
```

## 为什么总的来说，把网站的全局范围保持原样并且永远不要碰它是一个好主意？
每个脚本都可以访问全局范围，如果每个人都使用全局名称空间来定义自己的变量，那么肯定会碰撞。使用模块模式（IIFE）将变量封装在本地命名空间中。

## 为什么你会使用类似load事件？这个事件有缺点吗？你知道其他的选择吗？你为什么要使用这些选项？

`load` 事件在文档加载过程结束时触发。此时，文档中的所有对象都位于DOM中，并且所有图像，脚本，链接和子帧都已完成加载。

DOM事件`DOMContentLoaded`将在页面的DOM构建完成后触发，但不要等待其他资源完成加载。在某些情况下，如果在初始化之前不需要装入整个页面，则这是首选。

## 解释一个单页面应用程序是什么以及如何使他SEO友好。
现在，Web开发人员将他们构建的产品称为Web应用程序，而不是网站。 虽然这两个术语之间没有严格的区别，但网络应用程序往往具有高度的交互性和动态性，允许用户执行操作并接收他们的操作响应。 传统上，浏览器从服务器接收HTML并呈现它。 当用户导航到另一个URL时，需要整页刷新，并且服务器会为新页面发送新的新HTML。 这被称为服务器端渲染。
但是在现代SPA中，客户端渲染被用来代替服务端渲染。 浏览器从服务器加载初始页面，以及整个应用程序所需的脚本（框架，库，应用代码）和样式表。 当用户导航到其他页面时，不会触发页面刷新。 该页面的URL通过HTML5 History API进行更新。 新页面所需的新数据（通常采用JSON格式）由浏览器通过AJAX请求检索到服务器。 然后，SPA通过JavaScript来动态更新页面，这些JavaScript在初始页面加载时已经下载。 这种模式类似于原生移动应用程序的工作方式。

好处：
* 感觉响应更快，并且由于非全页面刷新，用户看不到页面导航之间的闪光。
* 对服务器提出的HTTP请求数量较少，因为不必为每次页面加载重新下载相同的资产。
* 将客户和服务器之间的关注清晰分开; 您可以轻松地为不同平台（例如手机，聊天机器人，智能手表）建立新客户端，而无需修改服务器代码。 只要API合同没有中断，您也可以独立修改客户端和服务器上的技术堆栈

缺点：
* 由于加载了多个页面所需的框架，应用程序代码和资源，导致初始页面负载更重。
* 在你的服务器上还有一个额外的步骤，即配置它将所有请求路由到一个入口点，并允许客户端路由从那里接管。
* SPA依赖于JavaScript来呈现内容，但并非所有搜索引擎都在抓取过程中执行JavaScript，并且他们可能会在您的页面上看到空的内容。 这无意中伤害了您的应用的搜索引擎优化（SEO）。 然而，大多数情况下，当您构建应用程序时，搜索引擎优化并不是最重要的因素，因为并非所有内容都需要通过搜索引擎进行索引。 为了克服这个问题，您可以在服务器端呈现您的应用，或者使用Prerender等服务来“在浏览器中呈现您的JavaScript，保存静态HTML并将其返回给抓取工具”。

## 使用Promise而不是回调有什么优点和缺点？
优点
* 避免可可读性差的的回调地狱
* 使用`.then()`可以轻松编写可读的顺序异步代码。
* 使用`Promise.all()`编写并行异步代码很容易。
缺点
* 稍微复杂的代码（有争议的）
* 在不支持ES2015的旧浏览器中，您需要加载一个polyfill才能使用它。

## 你用什么语言构造迭代对象属性和数组项目？
对象
* `for`循环 - `for(var property in obj){console.log(property); }`。但是，这也会遍历其继承的属性，并且在使用它之前将添加`obj.hasOwnProperty(property)`检查。
* `Object.keys()` - `Object.keys(obj).forEach(function(property){...})`。 `Object.keys()`是一个静态方法，它将列出您传递它的所有对象的枚举属性。
* `Object.getOwnPropertyNames()` - `Object.getOwnPropertyNames(obj).forEach(function（property){...})`。 `Object.getOwnPropertyNames()`是一个静态方法，它将列出您传递它的对象的所有可枚举和不可枚举的属性。
数组
* `for`循环 - `for(var i = 0; i <arr.length; i ++)`。 这里的常见错误是`var`在函数范围内，而不是块范围，大多数时候你想要块范围的迭代变量。 ES2015引入了具有块范围的`let`，建议使用它。 所以这变成：`for(let i = 0; i <arr.length; i ++)`。
* `forEach` - `arr.forEach(function(el，index){...})`。 这个构造有时可能更方便，因为如果你需要的只是数组元素，你不必使用索引。 还有一些方法可以让你尽早终止迭代。

大多数情况下，我更喜欢`.forEach`方法，但这取决于你想要做什么。 `for`循环允许更多的灵活性，例如使用`break`或者每次循环多次递增迭代器过早地终止循环。


## 什么是事件循环？调用堆栈和任务队列之间有什么区别？
事件循环是一个单线程循环，用于监视调用堆栈并检查是否有任何工作要在任务队列中完成。 如果调用堆栈为空并且任务队列中有回调函数，则将函数出队并推送到调用堆栈中执行。

## 解释函数 `foo(){}` 和 `var foo = function(){}` 之间 `foo` 用法的区别。
前者是函数声明，后者是函数表达式。关键的区别在于函数声明有它的主体，但函数表达式的主体不是（他们具有与变量相同的提升行为）。
```javascript
// 函数声明
foo(); // 'FOOOOO'
function foo() {
  console.log('FOOOOO');
}
// 函数表达式 
foo(); // Uncaught TypeError: foo is not a function
var foo = function() {
  console.log('FOOOOO');
};
```

## 使用`let`，`var`或`const`创建的变量之间有什么区别？
使用var关键字声明的变量作用于创建它们的函数，或者在任何函数之外创建的全局对象。 let和const是块范围的，这意味着它们只能在最近的一组花括号中使用（函数，if-else块或for-loop）。
var允许变量被提升，这意味着它们可以在声明之前在代码中被引用。 let和const不会允许这个，而是抛出一个错误。
用var重新声明一个变量不会抛出错误，但'let'和'const'会发生。
let和const的区别在于let允许重新赋值变量的值，而const不赋值。

## 什么是高阶函数的定义？
高阶函数是将一个或多个函数作为参数的任何函数，它用于对某些数据进行操作，和/或返回函数作为结果。 
高阶函数是为了抽象一些重复执行的操作。 这个典型的例子是map，它将一个数组和一个函数作为参数。 
map然后使用该函数转换数组中的每个项目，并返回一个包含转换数据的新数组。
JavaScript中的其他流行示例包括forEach，filter和reduce。 高阶函数不仅操作数组，从另一个函数返回函数的用例很多。 
Array.prototype.bind是JavaScript中的一个例子。







javascript 的 typeof 返回哪些数据类型？

强制类型转换的方法 和 隐式类型转化的方法

解释一下数组方法 pop push unshift shift

ajax 的时候 get 和 post 的区别

ajax的时候 如何解析 json数据

事件委托是什么？

闭包是什么？有什么特性，对页面有什么影响？


对this的理解？

nodejs的应用场景？

js的二分算法实现？

如何定义vue-router的动态路由 参数的获取

vuex是什么 哪些场景适合?

vue-router是什么？ 哪些场景适用？

vue的生命周期?

vue组件的定义与传参?