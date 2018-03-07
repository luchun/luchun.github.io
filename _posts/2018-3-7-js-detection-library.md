---
layout: post
title: JS工具 Platform.js 和 URI.js
---

一些常用的 判断浏览器功能支持/浏览器版本信息工具

## [Platform.js](https://github.com/bestiejs/platform.js#readme)
对UserAgent判断浏览器信息的集成。 可以判断浏览器渲染引擎/生产厂家/浏览器名称/操作系统/版本。

使用示例:
```javascript
// on IE10 x86 platform preview running in IE7 compatibility mode on Windows 7 64 bit edition
platform.name; // 'IE'
platform.version; // '10.0'
platform.layout; // 'Trident'
platform.os; // 'Windows Server 2008 R2 / 7 x64'
platform.description; // 'IE 10.0 x86 (platform preview; running in IE 7 mode) on Windows Server 2008 R2 / 7 x64'

// or on an iPad
platform.name; // 'Safari'
platform.version; // '5.1'
platform.product; // 'iPad'
platform.manufacturer; // 'Apple'
platform.layout; // 'WebKit'
platform.os; // 'iOS 5.0'
platform.description; // 'Safari 5.1 on Apple iPad (iOS 5.0)'

// or parsing a given UA string
var info = platform.parse('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7.2; en; rv:2.0) Gecko/20100101 Firefox/4.0 Opera 11.52');
info.name; // 'Opera'
info.version; // '11.52'
info.layout; // 'Presto'
info.os; // 'Mac OS X 10.7.2'
info.description; // 'Opera 11.52 (identifying as Firefox 4.0) on Mac OS X 10.7.2'
```


##[URI.js](https://github.com/medialize/URI.js)
一个操作url的js库

以前要要向search中添加一个内容，需要先判断是否有query再添加，很麻烦，如下：
```javascript
var url = "http://example.org/foo?bar=baz";
var separator = url.indexOf('?') > -1 ? '&' : '?';

url += separator + encodeURIComponent("foo") + "=" + encodeURIComponent("bar");
```
`URI.js` 对URL解析编辑的功能进行了封装
```javascript
var url = new URI("http://example.org/foo?bar=baz");
url.addQuery("foo", "bar");
```
使用示例:
```javascript
// mutating URLs
URI("http://example.org/foo.html?hello=world")
  .username("rodneyrehm")
    // -> http://rodneyrehm@example.org/foo.html?hello=world
  .username("")
    // -> http://example.org/foo.html?hello=world
  .directory("bar")
    // -> http://example.org/bar/foo.html?hello=world
  .suffix("xml")
    // -> http://example.org/bar/foo.xml?hello=world
  .query("")
    // -> http://example.org/bar/foo.xml
  .tld("com")
    // -> http://example.com/bar/foo.xml
  .query({ foo: "bar", hello: ["world", "mars"] });
    // -> http://example.com/bar/foo.xml?foo=bar&hello=world&hello=mars

// cleaning things up
URI("?&foo=bar&&foo=bar&foo=baz&")
  .normalizeQuery();
    // -> ?foo=bar&foo=baz

// working with relative paths
URI("/foo/bar/baz.html")
  .relativeTo("/foo/bar/world.html");
    // -> ./baz.html

URI("/foo/bar/baz.html")
  .relativeTo("/foo/bar/sub/world.html")
    // -> ../baz.html
  .absoluteTo("/foo/bar/sub/world.html");
    // -> /foo/bar/baz.html

// URI Templates
URI.expand("/foo/{dir}/{file}", {
  dir: "bar",
  file: "world.html"
});
// -> /foo/bar/world.html
```

