---
layout: post
title: Install-SDK-for-Node-Gyp
---
## 为安装node-gyp而安装windos SDK

[node-gyp](https://github.com/nodejs/node-gyp) 是一个nodejs原声插件构建工具，具体我也不是很理解，大概是将c++编译成node的一个工具。很多别的插件都需要用它来rebuild，比如我最近常用的[browser-sync](https://github.com/browsersync/browser-sync),安装时就需要`node-gyp`。
我第一次安装node-gyp时用了很多时间，原因并不是它本身的安装复杂，而是它rebuild时需要python,windows SDK等等工具。

先是 python，这个还好安装，需要注意的是不要安装最新版本的python3.0 ,node-gyp不支持，需要python2.7，安装后看看有没有加入到环境变量，如果没有就手动添加到环境变量。

比较难搞定的是windows SDK 这个东西，以前它可以单独安装，现在它只能在线安装，没有完整下载包，而国内的网络根本下载不了。或者通过自定义安装VS来安装，而我在第一次安装时，发现VS耗时巨大最后SDK还安装失败了。上网一查，原因是SDK是在自定义安装中选择的，它其实并不在本地，也是需要去下载，所以耗费了很长时间下载但最后还是失败了。我在知乎上找到了一个[解决方法](http://www.zhihu.com/question/33656020)。大概如下：
    
著作权归作者所有。
商业转载请联系作者获得授权，非商业转载请注明出处。
作者：内绪
链接：http://www.zhihu.com/question/33656020/answer/58664416
来源：知乎

1、安装vs2015 企业版但不安装vs2015自带的win10SDK和模拟器(安装vs2015选择自定义安装，将win10的SDK 和模拟 安装的选项去掉。)

2、下载win10SDK的的在线安装sdksetup.exe执行程序。下载并且安装。

3、将C:\Program Files (x86)\Windows Kits 文件夹下的内容拷贝到（在线sdk安装的文件夹）C:\Program Files (x86)\Microsoft SDKs\Windows Kits\ （vs自带的文件夹）

4 再次安装vs2015企业版，将vs2015自带的win10SDK和模拟器选择进行安装

5 再次修复安装vs2015

[SDK地址](http://pan.baidu.com/s/1fmSMy)
