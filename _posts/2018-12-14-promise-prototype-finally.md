---
layout: post
title: Promise.prototype.finally()
---
ES2018 新增额一个方法 `Promise.prototype.finally()`
<!-- more -->

##
```ecmascript 6
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

finally 回调总是被执行，相比之下 `then` 回调只有在`promise`完成时执行。
`catch`回调只有在`promise`被拒绝时执行，或者`then`回调中抛出异常或返回一个被拒绝的`Promise`时才执行。也就是说 下边两个代码的效果是一样的。

```ecmascript 6
promise
.finally(() => {
    «statements»
});
```
```ecmascript 6
promise
.then(
    result => {
        «statements»
        return result;
    },
    error => {
        «statements»
        throw error;
    }
);
```

在 `Typescript`中使用 `Promise.prototype.finally()`
在`tsconfig.json`中增加 `"es2018.promise"`
```js
{ "compilerOptions": 
   { // ... 
   "lib": ["dom", "es2015", "es2018.promise"] 
   } 
}
```
