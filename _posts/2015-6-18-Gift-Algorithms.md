---
layout: post
title: 今天的一道算法题
---
今天做了一道算法题，要求是从数组中找到最先能够相加等于结果的两个值，如果有多个，则选择最先的两个。例子
<!-- more -->
```js

buy(2,[1,1])       = [0,1]
buy(3,[1,1])       = null
buy(5,[5,2,3,4,5]) = [1,2]
buy(5,[1,2,3,4,5]) = [0,3] // the values at [1,2] also adds up to five, but [0,3] < [1,2]

```
以下是我的答案，缺点是不能在最开始得到结果时跳出循环。

```js

var buy = function(x, arr){
  var gift = [];
  for( var i = 0;i<arr.length;i++){
    arr.slice(i+1).map(function(val,key,subarr){
      if(arr[i]+val == x && gift.length == 0){
        gift.push(i);
        gift.push(i+key+1);
      };
    })
  }
  if(gift.length ==2) return gift;
  return null;
};

```

以下是目前的最优解

```js

var buy = function(sum, arr){
  var result = null;
  
  arr.some(function(item, i) {
    var id = arr.indexOf(sum - item, i + 1);
    if (id !== -1) {
      result = [i, id];
      return true;
    }
  });
  
  return result;
};
```
这个解法的优点有：
    1.使用了some，some在return true时会结束循环
    2.使用了indexOf，避免了显示的二次循环。
    
   比我的for + map高明多了。