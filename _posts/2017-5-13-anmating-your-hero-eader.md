---
layout: post
title: Animating your hero header
---
如果你曾经访问过一些网站，迎接你的是一张大图或者视频，并且有大标题在上边。
你遇到的正是"Hero Header"，这是一种常见的介绍网站的形式。
它可以是一个向用户展示你的网站是做什么的的好机会。
<!-- more -->
对于很多用户，这将形成他们对你的品牌的第一印象,所以你更应该将它做的有闪光点。

下边就是我们将要放在一起的东西。

<iframe id="result-iframe" sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-modals allow-forms" src="//s.codepen.io/donovanh/fullembedgrid/PpbvZB?type=embed&amp;animations=run" allowtransparency="true" frameborder="0" scrolling="yes" allowfullscreen="true" name="CodePen Preview for Landing page with animated foreground elements (staggered and cubic bezier and wedge)" title="CodePen Preview for Landing page with animated foreground elements (staggered and cubic bezier and wedge)" data-src="//s.codepen.io/donovanh/fullembedgrid/PpbvZB?type=embed&amp;animations=run"></iframe>

### 鹤立鸡群
我们可以使用动画在内容出现的第一时间添加润色，也可以用它来控制信息出现的顺序，并吸引眼球。

在本教程中，我们将对顶部的内容进行动画，并利用这个机会来尝试更多的时间功能、动画编排和创建可重用的关键帧。

### 介绍标题

这是我们的开始。

它有一个很好的背景图像，一些标题和一些呼叫按钮。

### 使其反弹

就像你在舞台表演和舞蹈中看到的舞蹈一样，我们会考虑英雄头部的各个部分是如何移动的。
我们可以让元素像背景图像一样滑动，这将显示元素之间的良好连接。
让我们更进一步，让每一个元素都跳出屏幕。

开始我们将为动画创建一些关键帧。
在keyframe容器中，我们要“0%”和“100%”帧，表示动画的开始和结束状态。

    @keyframes pop-in {
      0% {
        opacity: 0;
        transform: translateY(-4rem) scale(.8);
      }
      100% {
        opacity: 1;
        transform: none;
      }
    }
    
最初的内容是不可见的，所以我们设置透明度为0。
我们还将使用一个转换来将内容的位置提高到4em。
最后我们要添加一个新的变换。我们在初始帧中将大小缩小到0.8。    

这意味着当动画开始时，元素将会变得更小，最终会使动画达到正常大小。
让我们看看如何将其应用到内容中。

### 移动元素
我们现在可以将这些关键帧应用到我们的内容上。
但是，不要每次只向每个元素添加一个`animation`属性，
让我们利用这个机会为动画设置一个可重用的类。
如果我们创建一个名为`animation-pop-in`的新类，我们就可以更有效地使用该动画。

为了开始，在HTML中，我们将这个类添加到我们想要动画的每个内容项中。

    ... other HTML ...
    <section class="header-content">
      <img class="rocky-dashed animate-pop-in" src="images/rocky-dashed.svg">
      <h1 class="header-title animate-pop-in">Your awesome landing page</h1>
      <h3 class="header-subtitle animate-pop-in">A useful start for your projects</h3>
      <p class="header-button animate-pop-in"><a href="#calls-to-action" class="button">Get started today</a></p>
    </section>
    ... other HTML ...

我们将`animate-pop-in`类添加到图像、标题和段落文本。现在我们可以在CSS中使用它。
这是我们在CSS中添加的内容。

    .animate-pop-in {
      animation: pop-in .6s ease-out forwards;
    }
 
这将为每个元素应用动画`pop-in`。它让它们出现在一段时间内。6秒，并使用`ease-out`时间函数。  
  
这是一个开始!但我们可以做得更好。
  
### 编排

当前页面仍然是空白的时候，内容元素就会出现。
当我们构建背景动画时，我们使用了动画延迟属性。
这意味着背景在动画开始前等待5秒。

让我们为内容项添加一些延迟，以便它们在背景开始出现后出现。

在开始添加延迟之前，我们先确定要使用哪些元素。

    .rocky-dashed {
    
    }
    
    .header-title {
    
    }
    
    .header-subtitle {
    
    }
    
    .header-button {
    
    }
    
    
这4个元素需要同时出现。
值得庆幸的是，我们不需要为每个动画设置完整的动画属性，
因为这些元素已经有了`animate-pop-in`类。
我们只指定一个延迟。由于背景动画需要大约1秒的时间，
让我们以延迟1秒开始，并为每个元素增加它。

    .rocky-dashed {
      animation-delay: 1s;
    }
    
    .header-title {
      animation-delay: 1.2s;
    }
    
    .header-subtitle {
      animation-delay: 1.4s;
    }
    
    .header-button {
      animation-delay: 1.6s;
    }
    
我们还需要设置这些元素在刚加载时上是不可见的，
以避免在延迟动画之后闪现。设置`animate-pop-in`元素的不透明度。

    .animate-pop-in {
      animation: pop-in .6s ease-out forwards;
      opacity: 0;
    }
我们来看看结果。我们已经添加了一个延迟，
从1秒开始，然后每一个项目等待一个进一步。2秒前开始。当我们看到结果时，我们看到动画是交错的。

这可能只是我的观点，但我认为这些看起来似乎有点晚了。
让我们回到过去，改变数字，让它们从.6s开始。

    .rocky-dashed {
      animation-delay: .6s;
    }
    
    .header-title {
      animation-delay: .8s;
    }
    
    .header-subtitle {
      animation-delay: 1s;
    }
    
    .header-button {
      animation-delay: 1.1s;
    }

在第二个想法上，让我们做最后一个项目，`header-button`看起来更接近于0.1秒的差距。
现在大家都觉得有点紧了。    
    
这是更好的。用眼睛来调整动画延迟和定时功能是个好主意。
有时动画会感觉不太好，这可能只是一个关于时间的问题，直到所有的时间都在一起。

现在我们有了一个交错的动画。
看起来很不错，但是动画结尾的感觉有点平淡。
让我们看看我们能不能给这个小动画带来一些有弹性的时间函数。

### 反弹

是时候用更有趣的东西来代替原来的时间功能了。在[cubic-bezier.com](http://cubic-bezier.com/#0,.9,.3,1.2)上，
我们将创建一个快速开始的曲线，然后从顶部开始，然后重新回到终点。
将第一个点放在靠近顶部的左轴上，让它快速启动，然后第二点在上面的线上方。
由此产生的曲线应该是一个长长的陡峭弧线，在末端逐渐变细。

把坐标放到我们的动画属性现在看起来是这样的。

    animation: pop-in .6s cubic-bezier(0, 0.9, 0.3, 1.2) forwards;

现在看起来好多了。

### 一起工作


这个编排的目的不仅是为了看起来很酷，
而且是为了吸引人们注意我们想让访客看到的东西。
在这种情况下，它很简单，我们希望人们看到标题，
然后将注意力吸引到中间的“call to action”按钮上。

不过这里还有一个目标，那就是让人们知道页面上有更多的内容。
我们将帮助大家注意在底部使用`chevron`，我们也可以在标题中添加一个微妙的动画。
让我们用动画的方式来尝试一下旋转变换，在屏幕底部的白色大楔子。

### 动画楔

我们为这个新动画创建关键帧。

    @keyframes rotate-up {
      100% {
        transform: rotateZ(-4deg);
      }
    }

你会注意到，这次没有“0%”。那是因为它是可选的。您可以选择退出开始，甚至是结束关键帧，浏览器将根据对元素的样式来推断它。在这种情况下，它将从没有转换，到旋转。
我们通过对 `header:after` 进行一些更改来应用这个方法。

    header:after {
      animation: rotate-up .5s .5s cubic-bezier(0, 0.5, 0, 1) forwards;
      background: #F9FCFF;
      content: "";
      height: 40rem;
      left: -5%;
      position: absolute;
        right: -5%;
        top: 90%;
      transform-origin: 0 0;
      z-index: 0;
    }

首先我们添加动画属性，赋予它`rotate-up.`的动画名称。
我决定只持续0.5秒。如果它更久，当其他内容出现时，它仍然会移动，这可能会引起混淆。
我们希望这是一个微妙的动画，不会干扰主要内容。我们会延期的。使用与背景图像相同的时间函数。

最后，我们想让它在没有任何`transform`的情况下开始，因此我们删除了这条线。
它现在应该使用`rotate-up`的关键帧来旋转，从没有转换到-4度。

作为最后一分钟的奖励，我也为背景图像添加了一些动画。真的把一切都放在了一起，检查结果。

### Next steps

在本教程中，我们学习了如何创建和应用动画到元素的类中，然后使用`animation-delay`属性来编排它们。
我们将能够在不添加任何额外的CSS代码到我们的项目的其他地方重用这个`animate-pop-in`类，
这实际上使它成为我们自己动画库的开始。









