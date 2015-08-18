---
layout: post
title: 用Ruby语言对数字排序
---
##用Ruby语言对数字排序

原题地址在 [codewars](http://www.codewars.com/kata/5467e4d82edf8bbf40000155/train/ruby)

这是一道简单的入门级题目，对给出的数字进行排序返回，比如

Input: 145263 Output: 654321

Input: 1254859723 Output: 9875543221

以前用的javascript解决的 如下

```js

function descendingOrder(n){
    return +((n+"").split("").sort((a,b)=>{return b-a}).join(""))
}

```
将数字转换为字符串，再用split()拆分为数组，然后排序，重新用join组装为数字，一气呵成。


今天尝试使用Ruby解决这个问题，我是Ruby的初学者，好在这道题考察的是语言的基础，而Ruby和Javascript都是动态性语言，很多方法都是同名的。
``` 

def descending_order(n)
  n.to_s.split("").sort{|a,b| b<=>a}.join("").to_i
end
p descending_order(123)

```
我的思路基本与javascript的一致

看了下别人的答案，如下

```

def descending_order(n)
 n.to_s.chars.sort.reverse.join.to_i
end

```
查了下文档 chars方法就是将字符串每个字节转为数组键值

Returns an array of characters in str. This is a shorthand for str.each_char.to_a.
