---
layout: post
title: 
---
## IntersectionObserver
Intersection Observer API提供了一种异步检测目标元素与祖先元素或 viewport 相交情况变化的方法。
过去为了实现图片懒加载，需要监听`document`的`scroll`事件，并在回调内获取目标元素的位置判断是否进入了视窗，执行图片加载动作，如
```
window.addEventListener('scroll', function (event){
  // Do some stuff every time the user scrolls!
  var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
```
`scroll`事件触发的频率非常高，`scroll` 和 `getBoundingClientRect`都运行在主线程，会有性能问题，一般要结合`lodash`节流使用。

Intersection Observer API 允许配置一个回调函数，当以下情况发生时会被调用

*每当目标(target)元素与设备视窗或者其他指定元素发生交集的时候执行。设备视窗或者其他元素我们称它为根元素或根(root)。
*Observer第一次监听目标元素的时候
```
let options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: 1.0
}

let observer = new IntersectionObserver(callback, options);
```
参数

* root
    指定根(root)元素，用于检查目标的可见性。必须是目标元素的父级元素。如果未指定或者为null，则默认为浏览器视窗。 
* threshold
  可以是单一的number也可以是number数组，target元素和root元素相交程度达到该值的时候IntersectionObserver注册的回调函数将会被执行。
  

`EventListener`是被观察者(`Observable`)吗？ 
被观察者是一个可以观测其行为的对象，所以任何可以监听行为并能通知行为发生的都是被观察者。
这意味者事件监听器是被观察者，因为可以监听事件并在事件发生时立即被告知。

## MutationObserver
MutationObserver接口提供了监视对DOM树所做更改的能力。
```
var targetNode = document.querySelector("#someElement");
var observerOptions = {
  childList: true,  // 观察目标子节点的变化，是否有添加或者删除
  attributes: true, // 观察属性变动
  subtree: true     // 观察后代节点，默认为 false
}

var observer = new MutationObserver(callback);
observer.observe(targetNode, observerOptions);
```
##ResizeObserver
ResizeObserver 接口可以监听到 Element 的内容区域或 SVGElement的边界框改变。内容区域则需要减去内边距padding。
ResizeObserver避免了在自身回调中调整大小，从而触发的无限回调和循环依赖。它仅通过在后续帧中处理DOM中更深层次的元素来实现这一点。

##PerformanceObserver
它主要用于观察性能时间轴（Performance Timeline），并在浏览器记录时通知新的性能条目。它可以用来度量浏览器和 Node.js 应用程序中某些性能指标。

##ReportingObserver
ReportingObserver 和 Report-To 报头具有类似但略微不同的用途。

ReportingObserver可以观察到简单的客户端警告，例如弃用和干预。报表不会自动发送到服务器（除非你在回调中触发）：
```

const observer = new ReportingObserver((reports, observer) => {
  for (const report of reports) {
    // Send report somewhere.
  }
}, {buffered: true});
 
observer.observe();
```