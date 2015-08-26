---
layout: post
title: Javascript：Pascal's Triangle
---
##javascript解决杨辉三角问题

原题地址在 [codewars](http://www.codewars.com/kata/5226eb40316b56c8d500030f/train/javascript)

最近在codewars上升级为了4段，难度增加了不少，出现了更多的算法题，我没有做出来，看了答案，感觉很是精妙。

1 

1 1 

1 2 1

1 3 3 1

1 4 6 4 1

这就是一个杨辉三角，每个数是它上一层两个数的和。


``` js 

function pascalsTriangle(n){
    var pascal = [];
    var idx = 0;

    for(var i = 0; i<n ;i++){//遍历每一层
        idx = pascal.length -i; //下边遍历时 idx并不变
        for(var j = 0 ;j< i+1;j ++){ //这是具体到每一行，每一行的长度是当前行号（0开始）+1
            if(j ===0 || j ==i){  //每一行第一个或最后一个都是1
                pascal.push(1);
            }else{
                pascal.push(pascal[idx + j] + pascal[idx + j -1]);
            }
        }
    }

    return pascal
}


```

这个解法中i 代表的是每一层层号，而每一层的数字数量恰好是层号数量加1，比如第0行数量是1，第4行数量是5个。

而 idx代表的是上一行，在一个一维数组中，肯定不能用i代表上一层。恰好数组现存长度（开始时）减去i(上一行数量)，正好是上一行第一个元素。

j代表的是正在遍历的这一行，当他是第一个或者最后一个时，它一定是一。

当它是中间值时，它恰好是上一行中j号一样的那个和前一个之和。 也就是 [idx+j]和[idx+j-1]


