---
layout: post
title: How To Pick a Frontend Web Framework
---
##如何选择一个前端框架

原文地址在 [博客地址](http://www.fse.guru/how-to-pick-a-frontend-web-framework)

#### 你自己使用它吗？

是的，我在做决定时用这个问题提醒自己。
同时，别人问我“我该选择什么样的框架？”时我也会回复别人这个。
因为，你知道，并没有一个标准的对vuode框架。
但这是一个思想框架可以让你更容易做出选择。

### 我将如何开始？

如果你并不是构建一个小小的或者很快就抛弃的应用，那么你应该需要这些：

##### 1.项目的模块结构

我个人更倾向于 [Component-based architecture](http://benmccormick.org/2014/08/07/component-based-development/) , 它适用于[多个框架](http://derickbailey.com/2015/08/26/building-a-component-based-web-ui-with-modern-javascript-frameworks/) 
同时，考虑多种极端情况 ，也可以使用[BOT](http://www.chris-granger.com/2013/01/24/the-ide-as-data/) [Elm Architecture](https://github.com/evancz/elm-architecture-tutorial/) [re-frame](https://github.com/Day8/re-frame) [CycleJS](http://cycle.js.org/)

##### 2.模块加载/构建

[RequireJS](requirejs.org) [Browserify](http://browserify.org/) [Webpack](https://webpack.github.io/) [ComponentJS](componentjs.com) [SystemJS](https://github.com/systemjs/systemjs)
这些工具金额已帮助你保持JS代码（或者组件）分离并且可控

##### 3.包管理
[npm](npmjs.org) [jspm](http://jspm.io/) [bower](http://bower.io/)

这些工具中我更推崇 NPM ,因为它已经是JS和nodejs 世界的事实标准。bower更像是一个hack工具，可以用来下载组件，但是并不是像npm一样的有力的包管理工具。

##### 4.自动化构建工具

[grunt](http://gruntjs.com) [gulp](http://gulpjs.com/) [broccoli](http://broccolijs.com/) 
你知道，生命短暂，不应该用来做一个不断重复的事情


##### 5. CSS预处理

[jss](https://github.com/kof/jss) [stylus](http://learnboost.github.io/stylus/) [sass](http://sass-lang.com/) [css-modules](https://github.com/css-modules/css-modules) [csso](http://css.github.io/csso/) [autoprefixer](https://github.com/postcss/autoprefixer) [postcss](https://github.com/postcss/postcss) 

这些工具可以使CSS更方便的处理一些跨浏览器的累赘问题，我知道现在是2015年，但它依然是 [一个痛](http://caniuse.com/#search=svg)
#### 6.样式框架

[Bootstrap](http://getbootstrap.com/) [Zurb Foundation](http://foundation.zurb.com/) [Elemental UI](http://elemental-ui.com/) [Material Lite](http://www.getmdl.io/) 

这些工具凝聚了成吨的知识和千年来web开发的痛楚，可以很好的帮助你处理基础的标记以及样式

你也应带考虑构建自己的[解决方案](http://styleguides.io/)，如果你觉得自己是前端专家的话。或者你也应该为公司建立一个[设计规范](https://uxmag.com/articles/anchoring-your-design-language-in-a-live-style-guide).
关于这点，我建议你立即使用这些方法([BEM](https://en.bem.info/) [OOCSS](http://oocss.org/))，他们可以让你节省时间

我个人推崇BEM 命名法，你可以在[这里](https://github.com/brainly/style-guide#methodology)看到更多

如果你暂时不需要构建自己的标记方式，也应该看看 [HTML5 Boilerplate](https://html5boilerplate.com/)


##### 7.测试工具 

[jasmine](http://jasmine.github.io/) [karma](http://karma-runner.github.io/0.13/index.html) [mocha](https://mochajs.org/) [tape](https://github.com/substack/tape) [intern](https://theintern.github.io/) 

每个人都需要测试工具，无一例外

##### 8.代码质量检查工具 

[eslint](http://eslint.org/) [husky](https://medium.com/software-and-beyond) [editorconfig](http://editorconfig.org/) 

你不想让自己的代码成为垃圾场吧

##### 9.需要社区获得帮助 [chats](https://github.com/mr-mig/ru-it-chats),twitter等


### OK， 那下一步呢？

在开始选择工具之前，这里有一些高等级的问题需要解决，准备好了吗？

##### 1. 我需要和别人一起完成这个项目吗？他们是谁，他们想要什么？

这个答案将会帮助你选择语言和工作流，对你你你的公司都将有益。


##### 2. 我应该关注的重点是什么？质量，开发速度还是可维护性？

这决定你是否可以花费经验去验证你选择的工具

##### 3. 我是否要将代码交出给第三方？

注意这将限定你的选择工具为第三方的首选工具

##### 4.我处理的是核心产品还是卫星产品？

如果你处理的是核心产品，或许选择稳定的技术和框架更安全，也能让你睡好

##### 5. 这是一个互动性很强的app还是像一个静态站点

也许你只是需要纯静态的html+css或者站点生成工具或者CMS

##### 6.这是一个单独的项目还是其他项目的其他产品

你可能需要使用其他一组的项目的组件或者风格指南，这时需要考虑复用性


#### 语言选择

回答了这么多高级问题，是时候讨论一下你的队友并选择一种语言了
因为javascript是一门[疯狂的语言](https://www.destroyallsoftware.com/talks/wat) 

##### 1.你是有拥有一个JS开发者团队？

考虑使用 [ES6](https://gist.github.com/getify/7ae82fdc2e86bf66bcba#file-gistfile1-md)([babel](https://babeljs.io/)),他会使你生活的更轻松


##### 2.你是否更喜欢强类型语言？

尝试使用 [typescript](http://www.typescriptlang.org/)

##### 3.你是否能接受函数式编程？

你可以使用ES6或者组件如 [lodash](https://lodash.com/) 或 [random](http://ramdajs.com/docs/),这里有一些优秀的[教程](http://reactivex.io/learnrx/) 和[图书](https://leanpub.com/javascript-allonge)帮助你[开始](https://github.com/MostlyAdequate/mostly-adequate-guide)这次旅程

##### 4.你是否尝试了函数式JS并且想更进一步？

尝试[elm](http://elm-lang.org) !

##### 5.你是一位全栈吗？

尝试[clojurescript](https://github.com/clojure/clojurescript)

##### 6.你喜欢Scala吗？

尝试[scaleJs](http://www.scala-js.org/)

##### 7.你知道并喜欢Haskell？

尝试[purescript](http://www.purescript.org/)

##### 8.想来点疯狂的？
这里有一些[预处理语言列表](https://github.com/jashkenas/coffeescript/wiki/list-of-languages-that-compile-to-js)，看自己喜欢吧


#### 框架选择

##### 1.你只是需要一个基础的工具，不是复杂的东西？

试试 [angular](https://angularjs.org/), [Start looking for help immediately](http://www.fse.guru/2-years-with-angular)

##### 2.你需要快速迭代？你能预知未来的维护性问题？


试试 [angular](https://angularjs.org/), [Get ready for problems](http://www.fse.guru/2-years-with-angular)


##### 3.你是一个后端想要尝试完成一些前端工作？

试试 [angular](https://angularjs.org/), [Start looking for a frontend developer](http://www.fse.guru/2-years-with-angular)

##### 4.你需要快速开始快速构建，但其他一些缺失功能你会自己提供？

尝试 [ampersand](http://ampersandjs.com/) / [backbone](http://backbonejs.org/) + 其他你能使用的组件

##### 5.相同的配置，中到大型的app?

添加[marionette](http://marionettejs.com/) / [chaplin](http://chaplinjs.org/) 到你的后端，并考虑使用[ReactJs](https://facebook.github.io/react/)

##### 6. 你有更多时间去获得经验，并且在稍后获得更多的性能收益？

尝试[mithril](http://mithril.js.org/) / [knockout](http://knockoutjs.com/) / [aurelia](http://aurelia.io/) + 选择其他自己的组件

##### 7.你有良好的前端经验并且有基础的函数式编程经验？

尝试[ReactJS](https://facebook.github.io/react/) / + [redux](https://github.com/rackt/redux) / + [ImmutableJS](https://facebook.github.io/immutable-js/) + 选择其他自己的组件

##### 8.丰富的函数式编程经验？或者是交互性app

添加活性流([bacon](https://baconjs.github.io/), [rxJS](http://reactivex.io/)) 或者 尝试 [Cycle.js](http://cycle.js.org/)

注意0： 添加 [活性流到所有位置](http://www.felienne.com/archives/3724) 是一个好主意

##### 9. 你想使用死板的规则和常用的最佳实践？你的app将会增长到很大？你计划扩大团队？你有时间花费在学习上？

推荐使用 [Ember.js](http://emberjs.com/)

##### 10.你需要“桌面级”应用？你的app拥有表格，图表，分析工具？你在构建工具集？

尝试[ExtJS](https://www.sencha.com/products/extjs/)

##### 11.你是一个工作室要为别人创建构造工具？

你需要先选择好自己的工具集，总之，选择你最熟悉擅长的工具

##### 12.你是一个自由工作者为他人工作？

尝试他们的选择，或者使用angular

##### 13.你们是不是要建立一个有吸引力的定制产品，将使用由其他人呢？

定制框架开始从上面的列表中的任何具体需求。

##### 14.你想要获取开发app的经验

尝试两周使用不同的工具[ionic](http://ionicframework.com/), [famous](http://famous.org/) ,[Sencha Touch](https://www.sencha.com/products/touch/)

#### 如何开始编程？

1. 花时间阅读你选择的框架及工具的 文档

2. 询问社区中的专家也许是一个不错的开始

3. 初始化所有的工具

4. HACK，但是我建议 [工程化](http://www.fse.guru/software-engineering-101-preface)

不知道如何用我推荐的框架开始？

看一下这个 [TodoMVC](https://github.com/tastejs/todomvc) 找到你选择框架的实例

但是要记住，这些只是简单的例子，他们的风格可能不适合大中型的app


#### 我不想做决定，告诉要做什么！

好的，好的，冷静

如果你不想做决定，就使用Ember.js,如果你野心更大， 使用 ReactJs + Redux + ES6 + webpack + npm + jss + autoprefixer + eslint + Elemental UI + karma.并查看这份 [文档](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)

#### 我看到了很多ReactJS的小心，为什么？

因为它是web开发的未来，这里有有一个很好的[文章](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome)来解释


