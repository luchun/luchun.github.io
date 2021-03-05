---
layout: post
title: optional chaining
---
介绍一下可选链
<!-- more -->

在开发中经常遇到一个问题，安全引用对象的属性。例如:

```javascript
const obj = {
  foo: {
    bar: {
      baz: 42,
    },
  },
};
```
多见于前后端交互的时候，很有可能`foo`是个`null`，为了使用`foo`，不得不像下边这么写：
```javascript
    const baz = obj && obj.foo && obj.foo.bar && obj.foo.bar.baz
```

现在TC39提出了一个新的想法 `optional chaining` 安全的链式调用

### 
上边的代码可以写成下边这种形式:
```javascript
    const baz = obj?.foo?.bar?.baz
```

语法:

```javascript
obj?.prop       // optional static property access
obj?.[expr]     // optional dynamic property access
func?.(...args) // optional function or method call
```

等同于:

```javascript
a?.b                          // undefined if `a` is null/undefined, `a.b` otherwise.
a == null ? undefined : a.b

a?.[x]                        // undefined if `a` is null/undefined, `a[x]` otherwise.
a == null ? undefined : a[x]

a?.b()                        // undefined if `a` is null/undefined
a == null ? undefined : a.b() // throws a TypeError if `a.b` is not a function
                              // otherwise, evaluates to `a.b()`

a?.()                        // undefined if `a` is null/undefined
a == null ? undefined : a()  // throws a TypeError if `a` is neither null/undefined, nor a function
                             // invokes the function `a` otherwise
```

目前这个提案在 stage 1阶段 [proposal-optional-chaining](https://github.com/tc39/proposal-optional-chaining)

babel有一个插件 [babel-plugin-proposal-optional-chaining](https://babeljs.io/docs/en/next/babel-plugin-proposal-optional-chaining)现在就可以体验这个功能.

能接触到这个提案，跟知乎上有个问题有关系 "[如何和后端沟通，解决api接口返回多层嵌套的json，在中间的某一层为null的问题？](https://www.zhihu.com/question/282946327)"
通过这个问题，我才发现我之前希望后端返回一个默认值这种想法是错误的，因为它可能真的没有初始化，那就是null。
如果给我返回了一个空对象，那代表它没有初始化还是它的属性没有初始化呢?
