---
layout: post
title: 原生 HTML5 输入自动完成
---
## 2015-3-11 原生 HTML5 输入自动完成

现在，HTML5 有了原生的自动输入完成

<input list="pasta">

<datalist id="pasta">
<option>Bavette</option>
<option>Cannelloni</option>
<option>Fiorentine</option>
<option>Gnocchi</option>
<option>Pappardelle</option>
<option>Penne lisce</option>
<option>Pici</option>
<option>Rigatoni</option>
<option>Spaghetti</option>
<option>Tagliatelle</option>
</datalist>


####浏览器支持

Chrome 31+, IE10+, Firefox 34+ and Opera 26+ Safari不支持，但也不会显示，所以算是优雅降级。