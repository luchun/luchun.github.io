---
layout: post
title: JavaScript中的深复制
---

在JavaScript中该如何复制一个对象？这是一个简单的问题，但答案却并不简单。
<!-- more -->

## 通过引用调用

JavaScript 通过传递各种值。下边是个例子：
```javascript
function mutate(obj) {
  obj.a = true;
}

const obj = {a: false};
mutate(obj)
console.log(obj.a); // prints true
```
函数 `mutate` 改变了作为参数传递进来的对象。在“按值调用”的环境中，函数会传递该函数可以使用的值 - 所以是副本。
该函数对该对象所做的任何更改都不会在该函数外部可见。
但是在像 `JavaScript` 这样的“引用调用”环境中，函数会得到 - 引用，并且会改变实际的对象本身。
因此，最后的 `console.log` 将显示为 `true`。

然而，有时候，您可能希望保留原始对象并为其他函数创建副本以便使用。

## 浅复制: Object.assign()

复制对象的一种方法是使用 `Object.assign()target,sources ...)。
它需要任意数量的源对象，枚举它们自己的所有属性并将它们分配给目标。
如果我们使用一个新的空对象作为目标，我们基本上就做到了复制。
```javascript
const obj = /* ... */;
const copy = Object.assign({}, obj);
```
但是，这仅仅是一个浅拷贝。如果我们的对象包含对象，它们将保持共享引用，这不是我们想要的：
```javascript
function mutateDeepObject(obj) {
  obj.a.thing = true;
}

const obj = {a: {thing: false}};
const copy = Object.assign({}, obj);
mutateDeepObject(copy)
console.log(obj.a.thing); // prints true
```

另一件可能的事是 `Object.assign()` 将 `getter` 变成简单的属性。
所以现在怎么办？原来，有几种方法可以创建对象的深层副本。

## JSON.parse
创建对象副本的最古老方法之一是将对象转换为其JSON字符串表示形式，然后将其解析回对象。这感觉有点霸道，但它确实有效：
```javascript
const obj = /* ... */;
const copy = JSON.parse(JSON.stringify(obj));
```
这里的缺点是您创建了一个临时的，可能很大的字符串，以便将其返回到解析器。
另一个缺点是这种方法无法处理循环对象。
尽管你可能会想到，但这些可以很容易地发生。
例如，当您构建树状数据结构时，节点引用其父项，并且父项又引用其自己的子项。
```javascript
const x = {};
const y = {x};
x.y = y; // Cycle: x.y.x.y.x.y.x.y.x...
const copy = JSON.parse(JSON.stringify(x)); // throws!
```

此外，诸如Maps, Sets, RegExps, Dates, ArrayBuffers和其他内置类型的东西在序列化时会丢失。成为 String类型。

## 结构化克隆
结构化克隆是一种现有的算法，用于将值从一个领域转移到另一个领域。
例如，只要调用postMessage将消息发送到其他窗口或WebWorker，就会使用它。
关于结构化克隆的好处在于它处理循环对象并支持大量的内置类型。
问题在于，在编写本文时算法不会直接暴露，只能作为其他API的一部分。我想我们必须看看有哪些...

### MessageChannel
正如我所说的，无论何时调用postMessage，都会使用结构化克隆算法。我们可以创建一个MessageChannel并发送消息。在接收端，消息包含我们原始数据对象的结构化克隆。

```javascript
function structuralClone(obj) {
  return new Promise(resolve => {
    const {port1, port2} = new MessageChannel();
    port2.onmessage = ev => resolve(ev.data);
    port1.postMessage(obj);
  });
}

const obj = /* ... */;
const clone = await structuralClone(obj);
```
这种方法的缺点是它是异步的。这并不是什么大问题，但有时您需要一种同步方式来深度复制对象。

### History API
如果您曾经使用 `history.pushState()` 构建SPA，那么您知道可以提供一个状态对象来保存URL。
事实证明，这个状态对象在结构上被克隆 - 同步。我们必须小心，不要混淆可能使用状态对象的任何程序逻辑，所以我们需要在完成克隆后恢复原始状态。
为了防止发生任何事件，请使用 `history.replaceState()` 而不是 `history.pushState()`。
```javascript
function structuralClone(obj) {
  const oldState = history.state;
  history.replaceState(obj, document.title);
  const copy = history.state;
  history.replaceState(oldState, document.title);
  return copy;
}

const obj = /* ... */;
const clone = structuralClone(obj);
```
再一次，为了复制一个对象而使用浏览器的引擎感觉有点过分，但是你必须做一些事情。此外，Safari会在30秒内将调用replaceState的次数限制为100次。

### Notification API

通知API。通知有一个与它们相关的数据对象被克隆。

```javascript
function structuralClone(obj) {
  return new Notification('', {data: obj, silent: true}).data;
}

const obj = /* ... */;
const clone = structuralClone(obj);
```
