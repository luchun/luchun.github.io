---
layout: post
title: Webpack 总结
---
总结一下Webpack的使用

## [1-1 脚本加载的问题]

JavaScript只是一个脚本，它自上而下的执行。

有两种方法加载 导入 `.js`文件(`<script src="index.js"></script>`)，或者在`.html`文件中编写JavaScript。

### 问题

* 没有弹性
* 太多脚本
* 不可维护的脚本
* 作用域，大小，可读性，脆弱性，整体文件。

### 解决方案？

* 将每个文件视为立即执行函数表达式（IIFE），代表模块。

```js
let outerScope = 1;
const whatever = (function(dataNowUsedInside){
  let outerScope = 4;
  return{
    someAttribute: "youwant"
  }
})(1)
console.log(outerScope); 
/**
 * console log returns "1". No inner scope leak!
 */
```

现在我们可以将内部作用域变量的名称与外部作用域变量的名称相同。

我们可以“安全地”组合文件，无需考虑作用域冲突！

为了将文件连接在一起，人们一直在使用诸如“make”，“grunt”，“gulp”，“broccoli”，“brunch”和“stealJS”等工具。

### 问题！

* 每次都完全重新build！
* 死代码（concat无助于跨文件使用。）
* 很多IIFE都很慢（小模块的成本）
* 无法动态加载（无法进行延迟加载。

## 【1-2 模块的历史】

如果要构建规范的Web应用程序，需要预先安装Node.js.
它不仅是我们如何获得包，如何共享包，如何运行工具，检查器，命令的基础。
Node.js是在服务端上运行的JavaScript。
它采用了V8引擎并为其引入二进制文件，为服务器端提供了运行时。
但是，如果没有DOM，如何加载JavaScript？如果Node.js中没有HTML，如何添加脚本标记？

那是CommonJS诞生的时候

````js
[src > index.js]
const path = require("path") // used for built-in Node.js modules
const {add, subtract} = require("./math"); // used modules from another file
const sum = add(5, 5);
const difference = subtract(10, 4);
console.log(sum, difference);
-----------------------------------
[src > math.js] 
// has two named exports {add, subract}
const divideFn = require("./division");
exports.add = (first, second) => first + second;
exports.subtract = (first, second) => first - second;
exports.divide = divideFn;
-----------------------------------
[division.js] // has a default exports "divide"
module.exports = (first, second) => first/second;
````

我们刚刚没有使用IIFE就解决了作用域问题。
我们现在可以提取多个值，将它们分配给不同模块中的变量而不会出现作用域问题。

这也给了我们一点静态分析。
我们可以在这里准确地说出大部分时间使用了什么。

这是JavaScript开始爆炸的时候：NPM + Node.js +模块 = 大规模分发。

使用NPM，可以轻松运送您想要的任何模块。

NPM是作为包注册表创建的，以便能够将CommonJS node 模块共享为整个生态系统和注册表。

### 问题！

* 没有浏览器支持 CommonJS
* 没有动态绑定（循环引用的问题）
* CommonJS的解析算法很慢(因为他是同步的)

### 解决方案？

诸如Browserify和WebMake之类的打包器被创造出来，以允许人们编写CommonJS模块，
打包它们，剥离语句，然后以在Web中工作的相同顺序执行它们。 此外，我们开始看到不同的方法，如Loader。

````js
Browerify (Static)
RequireJS (Loader)
SystemJS (Loader)
````

### 问题！

* 没有静态 异步/延迟 加载
* CommonJS 臃肿： 过于动态

````js
"CommonJS"
// loading a module
let _ = require('loadash');
// declare the module
module.exports = someValue;
````
问题是“require”实际上是一个可以传递到任何地方的函数。
所以，有些人滥用了CommonJS语法。他们最终会得到臃肿的打包。
CommonJS对模块格式过于动态，无法真正优化代码。

* 延迟加载太动态
* 尴尬的非标准语法（并非真正的模块系统）

## [ 1–3. EcmaScript Modules (ESM) ]

### 解决方案？

经过10年的发展，ESM出现了。最初的规范被称为和谐模块规范。

您不应将其称为2015模块。 ES模块与ES2015完全分开。您可以编写ES3语法并仍然使用ESM。

ESM定义了导入，语法，导出，静态行为，模块加载，浏览器应该如何加载它。

```js
import {uniq, forOf, bar} from 'loadash-es'
import * as utils from 'utils';
export const uniqConst = uniq([1,2,2,4]);
```

### 优点

* 可重复使用，封装，有组织，方便。

### 问题！

* Nodejs v12 正式开始支持 ESM

* 浏览器使用ESM非常慢。

## [ 1–4. Introducing Webpack ]

Webpack是一个 ** 模块打包器 ** 

* 让你编写任何格式的模块（甚至混合！），为浏览器编译它们。

* 支持静态异步捆绑

* 拥有丰富，庞大的生态系统（当今最高性能的JavaScript发布方式）

2012年，Webpack诞生了。
 2014年，当时Instagram的工程经理Pete Hunt在O'Reilly开源大会上介绍了Instagram如何将其React应用程序与Webpack捆绑。
 从那时开始，Webpack生态系统爆炸了。

## [ 1–5. 配置 Webpack ]

有三种方法可以使用Webpack。

### 方法＃1：Webpack配置

Webpack配置只是一个CommonJS模块。

它只是一个具有大量属性的对象。 webpack.config.js文件“导出对象。然后，Webpack根据其定义的属性“处理该对象。

### 方法＃2：Webpack CLI

不需要开箱即用的配置

```js
$ webpack <entry.js> <result.js> --colors --progress
$ webpack-dev-server--port=9000
```

### 方法＃3：节点API

需要注意的是，必须提供自己的统计，反馈，报告和控制台信息。所有这些都不是开箱即用的。

```js
let webpack = require("webpack");
// returns a Compiler instance
webpack({
  // configuration object here!
}, function(err, stats){
  // ...
  // compilerCallback
  console.error(err);
});
```

# 开始使用 Webpack

## [2-1 为环境构建添加NPM脚本]

### Step 1

将dev脚本添加到package.json文件中：

```json
{
  "scripts": {
    "webpack": "webpack",
    "dev": "npm run webpack -- --mode development"
}
```

“ -- ” 语法表示将下一个参数传递给原始命令

### Step 2

以开发模式启动Webpack：`npm run dev`

可以看到执行的是 `webpack "--mode" "development"`

将生产脚本添加到package.json文件中：

```json
{
  "scripts": {
    "webpack": "webpack",
    "dev": "npm run webpack -- --mode development",
    "prod": "npm run webpack -- --mode production"
}
```

## [ 2–2. 编写第一个模块 ]

### Step 1

在src目录下编写 nav.js index.js

````js
[src > nav.js]
export default "nav";
-----------------------------------
[src > index.js]
import nav from "./nav";
console.log(nav);
````

### Step 2

执行 `npm run prod`

会发现生成了一个dist目录

```js
- dist
   |-- main.js
- src
   |-- index.js
   |-- nav.js
- package.json
```

在命令行中执行 `node ./dist/main.js` 会得到

```js
nav
```

我们创建了两个模块并放在一起。现在它的功能与我们编写模块的执行方式相同。

## [ 2–5. 添加 Watch 模式 ]

替代人们运行“npm run prod”，使用Webpack的“watch mode” 添加监视。

###  Step 1
添加 `--watch` 并执行 `npm run dev`
```js
"scripts": {
  "webpack": "webpack",
  "prod": "npm run webpack -- --mode production",
  "dev": "npm run webpack -- --mode development --watch"
},
```

# Webpack核心概念

Webpack的四个核心概念：“entry”, “output”, “loaders”, 和 “plugins”。

## [ 3–1. Webpack Entry ]

“Entry”是第一个加载到“启动”应用程序的javascript文件。 Webpack以此为出发点。

```js
// webpack.config.js
module.exports = {
  entry: './browser.main.ts',
  // ...
}
```

## [3–2. Output & Loaders ]

### Step 1

第二个核心概念称为“Output”。

```js
// webpack.config.js
module.exports = {
  entry: './browser.main.ts',
  output: {
    path: './dist',
    filename: './bundle.js'
  },
  // ...
}
```

在Webpack 4中，默认情况下文件名设置为main.js.

### Step 2

第三个核心概念是“loaders”。这个概念使Webpack真正区别于您可能使用过的任何其他工具。

```js
module:{
  rules: [
    { test: /\.ts$/, use: 'ts-loader' },
    { test: /\.js$/, use: 'babel-loader' },
    { test: /\.sass$/, use: 'sass-loader' }
  ]
}
```

loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。
loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

loader 有两个核心属性： 

1. test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。

2. use 属性，表示进行转换时，应该使用哪个 loader。

### Step 3

有一些不同类型的功能可以帮助转换文件时过滤，包含，选择忽略。

```js
module:{
  rules: [
    test: regex,
    use: (Array|String|Function),
    include: RegExp[],
    exclude: RegExp[],
    issuer: (RegExp|String)[],
    enforce: "pre"|"post"
  ]
}
```

* test: 一个正则表达式，指示编译器运行加载器的文件。
* use: 一个 array/string/返回loader对象的函数
* enforce: 可以是 'pre' 或 'post'，告诉Webpack在所有其他规则之前或之后运行此规则
* include: 一个正则表达式数组，指示编译器包含哪些文件夹/文件; 将仅搜索include提供的路径
* exclude: 一个正则表达式数组，指示编译器忽略哪些文件夹/文件

["include"和”exclude“的例子]

```js
module:{
  rules: [
    {
      test: /\.ts$/,
      use: [
        'awesome-typescript-loader',
        'ng2-asset-loader'
      ],
      include: /some_dir_name/,
      exclude: [/\.(spec|e2e)\.ts$/],
    }  
  ]
}
```

### [ 3–3. Chaining Loaders ]

加载器只是一个接收源并返回新源的函数。

Step 1

加载器总是从右到左执行（从左到右的第一个传递只是为了收集元数据）。

```js
module:{
  rules: [
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  ]
}
```

计算机如下读取代码：`style(css(sass()))`

<img src="{{ site.baseurl }}/images/webpack/1.png" alt="矩阵1"/>

<img src="{{ site.baseurl }}/images/webpack/2.png" alt="矩阵1"/>

<img src="{{ site.baseurl }}/images/webpack/3.png" alt="矩阵1"/>

<img src="{{ site.baseurl }}/images/webpack/3.png" alt="矩阵1"/>

### [3-4. Webpack Plugins]

[一个简单插件例子] 插件是ES5“类”，它实现了应用功能。编译器使用它来发出事件。

```js
function BellOnBundlerErrorPlugin() {}
BellOnBundlerErrorPlugin.prototype.apply = function(compiler){
  if(typeof(process) !== 'undefined'){
  
    // Compiler events emitted & handled
    compiler.plugin('done', function(stats){
      if(stats.hasErrors()){
        process.stderr.write('\x07');
      }
    });
    compiler.plugin('failed', function(err){
      process.stderr.write('\x07');
    });
  }
}
module.exports = BellOnBundlerErrorPlugin;
```

* 当将“apply”方法传递给Webpack时，它会将自己作为一个实例传递给这个插件以挂载到不同的事件中。
* 此示例使用Webpack 3 API作为插件系统。但是，概念是一样的。我们插入编译器并收听“done”和“failed”事件。事件将传递数据，然后我们将根据数据的采取具体行为。

让我们将它的新实例传递给我们的配置。

```js
// require() from node modules or Webpack or local file
let BellOnBundlerErrorPlugin = require('bell-on-error');
let webpack = require('webpack');
module.exports = {
  // ...
  plugins: [
    new BellOnBundlerErrorPlugin(),
    // Just a few of the built-in plugins
    new webpack.optimize.CommonsChunkPlugin('vendors'),
    new webpack.optimize.UglifysPlugin()
  ]
  //...
}
```

[如何使用插件]

* 从 `node_modules` 中 `require()` 插件到 `config`
* 在 `config` 对象的 `plugins` 键中添加新的插件实例
* 提供其他信息参数

80％的Webpack源代码是由自己的插件系统组成的。 它是由您使用的完全相同的插件系统构建的。

## [3–5. 向 Webpack Config 传递参数]

将 'mode' 改为 'env.mode'

```js
[package.json]
"scripts": {
  "webpack": "webpack",
  "prod": "npm run webpack -- --env.mode production",
  "dev": "npm run webpack -- --env.mode development --watch"
}
```

当将“env”标志传递给Webpack时，Webpack将获取值（在本例中为具有mode属性的对象）并将其提供给函数内部的配置。

```js
[webpack.config.js]
module.exports = env => {
  // env 是 { mode: ‘production’ }  
  return{
    output:{
      filename: "bundle.js"
    }
  }
};
```

如果将 env设置为字符串也是可以的

```js
[package.json]
"scripts": {
  "prod": "npm run webpack -- --env production"
}
```

在  webpack.config.js 中 env是字符串 `production`

此时因为 没有传递 --mode 参数，会收到警告。我们修改 webpack.config.js 以使用 env中的mode参数

```js
[webpack.config.js]
module.exports = ( {mode}) => {
  console.log(mode);
  return{
    mode,
    output:{
      filename: "bundle.js"
    }
  }
};
```

## [3–6. 添加 Webpack 插件]

### Step 1

执行 `npm install html-webpack-plugin --save-dev`

### Step 2

```js
[webpack.config.js]
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = ( {mode}) => {
  console.log(mode);
  return{
    mode,
    output:{
      filename: "bundle.js"
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new webpack.ProgressPlugin()
   ]
  }
};
```

### Step 3

执行 `npm run prod`

```js
- dist
  -- bundle.js
  -- index.html
- src
- package.json
- webpack.config.js
```

生成了 index.html

## [3–8. 启动本地开发服务器]

### Step 1

` npm install webpack-dev-server -D`

### Step 2

添加webpack-dev-server脚本并将webpack-dev-server添加到dev脚本中。然后运行以下命令：`npm run dev`。

```js
[package.json]
"scripts": {
  "webpack-dev-server": "webpack-dev-server",
  "webpack": "webpack",
  "prod": "npm run webpack -- --env.mode production",
  "dev": "npm run webpack-dev-server -- --env.mode development --watch"
}
```

### Step 3
Visit `http://localhost:8080/`. 现在我们有了一个服务可以验证我们的代码运行结果

## [3–10. 拆分 Environment Config 文件]

调整结构, 安装 webpack-merge

```bash
- build
  -- presets
     -- loadPresets.js
  -- webpack.development.js
  -- webpack.production.js
- dist
  -- bundle.js
  -- index.html
- src
- package.json
- webpack.config.js
```

### Step 1

让我们声明一个变量

```js
// [webpack.config.js]
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const modeConfig = env => require(`./build/webpack.${env}`)(env);
module.exports = ({mode, presets} = { mode: "production", presets: [] }) => {
  console.log(mode);
  return{
    mode,
    output:{
      filename: "bundle.js"
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new webpack.ProgressPlugin()
   ]
  }
};
```
`const modefig` 返回一个可以调用的函数。

### Step 2

使用 webpack-merge

```js
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");
const modeConfig = env => require(`./build/webpack.${env}`)(env);
module.exports = ({mode, presets} = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      output: {
        filename: "bundle.js"
      },
      plugins: [
        new HtmlWebpackPlugin(),
        new webpack.ProgressPlugin()
      ]
    },
    modeConfig(mode)
  );
};
```

### Step 3

生产模式下给打包增加hash

```js
// [build-utils > webpack.production.js]
module.exports = () => ({
  output: {
    filename: "[chunkhash].js"
  }
});
```

# [4. 使用插件]

## [ 4–1. Using CSS with Webpack ]

`import “./footer.css”;` 这种引入css的方式， webpack自身是不支持的。需要使用 `css-loader`

```js
// [build > webpack.development.js]
module.exports = () => ({
  module:{
    rules:[
      {
        test: /\.css$/,
        use: ["css-loader"]
      }
    ]
  }
});
```

`css-loader` 使css可以像 js模块一样被引入，但页面不会有任何效果。 
所以还需要 `style-loader`, 它会通过插入 `<style>` 标签将css添加到dom中去。

```js
// [build > webpack.development.js]
module.exports = () => ({
  module:{
    rules:[
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
});
```
## [ 4–2. CSS 模块热更新 ]

### Step 1

添加 `--hot` 标识， `"dev": "npm run webpack-dev-server -- --env.mode development --hot",`

之后修改样式就不需要重新加载页面了。

### Step 2

我们刚刚添加了一个CSS模块。它阻断了主线程，这是因为我们依靠JavaScript来添加样式标记。

相反，我们想要做的是将其提取出来并将其放在单独的标签中。
我们可以通过添加mini-css-extract-plugin（仅兼容Webpack 4）并将其应用于我们的生产配置来实现。

```js
// [build > webpack.production.js]
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = () => ({
  output: {
    filename: "[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [ new MiniCssExtractPlugin() ]
});
```

不同于开发环境配置，在生产上我们使用`mini-css-extract-plugin`将css提取为单独的文件。

## [ 4–3. File Loader & URL Loader ]

首先，让我们安装 `file-loader` 和 `url-loader`。在终端运行 `npm install file-loader url-loader -D`

````js
// [webpack.config.js]
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");
const modeConfig = env => require(`./build/webpack.${env}`)(env);
module.exports = ({mode, presets} = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      module: {
        rules: [
          {
            test: /\.jpe?g$/,
            use: ["url-loader"]
          }
        ]
      },
      output: {
        filename: "bundle.js"
      },
      plugins: [
        new HtmlWebpackPlugin(),
        new webpack.ProgressPlugin()
      ]
    },
    modeConfig(mode)
  );
};
````

url-loader：webpack的loader，用于将文件转换为base64 URI

## [ 4–4. Loading Images with JavaScript ]

### Step 1

添加一张 xx.jpg图片 并使用js 加载它

```js
import imageURL from "./webpack-logo.jpg";
console.log(imageURL);
```

在页面上会发现有一段很长的base64

## [ 4–5. URL Loader 限制文件大小]

将 `use: [“url-loader”]` 调整为 `use: [{ loader: “url-loader”}]`

增加选项参数

```js
use: [{
  loader: "url-loader",
  options: {
    limit: 5000
  }
}]
```

## [ 4–6. 实现预设 ]

### Step 1

```js
// [build > presets > loadPresets.js]
const webpackMerge = require("webpack-merge");

module.exports = env => {
  const { presets } = env;
  /** @type {string{}} */
  const mergedPresets = [].concat(...[presets]);
  const mergedConfigs = mergedPresets.map(
    presetName => require(`./presets/webpack.${presetName}`)(env) 
    // call the preset and pass env also
  );

  return webpackMerge({}, ...mergedConfigs);
};
```

env：我们从主配置中得到的整个env

### Step 2

在webpack.config.js中添加一些额外的代码来实现合并预设

```js
// [webpack.config.js]
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpackMerge = require("webpack-merge");
const modeConfig = env => require(`./build/webpack.${env}`)(env);
const presetConfig = require("./build/loadPresets");
module.exports = ({mode, presets} = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      module: {
        rules: [
          {
            test: /\.jpe?g$/,
            use: ["url-loader"]
          }
        ]
      },
      output: {
        filename: "bundle.js"
      },
      plugins: [
        new HtmlWebpackPlugin(),
        new webpack.ProgressPlugin()
      ]
    },
    modeConfig(mode),
    presetConfig({mode, presets})
  );
};
```

### Step 3

让我们用较小的配置创建一个新的预设。我们只需要遵循相同的命名模式。

在“presets”文件夹中创建webpack.typescript.js。

```bash
- build
  -- presets
     -- webpack.typescript.js
  -- loadPresets.js
  -- webpack.development.js
  -- webpack.production.js
- package.json
```

在webpack.typescript.js中添加以下代码：

```js
module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  }
})

```

还需要安装 ts: `npm install ts-loader typescript@next — dev`

package.json 增加一个 script `"prod:typescript": "npm run prod -- --env.presets typescript"`




