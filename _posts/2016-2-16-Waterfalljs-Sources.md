---
layout: post
title: Waterfall.js 源代码学习
---
源代码学习
<!-- more -->

## Waterfall.js 源代码学习


今天看到一个简单的瀑布流插件[Waterfall.js](http://raphamorim.com/waterfall.js/)，大小只有1Kb,70行左右。它的网站上市这样介绍的：

    当前最好的瀑布流插件是[Masonry](http://masonry.desandro.com/),但它体积很重并依赖于jQuery。
    ....
    本插件认为所有的元素是 同等宽度的
    
大概就是作者写的一个小插件，功能比较弱，默认所有的子元素是同等宽度的。

    function waterfall(container){
    if(typeof(container) === 'string')
        container = document.querySelector(container);

    // Freeze the list of nodes
    var els = [].map.call(container.children, function(el){
        el.style.position = 'absolute';
        return el;
    });
    container.style.position = 'relative';

    function margin(name, el){
        var style = window.getComputedStyle(el);
        return parseFloat(style['margin' + name]) || 0;
    }
    function px(n){ return n + 'px'; }
    function y(el){ return parseFloat(el.style.top) ; }
    function x(el){ return parseFloat(el.style.left); }
    function width(el){ return el.clientWidth; }
    function height(el){ return el.clientHeight; }
    function bottom(el){ return y(el) + height(el) + margin('Bottom', el); }
    function right(el){ return x(el) + width(el) + margin('Right', el); }

    function sort(l){
        l = l.sort(function(a, b){
            if(bottom(a) === bottom(b)){
                return x(b) - x(a);
            }else{
                return bottom(b) - bottom(a);
            }
        });
    }

    var boundary = [];

    // Deal with the first element.
    if(els.length){
        els[0].style.top = '0px';
        els[0].style.left = px(margin('Left', els[0]));
        boundary.push(els[0]);
    }

    // Deal with the first line.
    for(var i = 1; i < els.length; i++){
        var prev = els[i - 1],
        el = els[i],
        thereIsSpace = right(prev) + width(el) <= width(container);
        if(!thereIsSpace) break;
            el.style.top = prev.style.top;
        el.style.left = px(right(prev) + margin('Left', el));
        boundary.push(el);
    }

    // Place following elements at the bottom of the smallest column.
    //其实就是每次从数组中选取到最短的那一列，将新的插入。然后再重新计算最短，周而复始。
    for(; i < els.length; i++){
        sort(boundary);
        var el = els[i],
            minEl = boundary.pop();
        el.style.top = px(bottom(minEl) + margin('Top', el));
        el.style.left = px(x(minEl));
        boundary.push(el);
    }
    
    //最后将 最高的那一列加上marginBottom的高度设置为容器的高度。
    sort(boundary);
    var maxEl = boundary[0];
    container.style.height = px(bottom(maxEl) + margin('Bottom', maxEl));
    }









