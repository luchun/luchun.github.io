---
layout: post
title: 被动事件监听
---

读了微软Edge团队的[一篇文章](https://blogs.windows.com/msedgedev/2017/03/08/scrolling-on-the-web/#kRhE0HeVS0Q6qMO8.97)
讲了现代浏览器对滚动的优化，即把滚动从主线程移动到了后台线程。文中有一个展示，主线程被js弄卡顿时，页面一样可以滚动。不过我在mac上尝试的
时候，只有safari可以，chrome和firefox都卡住了，囧。估计在windows上firefox和chrome实现了吧。

但是前端开发者很容易就会干扰到滚动。

    window.addEventListener(“wheel”, function (e) {
      e.preventDefault(); // oh no you don’t!
    });

甚至不使用 `e.preventDefault();` 也会干扰到滚动。

文中介绍到前端应尽量避免对 wheel 事件的监听。并提出了方案

    document.getElementById(‘scrollableDiv’)
    .addEventListener(“wheel”, function (e) {
      // In theory, I can only block scrolling on the div itself!
    });
 
一个是 Edge 和 safari 支持对局部可滚动元素的监听，这样做不会影响到全局的wheel事件。

另一个是被动事件监听
    
    window.addEventListener(“wheel”, function (e) {
      // Not calling preventDefault()!
    }, { passive: true } // I pinkie-swear I won't call preventDefault()
    );
    
通过 [caniuse](http://caniuse.com/#feat=passive-event-listener)   可以看到 chrome55 firefox52 safari10实现了被动监听。
传入 `{passive: true}` 可以保证不管回调中做什么，都不会影响到wheel滚动，即"被动"监听。Edge也在尽快实现这个功能。
Chrome 56 中默认对 rouchstart 和 touchmove 也开启了被动监听。
