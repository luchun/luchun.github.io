---
layout: post
title: Web Animation API - 在 JavaScript 中释放 CSS keyframes 的力量
---

如果你曾经使用过CSS3关键帧动画，那么你可能会感受到这个功能受到的严重阻碍。
一方面，CSS关键帧可以让你使用纯CSS创建复杂的动画，也存在一个问题 - 所有的事情都必须在 CSS 内部预先声明。
jQuery 中我最喜欢的方法之一是 `animate()` 方法，它可以快速设置元素上的动画，而无需在 CSS 和 JavaScript 之间来回切换。

从 jQuery 开始，JavaScript 的 Web Animation API 提供了一种简单的方法，
在原生 JavaScrip t中使用 CSS 关键帧的全部功能来动画元素，而不必离开 JavaScript 舒适的环境。
方便的方法和事件处理程序可以暂停，倒回，跳转到动画时间轴中的某个点等等。

最重要的问题，首先是浏览器兼容性。
根据 [CanIuse](https://caniuse.com/web-animation/embed) 的说法，Web Animation API 的核心功能已经被除了 I以外的所有主流浏览器所支持：

<iframe src="//caniuse.bitsofco.de/embed/index.html?feat=web-animation&amp;periods=future_1,current,past_1,past_2" frameborder="0" width="100%" height="432px"></iframe>

开始使用 WAAPI，您可以切换到[web-animation API polyfill](https://github.com/web-animations/web-animations-js)。

## 创建一个简单的关键帧Web动画

要使用 Web Animation API 为关键帧动画制作动画，只需在元素上调用 `animate()` 函数：

    Element.animate(keyframes, keyframeOptions)
    
这个函数接受两个参数：   
 
* `keyframes` : 包含所需CSS关键帧的JavaScript表示的数组
* `keyframeOptions` : 包含动画的其他设置，如 easing, duration, fill-mode 等

看看下面这个简单的例子，它使用 `animate()` 函数代替CSS关键帧来渲染动画

<p data-height="265" data-theme-id="light" data-slug-hash="NwJKBJ" data-default-tab="js,result" data-user="lu7965" data-embed-version="2" data-pen-title="Web Animation API- Animating a DIV using JavaScript Keyframe Animation" class="codepen">See the Pen <a href="https://codepen.io/lu7965/pen/NwJKBJ/">Web Animation API- Animating a DIV using JavaScript Keyframe Animation</a> by luchun (<a href="https://codepen.io/lu7965">@lu7965</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### The keyframes argument

`animate()` 的第一个参数是一个对象数组，每个对象都包含一个关键帧，它们一起构成了所需的动画。这是用于上面的例子：

```javascript
var boxframes = [
    {
        transform: 'translateX(0)',
        background: 'red',
        borderRadius: 0
    },
    {
        transform: 'translateX(200px) scale(.5)', 
        background: 'orange',
        borderRadius: 0,
        offset: 0.6 /* set explicit point (60%) when frame starts */
    },
    {
        transform: 'translateX(400px)',
        background: 'green',
        borderRadius: '50%'
    }
]

```

如果我们要使用纯CSS来声明上面的代码，它看起来像这样：

@keyframes animatethebox{
    0%{
        transform: translateX(0);
        background: red;
        borderRadius: 0;
    }
     
    60%{
        transform: translateX(200px) scale(.5);
        background: orange;
        borderRadius: 0;
    }
     
    100%{
        transform: translateX(400px);
        background: green;
        borderRadius: 50%;
    }
}

正如看到的，这两种语法非常相似，如果你已经熟悉 CSS 关键帧，那么把它移植到 JavaScript 就没有问题。与 JavaScript 版本有一些区别值得记住：

* 在JavaScript版本中，属性字符串值应该用引号（`transform：'translateX（0'`）
* 驼峰式（`borderRadius：0`）。
* 每个属性声明使用逗号而不是分号结束(除了最后一个属性不需要)

默认情况下，使用 JavaScript 设置的关键帧在播放时均匀间隔，给予每个关键帧的时间相同。
但是，通过在关键帧中添加 `offset` 属性，我们可以设置该关键帧应该开始播放的点，例如 60％ 标记为 0.6，类似于使用纯CSS。

### The keyframeOptions argument

`animate()` 方法的第二个参数是一个精确调整动画行为的对象，
许多选项直接从 CSS 的 `animation-*` 属性映射，如“`animation-delay`”，“`animation-fill-mode`”等。所有的属性都是可选的，如果没有设置则回退到默认值：

<table cellspacing="0" cellpadding="3" border="1" width="100%">
	<caption>&nbsp;</caption>
	<tbody><tr valign="top">
		<th width="15%" bgcolor="#D8EA99">属性</th>
		<th width="20%" bgcolor="#D8EA99">等效 CSS</th>
		<th width="70%" bgcolor="#D8EA99">描述</th>
	</tr>
	<tr valign="top">
		<td width="15%"><b>id</b></td>
		<td width="15%">none</td>
		<td width="70%">给这个动画的命名以便在后面的代码中引用。</td>
	</tr>
	<tr valign="top">
		<td width="15%"><b>delay</b></td>
		<td width="15%">animation-delay</td>
		<td width="70%">动画开始之前的延迟（整数)毫秒。<u>默认 0s</u>.</td>
	</tr>
	<tr valign="top">
		<td width="15%"><b>direction</b></td>
		<td width="15%">animation-direction</td>
		<td width="70%">定义动画是否应该正常播放，反之亦然，或两者之间是否交替播放。可能的值是：
		    <ul>
			    <li><b>normal</b>: 动画正常播放。在每个动画周期之后，动画重置为开始状态并重新开始<u>（默认）</u></li>
			    <li><b>reverse</b>: 从结束状态开始反向播放动画。在每个动画周期之后，动画重置为结束状态并重新开始。</li>
			    <li><b>alternate</b>: 动画在正常和反向之间交替。相反，动画从结束状态开始并向后播放。动画定时功能也相反。</li>
			    <li><b>alternate-reverse</b>: 动画在反向和正常方向之间交替，从第一次迭代开始反向。</li>
		    </ul>
		</td>
	</tr>
	<tr valign="top">
		<td width="15%"><b>duration</b></td>
		<td width="15%">animation-delay</td>
		<td width="70%">动画的持续时间（整数），以毫秒为单位，如1000.默认为0（无动画，跳转到最后一帧）。</td>
	</tr>
	<tr valign="top">
		<td width="15%"><b>easing</b></td>
		<td width="15%">animation-timing-function</td>
		<td width="70%">S设置用于动画 <code>@keyframe</code> 缓动功能。可用值 "<code>ease</code>", "<code>ease-in</code>", "<code>ease-in-out</code>","<code>linear</code>", "<code>frames(integer)</code>" 等. <u>默认 "linear"</u>.</td>
	</tr>
	<tr valign="top">
		<td width="15%"><b>endDelay</b></td>
		<td width="15%">n/a</td>
		<td width="70%">动画结束后延迟的毫秒数。当基于另一个动画的结束时间对多个动画进行排序时，这非常有用。默认为0。<u>D默认为0</u></td>
	</tr>
	<tr valign="top">
		<td width="15%"><b>fill</b></td>
		<td width="15%">animation-fill-mode</td>
		<td width="70%">定义当动画不再播放时，动画应如何将样式应用于其目标。<u>默认为 "none"</u>。 可能的值是：<ul>
			<li><b>none</b>: 不播放动画时，不应将任何样式应用于目标。<u>Default value</u>.</li>
			<li><b>forwards</b>: 当动画未播放时，目标元素将保留最后关键帧中定义的计算样式（即：当关键帧处于100％时）。</li>
			<li><b>backwards</b>: 当动画未播放时，目标元素将保留第一个关键帧中定义的计算样式（即：当关键帧处于0％时）。</li>
			<li><b>both</b>: 当动画未播放时，目标元素将保留在第一个和最后一个关键帧中定义的计算样式。</li>
		</ul>
		</td>
	</tr>
	<tr valign="top">
		<td width="15%"><b>iterationStart</b></td>
		<td width="15%">n/a</td>
		<td width="70%">设置动画应该开始的迭代中的点。值应该是一个正数，浮点数。在迭代次数为1的动画中， <code>iterationStart</code> 的值为0.5会在中途开始动画。
		 在2次迭代的动画中，<code>iterationStart</code> 值为1.5，通过第二次迭代等途径开始动画。 I<u>Defaults to 0.0</u>.</td>
	</tr>
	<tr valign="top">
		<td width="15%"><b>iterations</b><p>&nbsp;</p>
		<p>&nbsp;</p></td>
		<td width="15%">animation-iteration-count</td>
		<td width="70%">
		    设置停止前动画应该运行的次数。<code>Infinity</code> 意味着永远。<u> 默认为1</u></td>
	</tr>
	</tbody></table>
	

## 原文地址
[Web Animation API- Unleashing the Power of CSS keyframes in JavaScript](http://www.javascriptkit.com/javatutors/web-animation-api-tutorial.shtml)

 http://www.javascriptkit.com/javatutors/web-animation-api-tutorial.shtml
 http://blog.cowchimp.com/monitoring-unused-css-by-unleashing-the-devtools-protocol
 https://medium.com/samsung-internet-dev/common-responsive-layouts-with-css-grid-and-some-without