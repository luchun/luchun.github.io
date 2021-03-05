---
layout: post
title: 你不知道的 (S)CSS 最佳实践
---

即使您现在使用流行的框架（如React，Angular或Vue.js）构建应用程序，您仍然需要为其添加一些样式。
根据您使用的技术，您需要以特定的方式编写您的样式。
例如对于React，由于它是组件性质，最好使用 [CSS modules](https://github.com/css-modules/css-modules) 编写样式。
如果你想使用最新的 CSS 功能，使用 [CSSNext](http://cssnext.io/) 是明智之举。
不要忘记很好的预处理器，比如 Sass 或者 LESS。你可能会想-这么多工具，我打赌每一个的写作风格是不同的。你是对的，但基础是一样的。
<!-- more -->
在这篇文章中，我想提出一些很好的提示来编写强大而可维护的CSS，无论你是使用 CSS modules 还是 Sass/LESS。
这些提示以SCSS语法呈现，所以如果您需要对Sass的一些介绍，[这里](http://sass-lang.com/guide)是一个很好的开始。
如果你使用纯CSS，扩展的 CSS next，这篇文章也可以看看。这些基本概念可以轻松地用于其他CSS工具或预处理器。

## 样式结构

精心设计的文件夹结构有助于维护您的项目,style 也一样。
根据所引用的元素来划分代码很重要。
将所有的规则存储在一个巨大的 styles.scss 文件中会导致麻烦。
特别是如果你想扩展你的项目并添加新的组件。

在项目扩展方面，设置适当的样式结构至关重要。 
您应该专注于提供结构，这将根据您在项目中使用的组件对文件进行排序。
我建议您将基本样式与组件和主题样式分开。 
另外，根据用户的角色，将所有 mixins 和变量组合在一个文件夹中也是有意义的。

以下是一个示例文件夹结构：

```
├── /base
│  ├── _core.scss
│  ├── _colors.scss
│  ├── _settings.scss
│  └── _typography.scss
├── /utils
│  ├── _animations.scss
│  ├── _easings.scss
│  ├── _grid.scss
│  └── _misc.scss
├── /components
│  ├── _header.scss
│  ├── _footer.scss
│  ├── _button.scss
│  └── _sidebar.scss
└── main.scss
```

以及 `main.scss` :

```css
// *** Vendor ***
@import 'sanitize.css';

// *** Settings ***
@import './base/settings';
@import './base/colors';

// *** Utils ***
@import './utils/easings';
@import './utils/animations';
@import './utils/grid';
@import './utils/ui';

// *** Base ***
@import './base/core';
@import './base/typography';

// *** Components ***
@import './components/header';
@import './components/footer';
@import './components/button';
@import './components/sidebar';
```

## 命名颜色

所以，你有一个网站设计，你想从编码布局开始。 
什么是一个明智的方法来管理项目中的颜色？ 只需直接在样式规则中编写颜色值即可。 
但这种做法在未来可能很麻烦。 幸运的是，CSS和Sass都给了我们 变量。

在Sass中，您可以将任何值存储为变量，因此将颜色值存储为变量是合理的。 
大多数情况下，我们使用HEX（十六进制）来定义颜色值。 对于人类来说，HEX看起来像cypher，因为它是为计算机设计的格式。 
很难说出什么颜色写成 `#7fffd4`或 `#ffd700`。 第一个是海蓝宝石，第二个是黄金。
以这种方式命名这些颜色不容易吗？

一些颜色在网站设计中具有特定的作用。 一种颜色可以用作品牌颜色，另一种用于背景。 
虽然我们为浏览器编写代码，我们应该为我们的颜色构建一些强大的结构。 
从设计师那里得到一些帮助是很好的。 如果你不能说服他描述调色板，那么你还可以自己做。
 
首先，您应该从命名颜色开始。 
当然，很难将HEX值转换为人类可读的名称。 
幸运的是，我们有适当的工具。 我使用 [Name that Color ](http://chir.ag/projects/name-that-color/#365C9B)，但是您可以使用任何其他您喜欢的工具。 
 
当您有颜色的名称时，您可以为其分配角色。
您应该定义使用哪种颜色作为主要颜色，哪一种是次要的。
如果您不确定如何为您的颜色设置角色，您可以从 [Bootstrap的配色方案](https://getbootstrap.com/docs/4.0/utilities/colors/)中获得一些灵感。

以下是一个示例颜色设置：

```scss
// Names
$white: #fff;
$black: #000;

$aquamarine: #7fffd4;
$alabaster: #f9f9f9;
$alto: #d9d9d9;
$mine-shaft: #333;

// Roles
$primary: $white;
$secondary: $alabaster;
$accent: $aquamarine;

$text: $mine-shaft;
$border: $alto;
```
## 平铺嵌套声明

使用CSS预处理器不仅可以为您的工具集添加一些有用的功能，还可以帮助代码组织。
最好的例子是样式的声明嵌套。在Sass中,可以将选择器嵌套在其他选择器中，以便您可以看到它们之间的关系。
这是非常强大的功能，所以它可以很容易地过度使用。
 
我建议你不要深入三层以上。 
此规则适用于CSS预处理器中[选择器的特异性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)和嵌套的选择器。 
超出这个限制不仅可以增加选择器的强度，而且可以使阅读代码更加困难。 
 
见下面的例子：

```scss
// Bad
.article {
  .title {
    color: $accent;
  }
  
  .text {
    color: $text;
    
    .img {
      width: 100%;
    }
    
    @media only screen and (min-width: 720px) {
      .text {
        .img {
          width: 300px;
          height: auto;
          margin: 0 auto;
        }
      }
    }
  }
}

// Good
.article {
  .title {
    color: $accent;
  }
  
  .text .img {
    width: 100%;
  }
}

@media only screen and (min-width: 720px) {
  .article {
    .text .img {
      width: 300px;
      height: auto;
      margin: 0 auto;
    }
  }
}
```

## 不要过度使用父辈的引用

在Sass中，可以获得选择器父级的引用。结合嵌套，您可以定义需要父选择器的规则。 例如：

```scss
.link {
  &:hover {
    color: $accent;
  }
  
  &::after {
    display: inline-block;
    content: '\0362';
    vertical-align: middle;
  }
}
```
有时，使用 `＆` 可能会造成误导。 以下是该选择器使用不当的示例：
 
```scss
.text {
  // compiles to .article .text
  .article & {
    color: $text;
  }
  
  // compiles to .text + .text
  & + & {
    margin-top: 15px;
  }
}
```
您可以看到，`&` 选择器可能会增加您的样式的不必要的复杂性，并使阅读代码变得困难。

## 以有意义的顺序写入属性

你不必排序你的属性，但你应该这么做。
正确排序的属性表示您的代码样式是一致的。
此外，它使扫描您的代码更方便。
在属性排序方面并没有一个真理来源。
您可以按字母顺序或任何其他偏好排序。
我使用稍微修改的规则，包括在 [SMACSS 方法的格式化指南中](https://smacss.com/book/formatting)。 以下是我推荐的顺序：

* Box (position, display, width, margin, etc.)
* Text
* Background
* Border
* Other (Alphabetically)

```scss
// Before
.action-button {
  height: 30px;
  z-index: 3;
  background-color: $accent;
  position: fixed;
  width: 30px;
  color: $white;
  bottom: 15px;
  right: 15px;
}

// After
.action-button {
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 3;
  width: 30px;
  height: 30px;
  color: $white;
  background-color: $accent;
}
```

## 使用类的命名约定

随着您的项目增长，风格可能会变得相当凌乱。
特别是当您需要扩展现有规则时。
不幸的是，CSS不提供任何有用的机制阻止命名空间冲突。
换句话说，用CSS编写的所有样式都是全局的，所以很有可能意外地覆盖一些属性。

由于CSS的级联性质，定义非常具体的选择器很重要。
这并不意味着您应该使用高特异性的选择器。 
当需要为特定元素添加样式时，您需要避免使用常规选择器（如标签选择器）。

以下是个例子:

```scss
// Bad
.menu {
  li {
    display: inline-block;
    padding: 0 20px;
    border-bottom: 1px solid $accent;
  }
  
  ul li {
    padding: 0 10px;
    border-bottom: 0; // Unnecessary border reset
  }
}

// Good
.menu-item {
  display: inline-block;
  padding: 0 20px;
  border-bottom: 1px solid $accent;
}

.nested-menu-item {
  padding: 0 10px;
}
```

写入可维护的样式不是那么难，当我们可以使用一个流行的类命名约定--[BEM](https://en.bem.info/methodology/quick-start/)，[OOCSS](https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/) 或 [SMACSS](https://smacss.com/book/categorizing)。
我更喜欢BEM，这是由 Yandex 开发人员创建的非常受欢迎的方法。 它的名字是块，修饰词和元素词的缩写。 如果您不熟悉BEM，建议您阅读[其文档](https://en.bem.info/methodology/key-concepts/)。

以下是我们的例子：

```scss
.menu {
  &__item { // it compiles to .menu__item
    display: inline-block;
    padding: 0 20px;
    border-bottom: 1px solid $accent;
  }
}

.submenu {
  &__item {
    padding: 0 10px;
  }
}
```

## 描述性媒体查询

媒体查询是响应式网站开发中最重要的部分。 
感谢他们，我们可以根据用户的设备定义不同分辨率的样式和更改布局。 
在CSS中，媒体查询是一组规则，根据用户的浏览器进行测试。 当满足时，媒体查询块中定义的样式将应用于网站。

您可以使用查询来定位各种设备，它们描述媒体的类型和功能。 由于许多规则的组合，媒体查询很容易变得复杂。

```scss
// target devices with min width of 768px (possibly tablets) and with wide screen
@media only screen and (min-width: 768px) and (max-device-aspect-ratio: 9 / 16) {
  body {
    font-size: 20px;
  }
}
```

为了使媒体查询更易于开发人员阅读，我们可以将其规则分配给变量。在Sass中，使用插值大括号`＃{}`可以使用字符串作为普通CSS代码。

```scss
$medium: 768px;
$screen-medium-wide: 'only screen and (min-width: #{$medium}) and (max-device-aspect-ratio: 9 / 16)';

@media #{$screen-medium-wide} {
  body {
    font-size: 20px;
  }
}
```
同样的技巧我们可以用于其他 [@规则](https://developer.mozilla.org/zh-CN/docs/Web/CSS/At-rule)。
定义复杂的 `@supports` 规则可以很方便。

## 添加模块化样式

CSS有一组非常有用的选择器。 在大多数情况下，您使用类选择器或后代选择器。 但是还有一个选择器，这对于编写模块化样式是有效的。 它是相邻的兄弟选择器，也称为加号选择器。

让我们假设你想要编写只有当某个元素在选择器元素之前应用的样式。 例如，您可以为文章的文字添加页边距标题。 你可以这样做：

```scss
.article {
  &__title {
    color: $accent;
  }
  
  // Applies margin only, when .article__title is present
  &__title + &__text {
    margin-top: 15px;
  }
  
  &__text {
    color: $text;
  }
}
```

这是一种非常方便的方式来定义样式，也是我最喜欢的一种。
但是有一些权衡。首先，它不是最优秀的选择器。 如果您关心性能而不是模块化，则不应该使用它。
其次，使用兄弟选择器增加了特定性，所以稍后可能难以覆盖它的样式。
但是，当你想应用基于元素的存在的样式， 值得使用它。

## 进一步阅读

现在，你知道如何编写可读，可维护和模块化的样式。 如果您需要更多的建议如何写风格引以为豪，请参阅这些文章：

* [Sass Color Variables That Don’t Suck ](https://davidwalsh.name/sass-color-variables-dont-suck)
* [Advanced SCSS, or 16 Cool Things You May Not Have Known Your Stylesheets Could Do](https://gist.github.com/jareware/4738651)
* [Adjacent sibling selector specs ](https://www.w3.org/TR/CSS21/selector.html#adjacent-selectors)
* [Modular CSS naming conventions ](http://thesassway.com/advanced/modular-css-naming-conventions)
* [Responsive Web Design in Sass](http://thesassway.com/intermediate/responsive-web-design-in-sass-using-media-queries-in-sass-32)
* [How to structure a Sass project](http://thesassway.com/beginner/how-to-structure-a-sass-project)





 
### 原文链接
[https://medium.com/@mciastek/s-css-best-practices-that-you-have-not-yet-known-ba2f6329b5dd](https://medium.com/@mciastek/s-css-best-practices-that-you-have-not-yet-known-ba2f6329b5dd)