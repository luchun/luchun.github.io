---
layout: post
title: 解决gem install pg 报错
---

在 macos 下安装 pg 报错

    ...
    checking for libpq-fe.h... no
    Can't find the 'libpq-fe.h header
    ...
    
查了一下解决方法是先用brew重装postgresql

     brew install postgresql
     
之后再  gem install pg 就可以了

        