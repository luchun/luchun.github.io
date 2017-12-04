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

## Parent-Child Transitions 

在之前的实现中，元素边界是基于`window`的。对于大多数用例来说，这很好，但请考虑这种情况：

* 一个元素改变位置并需要 transition。

* 该元素包含一个子元素，该元素本身需要转换到父级中的不同位置。

由于之前计算的界限是相对于`window`的，因此我们对子元素的计算将会失效。
为了解决这个问题，我们需要确保边界是相对于父元素计算的：

```javascript
const parentElm = document.querySelector('.parent');
const childElm = document.querySelector('.parent > .child');

// First: parent and child
const parentFirst = parentElm.getBoundingClientRect();
const childFirst = childElm.getBoundingClientRect();

doSomething();

// Last: parent and child
const parentLast = parentElm.getBoundingClientRect();
const childLast = childElm.getBoundingClientRect();

// Invert: parent
const parentDeltaX = parentFirst.left - parentLast.left;
const parentDeltaY = parentFirst.top - parentLast.top;

// Invert: child relative to parent
const childDeltaX = (childFirst.left - parentFirst.left)
  - (childLast.left - parentLast.left);
const childDeltaY = (childFirst.top - parentFirst.top)
  - (childLast.top - parentLast.top);
  
// Play: using the WAAPI
parentElm.animate([
  { transform: `translate(${parentDeltaX}px, ${parentDeltaY}px)` },
  { transform: 'none' }
], { duration: 300, easing: 'ease-in-out' });

childElm.animate([
  { transform: `translate(${childDeltaX}px, ${childDeltaY}px)` },
  { transform: 'none' }
], { duration: 300, easing: 'ease-in-out' });
```

这里还有几件事要注意:
> 1. parent 和 child 的时间选项（`duration`，`easing`等）不一定需要相匹配。 随意创意！
> 2. 在本例中特意省略了更改父级和/或子项 (`width`、`height`) 的维度, 因为它是一个高级和复杂的主题。
> 3. 可以将 `Shared Element Transitions` 和 `Parent-Child Transitions` 结合起来，以获得更大的灵活性。

## Using Flipping.js for Full Flexibility

上面的技术可能看起来很简单，但是一旦你需要追踪多个元素转换，他们可能需要非常繁琐的编码。 Android通过以下方式减轻了这种负担：

* 将共享元素转换放到核心SDK
* 允许开发人员通过使用通用的 `android：transitionName` XML属性来识别哪些元素是共享的

github上有一个名为[Flipping.js](https://github.com/davidkpiano/flipping)的小型框架，它的想法与此相同。
通过向HTML元素添加data-flip-key =“...”属性，可以预测并高效地跟踪可能会在状态和状态之间改变位置和维度的元素。

例如，考虑这个初始视图：

```html
 <section class="gallery">
      <div class="photo-1" data-flip-key="photo-1">
        <img src="/photo-1"/>
      </div>
      <div class="photo-2" data-flip-key="photo-2">
        <img src="/photo-2"/>
      </div>
      <div class="photo-3" data-flip-key="photo-3">
        <img src="/photo-3"/>
      </div>
    </section>
```

和这个单独的详情视图：

```html
<section class="details">
      <div class="photo" data-flip-key="photo-1">
        <img src="/photo-1"/>
      </div>
      <p class="description">
        Lorem ipsum dolor sit amet...
      
    </section>
```

注意在上面的例子中，有2个元素具有相同的 `data-flip-key =“photo-1”`。 Flipping.js通过选择符合以下条件的第一个元素来跟踪“活动”元素：

* 元素存在于DOM中（即，它没有被移除或分离）
* 元素没有隐藏（提示：隐藏元素的 `elm.getBoundingClientRect()` 获得 `{ width: 0, height: 0 }` ）
* 在 `selectActive` 选项中指定的任何自定义逻辑

### Getting Started with Flipping.js

Flipping.js 有几个不同的包，根据需要选择：

* `flipping.js` : 轻量和低级;只在元素边界发生变化时才触发事件
*  `flipping.web.js` ：使用 [WAAPI](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) 来过渡动画
* `flipping.gsap.js` ： 使用 [GSAP](https://greensock.com/) 来过渡动画

unpkg

* [https://unpkg.com/flipping@latest/dist/flipping.js](https://unpkg.com/flipping@latest/dist/flipping.js)
* [https://unpkg.com/flipping@latest/dist/flipping.web.js](ttps://unpkg.com/flipping@latest/dist/flipping.web.js)
* [https://unpkg.com/flipping@latest/dist/flipping.gsap.js](https://unpkg.com/flipping@latest/dist/flipping.gsap.js)

或者 npm 安装

    npm install flipping --save
    
```javascript
// import not necessary when including the unpkg scripts in a <script src="..."> tag
import Flipping from 'flipping/adapters/web';

const flipping = new Flipping();

// First: let Flipping read all initial bounds
flipping.read();

// execute the change that causes any elements to change bounds
doSomething();

// Last, Invert, Play: the flip() method does it all
flipping.flip();
```  

处理FLIP转换作为函数调用的结果是一种常见的模式，  
`.wrap(fn)`方法首先调用`.read()`来透明地包装（或“装饰”）给定的函数。
然后获取函数的返回值，然后调用`.flip()`，然后返回返回值。这导致更少的代码：

```javascript
const flipping = new Flipping();

const flippingDoSomething = flipping.wrap(doSomething);

// anytime this is called, FLIP will animate changed elements
flippingDoSomething();
```

这里是一个使用`flipping.wrap()`来轻松实现转换字母效果的例子。点击任何地方看效果。


<p data-height="265" data-theme-id="light" data-slug-hash="QOYrEq" data-default-tab="js,result" data-user="lu7965" data-embed-version="2" data-pen-title="Flipping Birthstones #Codevember" class="codepen">See the Pen <a href="https://codepen.io/lu7965/pen/QOYrEq/">Flipping Birthstones #Codevember</a> by luchun (<a href="https://codepen.io/lu7965">@lu7965</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### Adding Flipping.js to Existing Projects

在[另一篇文章](https://css-tricks.com/robust-react-user-interfaces-with-finite-state-machines/)中，
作者使用有限状态机创建了一个简单的React图库应用程序。
它可以像预期的那样工作，但UI可以使用状态之间的一些平滑过渡来防止“跳跃”并改善用户体验。
让我们添加Flipping.js到我们的React应用程序来完成这一点。 （请记住，Flipping.js是框架不可知的。）

#### Step 1: Initialize Flipping.js

`Flipping`实例将驻留在`React`组件本身上，这样它就被隔离到只发生在该组件中的变化。
通过在`componentDidMount`生命周期钩子中设置来初始化`Flipping.js`：

```javascript
 componentDidMount() {
    const { node } = this;
    if (!node) return;
    
    this.flipping = new Flipping({
      parentElement: node
    });
    
    // initialize flipping with the initial bounds
    this.flipping.read();
  }
```

通过指定 `parentElement: node` ，我们告诉 Flipping 仅在呈现的 App 中查找具有 `data-flip-key` 的元素，而不是整个document。

然后，使用 `data-flip-key` 属性修改HTML元素（类似于 React 的 `key` 属性），以识别唯一的和“共享的”元素：

```javascript
 renderGallery(state) {
    return (
      <section className="ui-items" data-state={state}>
        {this.state.items.map((item, i) =>
          <img
            src={item.media.m}
            className="ui-item"
            style={{'--i': i}}
            key={item.link}
            onClick={() => this.transition({
              type: 'SELECT_PHOTO', item
            })}
            data-flip-key={item.link}
          />
        )}
      </section>
    );
  }
  renderPhoto(state) {
    if (state !== 'photo') return;
    
    return (
      <section
        className="ui-photo-detail"
        onClick={() => this.transition({ type: 'EXIT_PHOTO' })}>
        <img
          src={this.state.photo.media.m}
          className="ui-photo"
          data-flip-key={this.state.photo.link}
        />
      </section>
    )
  }
```
请注意，`img.ui-item` 和 `img.ui-photo` 分别由 `data-flip-key = {item.link} ` 和 `data-flip-key = {this.state.photo.link}` 表示：
当用户点击 `img.ui-item` 时，该项目设置为 `this.state.photo `，因此 `.link` 值将相等。

而且由于它们是相同的，所以 Flipping 会从 `img.ui-item` 缩略图平滑过渡到更大的 `img.ui-photo`。

现在我们需要做两件事情：

 1. 在组件将要更新时调用 `this.flipping.read()`
 
 2. 在组件完成更新时调用 `this.flipping.flip()`
 
 ```javascript
 componentWillUpdate() {
    this.flipping.read();
  }
  
  componentDidUpdate() {
    this.flipping.flip();
  }
```

这是最后的结果：

<p data-height="265" data-theme-id="light" data-slug-hash="POVMxj" data-default-tab="js,result" data-user="lu7965" data-embed-version="2" data-pen-title="FLIPping Gallery App" class="codepen">See the Pen <a href="https://codepen.io/lu7965/pen/POVMxj/">FLIPping Gallery App</a> by luchun (<a href="https://codepen.io/lu7965">@lu7965</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

如果你想自己实现自定义动画，你可以使用 flipping.js 作为一个简单的事件发射器。[阅读文档](https://github.com/davidkpiano/flipping)以获取更高级的用例。

Flipping.js及其适配器默认处理共享元素和父 - 子转换，以及：

* 中断的转换（在适配器中）
* enter/move/leave 状态
* 插件支持诸如镜像之类的插件，它允许新输入的元素“镜像”另一个元素的移动
* 并在未来计划更多功能！

## Resources

类似的库包括：

* [FlipJS](https://github.com/googlearchive/flipjs) 由 Paul Lewis 本人开发，处理简单的单元素翻转过渡。
* [React-Flip-Move](https://github.com/joshwcomeau/react-flip-move/) 一个由 Josh Comeau 编写的有用的React库
* [BarbaJS](http://barbajs.org/)并不是一个翻转库，但是一个允许在不同的URL之间添加平滑过渡，没有页面跳转。

更多资源：

*   [Animating the Unanimatable - Joshua Comeau](https://medium.com/developers-writing/animating-the-unanimatable-1346a5aab3cd#.n7k4kcs11)
*   [FLIP your Animations - Paul Lewis](https://aerotwist.com/blog/flip-your-animations/)
*   [Pixels are Expensive - Paul Lewis](https://aerotwist.com/blog/pixels-are-expensive/)
*   [Improving User Flow Through Page Transitions - Luigi de Rosa](https://www.smashingmagazine.com/2016/07/improving-user-flow-through-page-transitions/)
*   [Smart Transitions in User Experience Design - Adrian Zumbrunnen](https://www.smashingmagazine.com/2013/10/smart-transitions-in-user-experience-design/)
*   [What Makes a Good Transition? - Nick Babich](https://uxplanet.org/functional-animation-in-ux-design-what-makes-a-good-transition-d6e7b4344e5e#.t0usjdtlu)
*   [Motion Guidelines in Google's Material Design](https://material.google.com/motion/material-motion.html)
*   [Shared Element Transition with React Native](https://medium.freecodecamp.org/shared-element-transition-with-react-native-159f8bc37f50)

## 原文地址
[Animating Layouts with the FLIP Technique](https://css-tricks.com/animating-layouts-with-the-flip-technique/?utm_source=frontendfocus&utm_medium=email)