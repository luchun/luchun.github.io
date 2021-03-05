---
layout: post
title: 在 mac中 显示/隐藏 隐藏文件
---
在 mac中 显示/隐藏 隐藏文件
<!-- more -->
mac下以 .开头的文件默认都是被隐藏的，它又不像 windows那样可以方便的切换 显示/隐藏。需要通过命令行：

	defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder

重新隐藏：

	defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
	