---
layout: post
title: css 边栏切换
---

[原文](https://silvestarbistrovic.from.hr/en/articles/css-sidebar-toggle/)
本文中出现的 CSS 边栏切换的呈现 都只用了 CSS 来实现。
当前，可访问性是非常重要的，因为如果不使用 JavaScript, 则不能修改元素的状态，所以我添加了一小段代码。

## 准备
在我准备这篇文章时，我在 codepen上创建了一个 [CSS边栏切换](http://codepen.io/CiTA/pen/bgjKKE),
由于这个 pen 突然有很多的访客。后来我发现这个pen 出现在 [Codepen](http://codepen.io/) 主页上的 'Picked Pens'中。
显然，这是社区的一个伟大灵感，最终获得了很多 forks 和 hearts 。在这一点上，我知道我在做一些好事。
但是我没想到的是关于这种技术的一篇文章。

Jorge C.S. Cardoso 基于这个demo发表了一篇[文章](https://codepen.io/jorgecardoso/post/css-transitions-and-animations).
它被列入Codepen通讯。Cardoso 先生，做得好，谢谢你为写这篇文章节省了一些时间。

在这篇文章中，我将尝试解释CSS侧边栏切换技术，并专注于可访问性。

## 概念

为了触发边栏覆盖，我们需要以下组件：
*  a label,
*  a checkbox and
*  a sidebar.

我们将使用复选框 `:checked` 伪类来确定是否显示或隐藏边栏。    

## 菜单图标 

对于菜单切换指示器，我们可以使用熟知的汉堡包菜单。有 [很多](https://webdesign.tutsplus.com/tutorials/7-non-raster-approaches-for-making-the-hamburger-menu-icon--cms-21686) [方法](https://css-tricks.com/three-line-menu-navicon/)
和 [字体](https://jonsuh.com/hamburgers/) 来实现它。但我决定使用纯 css 方案，因为这是一个 纯 css 边栏切换方案。

### Demo
<iframe id="cp_embed_YNbKpo" src="//codepen.io/CiTA/embed/preview/YNbKpo?height=260&amp;theme-id=0&amp;slug-hash=YNbKpo&amp;default-tab=css%2Cresult&amp;user=CiTA&amp;embed-version=2&amp;pen-title=CSS%20hamburger%20menu&amp;preview=true" scrolling="no" frameborder="0" height="260" allowtransparency="true" allowfullscreen="true" name="CodePen Embed" title="CSS hamburger menu" class="cp_embed_iframe " style="width: 100%; overflow: hidden;"></iframe>

### HTML

    <input type="checkbox" id="menuToggler" class="input-toggler"/>
    <label for="menuToggler" class="menu-toggler">
     <span class="menu-toggler__line"></span>
     <span class="menu-toggler__line"></span>
     <span class="menu-toggler__line"></span>
    </label>
在 label 内， 我们放置了一些 span 元素，没一个代表一个 汉堡 线。
    
确保 checkbox有 id 属性，并且和 lable 上的 for 属性值相同。

### CSS
     
     // variables
     :root {
      --toggler-size: 30px;
      --toggler-line-number: 3;
      --toggler-line-size: calc(var(--toggler-size) / (var(--toggler-line-number) + var(--toggler-line-number) - 1));
      --toggler-offset-left: 10px;
      --toggler-offset-top: 10px;
      --toggler-color: Tomato;
     }
     
     // same as var(--toggler-line-number)
     $total: 3;
  
 这个例子中，我决定使用一项新的 CSS 变量 功能。下边是zhichilv:
<iframe src="//caniuse.bitsofco.de/embed/index.html?feat=css-variables&amp;periods=current" frameborder="0" width="100%" height="316px"></iframe>
使用 CSS 变量，我们可以定义 菜单尺寸，线的数量，上边间距，左边间距和背景色。
先的数量时可以变化的。如果我们想要三条线的汉堡，我们应该加上三个 span ，并设置 CSS 变量
--toggler-line-number 和 $total 都是3。

我试了3和4的汉堡线束，表现都很好。

逻辑很直接了当：
* 如果没有被 checked 显示汉堡图标
* 如果 checked 显示关闭图标
我们使用 transitions 和 transforms 来给 icon 添加动画。

## 边栏
边栏有很多显示方法，我决定使用一个完整宽度的边栏，包含一列菜单。
### DEMO
<iframe id="cp_embed_bgjKKE" src="//codepen.io/CiTA/embed/preview/bgjKKE?height=400&amp;theme-id=0&amp;slug-hash=bgjKKE&amp;default-tab=css%2Cresult&amp;user=CiTA&amp;embed-version=2&amp;pen-title=CSS%20sidebar%20toggle&amp;preview=true" scrolling="no" frameborder="0" height="400" allowtransparency="true" allowfullscreen="true" name="CodePen Embed" title="CSS sidebar toggle" class="cp_embed_iframe " style="width: 100%; overflow: hidden;"></iframe>
### HTML
为了创建CSS 边栏，我们使用以下的html结构

    <input type="checkbox" id="menuToggler" class="input-toggler"/>
    <label for="menuToggler" class="menu-toggler">
     ...
    </label>
    <nav class="sidebar">
     ...
    </nav>
    <main class="content">
     ...
    </main>
    
注意 checkbox label sidebar 和内容是平辈关系。

### CSS
    :root {
     --sidebar-width: 100%;
    }
    
    .sidebar {
     width: var(--sidebar-width);
     transform: translateX(calc(var(--sidebar-width) * -1));
     ...
    }
    
    .input-toggler {
     ...
     
     &:checked ~ .sidebar {
      transform: translateX(0);
      opacity: .98;
     }
    }
隐藏边栏的方法是通过 `translateX` 属性移出视窗。当 菜单图标被点击并且 :checked 状态被激活，移动边栏回到视窗。

### JavaScript
    let menuToggler = document.getElementById('menuToggler')
    let menuTogglerLabel = document.getElementById('menuTogglerLabel');
    let sidebar = document.getElementById('sidebar');
    let menuItems = document.getElementsByClassName('menu__link');
    
    menuToggler.addEventListener('change', function() {
     if(menuToggler.checked) {
      menuTogglerLabel.setAttribute('aria-pressed', 'true');
      sidebar.setAttribute('aria-hidden', 'false'); 
     } else {
      menuTogglerLabel.setAttribute('aria-pressed', 'false');
      sidebar.setAttribute('aria-hidden', 'true');
     }
     
     for(let menuItem of menuItems) {
      if(menuToggler.checked) {
       menuItem.setAttribute('tabindex', '0');
      } else {
       menuItem.setAttribute('tabindex', '-1');
      }
     } 
    });