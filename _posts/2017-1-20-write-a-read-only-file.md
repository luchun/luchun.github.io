---
layout: post
title: 向一个只读文件写入内容
---

今天在 AWS 上安装 MongoDB, 按照官网的[指南](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/)
在用 vi 编辑 mongodb-org-3.4.repo 这个文件时遇到了一点问题。这是一个敏感位置的文件，我没用 sudo打开。
保存的时候 用 `wq!` 强制保存报错。

在 [这篇文章](http://www.geekyboy.com/archives/629)找到了答案, 

    `w !sudo tee %`

保存成功。

*  :w = 写文件
* !sudo = 调用 sudo 指令
* tee = vi/vim 写命令的输出用tee重定向
* % = 触发使用当前文件名

关于tee 命令的介绍 ： [http://liubin.blog.51cto.com/282313/131298](http://liubin.blog.51cto.com/282313/131298)