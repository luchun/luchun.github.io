---
layout: post
title: mac 下升级 Emacs
---
mac 下升级 Emacs
<!-- more -->
最近在学习使用 mac 下的 emacs ,OS X 自带的版本是 22， 我就想升级一下。但是这种预装的软件升级是很麻烦的，参考了下Emacs 网站上的[这篇文章](http://wikemacs.org/wiki/Installing_Emacs_on_OS_X)

	       $ brew update
	       $ brew install emacs --with-cocoa
	       $ brew linkapps emacs

通过 brew 安装 emacs

然后是删除 系统自带的 emacs,这一步我发现不能删除，操作被拒绝，sudo也不行。于是上网搜索了一下，这里有[一篇文章](http://www.wisedream.net/2016/07/20/tricks/update-unzip-cmd-for-mac/)

	   重启进入恢复模式(开机时按住command + R)
	   打开terminal(点击Utilities下拉菜单，选择terminal)
	   在terminal中执行命令`csrutil disable; reboot`

再开机后

	$ sudo rm /usr/bin/emacs
	$ sudo rm -rf /usr/share/emacs

这次没有出问题，然后是添加一个 alias

        $ alias emacs="/usr/local/Cellar/emacs/24.x/Emacs.app/Contents/MacOS/Emacs -nw"
	
一不小心，又出了一个坑，因为我安装的实际是25.1 这里是 24.x。
用 alias 列出所有的alias
然后 unalias emacs ，移除一条alias
然后是

	$ alias emacs="/usr/local/Cellar/emacs/25.1/Emacs.app/Contents/MacOS/Emacs -nw"

这样就好了
最后在命令行 里查看一下 emacs 版本

        $ emacs --version

