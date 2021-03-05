---
layout: post
title: 又一个HTML5 Boilerplate 选择
---
<!-- more -->

## 为什么要使用HTML5 Boilerplate

在我处初学html的时候和早期做项目的时候，是怎么初始化一个项目的呢？一直都是比较随意，用emmet 的!就完事了。等遇到了问题再去解决，比如需要reset,就加上reset.css,遇到jquery就加上jquey.js。后来发现有些工作很重复，就自己写个模板放下一些常用的引用文件，新项目的时候就直接开始。其实这就是一种模板，只是内容不完全而已。后来我遇到了[HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)这个项目,简直一见如果，关于他的作者来历什么的就不说了，它在github上有近3万个star就足以说明一切。它的优势主要是包含了很多基础内容，对ie什么的也都有准备。

## boy 又一个选择

今天在网上看到了boy，遂npm看了一下，确实不错，虽然内容没有[HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)那么丰富，但它的主页也说明了，这是一个轻量级的，兼容ie6的Boilerplate。那么它对ie6都做了哪些呢

###box-sizing 

我个人觉得，理解不理解box-sizing，是一个菜鸟CSSer和一个初级CSSer的分界线啊，box-sizing带来的好处是毋庸置疑的。以及为什么bootstrap中为何用padding来做栅栏的边界，都是因为它好用。但令人遗憾的是ie6,7都不支持这个属性。boy它就引用了这样一个htc文件，可以使ie67支持box-sizing，这真是一个好消息。

### css3选择器

这个功能我个人倒不是很看好，觉得并不重要，它只是增强了jquery等的选择器。

### 我希望有的功能

#### background-sizing 属性

这个大家都知道老旧浏览器不能设置background-sizing属性，对于相应式有多麻烦，网上有流传的一些htc，我觉得作者选择一个优秀的整合进来会更好。


##其他的选择

我推荐另一款Boilerplate [Initializr](http://www.initializr.com/)这个工具你可以自定义选择的内容比较多，比如bootstrap等，也很优秀。