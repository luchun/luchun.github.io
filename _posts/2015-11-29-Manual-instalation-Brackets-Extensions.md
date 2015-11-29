---
layout: post
title: Manual instalation Brackets Extensions 
---
## 手动安装Brackets扩展插件

Brackets这款编辑器小巧好用，扩展多，最重要的是它免费开源，对于替代sublime Text ,notepad++ 等工具来说，是个不错的选择。
但是由于国内的网络环境，我在家尝试了很多次，都无法打开他的扩展管理器，没办法只能手动添加扩展了。

第一步 打开扩展文件夹 ，由于编辑器经常更新，文件夹名称和位置也经常不一样，不过可以从编辑器菜单栏找到入口
**顶部菜单栏-帮助-显示扩展目录**

这个目录就是安装扩展的位置，我们要进到user 的文件夹中。

第二步 下载扩展文件

这里是 Brackets 扩展插件的网站 [打开链接](https://brackets-registry.aboutweb.com/)，不过网站做的并不好，不支持排序或者查找，需要自己去找
我在这里找到 [Emmet](https://github.com/emmetio/brackets-emmet)的github地址 ，进入到项目地址后，可以选择用git 来clone或者点击下载zip
我选择的是下载zip,这样比较方便，比开个控制台git好点..
下载后解压，拷贝到前边的user目录内

第三步 安装

有一些插件并没有其依赖，拷贝进来就可以用，不过Emmet还有一些其他的插件是有依赖的。这里，每一个插件是一个node项目，有标注依赖的package.json文件，在此目录下运行npm install就可以安装依赖。有些同学是先win + r 运行cmd，然后再cd进来。这里有个小窍门，在目录问价夹内，shift键加右键，就会看到‘在此处打开命令窗口’的选项，十分方便。

对了 ，国内的网络，npm用起来都卡，我用的是cnpm

第四步 重启

安装结束后，重新启动编辑器，就看到了Emmet的选项卡。其他的扩展也能在扩展中看到



