---
layout: post
title: Kickoff：A new frontend-framework
---
## Kickoff:一个可以构建弹性的响应式站点的轻量级前端框架

[Website](http://trykickoff.com/)  [Github](https://github.com/trykickoff/kickoff/)

通过yeoman generator来尝试Kickoff是最简单的方式

    install:   npm install -g generator-kickoff
    use:       yo kickoff
    
###功能预览

#### 直观的CSS/Sass

Kickoff 是一个强大的CSS框架；它提供了很多直观的默认值，可以在最短的时间里建立并运行项目。

使用了强大的CSS预处理语言Sass，相比纯CSS可以使用更多的扩展功能。

Kickoff使用了定制的命名模式，主要受BEM命名法的启发。

#### 绝非无用的 Javascript

Kickoff 使用Browerify 来构建javascript模块，并非限制书写js的方式，而是相信模块化的JS属于未来。

以下是他们的启动js文件

    // npm modules
    var SwiftClick = require('swiftclick');
    var trak = require('trak.js');
    var ready = require('lite-ready');

    // DOM ready code goes in here
    ready(function () {
	   trak.start();
	   var swiftclick = SwiftClick.attach(document.body);
     });
     
#### 良好的工具


Kickoff 使用了Grunt.js 任务工具，它被广泛的用于执行常见的任务从而使开发人员专注于创造。


目前该项目在Github有335颗star,版本为6.0.0。大胆使用Browerify是一个亮点。





