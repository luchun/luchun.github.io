---
layout: post
title: Promise组合器
---

ES2015引入了`promises`，并且支持两种组合器，静态方法`Promise.all` 和 `Promise.race`。
目前草案中还有另外两个组合器`Promise.allSettled`和`Promise.any`。
<!-- more -->

| 名称 | 描述 | 状态 | 
| ----- | --------- | ----------- | 
| `Promise.AllSettled` |  不会短路 |       提案      |         
| `Promise.all`  | 任意一项拒绝时短路     |  ES2015    |         
| `Promise.race`  | 任意一项解决或拒绝时短路     | ES2015   |         
| `Promise.any`  |   任意一项解决时短路   |  提案    |         

# Promise.all

[mdn文档地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

`Promise.all(iterable)` 方法返回一个 `Promise` 实例，
此实例在 `iterable` 参数内所有的 `promise` 都“完成（`resolved`）”或参数中不包含 `promise` 时回调完成（`resolve`）；
如果参数中  `promise` 有一个失败（`rejected`），此实例回调失败（`reject`），失败原因的是第一个失败 `promise` 的结果。

```` 
const promises = [
  fetch('/component-a.css'),
  fetch('/component-b.css'),
  fetch('/component-c.css'),
];
try {
  const styleResponses = await Promise.all(promises);
  enableStyles(styleResponses);
  renderNewUi();
} catch (reason) {
  displayError(reason);
}
````

# Promise.race

[mdn文档地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

`Promise.race(iterable)` 方法返回一个 `promise`，一旦迭代器中的某个`promise`解决或拒绝，返回的 `promise`就会解决或拒绝。
在你需要有一个解决时就做些事情或者是有一个拒绝时做些事情时，它会很有用。

```` 
try {
  const result = await Promise.race([
    performHeavyComputation(),
    rejectAfterTimeout(2000),
  ]);
  renderResult(result);
} catch (error) {
  renderError(error);
}
````

# Promise.allSettled

[mdn文档地址](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

`Promise.allSettled(iterable)`方法返回一个`promise`，一旦迭代器中的所有`promise`都完成了解决或拒绝，返回的 `promise`就会解决。

```` 
const promises = [
  fetch('/api-call-1'),
  fetch('/api-call-2'),
  fetch('/api-call-3'),
];
// Imagine some of these requests fail, and some succeed.

await Promise.allSettled(promises);
// All API calls have finished (either failed or succeeded).
removeLoadingIndicator();
````

# Promise.any

`Promise.any(iterable)`方法返回一个`promise`，一旦迭代器中的某个`promise`解决，返回的 `promise`就会解决。当迭代器中的所有`promise`拒绝，返回的 `promise`就会拒绝。
与`Promise.race`相比，返回的`promise`解决的逻辑相同。但`Promise.race`相返回的`promise`会在迭代器中的某个`promise`拒绝时就拒绝。

```` 
const promises = [
  fetch('/endpoint-a').then(() => 'a'),
  fetch('/endpoint-b').then(() => 'b'),
  fetch('/endpoint-c').then(() => 'c'),
];
try {
  const first = await Promise.any(promises);
  // Any of the promises was fulfilled.
  console.log(first);
  // → e.g. 'b'
} catch (error) {
  // All of the promises were rejected.
  console.log(error);
}
````
