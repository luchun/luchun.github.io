---
layout: post
title: 现在更不需要jQuery了
---

自从2006年jQuery发布以来，DOM和原生浏览器API都有了飞跃性的提高。
自2013年以来，人们一直在撰写“You Might Not Need jQuery”的文章（请参阅此[网站](http://youmightnotneedjquery.com/)和此[项目](https://github.com/oneuijs/You-Dont-Need-jQuery)）。
本文并不想重复以前的内容，但自从上一版“You Might Not Need jQuery”文章，您可能已经偶然发现了浏览器上的一点点改变。
浏览器继续实现新的API，从无框架开发中解脱出来，其中许多API直接从jQuery中复制。

## Remove an element from the page

还记得从页面上删除元素的迂回方法吗？ `el.parentNode.removeChild(el);` 
下面是jQuery方式和新的改进的原生方式的比较。

```javascript
    var $elem = $(".someClass") //select the element 
    $elem.remove(); //remove the element
```

不使用jQuery：

```javascript
    var elem = document.querySelector(".someClass"); //select the element
    elem.remove() //remove the element
```

> 对于这篇文章的其余部分，我们假设$ elem是一个jQuery选择的元素集，而elem是一个本地JavaScript选择的DOM元素。

## Prepend an element

使用jQuery：
```javascript
    $elem.prepend($someOtherElem);
```

不使用jQuery：
```javascript
    elem.prepend(someOtherElem);
```

## Insert an element before another element

使用jQuery：
```javascript
    $elem.before($someOtherElem);
```

不使用jQuery：
```javascript
    elem.before(someOtherElem);
```

## Replace an element with another element

使用jQuery：
```javascript
    $elem.replaceWith($someOtherElem);
```

不使用jQuery：
```javascript
    elem.replaceWith(someOtherElem);
```

## Find the closest ancestor that matches a given selector

使用jQuery：
```javascript
    $elem.closest("div");
```

不使用jQuery：
```javascript
    elem.closest("div");
```

## Fade in an Element

使用jQuery：
```javascript
    $elem.fadeIn();
```

不使用jQuery：
```css
    .thingy {
      display: none;
      opacity: 0;
      transition: .8s;
    }
```
```javascript
    elem.style.display = "block";
    requestAnimationFrame(() => elem.style.opacity = 1);
```

## Call an event handler callback only once


使用jQuery：
```javascript
    $elem.one("click", someFunc);
```

过去在编写纯JavaScript时，我们不得不在回调函数中调用removeEventListener。

```javascript
    function dostuff() {
      alert("some stuff happened");
      this.removeEventListener("click", dostuff);
    }
    var button = document.querySelector("button");
    button.addEventListener("click", dostuff);
```

现在事情变得更加简洁。
您可能知道传递给 `addEventListener` 的第三个可选参数。 这是一个布尔值，决定事件捕获或事件冒泡。
现在[第三个参数](https://developers.google.com/web/updates/2016/10/addeventlistener-once)可以是一个配置对象。

```javascript
    elem.addEventListener('click', someFunc, { once: true, });
```
如果您仍然想要使用事件捕获以及仅调用一次回调，那么您也可以在配置对象中指定：

```javascript
    elem.addEventListener('click', myClickHandler, {
      once: true,
      capture: true
    });
```

## Animation

jQuery的 `.animate()`方法相当有限。


```javascript
    $elem.animate({
      width: "70%",
      opacity: 0.4,
      marginLeft: "0.6in",
      fontSize: "3em",
      borderWidth: "10px"
    }, 1500);
```

文档说：“所有的动画属性应该动画到一个单一的数值，除非如下所述;大多数非数字属性不能使用基本的jQuery功能动画。

这排除了transforms，你需要一个插件来动画颜色。 使用新的[Web动画API](https://css-tricks.com/css-animations-vs-web-animations-api/)将会更好。


```javascript
    var elem = document.querySelector('.animate-me');
    elem.animate([
      { 
        transform: 'translateY(-1000px) scaleY(2.5) scaleX(.2)', 
        transformOrigin: '50% 0', 
        filter: 'blur(40px)', 
        opacity: 0 
      },
      { 
        transform: 'translateY(0) scaleY(1) scaleX(1)',
        transformOrigin: '50% 50%',
        filter: 'blur(0)',
        opacity: 1 
      }
    ], 1000);
```

## Ajax

jQuery过去的另一个关键卖点是Ajax。 jQuery抽象了XMLHttpRequest的丑陋性：

使用jQuery：
```javascript
    $.ajax('https://some.url', {
      success: (data) => { /* do stuff with the data */ }
    });
```

新的 [fetch API](https://css-tricks.com/using-fetch/)是XMLHttpRequest的优越替代品，现在已被所有现代浏览器所支持。

```javascript
    fetch('https://some.url')
      .then(response => response.json())
      .then(data => {
        // do stuff with the data
      });
```

不可否认，fetch 可能比这个小代码示例复杂一点。 
例如，从fetch()返回的Promise不会拒绝HTTP错误状态。 然而，它比在XMLHttpRequest之上构建的任何东西都要多得多。

## The Rise of the Micro-Library

[axios](https://github.com/axios/axios)

