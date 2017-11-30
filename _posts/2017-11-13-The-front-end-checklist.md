---
layout: post
title: 前端清单
---

在将网站发布到生产环境前需要做的所有检查

[github](https://github.com/thedaviddias/Front-End-Checklist)



## 目录 

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

- [ ] **Windows Tiles:**![Low][low_img] 预设并引用 Windows tiles.

```html
<!-- Microsoft Tiles -->
<meta name="msapplication-config" content="browserconfig.xml" />
```

browserconfig.xml文件所需的最小xml标记如下所示：

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
   <msapplication>
     <tile>
        <square70x70logo src="small.png"/>
        <square150x150logo src="medium.png"/>
        <wide310x150logo src="wide.png"/>
        <square310x310logo src="large.png"/>
     </tile>
   </msapplication>
</browserconfig>
```

> * 📖 [Browser configuration schema reference](https://msdn.microsoft.com/en-us/library/dn320426(v=vs.85).aspx)

* [ ] **Canonical:** ![Medium][medium_img] 使用 `rel="canonical"` 避免重复的内容.

```html
<!-- Helps prevent duplicate content issues -->
<link rel="canonical" href="http://example.com/2017/09/a-new-article-to-red.html">
```

> * 📖 [Use canonical URLs - Search Console Help - Google Support](https://support.google.com/webmasters/answer/139066?hl=en)
> * 📖 [5 common mistakes with rel=canonical - Google Webmaster Blog](https://webmasters.googleblog.com/2013/04/5-common-mistakes-with-relcanonical.html)

### HTML tags

* [ ] **Language attribute:** ![High][high_img] 网站的 `lang` 属性是指定的，并与当前页面的语言相关.

```html
<html lang="en">
```

* [ ] **Direction attribute:** ![Medium][medium_img] 在html标签上指定内容的方向，默认从左到右 (它可以在另一个HTML标签上使用).


```html
<html dir="rtl">
```

> * 📖 [dir - HTML - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)


* [ ] **Alternate language:** ![Low][low_img] 您网站的语言标签是指定的，并与当前页面的语言有关


```html
<link rel="alternate" href="https://es.example.com/" hreflang="es">
```


* [ ] **Conditional comments:** ![Low][low_img] 需要时设置针对IE的条件注释.

> * 📖 [About conditional comments (Internet Explorer) - MSDN - Microsoft](https://msdn.microsoft.com/en-us/library/ms537512(v=vs.85).aspx)

* [ ] **RSS feed:** ![Low][low_img]  如果你的项目是博客 或者有文章，可能需要提供rss链接.

* [ ] **Inline critical CSS:** ![Medium][medium_img] 在页面加载期间可见的内容区域 ("高于折叠内容") 需要的样式叫做 "危急 CSS". 它应当嵌入到`<style></style>` 中的一行 (压缩)，并放在主要 CSS调用前.

> * 🛠 [Critical by Addy Osmani on GitHub](https://github.com/addyosmani/critical) automates this.

* [ ] **CSS order:** ![High][high_img] 所有的css放在 `<head>`中并在JavaScript文件加载前. (除了有时JS文件异步加载在页面顶部的情况).

### Social meta

***Facebook OG*** 和 ***Twitter Cards*** , 对于任何网站，强烈推荐。其他社交媒体标签可以考虑，如果你针对特定的存在，并希望确保显示.

* [ ] **Facebook Open Graph:** ![Low][low_img] 所有 Facebook Open Graph (OG) 文件经过测试确保没有 缺失和错误. Images 至少需要 600 x 315 像素, 推荐 1200 x 630 像素 .

> **Notes:** 使用 `og:image:width` 和 `og:image:height` 将为爬虫指定图像尺寸，以便它可以立即渲染图像，而不必异步下载和处理它。

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page.html">
<meta property="og:title" content="Content Title">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:description" content="Description Here">
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="en_US">
<!-- Next tags are optional but recommended -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

> * 📖 [A Guide to Sharing for Webmasters](https://developers.facebook.com/docs/sharing/webmasters/)
> * 📖 [Best Practices - Sharing](https://developers.facebook.com/docs/sharing/best-practices/)
> * 🛠 Test your page with the [Facebook OG testing](https://developers.facebook.com/tools/debug/)

* [ ] **Twitter Card:** ![Low][low_img]

* [ ] **Twitter Card:** ![Low][low_img]

```html
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@site_account">
<meta name="twitter:creator" content="@individual_account">
<meta name="twitter:url" content="https://example.com/page.html">
<meta name="twitter:title" content="Content Title">
<meta name="twitter:description" content="Content description less than 200 characters">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

> * 📖 [Getting started with cards — Twitter Developers](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started)
> * 🛠 Test your page with the [Twitter card validator](https://cards-dev.twitter.com/validator)

**[⬆ back to top](#table-of-contents)**


## HTML

### 最佳实践

* [ ] **HTML5 Semantic Elements:** ![High][high_img] 恰当地使用HTML5语义元素 (header, section, footer, main...).

> * 📖 [HTML Reference](http://htmlreference.io/)

* [ ] **Error pages:** ![High][high_img] 错误404页面和5xx存在。 请记住，5xx错误页面需要集成CSS（在当前服务器上不需要外部调用）.

* [ ] **Noopener:** ![Medium][medium_img] 如果你正在使用`target =“_ blank”`的外部链接，你的链接应该有`rel =“noopener”`属性来防止制表签名。 如果你需要支持旧版本的Firefox，可以使用`rel =“noopener noreferrer”`。

> * 📖 [About rel=noopener](https://mathiasbynens.github.io/rel-noopener/)

* [ ] **Clean up comments:** ![Low][low_img] 在将页面发布到生产之前，需要删除不必要的代码。


### HTML testing

* [ ] **W3C compliant:** ![High][high_img] 所有页面都需要使用W3C验证器进行测试，以确定HTML代码中可能存在的问题.

> * 🛠 [W3C validator](https://validator.w3.org/)

* [ ] **HTML Lint:** ![High][high_img] 我使用工具来帮助我分析我的HTML代码中可能遇到的任何问题。

> * 🛠 [Dirty markup](https://dirtymarkup.com/)

> * 🛠 [Sonar a linting tool for the web](https://sonarwhal.com/)


* [ ] **Link checker:** ![High][high_img] 在我的页面中没有断开的链接，请确认您没有任何404错误。

> * 🛠 [W3C Link Checker](https://validator.w3.org/checklink)

* [ ] **Adblockers test:** ![Medium][medium_img] 您的网站在启用adblockers的情况下正确显示您的内容（您可以提供一条消息，鼓励用户禁用他们的adblocker）

**[⬆ back to top](#table-of-contents)**

---

## Webfonts

> **Notes:** 使用网页字体可能会导致未样式化文本闪烁 /不可见文本闪烁 - 考虑使用备用字体和/或利用网页加载器来控制行为。
> * 📖 [Google Technical considerations about webfonts](https://developers.google.com/fonts/docs/technical_considerations)

* [ ] **Webfont format:** ![High][high_img] WOFF, WOFF2 和 TTF 被所有现代浏览器支持.

> * 📖 [WOFF - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff).
> * 📖 [WOFF 2.0 - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff2).
> * 📖 [TTF/OTF - TrueType and OpenType font support](https://caniuse.com/#feat=ttf)
> * 📖 [Using @font-face - CSS-Tricks](https://css-tricks.com/snippets/css/using-font-face/)

* [ ] **Webfont size:** ![High][high_img] Webfont 大小不要超出 2 MB (包括所有变体).

* [ ] **Webfont loader:** ![Low][low_img] 使用webfont加载器控制加载行为

> * 🛠 [Typekit Web Font Loader](https://github.com/typekit/webfontloader)

**[⬆ back to top](#table-of-contents)**

---

## CSS

> **Notes:** 看看大多数前端开发人员使用的  [CSS指南](https://cssguidelin.es/) and [Sass指南](https://sass-guidelin.es/)。
如果您对CSS属性有疑问，
你可以访问[CSS Reference]（http://cssreference.io/）。
还有一个简短的[代码指南]（http://codeguide.co/）的一致性。


* [ ] **Responsive Web Design:** ![High][high_img] 网站正在使用响应式网页设计。
* [ ] **CSS Print:** ![Medium][medium_img] 提供了一个打印样式表，并且在每个页面上都是正确的。
* [ ] **Preprocessors:** ![Low][low_img] 你的页面正在使用CSS预处理器（[Sass]（http://sass-lang.com/）是首选）。
* [ ] **Unique ID:** ![High][high_img] 如果使用ID，则它们对页面是唯一的。
* [ ] **Reset CSS:** ![High][high_img] CSS重置（reset, normalize 或 reboot）被使用并且是最新的。 *（如果您使用的是像Bootstrap或Foundation这样的CSS框架，则已经包含了Normalize。）

> * 📖 [Reset.css](https://meyerweb.com/eric/tools/css/reset/)
> * 📖 [Normalize.css](https://necolas.github.io/normalize.css/)
> * 📖 [Reboot](https://getbootstrap.com/docs/4.0/content/reboot/)

* [ ] **JS prefix:** ![Low][low_img] 所有的类（或在JavaScript文件中使用的id）都以 ** js- ** 开头，而不是放入CSS文件中。

```html
<div id="js-slider" class="my-slider">
<!-- Or -->
<div id="id-used-by-cms" class="js-slider my-slider">
```

* [ ] **Embedded or inline CSS:** ![High][high_img] 避免将CSS嵌入到`<style>`标记或使用内联CSS：只用于有效的原因（例如滑块，关键CSS的背景图像）。
* [ ] **Vendor prefixes:** ![High][high_img] CSS供应商前缀被使用，并与您的浏览器支持兼容性相应生成。

> * 🛠 [Autoprefixer CSS online](https://autoprefixer.github.io/)

### Performance


- [ ] **Concatenation:** ![High][high_img] CSS文件被连接在一个文件中 *(Not for HTTP/2)*.
- [ ] **Minification:** ![High][high_img] 所有的CSS文件都被缩小了。
- [ ] **Non-blocking:** ![Medium][medium_img] CSS文件需要是非阻塞的，以防止DOM花时间加载。

> * 📖 [loadCSS by filament group](https://github.com/filamentgroup/loadCSS)
> * 📖 [Example of preload CSS using loadCSS](https://gist.github.com/thedaviddias/c24763b82b9991e53928e66a0bafc9bf)

- [ ] **Unused CSS:** ![Low][low_img] 移除未使用的css.

> * 🛠 [UnCSS Online](https://uncss-online.com/) 🛠
> * 🛠 [PurifyCSS](https://github.com/purifycss/purifycss)
> * 🛠 [Chrome DevTools Coverage](https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage)

### CSS testing

* [ ] **Stylelint:** ![High][high_img] 所有的CSS或SCSS文件没有任何错误。


> * 🛠 [stylelint, a CSS linter](https://stylelint.io/)
> * 📖 [Sass guidelines](https://sass-guidelin.es/)

* [ ] **Responsive web design:** ![High][high_img] 所有页面都在以下断点进行了测试：320px，768px，1024px（根据您的分析可以更多/不同）。


* [ ] **CSS Validator:** ![Medium][medium_img] CSS进行了测试，并纠正了相关的错误。

> * 🛠 [CSS Validator](https://jigsaw.w3.org/css-validator/)

* [ ] **Desktop Browsers:** ![High][high_img] 所有页面都在当前所有桌面浏览器上进行了测试 (Safari, Firefox, Chrome, Internet Explorer, EDGE...).
* [ ] **Mobile Browsers:**  ![High][high_img] 所有页面都在当前所有移动浏览器上进行测试(Native browser, Chrome, Safari...).
* [ ] **OS:**  ![High][high_img] 所有页面都在当前所有操作系统上进行了测试 (Windows, Android, iOS, Mac...).

- [ ] **Pixel perfect:** ![High][high_img] 页面接近像素完美。 根据广告素材的质量，您可能不是100％准确的，但您的页面需要接近您的模板。


> [Pixel Perfect - Chrome Extension](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi?hl=en)


* [ ] **Reading direction:** ![High][high_img] 如果需要支持,所有页面则需要测试LTR和RTL语言。

> * 📖 [Building RTL-Aware Web Apps & Websites: Part 1 - Mozilla Hacks](https://hacks.mozilla.org/2015/09/building-rtl-aware-web-apps-and-websites-part-1/)
> * 📖 [Building RTL-Aware Web Apps & Websites: Part 2 - Mozilla Hacks](https://hacks.mozilla.org/2015/10/building-rtl-aware-web-apps-websites-part-2/)

**[⬆ back to top](#table-of-contents)**

---

## Images

> **Notes:** 要全面了解图像优化，请查看免费电子书 **[Essential Image Optimization](https://images.guide/)** 。

### Best practices

* [ ] **Optimization:** ![High][high_img] 所有图像都经过优化，在浏览器中呈现。 WebP格式可用于关键页面（如主页）。

> * 🛠 [Imagemin](https://github.com/imagemin/imagemin)
> * 🛠 使用 [ImageOptim](https://imageoptim.com/) 压缩图片
> * 🛠 使用 [Kraken.io](https://kraken.io/web-interface) 对于png和jpg优化都非常棒的选择。 免费计划每个文件最多1mb。

* [ ] **Picture/Srcset:** ![Medium][medium_img] 您可以使用picture / srcset为用户的当前视口提供最合适的图像。

> * 📖 [How to Build Responsive Images with srcset](https://www.sitepoint.com/how-to-build-responsive-images-with-srcset/)


* [ ] **Retina:** ![Low][low_img] 提供布局图像2x或3x，支持视网膜显示。
* [ ] **Sprite:** ![Medium][medium_img] 小图像在一个精灵文件中（在图标的情况下，它们可以在一个SVG精灵图像中）。
* [ ] **Width and Height:** ![High][high_img] 如果最终的渲染图像大小是已知的（CSS大小可以省略），在`<img>`上设置`width`和`height`属性。
* [ ] **Alternative text:** ![High][high_img] 所有`<img>`都有一个替代文字，可以直观地描述图像。

> * 📖 [Alt-texts: The Ultimate Guide](https://axesslab.com/alt-texts/)


* [ ] **Lazy loading:** ![Medium][medium_img] 图像都是懒加载的 (通常还需要 noscript 方案).

**[⬆ back to top](#table-of-contents)**

---

## JavaScript

### Best practices


* [ ] **JavaScript Inline:** ![High][high_img] 你没有任何内嵌的JavaScript代码（与你的HTML代码混合在一起）。
* [ ] **Concatenation:** ![High][high_img] JavaScript文件被连接在一起。
* [ ] **Minification:** ![High][high_img] JavaScript文件被缩小（您可以添加`.min`后缀）。

> * 📖 [Minify Resources (HTML, CSS, and JavaScript)](https://developers.google.com/speed/docs/insights/MinifyResources)

* [ ] **JavaScript security:** ![High][high_img]

> * 📖 [Guidelines for Developing Secure Applications Utilizing JavaScript](https://www.owasp.org/index.php/DOM_based_XSS_Prevention_Cheat_Sheet#Guidelines_for_Developing_Secure_Applications_Utilizing_JavaScript)

* [ ] **Non-blocking:** ![Medium][medium_img] JavaScript文件使用`async`异步加载，或者使用`defer`属性延迟加载。

> * 📖 [Remove Render-Blocking JavaScript](https://developers.google.com/speed/docs/insights/BlockingJS)

* [ ] **Modernizr:** ![Low][low_img] 如果您需要定位一些特定的功能，您可以使用自定义的Modernizr在您的<html>标签中添加类。

> * 🛠 [Customize your Modernizr](https://modernizr.com/download?setclasses)

### JavaScript testing

* [ ] **ESLint:** ![High][high_img] 没有错误被ESLint标记（根据您的配置或标准规则）。

> * 📖 [ESLint - The pluggable linting utility for JavaScript and JSX](https://eslint.org/)

**[⬆ back to top](#table-of-contents)**


---

## Security

### 扫描并检查您的网站

> * [securityheaders.io](https://securityheaders.io/)
> * [Observatory by Mozilla](https://observatory.mozilla.org/)
> * [ASafaWeb - Automated Security Analyser for ASP.NET Websites](https://asafaweb.com/)

### Best practices

* [ ] **HTTPS:** ![Medium][medium_img] HTTPS用于每个页面和所有外部内容（插件，图像...）。

> * 🛠 [Let's Encrypt - Free SSL/TLS Certificates](https://letsencrypt.org/)
> * 🛠 [Free SSL Server Test](https://www.ssllabs.com/ssltest/index.html)
> * 📖 [Strict Transport Security](http://caniuse.com/#feat=stricttransportsecurity)


* [ ] **HTTP Strict Transport Security (HSTS):** ![Medium][medium_img] HTTP头设置为“Strict-Transport-Security”。

> * 🛠 [Check HSTS preload status and eligibility](https://hstspreload.org/)
> * 📖 [HTTP Strict Transport Security Cheat Sheet - OWASP](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet)
> * 📖 [Transport Layer Protection Cheat Sheet - OWASP](https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet)

* [ ] **Cross Site Request Forgery (CSRF):** ![High][high_img] 确保向您的服务器端发出的请求是合法的，并从您的网站/应用程序发起，以防止CSRF攻击。

> * 📖 [Cross-Site Request Forgery (CSRF) Prevention Cheat Sheet  - OWASP](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet)

* [ ] **Cross Site Scripting (XSS):** ![High][high_img] 您的页面或网站没有XSS可能的问题。

> * 📖 [XSS (Cross Site Scripting) Prevention Cheat Sheet  - OWASP](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet)
> * 📖 [DOM based XSS Prevention Cheat Sheet  - OWASP](https://www.owasp.org/index.php/DOM_based_XSS_Prevention_Cheat_Sheet)

* [ ] **Content Type Options** ![Medium][medium_img] 防止Google Chrome浏览器和Internet Explorer尝试将响应的内容类型从服务器声明的内容类型中剔除。

> * 📖 [X-Content-Type-Options - Scott Helme](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options)

* [ ] **X-Frame-Options (XFO)** ![Medium][medium_img] 保护您的访问者免受点击劫持攻击。

> * 📖 [X-Frame-Options - Scott Helme](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options)
> * 📖 [RFC7034 - HTTP Header Field X-Frame-Options](https://tools.ietf.org/html/rfc7034)

* [ ] **Content Security Policy** ![Medium][medium_img] 定义如何在您的网站上加载内容，以及从哪里加载内容。 也可以用来防止点击劫持攻击。

> * 📖 [Content Security Policy - An Introduction - Scott Helme](https://scotthelme.co.uk/content-security-policy-an-introduction/)
> * 📖 [CSP Cheat Sheet - Scott Helme](https://scotthelme.co.uk/csp-cheat-sheet/)
> * 📖 [CSP Cheat Sheet - OWASP](https://www.owasp.org/index.php/Content_Security_Policy_Cheat_Sheet)

**[⬆ back to top](#table-of-contents)**

---

## Performance

### Best practices

- [ ] **Page weight:** ![High][high_img] 每个页面的大小在0到500 KB之间。

> * 🛠 [Website Page Analysis](https://tools.pingdom.com)
> * 📖 [Size Limit: Make the Web lighter](https://evilmartians.com/chronicles/size-limit-make-the-web-lighter)

* [ ] **Minified HTML:** ![Medium][medium_img] 您的HTML被压缩。

* [ ] **Lazy loading:** ![Medium][medium_img] 图片，脚本和CSS需要被延迟加载，以提高当前页面的响应时间（详见各自的章节）。

* [ ] **Cookie size:** ![Medium][medium_img] 如果您使用Cookie，请确保每个Cookie不超过4096个字节，而您的域名没有超过20个Cookie。


> * 📖 [Cookie specification: RFC 6265](https://tools.ietf.org/html/rfc6265)
> * 📖 [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
> * 🛠 [Browser Cookie Limits](http://browsercookielimits.squawky.net/)


* [ ] **Third party components:** ![Medium][medium_img] 依赖于外部JS（如共享按钮）的第三方iframe或组件将尽可能地由静态组件替换，从而限制对外部API的调用并保持用户活动的私密性。

> * 🛠 [Simple sharing buttons generator](https://simplesharingbuttons.com/)

### 准备即将到来的请求

> * 📖 [Explanation of the following techniques](https://css-tricks.com/prefetching-preloading-prebrowsing/)

* [ ] **DNS resolution:** ![Low][low_img] 可能需要的第三方服务的DNS在空闲时间使用`dns-prefetch`事先解决。

```html
<link rel="dns-prefetch" href="https://example.com">
```

* [ ] **Preconnection:** ![Low][low_img] DNS查询，TCP握手和TLS协商以及即将需要的服务在空闲时间使用`preconnect`预先完成。

```html
<link rel="preconnect" href="https://example.com">
```

* [ ] **Prefetching:** ![Low][low_img] 使用`prefetch`，在空闲时间提前请求资源（例如延迟加载的图像）。

```html
<link rel="prefetch" href="image.png">
```

* [ ] **Preloading:** ![Low][low_img] 当前页面需要的资源（例如脚本放在`<body>`末尾）预先使用`preload`。

```html
<link rel="preload" href="app.js">
```

> * 📖 [Difference between prefetch and preload](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)


### Performance testing

* [ ] **Google PageSpeed:** ![High][high_img] 所有的网页都进行了测试（不仅是首页），并且得分至少为90/100。

> * 🛠 [Google PageSpeed](https://developers.google.com/speed/pagespeed/insights/)
> * 🛠 [Test your mobile speed with Google](https://testmysite.withgoogle.com)
> * 🛠 [WebPagetest - Website Performance and Optimization Test](https://www.webpagetest.org/)
> * 🛠 [GTmetrix - Website speed and performance optimization](https://gtmetrix.com/)

**[⬆ back to top](#table-of-contents)**

---

## Accessibility

> **Notes:** 您可以观看播放列表 [A11ycasts with Rob Dodson](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g) 📹


### Best practices

- [ ] **Progressive enhancement:** ![Medium][medium_img] 主导航和搜索等主要功能应该在没有启用JavaScript的情况下运行。

> * 📖 [Enable / Disable JavaScript in Chrome Developer Tools](https://www.youtube.com/watch?v=kBmvq2cE0D8)

- [ ] **Color contrast:** ![Medium][medium_img] 色彩对比至少应通过WCAG AA（移动AAA）。

> * 🛠 [Contrast ratio](https://leaverou.github.io/contrast-ratio/)


#### Headings

* [ ] **H1:** ![High][high_img] 所有页面都有一个不是网站标题的H1。
* [ ] **Headings:** ![High][high_img] 标题应按照正确的顺序正确使用（H1到H6）。

> * 📹 [Why headings and landmarks are so important -- A11ycasts #18](https://www.youtube.com/watch?v=vAAzdi1xuUY&index=9&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

#### Landmarks

- [ ] **Role banner:** ![High][high_img] `<header>` has `role="banner"`.
- [ ] **Role navigation:** ![High][high_img] `<nav>` has `role="navigation"`.
- [ ] **Role main:** ![High][high_img] `<main>` has `role="main"`.

> * 📖 [Using ARIA landmarks to identify regions of a page](https://www.w3.org/WAI/GL/wiki/Using_ARIA_landmarks_to_identify_regions_of_a_page)
> * 📖 [ARIA roles categorization](https://www.w3.org/TR/wai-aria/roles#roles_categorization)


### Semantics

- [ ] **Specific HTML5 input types are used:** ![Medium][medium_img] 这对于显示不同类型的自定义键盘和小部件的移动设备尤其重要。

> * 📖 [Mobile Input Types](http://mobileinputtypes.com/)

### Form

* [ ] **Label:** ![High][high_img] 标签与每个输入表单元素相关联。 如果标签不能显示，请使用`aria-label`。

> * 📖 [Using the aria-label attribute - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)

### Accessibility testing

* [ ] **Accessibility standards testing:** ![High][high_img] 使用WAVE工具来测试您的页面是否遵守可访问性标准。

> * 🛠 [Wave testing](http://wave.webaim.org/)

* [ ] **Keyboard navigation:** ![High][high_img] 只使用您的键盘以预先确定的顺序测试您的网站。 所有交互元素都可以访问和使用。
* [ ] **Screen-reader:** ![Medium][medium_img] 所有页面都通过屏幕阅读器（VoiceOver，ChromeVox，NVDA或Lynx）进行测试。
* [ ] **Focus style:** ![High][high_img] 如果焦点被禁用，则在CSS中被替换为可见状态。

> * 📹 [Managing Focus - A11ycasts #22](https://www.youtube.com/watch?v=srLRSQg6Jgg&index=5&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

**[⬆ back to top](#table-of-contents)**

---

## SEO

* [ ] **Google Analytics:** ![High][high_img] Google Analytics已安装并正确配置。
* [ ] **Headings logic:** ![Medium][medium_img] 标题文字有助于了解当前页面中的内容。
* [ ] **sitemap.xml:** ![High][high_img] sitemap.xml存在并已提交到Google Search Console（以前的Google网站管理员工具）。
* [ ] **robots.txt:** ![High][high_img] robots.txt不会阻止网页。

> * 🛠 Test your robots.txt with [Google Robots Testing Tool](https://www.google.com/webmasters/tools/robots-testing-tool)

* [ ] **Structured Data:** ![High][high_img] Pages using structured data are tested and are without errors. Structured data helps crawlers understand the content in the current page.

> * 📖 [Introduction to Structured Data - Search - Google Developers](https://developers.google.com/search/docs/guides/intro-structured-data)
> * 🛠 Test your page with the [Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/)
> * 🛠 Complete list of vocabularies that can be used as structured data. [Schema.org Full Heirarchy](http://schema.org/docs/full.html)
> * 📖 [RDFa - Linked Data in HTML](https://rdfa.info/)
> * 📖 [JSON-LD](https://json-ld.org/)
> * 📖 [Microdata](https://www.w3.org/TR/microdata/)

* [ ] **Sitemap HTML:** ![Medium][medium_img] 提供了HTML sitemap，可以通过您网站页脚中的链接进行访问。

> * 📖 [Sitemap guidelines - Google Support](https://support.google.com/webmasters/answer/183668?hl=en)
> * 🛠 [Sitemap generator](https://websiteseochecker.com/html-sitemap-generator/)

**[⬆ back to top](#table-of-contents)**

---

## Translation

前端清单也可用其他语言。 感谢所有翻译和他们的工作！

* 🇯🇵 Japanese: [miya0001/Front-End-Checklist](https://github.com/miya0001/Front-End-Checklist)
* 🇪🇸 Spanish: [eoasakura/Front-End-Checklist-ES](https://github.com/eoasakura/Front-End-Checklist-ES)
* 🇨🇳 Chinese: [JohnsenZhou/Front-End-Checklist](https://github.com/JohnsenZhou/Front-End-Checklist)
* 🇰🇷 Korean: [kesuskim/Front-End-Checklist](https://github.com/kesuskim/Front-End-Checklist)
* 🇧🇷 Portuguese: [jcezarms/Front-End-Checklist](https://github.com/jcezarms/Front-End-Checklist)
* 🇻🇳 Vietnamese: [euclid1990/Front-End-Checklist](https://github.com/euclid1990/Front-End-Checklist)
* 🇹🇼 Traditional Chinese: [EngineLin/Front-End-Checklist](https://github.com/EngineLin/Front-End-Checklist)
* 🇫🇷 French: [ynizon/Front-End-Checklist](https://github.com/ynizon/Front-End-Checklist)
* 🇷🇺 Russian: [ungear/Front-End-Checklist](https://github.com/ungear/Front-End-Checklist)

---


[low_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png
[medium_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png
[high_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png