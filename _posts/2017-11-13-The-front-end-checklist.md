---
layout: post
title: 前端清单
---

在将网站发布到生产环境前需要做的所有检查

[github](https://github.com/thedaviddias/Front-End-Checklist)



##目录 

1. **[Head](#head)**
2. **[HTML](#html)**
3. **[Webfonts](#webfonts)**
4. **[CSS](#css)**
5. **[Images](#images)**
6. **[JavaScript](#javascript)**
7. **[Security](#security)**
8. **[Performance](#performance-1)**
9. **[Accessibility](#accessibility)**
10. **[SEO](#seo)**

## 使用方法

大多数项目都需要检查表中的所有项目，
但是一些元素可以省略或者不是必须的（例如，对于Web管理系统，可能不需要RSS提要）。
我们选择使用3个级别的灵活性：

* ![Low][low_img] 意味着项目是 **推荐**，但在某些特定情况下可以省略。
* ![Medium][medium_img] 意味着该项目**强烈推荐**，并且在某些特定情况下最终可以省略。 一些元素，如果省略，可能会在性能或搜索引擎优化方面造成不好的影响。
* ![High][high_img] 意味着该项目**不能被任何原因省略**。 您可能会在您的网页中导致功能障碍，或者有无障碍或SEO问题。 测试优先级需要首先在这些元素上。

有些资源拥有一个表情符号，可以帮助您了解在清单中可以找到哪种类型的内容/帮助：

* 📖: 文件或文章
* 🛠: 在线工具/测试工具
* 📹: 媒体或视频内容

---

## Head

> **Notes:**  [Head 清单](https://github.com/joshbuchea/HEAD) 介绍了所有可以在 `head` 中出现的元素

### Meta 标签

* [ ] **Doctype:** ![High][high_img] Doctype 是 HTML5，位于所有HTML页面的顶部。


```html
<!-- Doctype HTML5 -->
<!doctype html>
```
> * 📖 [Determining the character encoding - HTML5 W3C](https://www.w3.org/TR/html5/syntax.html#determining-the-character-encoding)

*以下 3 个 meta 标签 (Charset, X-UA Compatible and Viewport) 需要在 head 中优先声明.*

* [ ] **Charset:** ![High][high_img] 字符集（UTF-8）被正确地声明.

```html
<!-- Set character encoding for the document -->
<meta charset="utf-8">
```

* [ ] **X-UA-Compatible:** ![Medium][medium_img]  X-UA-Compatible meta 标签.

```html
<!-- Instruct Internet Explorer to use its latest rendering engine -->
<meta http-equiv="x-ua-compatible" content="ie=edge">
```
> * 📖 [Specifying legacy document modes (Internet Explorer)](https://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx)

* [ ] **Viewport:** ![High][high_img] viewport 视口被正确声明.

```html
<!-- Viewport for responsive web design -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

* [ ] **Title:** ![High][high_img] 所有页面上都要使用标题 (SEO: Google计算标题中使用的字符的像素宽度，在472和482像素之间切断。 平均字符数限制约为55个字符).

```html
<!-- Document Title -->
<title>Page Title less than 55 characters</title>
```

> * 📖 [Title - HTML - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)
> * 🛠 [SERP Snippet Generator](https://www.sistrix.com/serp-snippet-generator/)


* [ ] **Description:** ![High][high_img] 提供 description，它是唯一的，不超过150个字符.

```html
<!-- Meta Description -->
<meta name="description" content="Description of the page less than 150 characters">
```
> * 📖[Meta Description - HTML - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#Adding_an_author_and_description)

* [ ] **Favicons:** ![Medium][medium_img] 每个 favicon 都应该被正确的创建和显示. 如果只有一个`favicon.ico`, 最好将它放在站点的根目录. 通常不需要多余的标记. 然而, 最好像下边的示例一样引用. 现在, **更推荐 PNG 格式** 相比 `.ico` 格式 (尺寸: 32x32px).

```html
<!-- Standard favicon -->
<link rel="icon" type="image/x-icon" href="https://example.com/favicon.ico">
<!-- Recommended favicon format -->
<link rel="icon" type="image/png" href="https://example.com/favicon.png">
```
> * 🛠 [Favicon Generator](https://www.favicon-generator.org/)
> * 🛠 [RealFaviconGenerator](https://realfavicongenerator.net/)
> * 📖 [Favicon Cheat Sheet](https://github.com/audreyr/favicon-cheat-sheet)
> * 📖 [Favicons, Touch Icons, Tile Icons, etc. Which Do You Need? - CSS Tricks](https://css-tricks.com/favicon-quiz/)
> * 📖 [PNG favicons - caniuse](https://caniuse.com/#feat=link-icon-png)

* [ ] **Apple Touch Icon:** ![Low][low_img] 设置 Apple touch favicon  apple-mobile-web-app-capable  *(创建至少200x200px尺寸的苹果图标文件，以支持您可能需要的所有尺寸).*

```html
<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="/custom-icon.png">
```

> * 📖 [Configuring Web Applications](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)



































[low_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png
[medium_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png
[high_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png