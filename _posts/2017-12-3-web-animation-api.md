---
layout: post
title: Web Animation API - 在 JavaScript 中释放 CSS keyframes 的力量
---

如果你曾经使用过CSS3关键帧动画，那么你可能会感受到这个功能受到的严重阻碍。
一方面，CSS关键帧可以让你使用纯CSS创建复杂的动画，也存在一个问题 - 所有的事情都必须在 CSS 内部预先声明。
jQuery 中的方法之一是 `animate()` 方法，它可以快速设置元素上的动画，而无需在 CSS 和 JavaScript 之间来回切换。

从 jQuery 开始，JavaScript 的 Web Animation API 提供了一种简单的方法，
在原生 JavaScrip t中使用 CSS 关键帧的全部功能来动画元素，而不必离开 JavaScript 舒适的环境。
方便的方法和事件处理程序可以暂停，倒回，跳转到动画时间轴中的某个点等等。

最重要的问题，首先是浏览器兼容性。
根据 [CanIuse](https://caniuse.com/web-animation/embed) 的说法，Web Animation API 的核心功能已经被除了 I以外的所有主流浏览器所支持：

<iframe src="//caniuse.bitsofco.de/embed/index.html?feat=web-animation&amp;periods=future_1,current,past_1,past_2" frameborder="0" width="100%" height="432px"></iframe>

开始使用 WAAPI，您可以切换到[web-animation API polyfill](https://github.com/web-animations/web-animations-js)。

## Creating a simple keyframes Web Animation

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

```
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

如果要使用纯CSS来声明上面的代码，它看起来像这样：

```
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
```


正如看到的，这两种语法非常相似，如果你已经熟悉 CSS 关键帧，那么把它移植到 JavaScript 就没有问题。与 JavaScript 版本有一些区别值得记住：

* 在JavaScript版本中，属性字符串值应该用引号（`transform：'translateX（0'`）
* 驼峰式（`borderRadius：0`）。
* 每个属性声明使用逗号而不是分号结束(除了最后一个属性不需要)

默认情况下，使用 JavaScript 设置的关键帧在播放时均匀间隔，给予每个关键帧的时间相同。
但是，通过在关键帧中添加 `offset` 属性，可以设置该关键帧应该开始播放的点，例如 60％ 标记为 0.6，类似于使用纯CSS。

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
	
这里是上面的例子中使用的keyframeOptions参数：	
```
var boxref = document.getElementById("box")
boxref.animate(boxframes, {
    duration: 1000,
    fill: 'forwards',
    easing: 'ease-in'
})
```

如果想使用 animation 简写属性在CSS中定义相同的选项，它将如下所示：

    animation: animatethebox 1s ease-in forwards;

## Controlling an Animation (playing, pausing it etc)

使用 Animation API 创建关键帧动画的部分优点是可以根据需要操作结果，例如暂停，跳过前进或挂接到动画的事件处理程序。
完成这一切的第一步是在调用 `animate()` 方法时将动画分配给变量：

    var myanimation = Element.animate(keyframes, keyframeOptions)
    
这将创建对 **Animation object instance** 的引用，以允许通过各种暴露的属性和方法来操纵动画。

    var myanimation = Element.animate(/* .. */)
    myanimation.pause() // immediately pause animation to control it manually
    myanimation.curentTime = 1000 // jump to 1 second from start of animation
    myanimation.play() // play animation

以下是修改后使用控件回放的原始示例：

<p data-height="265" data-theme-id="light" data-slug-hash="OOqVwo" data-default-tab="js,result" data-user="lu7965" data-embed-version="2" data-pen-title="Web Animation API- Animating a DIV using JavaScript Keyframe Animation with Playback Controls" class="codepen">See the Pen <a href="https://codepen.io/lu7965/pen/OOqVwo/">Web Animation API- Animating a DIV using JavaScript Keyframe Animation with Playback Controls</a> by luchun (<a href="https://codepen.io/lu7965">@lu7965</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

注意在这个例子中，立即在目标元素上调用了 `animate()`，这会导致动画立即运行。
为了防止这种情况，之后立即调用 `pause()` 方法。这是手动控制动画时使用的常用模式：

    var boxanimation = boxref.animate(boxframes, {
        duration: 1000,
        fill: 'both',
        easing: 'ease-in'
    })
     
    boxanimation.pause()
    

### Animation object Instance Properties and Methods

以下列出了动画对象实例的属性，方法和事件处理程序，如上所述，它是在为`animate()`方法分配引用时创建的：

#### Properties

* `currentTime` : 获取或设置动画的当前时间值（以毫秒为单位）。
* `effect` : 获取或设置动画的目标效果。**目前对所有浏览器的支持都受到限制。**
* `finished` : 动画完成时将会 resolved 的 promise 对象。**目前对所有浏览器的支持都受到限制。**
* `id` : 获取或设置用于标识动画的字符串。
* `playbackRate` : 用于获取或设置动画回放速率的整数。例如，1 =正常，0 =暂停，2 =双倍，-1 =反向 等等
* `playState` : 返回动画当前状态的只读属性："idle", "pending", "running", "paused", or "finished"。
* `ready` : 当动画准备好播放时，一个被 resolved 的 promise 对象。**目前对所有浏览器的支持都受到限制。**
* `startTime` : 获取或设置动画当前时间（以毫秒为单位）的浮点数。
* `timeline` : 获取或设置动画的当前时间轴。默认为文档时间轴 (`document.timeline`)**目前对所有浏览器的支持都受到限制。**

#### Methods

* `cancel()` : 取消动画。
* `finish()` : 立即完成一个动画。
* `pause()` : 暂停动画。
* `play()` : 播放动画。
* `reverse()` : 颠倒动画的当前方向并播放它。

#### Event Handlers
* `oncancel` : 当动画被取消时触发，比如通过调用 `cancel()` 方法。
* `onfinish` : 动画完成时触发，例如调用`finish()`方法。

### Creating a simple scrubber using Web Animation API

通过操作 `currentTime` 属性，下面给基本动画添加了一个简单的刷新器：

<p data-height="265" data-theme-id="light" data-slug-hash="LOaVvz" data-default-tab="js,result" data-user="lu7965" data-embed-version="2" data-pen-title="Web Animation API- Scrubbing the Animation" class="codepen">See the Pen <a href="https://codepen.io/lu7965/pen/LOaVvz/">Web Animation API- Scrubbing the Animation</a> by luchun (<a href="https://codepen.io/lu7965">@lu7965</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

创建了一个HTML5范围滑块作为控制器。
当动画第一次运行（自动）时，动画的 `currentTime` 属性值将不断地反馈到滑块，以使两者同步。
目前还没有“onprogress”事件处理程序或者类似的东西在WAAPI动画运行时只运行代码，所以使用`requestAnimationFrame()`来监视动画的进度。
一旦动画完成，利用WAAPI事件 `onfinish` 来调用 `cancelAnimationFrame()`，并停止不必要的更新滑块。

每当用户与Ranger滑块交互时，都会更新WAAPI动画以与滑块同步：

    scrubber.addEventListener('mousedown', ()=>{
        boxanimation.pause()
        updateScrubber()
    })
     
    scrubber.addEventListener('mouseup', ()=>{
        boxanimation.play()
    })
     
    scrubber.addEventListener('input', ()=>{
        boxanimation.currentTime = scrubber.value * animationlength
    })

当用户将鼠标悬停在滑块上时，暂停动画并更新滑块的值以与动画的 `currentTime` 属性同步。
当用户拖动滑块时，会发生相反的情况 - 同步`currentTime`属性以反映滑块的值，所以前者依赖于后者。
最后，当用户将鼠标悬停在滑块上时，恢复动画的自动播放。

## Animating Multiple Elements at Once

在下一个示例中，将演示使用WAAPI一次动画多个元素，并在所有元素全部结束后执行操作

> 注意：在撰写本文时，即使在Chrome和FF中，对 WAAPI promises 的原生支持也没有实现。使用 Web Animation Next Polyfill 功能来跨浏览器工作。

<p data-height="265" data-theme-id="light" data-slug-hash="OOqyGV" data-default-tab="js,result" data-user="lu7965" data-embed-version="2" data-pen-title="Web Animation API- Text and Dropping Letters Effect" class="codepen">See the Pen <a href="https://codepen.io/lu7965/pen/OOqyGV/">Web Animation API- Text and Dropping Letters Effect</a> by luchun (<a href="https://codepen.io/lu7965">@lu7965</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

这里没有太复杂的事情。基本上，循环遍历并在标题中的每个字母上调用 `animate()` ，并将每个Animation对象实例存储在一个数组中。
有了这个数组，我可以按需循环播放一系列动画。
每个动画的 finished 属性都返回一个Promise，该动画完成播放后解析，我利用 `Promise.all()`在所有动画完成播放时重置整个动画。

## Creating an Animation using the `Animation()` constructor function

到目前为止，都是直接在元素上使用`animate()`对象创建了WAAPI动画，返回一个 `Animation` 对象实例。
虽然失望，但还是要说。未来可以使用 `Animation()` 构造函数来完成相同的事情。

> 对于 `Animation()` 的支持在编写时还没有浏览器实现，即使在 Chrome 和 FF 中也是如此。不得不使用 Web Animation Next Polyfill 来跨浏览器工作。  

下面是如何调用 `Animation()` 构造函数：

    var myanimation = new Animation([effect][, timeline]);

该函数接受两个参数：
 
* `effect` : 动画效果。在撰写本文时，仅支持 `keyframeEffect` 对象。     
* `timeline` : 动画时间轴。在撰写本文时，仅支持 `document.timeline`。

看看这是如何工作的一个简单的例子：

<p data-height="265" data-theme-id="light" data-slug-hash="WXmQgw" data-default-tab="html,result" data-user="lu7965" data-embed-version="2" data-pen-title="Web Animation API- Animating a DIV using Animation() constructor" class="codepen">See the Pen <a href="https://codepen.io/lu7965/pen/WXmQgw/">Web Animation API- Animating a DIV using Animation() constructor</a> by luchun (<a href="https://codepen.io/lu7965">@lu7965</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

这是 JavaScript 代码：

    var boxref = document.getElementById("box")
     
    var boxkeyFrames = new KeyframeEffect( 
        boxref, // element to animate
        [
            { transform: 'translateX(0) rotate(0deg)', background:'red' }, // keyframe 
            { transform: 'translateX(90vw) rotate(180deg)', background:'blue' }
        ], 
            { duration: 2000, fill: 'forwards', iterations: 5 } // keyframe options
    );
     
    var boxanimation = new Animation(boxkeyFrames, document.timeline)
     
    boxanimation.play()
    
新的 `KeyframeEffect()` 对象是一个全合一的对象，它包含动画的所有设置，从目标元素，要使用的关键帧到关键帧选项。        
    

## Are You Ready for WAAPI?

WAAPI 在完全成熟的时候，将会把CSS关键帧的动画元素的多功能性和易用性带入JavaScript环境。
尽管现代浏览器中还没有实现一些更高级的功能，但如果使用正确的polyfill，则可以立即开始利用WAAPI。
很高兴看到不再需要转向像 [jQuery](https://jquery.com/) 或 [Anime](https://github.com/juliangarnier/anime) 这样的外部库来创建复杂的动画。

Recommended Reading:

*   [Web_Animations_API on Mozilla](https://developer.mozilla.org/en-US/docs/Web/API/)
*   [Web Animation Polyfill](https://github.com/web-animations/web-animations-js)
*   [Web Animation Next Polyfill](https://codepen.io/reccanti/pen/yYyWNe)


##
 
### 原文地址

[Web Animation API- Unleashing the Power of CSS keyframes in JavaScript](http://www.javascriptkit.com/javatutors/web-animation-api-tutorial.shtml)

