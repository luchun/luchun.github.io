---
layout: post
title: 在git中设置代理
---
最近在git中提交代码的时候总是遇到 443 Timeout 的问题。谷歌了一下找到了设置代理的方法
<!-- more -->


     git config --global http.proxy 127.0.0.1:1080
     
清除代理

    git config --global --unset http.proxy
    
#### 2017-1-17 更新
最近换用mac系统，发现这样设置代理还是没有用，换了一个方法:

    git config --global http.proxy 'socks5://127.0.0.1:1086'
    git config --global https.proxy 'socks5://127.0.0.1:1086'
    
使用 1086 是因为 在 mac上 sock5是1086端口，windows上是 1080端口
    
npm 设置代理

    npm config set proxy http://proxy.company.com:8080
    npm config set https-proxy http://proxy.company.com:8080
    
npm 清除代理

    npm config rm proxy
    npm config rm https-proxy
    
