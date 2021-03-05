---
layout: post
title: WSL2里设置代理
---
在电脑里安装了WSL2和Ubuntu，但是`apt update` 一直超时，网上找了更换阿里云镜像/更换dns都不好使。
搜索了一下Ubuntu可以代理。
<!-- more -->
首先是要配置允许来自局域网的请求
![](https://ftp.bmp.ovh/imgs/2021/02/84734f1ca966e740.jpg)

再通过`ipconfig`获得windows的网络ip，我这里是`192.168.136.78`

增加代理设置文件 
````
    vi ~/.bash_profile
````

增加内容

````
export http_proxy=192.168.136.78:8080
export https_proxy=192.168.136.78:8081
````

保存设置，然后刷新
````
source ~/.bash_profile
````
果然可以慢速下载了

相关资源 [How to configure proxy settings on Ubuntu 18.04](https://www.serverlab.ca/tutorials/linux/administration-linux/how-to-configure-proxy-on-ubuntu-18-04/) 
