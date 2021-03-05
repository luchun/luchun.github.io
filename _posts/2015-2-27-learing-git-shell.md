---
layout: post
title: 学习git shell 简单语法
---
学习github shell用法
github有客户端，我就是用的github for window,这个客户端具备基本的功能，同步，克隆这些。不过我却发现缺少了一个基本的功能。比如我添加了一个新的文件到目录下，客户端里没有加入并上传的操作按钮。还好安装客户端时附带安装了shell。我参考文章[csdn](http://blog.csdn.net/pony_maggie/article/details/23207847) ，学习了一些基本的方法。
<!-- more -->

###  git add：

```
git add .
```
先cd到目录下，然后运行git add . (注意.),这样就将新的文件加入了。具体怎么添加单独的某一个文件，我还没有研究，不过好像可以使用正则过滤文件。

###  git commit：

```
git commit：
'git commit -am "story #3, add user model"'
```
每次提交更改前要先填写注释，这个在客户端有比较直观的工具。

###  git push：

```
 git push

```
将更新代码提交到远程服务器。


目前能用到就这三个，因为我将github作为博客来写东西，目前还不需要更多复杂的东西。

