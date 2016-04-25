---
layout: post
title: Webpack — The Confusing Parts
---
webpack 中一些让人迷惑的地方

Webpack 是 React 和 Redux apps 的模块打包工具，在 Angulars2 和其他框架开发者中也有人使用。

我第一次看到 Webpack 配置文件时，它看起来像外星人。经过一段时间后，现在我认为这是因为 Webpack 有独特的语法和新的理念，在开始时容易让人迷惑。顺便一提，正是这些理念使得它流行起来。


## Webpack’s Core Philosophy

Webpack 的两个核心理念：

1.  ** Everything is a module ** -- 就像 JS 文件可以被模块化，其他文件（ CSS, Images, HTML）一样可以模块化。所以你可以 `require(“myJSfile.js”)` 或者 ` require(“myCSSfile.css”)` ，所以我们可以拆分出更小的管理片段，并重用等等。

2.  ** Load only “what” you need and “when” you need ** -- 传统的模块打包器加载所有的模块，并生成一个很大的输出 "bundle.js" 文件。很多真实中的app, "bundle.js"都会达到10MB - 15MB。Webpack有多种功能可以拆分你的代码并生成多个 "bundle" 文件。并可以在你需要的时候异步加载 app parts。

## 1.Development Vs Production

首先要注意的是 Webpack 有大量的功能。一些是 “Development-only”, 另一些是 “Production-only” 还有一些是 “Production-and-Development”.

<img src="{{ site.baseurl }}/images/1-63Zta4mbC_3o44QdycrD7Q.png"  style="width: 100%;display:block"/>

> 通常项目会有很多配置，所以会有两个很大的 Webpack 配置文件。

同时为了创建 bundles 你需要在 **package.json** 中这样写

    “scripts”: {
      //npm run build to build production bundles
      “build”: “webpack --config webpack.config.prod.js”,
      //npm run dev to generate development bundles and run dev. server
      “dev”: “webpack-dev-server”
     }

## 2. webpack CLI Vs webpack-dev-server

需要注意到，Webpack 提供了两个接口：

1.  Webpack CLI tool -- 默认接口(作为 Webpack 的一部分安装)

2.  webpack-dev-server tool -- 一个Node.js 服务器(你需要单独安装)

### Webpack CLI (Good for Production Builds)

这个工具通过CLI 或者 config 文件 (默认 webpack.config.js )获取参数并传递给Webpack用来打包。

**Usage :**

    OPTION 1: 
    //Install it globally
    npm install webpack --g
    //Use it at the terminal 
    $ webpack //<--Generates bundle using webpack.config.js

    OPTION 2 :
    //Install it locally & add it to package.json
    npm install webpack --save
    //Add it to package.json's script 
    “scripts”: {
     “build”: “webpack --config webpack.config.prod.js -p”,
     ...
     }
    //Use it by running the following:
    "npm run build"

### Webpack-dev-server (Good for Development Builds)

这是一个运行在8080端口的Express node.js 服务器。服务器内部调用Webpack。好处是提供了附加的功能如重新加载浏览器 “Live Reloading”，和/或 仅替换修改的模块 “Hot Module Replacement” (HMR)

**Usage :**

    OPTION 1:
    //Install it globally
    npm install webpack-dev-server --save
    //Use it at the terminal
    $ webpack-dev-server --inline --hot
    OPTION 2:
    // Add it to package.json's script 

    “scripts”: {
     “start”: “webpack-dev-server --inline --hot”,
     ...
     }
    // Use it by running 
    $ npm start
    Open browser at:
    http://localhost:8080
    
### Webpack Vs webpack-dev-server options

一些选项如 "inline" 和 "hot" 是 webpack-dev-server 仅有的功能。另一些如 "hide-modules" 是CLI 仅有的功能。

### webpack-dev-server CLI options Vs config options

可以通过两种方式向 webpack-dev-server 传递参数

1.  **Through webpack.config.js’s “devServer” object.**

2.  **Through CLI options.**

    //Via CLI
    webpack-dev-server --hot --inline
    
    //Via webpack.config.js
    devServer: {
     inline: true,
     hot:true
     }
     
> 我发现有时 devServer config (hot : true 和 inline : true) 不好用。所以我更喜欢通过在package.json中传递：

    //package.json
    {
    scripts: 
       {“start”: “webpack-dev-server --hot --inline”}
    }

> 注意你没有一起传递 hot: true 和 -hot

### “hot” Vs “inline” webpack-dev-server options

“inline” 选项为整个页面添加 "Live reloading". "hot" 选项启用“hot module reloading” ，在发生改变时会尝试只reload修改的组件。如果两个都传递了，当源代码变更时，webpack-dev-server会先尝试HMR,如果不能再reload完整页面。

    //When the source changes, all 3 options generates new bundle but,

    //1. doesn't reload the browser page
    $ webpack-dev-server
    //2. reloads the entire browser page
    $ webpack-dev-server --inline
    //3. reloads just the module(HMR), or the entire page if HMR fails
    $ webpack-dev-server  --inline --hot
    
## 3. “entry” — String Vs Array Vs Object

**Entry** 告诉Webpack 根模块或者起始点 。它可以是 String , Array, Object。不同的类型用于不同的目的。

如果只有一个入口（就像多数应用），你可以使用任何格式，结果都一样。

<img src="{{ site.baseurl }}/images/1-OnXpfv4zjL-5zO2Ha6mXDw.png"  style="width: 100%;display:block" />

### entry — Array
如果你想要插入多个文件而 **它们不相互依赖** ,你可以使用 Array 。

例如：你需要在HTML 中使用 'googleAnalytics.js'。你可以告诉Webpack将它插入到bundle.js的后边：

<img src="{{ site.baseurl }}/images/1-yLVdS3oN4Xo8KInoTIfi0A.png"  style="width: 100%;display:block" />

### entry — object

如果你有一个**真**多页面的应用，而不是单页应用包含的多个视图，而是有多个html文件(index.html 和 profile.html)。你可以告诉Webpack 
**使用 entry object 一次生成多个bundles**

下边的配置会生成两个JS文件: **indexEntry.js 和 profileEntry.js，你可以在index.html 和 profile.html中分别使用**

<img src="{{ site.baseurl }}/images/1-xB51RRC4ik6BBP2lJ90Iuw.png"  style="width: 100%;display:block" />

**Usage :**

    //profile.html
    <script src=”dist/profileEntry.js”></script>
    //index.html
    <script src=”dist/indexEntry.js”></script>

> 注意： 文件的name 来自于 entry 对象的 keys

### entry — combination

你也可以在 entry object 中使用 Array。例如下边的配置会生成3个文件： vendor.js包含三个vendor文件，还有index.js 和 profile.js

<img src="{{ site.baseurl }}/images/1-yz76QY1fVzBGKJ-6X6Eleg.png"  style="width: 100%;display:block" />

## 4. output — “path” Vs “publicPath”

**output** 告诉 Webpack 在哪里和如何存放输出文件。它有两个叫人迷惑的属性 "path" 和 "publickPath".

“path”简单告诉Webpack在哪里存放输出。当生成**prodution**包时，"publicPath"被很多Webpack插件用来更新CSS和HTML中的URLs。

<img src="{{ site.baseurl }}/images/1-63Zta4mbC_3o44QdycrD7Q.png"  style="width: 100%;display:block" />

例如在你的css中，你会加载localhost上的'./test.png'。但在生产环境中，'test.png'可能会存放在CDN中二你的node.js server却运行在 Heroku上。
所以你需要主动更新生产环境中的CDN URLs。

所以你可以使用webpack **publicPath**并使用可以感知publicPath的插件来自动更新URLS，在生成production包时。

<img src="{{ site.baseurl }}/images/1-aOM5ZF8alWLr4BC0CfZe0w.png"  style="width: 100%;display:block" />

    // Development: Both Server and the image are on localhost
    .image { 
      background-image: url(‘./test.png’);
     }
    // Production: Server is on Heroku but the image is on a CDN
    .image { 
      background-image: url(‘https://someCDN/test.png’);
     }

## 5. Loaders And Chaining Loaders

Loaders 是附件的一些node模块，用于帮助'load'或'import'多种浏览器可接受的文件如JS, Stylesheets等等。还有一些loaders允许导入这些到JS中通过'require'或者ES6的'import'。

例如： 你可以使用 **babel-loader**来将用ES6书写的JS 转为浏览器可接受的ES5。

    module: {
     loaders: [{
      test: /\.js$/, ←Test for ".js" file, if it passes, use the loader
      exclude: /node_modules/, ←Exclude node_modules folder
      loader: ‘babel’ ←use babel (short for ‘babel-loader’)
     }]

### Chaining Loaders ( works right to left)

很多loaders可以链式调用从而作用于同一种类型的文件，链式工作**从右到左，loader用'!'分隔**

例如，我们有一个CSS文件 'myCssFile.css' ，我们想将它的内容插入到html的style标签中。我们可以使用两个插件完成工作: css-loader 和 style.loader

    module: {
     loaders: [{
      test: /\.css$/,
      loader: ‘style!css’ <--(short for style-loader!css-loader)
     }]

<img src="{{ site.baseurl }}/images/1-nes9iLmskmsD8Fp4Ek3u-A.png"  style="width: 100%;display:block" />

1.  Webpack 查找modules中的CSS 文件依赖。Webpack检查一个JS文件中有**'require(myCssFile.css)'**，当它发现这个依赖，Webpack将文件首先传递给'css-loader'。

2.  **css-loader**loads所有的css和css自己的依赖(如 @import 其他css)为JSON。Webpack之后传递结果给'style.loader'

3.  **style-loader**获得JSON后将它加入到style tag中--**`<style>css contents</style>`**并将tag插入到html中。

##  6. Loaders Themselves Can Be Configured

loaders自己可以通过传递传递参数进行配置。

下边的例子中，我们配置**url-loader**，在图片小于1024字节时使用DataURLs，在图片大于1024字节时使用图片URLs。我们可以通过传递'limit'参数：

<img src="{{ site.baseurl }}/images/1--qVdcA3E8JSdtszxHqfIdA.png"  style="width: 100%;display:block" />

##  7. The .babelrc file

babel-loader使用'presets'配置来知道如何转化ES6到ES5，以及如何将React JSX解析为JS。我们可以通过"query"参数传递配置：

    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
    }

然而在很多项目中babel的配置会很大。所以你应该在.babelrc文件中配置它。babel-loader会自动加载.babelrc文件如果它存在的话

所以在很多例子中，你会看到：

    //webpack.config.js 
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel'
        }
      ]
    }

    //.bablerc
    {
     “presets”: [“react”, “es2015”]
    }
    
##  8. Plugins

Plugins是附加的node modules 通常工作在 resulting bundle上。

例如， **uglifyJSPlugin** 拿到 bundle.js 并压缩来减小它的大小。

类似的 **extract-text-webpack-plugin** 内部使用 **css-loader** 和 **style-loader**来收集所有的CSS到一起，最后保存到一个外部的style.css中并在index.html中包含style.css。

    //webpack.config.js
    //Take all the .css files, combine their contents and it extract them to a single "styles.css"
    var ETP = require("extract-text-webpack-plugin");

    module: {
     loaders: [
      {test: /\.css$/, loader:ETP.extract("style-loader","css-loader") }
      ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css") //Extract to styles.css file
      ]
    }

注意：如果你想使用inline css 如 style元素。你可以不使用 **extract-text-webpack-plugin** ，只使用CSS和style loaders：

    module: {
     loaders: [{
      test: /\.css$/,
      loader: ‘style!css’ <--(short for style-loader!css-loader)
     }]

##  9.Loaders Vs Plugins

可能你已经意识到，**Loaders 工作在独立的文件层，在bundle生成中或者之前**

**Pligins 在 bundle 或 chunk 级别，通常工作在bundle的生成进程结束阶段**。一些插件如 commonsChunksPligins 进一步修改bundles是如何创建的。

## 10. Resolving File Extensions

很多Webpack 配置文件都有一个 ** resolve extensions ** 属性并有一个空字符串。空字符串是为了帮助处理 imports 没有扩展名的情况 **require(“./myJSFile”) or import myJSFile from ‘./myJSFile’**

    {
     resolve: {
       extensions: [‘’, ‘.js’, ‘.jsx’]
     }
    }



