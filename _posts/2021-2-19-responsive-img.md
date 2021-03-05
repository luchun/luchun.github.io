---
layout: post
title: 创建响应式图片
---
偶尔读到一篇老文章 [Time-saving CSS techniques to create responsive images
](https://medium.com/free-code-camp/time-saving-css-techniques-to-create-responsive-images-ebb1e84f90d5) ，结合自己在工作中遇到过的情况，分享一些小东西。
<!-- more -->
img是一种[可替换元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Replaced_element) , 如果不给它指定宽高，它会在加载过程中一点一点撑开文档流，体验很不好。
在移动端用px作为单位来指定图片的宽高不是一个好办法。用百分比在`height`上并不能生效。
我以前做过一个论坛，其中图片处理的方式用的是：
```css
.wrapper {
  position: relative;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}
img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
}
```
还在`.wrapper` 上加上了个加载中的背景图
```css
.wrapper {
  background-image: url("my-image.png");
  background-size: cover;
}
```
`background-size` 是一个很好用的属性，可以指定背景图在元素背景里的显示模式、结合`background-position`使用。
微信小程序的`image`元素有`mode`属性，有类似功能。今天读这篇文章，发现可替换元素有类似属性 [object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit) 。
这个属性兼容性还不错，但是我一直不知道，孤陋寡闻了。
