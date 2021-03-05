---
layout: post
title: 页面中的置底效果
---
[方案地址](https://css-tricks.com/snippets/css/sticky-footer/)
<!-- more -->
以前为了实现footer置底，一直使用javascript计算window高度，然后给footer加上margin-top，这样做不好的时无法应对文档的增长，即使文档不会增长，如果前边元素有margin-bottom，footer的margin就不好计算了。

后来发现了这个方法，原理是将主体内容的高度设置为min-height:100%，after设置为和footer一样高度，然后用margin将footer拉上来，非常简单又好用，即使文档自己增长了，footer就会跟随文档下去。是目前见过最简单的方式。

当然还有一些其他的方式，如flex布局等，受限于浏览器支持度。

    

    

 