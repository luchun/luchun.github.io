---
layout: post
title: 使用 ffmpeg 转换 mp4 为 gif 文件
---

在 Web 中尽量使用 mp4 而不是 gif ，因为 gif 文件要比 mp4 大很多。 
但还是会有一些需求 或者是 变态产品经理 要求把 mp4 转为 gif 使用。
mmfpeg 是一个优秀的格式转化工具

## 安装

ffmpeg 网站 [https://www.ffmpeg.org/](https://www.ffmpeg.org/)

ffmpeg 下载 [https://evermeet.cx/ffmpeg/](https://evermeet.cx/ffmpeg/)

在下载站 下载 ffmpeg-89312-gc5fd57f.7z 

解压 得到一个 ffmpeg 文件（没有后缀）

打开 `Terminal` cd 到下载文件夹 `cd Downloads`

复制文件到 bin 目录 

`sudo mv ./ff* /usr/local/bin/` 

因为我下载的只是`ffmpeg` ，完整包可能包括 `ffmpeg` `ffprobe` `ffserver`

执行文件 `sudo chmod +x /usr/local/bin/ff*` 

然后在 Terminal 中输入 `ffmpeg` 可以看到相关信息

## 转换文件 

单个文件

`$ ffmpeg -i input.mp4 output.avi`

很多时候需要转换整个文件夹下的文件 

`for i in *.mp4; do ffmpeg -i "$i" "${i%.*}.gif"; done`

 
 
 ## 参考
 
* [Install ffmpeg on a Mac](https://ericholsinger.com/install-ffmpeg-on-a-mac)

* [How do you convert an entire directory with ffmpeg?](https://stackoverflow.com/questions/5784661/how-do-you-convert-an-entire-directory-with-ffmpeg)

* [如何将小视频转换成GIF动图或将GIF动图转换成视频](http://www.webhek.com/post/convert-video-gif.html)