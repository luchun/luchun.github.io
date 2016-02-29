---
layout: post
title: HTML 中的电话链接
---

    <a href="tel:1-562-867-5309">1-562-867-5309</a>
    
事实上，即使没有tel ，浏览器也会自行判断是否为电话的，所以有时候我们需要禁用浏览器的判断

    <meta name="format-detection" content="telephone=no">
    
有时候，我们希望给它加上图标，其实Unicode是提供了电话图标的

&#128222; &#128383; &phone; &#9742;

使用unicode码的好处是作为文字处理，不需要多余的资源，不需要处理对齐之类的样式问题。缺点是浏览器或者平台上的显示略有不同，主要和字体库有关系。[http://www.amp-what.com/unicode/](http://www.amp-what.com/unicode/search/telephone) 这个网站可以搜索更多可用的Unicode图标


    

    

 