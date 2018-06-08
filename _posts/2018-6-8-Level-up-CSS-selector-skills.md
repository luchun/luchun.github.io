---
layout: post
title: 提升 CSS 选择器技能
---

### 组合选择器 Combinator selectors
* [后代选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_selectors) `div span`
* [子选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_selectors) `div > span`
* [相邻兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Adjacent_sibling_selectors) `li + li` 可以选中ul中第一个除第一个li外的所有li  
* [通用兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_selectors)  `p ~ span`

### [属性选择器 Attribute selectors](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)
* `[attr]` 表示带有以 attr 命名的属性的元素
* `[attr=value]` 表示带有以 attr 命名的，且值为"value"的属性的元素。
* `[attr~=value]` 表示带有以 attr 命名的属性的元素，并且该属性是一个以空格作为分隔的值列表，其中至少一个值为"value"。
* `[attr|=value]` 表示带有以 attr 命名的属性的元素，属性值为“value”或是以“value-”为前缀（"-"为连字符，Unicode编码为U+002D）开头。
* `[attr^=value]` 表示带有以 attr 命名的，且值是以"value"开头的属性的元素。
* `[attr$=value]`  表示带有以 attr 命名的，且值是以"value"结尾的属性的元素。
* `[attr*=value]` 表示带有以 attr 命名的，且值包含有"value"的属性的元素。
* `[attr operator value i]`  在带有属性值的属性选型选择器表达式的右括号（]括号）前添加用 **空格间隔开的** 字母i（或I）可以忽略属性值的大小写（ASCII字符范围内的字母） 

```css
/* 带有title属性的<a>标签  */
a[title] {
  color: purple;
}

/* 链接为"https://example.org"的<a> 标签 */
a[href="https://example.org"] {
  color: green;
}

/* 链接中有"example" 的<a>标签 example.com example.org都匹配 */
a[href*="example"] {
  font-size: 2em;
}

/* 链接以".org"结尾的<a标签> */
a[href$=".org"] {
  font-style: italic;
}
```
### [伪类选择器 Pseudo-classes](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)

CSS **伪类** 是添加到选择器的关键字，指定要选择的元素的特殊状态。例如，`:hover` 可被用于在用户将鼠标悬停在按钮上时改变按钮的颜色。

有几十个 下边列举几个常见的

> 有代表UI状态的
* `:active` 匹配被用户激活的元素
* `:checked`  选择器表示任何处于选中状态的radio, checkbox元素中的option HTML元素 。
* `:disabled`  表示任何被禁用的元素
* `:hover`  CSS伪类适用于用户使用指示设备虚指一个元素（没有激活它）的情况。
>  结构选择器 
* `ul:nth-child()`  接收一个值，该值将与特定的子元素相对于其父容器相匹配。
    * `ul:nth-child(2)` 匹配第二个子元素
    * `ul:nth-child(4n)` 匹配4的倍数的子元素 (4, 8, 12, …)
    * `ul:nth-child(2n + 1)` 匹配2的倍数的下一个位移的元素  (1, 3, 5, …)
    * `ul:nth-child(3n — 1)` 匹配3的倍数的前一个位移的元素  (2, 5, 8, …)
    * `ul:nth-child(odd)` 匹配奇数位的元素 (1, 3, 5, …)
    * `ul:nth-child(even)` 匹配偶数位的元素  (2, 4, 6, …)
* `:nth-last-child()` 与 `ul:nth-child()` 相似，但是从后向前匹配
*  `:nth-of-type()`    与 `ul:nth-child()` 相似， 但不是匹配子元素，而是匹配符合类型的子元素
* `:nth-last-of-type()` 从后向前匹配类型的子元素

* `:first-child`  `:nth-child()` 的语法糖 返回第一个子元素
* `:last-child`  代表父元素的最后一个子元素
* `:only-child`
* `:first-of-type`
* `:last-of-type`

>  内容选择器
* `::first-line`
* `::first-letter`
* `::selection`


> 感谢原文 [Level up your CSS selector skills](https://blog.logrocket.com/level-up-your-css-selector-skills-5d7bb45ddd37)
> 感谢 MDN