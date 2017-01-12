---
layout: post
title: 编写Node和浏览器通用的组件
---

假设你要在npm发布一个模块，支持 Node 和 browser 。
但是模块的 Node 版本 和 browser 版本的实现上有所不同。

Node 和 browser 的环境有很多细微不同，这种情况会频繁遇到。它很难正确解决，
尤其是当你想尽可能优化 brower 版的体积。

## 创建一个 JS 模块

假设有一个很小的 JavaScript 模块，叫做 `base64-encode-string` 。
接收一个字符串，输出 base64 编码过的字符串。

对于浏览器，直接使用内置的 `btoa` 函数:

    module.exports = function (string) {
      return btoa(string);
    };

Node, 没有 `btoa` 函数，我们创建一个 `Buffer` ,然后调用 `buffer.toString()`

    module.exports = function (string) {
      return Buffer.from(string, 'binary').toString('base64');
    };

两个版本都可以正确的输出 base64 编码过的字符串。如

    var b64encode = require('base64-encode-string');
    b64encode('foo');    // Zm9v
    b64encode('foobar'); // Zm9vYmFy

现在我们通过一些方式来判断运行环境是 browser 还是 Node, 来使用正确的版本。
Browserify 和 Webpack 定义了一个 `process.browser` 并返回 `true`, 在 Node 中返回 false。
我们可以这样写:

    if (process.browser) {
      module.exports = function (string) {
        return btoa(string);
      };
    } else {
      module.exports = function (string) {
        return Buffer.from(string, 'binary').toString('base64');
      };
    }

接着我们命名它 `index.js` 并输入 `npm publish`， 结束了吗？ 
很不幸，虽然可用，但在性能上有很大的问题。

由于 `index.js` 引用了 Node 内置的 `process` 和 `Buffer` 模块，
Browserify 和 Webpack 都会自动包含 这些模块的 polyfills

对于这个仅有9行的模块，Browserify 和 Webpack 打包后体积为 24.7kb,
事实上在浏览器中我们只是调用了内置的 `btoa`

### "browser" field

通过 Browserify 和 Webpack 的文档，你会发现 [node-browser-resolve](https://github.com/defunctzombie/node-browser-resolve)
这是一个在 `package.json` 中 加入 `'browser'` 的规范
 
使用这个技术，我们可以在 `package.json` 添加代码：
  
    {
      /* ... */
      "browser": {
        "./index.js": "./browser.js"
      }
    }
    
然后将 函数拆分为两个文件:
    
    // index.js
    module.exports = function (string) {
      return Buffer.from(string, 'binary').toString('base64');
    };
    
    // browser.js
    module.exports = function (string) {
      return btoa(string);
    };
    