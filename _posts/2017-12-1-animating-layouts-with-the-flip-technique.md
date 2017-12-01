---
layout: post
title: 使用FLIP技术设置动画布局
---

直观且易于理解的用户界面才是最有效的。 动画在这方面起着重要的作用 - 正如 Nick Babich 所说 [animation brings user interfaces to life](https://uxplanet.org/functional-animation-in-ux-design-what-makes-a-good-transition-d6e7b4344e5e)。
然而, 增加有意义的过渡和微观互动往往是事后的, 或者是 "好的", 如果时间允许的话。
通常，我们使用的 web 应用只是简单的从一个视图"跳"到另一个视图，而不会给用户时间来处理当前上下文中发生的事情。

这导致了不直观的用户体验，但我们可以做得更好，避免在创建UI时的“跳转”和“传送”。
毕竟，真实自然中没有传送，所有有交互的事物都会自然地移动。

在这篇文章中，我们将探索一种名为“FLIP”的技术，可以以高效的方式为任何DOM元素的位置和尺寸设置动画，不管他们的布局如何被计算或呈现（例如，高度，宽度，浮动，绝对定位，变换，柔性盒，网格等）

## 为什么是 FLIP 技术？

你有没有试过动画 `height`, `width`, `top`, `left`, 或除了 `transform` 和 `opacity` 之外的任何其他属性？
你可能会注意到动画看起来有一点迟滞，这是有原因的。
当任何属性（如“高度”）触发布局变化，
浏览器必须递归检查其他元素的布局是否因此而改变，这可能是昂贵的。
如果这个计算花费比一个动画帧（大约16.7毫秒）更长的时间，那么动画帧将被跳过，导致“迟滞”，因为该帧没有及时呈现。
在 Paul Lewis 的文章["Pixels are expensive"](https://aerotwist.com/blog/pixels-are-expensive/)中，
他进一步深入介绍了像素的渲染方式和各种性能开销。

简而言之，我们的目标很简单 - 我们想只计算最少需要改变的样式，尽快。
关键是只动画 `transform`和 `opacity`, FLIP解释了我们如何仅使用`transform`来模拟布局更改。

## 什么是 FLIP ?

FLIP是一种助记缩写也是一种 [Paul Lewis首创](https://aerotwist.com/blog/flip-your-animations/) 的技术，
代表  **F**irst, **L**ast, **I**nvert, **P**lay。
他的文章包含了对这一技术的一个很好的解释，但我会在这里概括一下：

* **First** 元素的初始状态。 在发生任何事情之前，记录将要过渡的元素的当前（即，first）位置和尺寸。
可以使用`element.getBoundingClientRect()` 来做到这一点，如下所示。
* **Last** 执行导致过渡瞬时发生的代码，并记录元素的最后（即 last）位置和尺寸。
* **Invert** 由于元素处于最后位置，所以我们希望通过使用`transform`修改其位置和尺寸来创建它处于第一位置的错觉。这需要一点数学，但不是太困难。
* **Play** 将元素倒置（假装在第一个位置），我们可以通过将其 `transform` 设置为 `none`，将其移回到最后位置。


以下是如何使用 Web Animations API 实现这些步骤：

```javascript
const elm = document.querySelector('.some-element');

// First: get the current bounds
const first = elm.getBoundingClientRect();

// execute the script that causes layout change
doSomething();

// Last: get the final bounds
const last = elm.getBoundingClientRect();

// Invert: determine the delta between the 
// first and last bounds to invert the element
const deltaX = first.left - last.left;
const deltaY = first.top - last.top;
const deltaW = first.width / last.width;
const deltaH = first.height / last.height;

// Play: animate the final element from its first bounds
// to its last bounds (which is no transform)
elm.animate([{
  transformOrigin: 'top left',
  transform: `
    translate(${deltaX}px, ${deltaY}px)
    scale(${deltaW}, ${deltaH})
  `
}, {
  transformOrigin: 'top left',
  transform: 'none'
}], {
  duration: 300,
  easing: 'ease-in-out',
  fill: 'both'
});
```
> 在撰写本文时，并非所有浏览器都支持Web动画API。但是，你可以使用 [polyfill](https://github.com/web-animations/web-animations-js)

<iframe height='265' scrolling='no' title='How the FLIP technique works' src='//codepen.io/lu7965/embed/eebRYE/?height=265&theme-id=light&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/lu7965/pen/eebRYE/'>How the FLIP technique works</a> by luchun (<a href='https://codepen.io/lu7965'>@lu7965</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

有两个重要的事情需要注意:

1. 如果元素的大小发生了变化，您可以通过调整 `scale` 来“调整”元素的大小，而不会影响性能。
但是要确保将 `transformOrigin` 设置为 'top left'，因为这是我们基于增量计算的位置。

2. 我们使用[Web Animations API](https://css-tricks.com/lets-talk-about-the-web-animations-api/)来动画元素，
但是可以自由使用任何其他动画引擎，例如GSAP，Anime，Velocity，Just-Animate，Mo.js等等。

## Shared Element Transitions 共享元素转换

在应用程序视图和状态之间转换元素的一个常见用例是最终元素可能不是初始元素的相同DOM元素。
在Android中，这与[shared element transition](https://developer.android.com/training/material/animations.html)类似，不同之处在于元素不是从视图“回收”，而是像在Android上一样在DOM中查看。

不过，我们仍然可以用一个小小的魔法来实现 FLIP 过渡：

```javascript
const firstElm = document.querySelector('.first-element');

// First: get the bounds and then hide the element (if necessary)
const first = firstElm.getBoundingClientRect();
firstElm.style.setProperty('visibility', 'hidden');

// execute the script that causes view change
doSomething();

// Last: get the bounds of the element that just appeared
const lastElm = document.querySelector('.last-element');
const last = lastElm.getBoundingClientRect();

// continue with the other steps, just as before.
// remember: you're animating the lastElm, not the firstElm.
```

下面是两个完全不同的元素如何使用共享元素转换看起来是相同元素的一个例子。点击其中一个图片查看效果。

<p data-height="370" data-theme-id="13607" data-slug-hash="305a618d4dd75cbe8423183c70d6a43e" data-default-tab="result" data-user="davidkpiano" data-embed-version="2" data-pen-title="FLIP example with WAAPI" class="codepen">See the Pen <a href="https://codepen.io/davidkpiano/pen/305a618d4dd75cbe8423183c70d6a43e/">FLIP example with WAAPI</a> by David Khourshid (<a href="https://codepen.io/davidkpiano">@davidkpiano</a>) on <a href="https://codepen.io">CodePen</a>.<br />
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script></p>