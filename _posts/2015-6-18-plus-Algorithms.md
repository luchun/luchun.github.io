---
layout: post
title: 关于阶加阶乘的算法
---
继续在codewars上找虐，这是一道递归的问题，给出一个数字N,求出n+(n-1)+(n-2)+...+1的结果
我一看，很简单嘛，递归
<!-- more -->
##关于阶加阶乘的算法



```js

function triangular (n) {
  if (n < 1) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else {
    return triangular (n - 1) + n;
  }
}

```
很简单嘛，哥学过递归
出来一看别人家的算法，被鄙视了

```js

function triangular( n ) {
  return (n > 0) ? ((n * n) + n) / 2 : 0;
}

```
代码量一行，用了阶加公式
n~ = n(n+1)/2

为了防止以后被鄙视，把阶乘公式也记一下

n!=n*(n-1)! 