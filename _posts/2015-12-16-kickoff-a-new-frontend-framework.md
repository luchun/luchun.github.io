---
layout: post
title: stylesheets has a disabled attribute
---
## stylesheets 和 script 元素上的disabled 标签

stylesheets 和 script 元素上有一个可以查询和定义的布尔型属性：`disabled` 。通过它可以十分简便的禁用指定的stylesheet或script。

例如，我们引用了一个stylesheet和一个script，使用变量`mySheet`和`myScript`代表，我们可以这样禁用他们：

    mySheet.disabled = true;
    myScript.disabled = true;
    
并且我们可以这样创建一个stylesheet切换按钮:
    
    var sheet = document.getElementById('boot'),
        btn = document.querySelector('.btn');
        
    btn.addEventListener('click', function () {
        sheet.disabled = (sheet.disabled === false) ? true : false;
    }, false);

[尝试这个脚本](https://jsbin.com/jeveze/edit?html,js,output)

访问这个 demo 页面可以在顶部看到一个'toogle'按钮，在按钮下边是一些Bootstrap风格的 HTML 元素。Bootstrap CSS 文件通过stylesheet 元素上的 `disabled`属性来进行切换。

它可以作为一个简单的方式来田间样式切换功能或者是添加/移除 stylesheets 和 script元素的方法。该disabled 属性作为 W3C 站点 [part of the StyleSheet interface of the CSSOM](https://drafts.csswg.org/cssom/#stylesheet) 上讨论。

无法找到有关的浏览器支持列表，但在最新的Chrome,Firefox,IE11上尝试支持，看起来是支持的。


