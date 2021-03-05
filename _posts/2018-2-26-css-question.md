---
layout: post
title: 前端面试问题 - CSS
---
收集一些前端面试题
<!-- more -->

## "resetting" 和 "normalizing" CSS 的区别？ 你会选择哪一个？
* *Resetting* 重置是为了去除元素上的所有默认浏览器样式。例如对于所有元素的`margin`，`padding`，`font-size`重置为相同。
你将不得不为常见的元素重新声明样式。
* *Normalizing* 规范化保留了有用的默认样式，而不是“移除所有样式”。它还纠正了常见浏览器的错误。

## CSS 隐藏元素的几种方法?
    
    // 使用 opacity 透明度属性
    .hide {
      opacity: 0;
    }
    // 设置 Visibility 可见性
    hide {
       visibility: hidden;
    }
    // 使用 display  显示性
    .hide {
       display: none;
    }
    // 使用固定定位移出屏幕
    .hide {
       position: absolute;
       left: -9999px;
    }
    // 如果不考虑子元素 可以设置宽高为0
     .hide {
           width: 0;
           height: 0;
        }
        
## CSS清除浮动的几种方法？
1.直接给元素加上 `clear:both`
````css
    main {float: left}
    aside {float: right}
    footer {clear: both}
````    
2.添加一个空的div `<div style="clear: both;"></div>`

3.给父元素加上 `overflow: hidden` 父元素将扩展以包含浮动元素，从而有效地清除后续元素

4
```css
.clearfix:after { 
   content: "."; 
   visibility: hidden; 
   display: block; 
   height: 0; 
   clear: both;
}
```

## 描述一下 `float` 以及它是如何工作的?

float 是一个 css 定位属性。
浮动元素仍然是页面流的一部分，并且会影响其他元素的位置（例如，文本将在浮动元素周围流动），
与`position：absolute`元素不同，它们从页面流中移除。

CSS `clear ` 属性可以用于位于 `left/right/都有` 浮动元素之下。

如果父元素只包含浮动元素，则其高度将被折叠为无。可以通过清除容器中浮动元素之后但在容器关闭之前的浮动来修复它。

`.clearfix` hack使用一个聪明的CSS伪选择器（：after）来清除浮动。
不用在父级上设置overflow ，而是对其应用额外的类`clearfix`。然后应用这个CSS：
```css
.clearfix:after {
  content: ' ';
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
```

或者，将`overflow：auto`或`overflow：hidden`属性赋予父元素，
这将在子元素内部建立一个新的块格式上下文，并将扩展为包含其子元素。

## 描述z-index以及如何形成堆叠上下文

CSS中的`z-index`属性控制重叠元素的垂直叠加顺序。z-index仅影响`position` 属性值不是`static` 的元素。

如果没有任何`z-index`值，元素按照它们出现在DOM中的顺序堆叠（在相同层次结构层级中最低的一个出现在最上面）。
具有非静态定位的元素（及其子元素）将始终显示在具有默认静态定位的元素的顶部，而不管HTML层次结构如何。

堆叠上下文是包含一组图层的元素。在本地堆栈上下文中，其子元素的z-index值是相对于该元素而不是文档根目录设置的。
在该上下文之外的层（即本地堆栈上下文的同级元素）不能位于其内的层之间。
如果元素B位于元素A的顶部，则即使元素C具有比元素B更高的 `z-index` ，元素A的子元素C也永远不会高于元素B.

每个堆叠上下文都是自包含的 - 在堆叠元素的内容之后，整个元素将按照父堆叠上下文的堆叠顺序进行考虑。
少数CSS属性会触发新的堆叠上下文，如`opacity`小于1，`filter `不是0，并且`transform `不是`none`。

## 描述块格式化上下文（BFC）及其工作原理。
块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的部分，
是块级盒布局发生的区域，也是浮动元素与其他元素交互的区域。
浮动，绝对定位的元素，`inline-blocks`, `table-cells`, `table-caption`和`overflow `不是`visible`的元素（除非该值已传播到视口）会建立新的块格式上下文。
创建块格式化上下文的方式如下：
* 根元素或其它包含它的元素
* 浮动元素 (元素的 float 不是 none)
* 绝对定位元素 (元素的 position 为 absolute 或 fixed)
* 内联块元素 (元素具有 display: inline-block)
* 表格单元格 (元素具有 display: table-cell，HTML表格单元格默认属性)
* 表格标题 (元素具有 display: table-caption, HTML表格标题默认属性)
* 匿名表格元素 (元素具有 display: table, table-row, table-row-group, table-header-group, table-footer-group [分别是HTML tables, table rows, table bodies, table headers and table footers的默认属性]，或 inline-table )
* overflow 值不为 visible 的块元素，

在BFC中，每个盒子的左外边缘都与包含块的左边缘接触（用于从右到左格式化，右边缘接触）。

块格式化上下文对于定位 (参见 float) 与清除浮动 (参见 clear) 很重要。
定位和清除浮动的样式规则只适用于处于同一块格式化上下文内的元素。
浮动不会影响其它块格式化上下文中元素的布局，并且清除浮动只能清除同一块格式化上下文中在它前面的元素的浮动。
外边距合并也只发生在属于同一块格式化上下文的块级元素之间。

## 解释CSS精灵，以及如何在页面或网站上实现它们。
CSS精灵将多个图像合并为一个较大的图像。它是图标常用的技术。
如何实现它：
1. 使用一个将多个图像打包成一个的精灵生成器，并为其生成适当的CSS。
2. 每个图像都有一个相应的CSS类，其中定义了`background-image`，`background-position`和`background-size`属性。
3. 要使用该图像，请将相应的类添加到您的元素中。

优点：
* 减少多个图像的HTTP请求数量（每个spritesheet只需要一个请求）。但对于HTTP2，加载多个图像不再是个问题。
* 提前下载直到需要时才会下载的资产，例如只出现在以下情况的图像：悬停伪状态。闪烁不会被看到。

## 你将如何解决浏览器特定的样式问题？
* 在确定问题和有问题的浏览器后，使用单独的样式表，仅在使用特定浏览器时才加载。尽管这种技术需要服务器端渲染。
* 使用类似Bootstrap的库已经为您处理了这些样式问题。
* 使用 `autoprefixer` 自动添加供应商前缀到您的代码。
* 使用重置CSS或Normalize.css。

## 你如何为功能受限的浏览器提供页面？你使用什么技术/流程？
* 优雅降级 - 为现代浏览器构建应用程序的做法，同时确保它在旧版浏览器中保持功能。
* 渐进式增强 - 构建用户体验基础级应用程序的实践，但在浏览器支持时添加增强功能。
* 使用caniuse.com检查功能支持。
* 用于自动供应商前缀插入的Autoprefixer。
* 使用Modernizr进行功能检测。

## 你有没有使用网格系统，如果有的话，你喜欢什么？

我喜欢基于浮动的网格系统，因为它仍然支持其他现有系统（flex，grid）中最多的浏览器支持。
它已经在Bootstrap中使用了很多年，并且已经被证明是可行的。

## 描述伪元素并讨论它们的用途。
CSS伪元素是一个添加到选择器的关键字，可以让您选择所选元素的特定部分。
* 它们可以用于装饰（`:first-line`, `:first-letter`）或将元素添加到标记（`content: ...`），而无需修改标记（`:before`, `:after`）。
`:first-line` 和 `:first-letter` 可以用来装饰文本。

* 在如上所示的`.clearfix` hack中使用，用`clear：both`来添加零空间元素。
* 工具提示中的三角箭头使用`：before`和`after`之后。鼓励分离关注点，因为三角形被视为样式的一部分，而不是真正的DOM。如果不使用额外的HTML元素，只用CSS样式绘制三角形是不太可能的。

## 解释你对盒子模型的理解，以及如何告诉浏览器在不同的盒子模型中呈现你的布局。
CSS框模型描述了为文档树中的元素生成的矩形框，并根据可视化格式模型进行布局。
每个盒子都有一个内容区域（例如文本，图像等）以及可选的周围`padding`，`border`和`margin `区域。

CSS框模型负责计算：
* 块元素占用多少空间。
* 边框和/或边距是否重叠或折叠。
* 一个盒子的尺寸。

盒子模型有以下规则：
* 块元素的尺寸通过`width, height, padding, border`和 `margin` 来计算。
* 如果未指定`height`，则块元素将与其包含的内容一样高，并加上`padding`（除非有浮动）。
* 如果未指定`width`，则非浮动块元素将展开以适合其父辈减去`padding`的宽度。
* 元素的`height`由内容的`height`计算。
* 元素的`width`由内容的`width`计算。
* 默认情况下，`padding` 和 `border` 不是元素宽度和高度的一部分。

## * {box-sizing：border-box; }是做什么的呢？它的优点是什么？
*  默认情况下，元素具有`box-sizing：content-box`应用，并且只有内容大小被计入。
* `box-sizing: border-box` 改变元素`width`和 `height` 的计算方式，`border` 和 `padding` 也包含在计算中。
* 现在通过内容的高度+垂直填充+垂直边框宽度来计算元素的高度。
* 现在通过内容的宽度+水平填充+水平边框宽度来计算元素的宽度。

## `inline` 和 `inline-block` 之间有什么区别？

 - | block | inline-block | inline 
------------ | ------------- | -------------  | -------------
尺寸 | 填充其父容器的宽度 | 取决于内容 | 取决于内容
定位 | 开始一个新行，并且不允许旁边的HTML元素（除非添加浮点数） | 与其他内容一起流动，并允许旁边的其他元素 | 与其他内容一起流动，并允许旁边的其他元素
可以指定宽度和高度 | 可以 | 可以 | 不可以， 将忽略
可以`vertical-align`对齐 | No | Yes | No
`margin` 和 `padding` | 每一边都会遵守 | 每一边都会遵守 | 只有水平两边起作用。如果指定了垂直边，也不会影响布局。垂直空间取决于`line-height`，即使 `border` 和 `padding` 出现在内容周围。
浮动 | - | - | 变得像块元素，您可以设置垂直 `margin` 和 `padding`。

## relative，fixed，absolute 和 static 位置元素之间有什么区别？
* static - 默认位置;元素将像往常一样流入页面。 `top`，`right`，`bottom`，`left`和`z-index`属性不适用。
* relative - 该元素的位置相对于其自身进行调整，而不会改变布局（并且因此为未定位的元素留下间隙）。
* absolute - 该元素从页面流中移除，并定位在相对于其最接近定位祖先的指定位置（如果有的话），或相对于初始包含块。绝对放置的盒子可以有边距，并且不会与其他边缘合并。这些元素不会影响其他元素的位置。
* fixed - 该元素从页面流中移除并位于相对于视口的指定位置，并且在滚动时不移动。
* sticky  - 粘滞定位是相对和固定定位的混合体。该元素被视为相对定位，直到它超过指定的阈值，此时它被视为固定位置。
## 简要说一下CSS 的元素分类?

## 页面导入样式时，使用link 和 @import 有什么区别?
