---
layout: post
title: windows-multiple-node-versions-management
---
最近跟随nodejs的步伐，将本机上的nodejs更新到了v5.1.0，前几天开始使用IBM 的额bluemix，它目前支持的nodejs版本为0.12.x。所以不得不使用多版本管理了。

<!-- more -->
## windows下nodejs多版本管理



目前来看，windows上的node多版本管理一共有三个工具 [nvm-windows](https://github.com/coreybutler/nvm-windows),[nvmw](),[nodist]()

#### nvm-windows

github地址 [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows),有728颗star，最近一次更新是2个月前。
它使用的是一个exe安装包，安装后可以使用nvm命令，可以设置代理，但不能设置镜像地址，对于国内来说，不能使用淘宝镜像，只能通过代理下载。我试用后，发现他在我的64位win10下不能正常工作，表现为可以安装node，可以切换，但不能运行node命令，windows给出弹出框显示“该软件不能正常工作，请联系软件商”巴拉巴拉，但我查看github上的issues,别人都有安装成功，我这里不知道为什么不能。

#### nvmw

github地址[https://github.com/hakobera/nvmw](https://github.com/hakobera/nvmw),有373颗star，最近更新7个月前，其实我最喜欢的是这个，因为它有贴心的设置镜像功能，遗憾的是它对node的下载地址是拼接的  即 `domain/mirror/node/v5.1.0/x64/node.exe`这种，即根据版本号 x86/x64来硬拼接。但是近期node网站改变了路径，现在是在`v5.1.0/win-x64/`下了，导致nvmw不能使用。

#### nodist
github地址[https://github.com/marcelklehr/nodist](https://github.com/marcelklehr/nodist),有360颗star,最近更新半个月前，也是采用的安装包，我安装的是v0.7.2。目前来看只有这个在本机上运行成功了，可以通过设置代理来安装，但遗憾的是他的npm版本是不能跟着node变化的，但很多新版本的npm是不能支持低版本的node的，所以这点挺遗憾的。


#### nodist用法

设置代理

    > set HTTP_PROXY=http://myproxy.com:8213
    # Set a proxy to use for fetching the executables
    # (you may also use `HTTP_PROXY`/`http_proxy`/`HTTPS_PROXY`/`https_proxy`).
 
安装一个版本 

     nodist + v0.8.1
     
移除一个版本

     nodist - v0.8.1
     
切换到一个版本

     nodist  v0.8.1

查看所有版本

    nodist dist
    
查看本地安装版本

    nodist 
    
用法很简单，希望作者能够持续更新

