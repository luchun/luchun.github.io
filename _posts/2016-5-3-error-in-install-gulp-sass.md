---
layout: post
title: Node.js 6.0 安装 gulp-sass 中的错误
---
五一假期刚结束，就看到了Node.js 迎来了6.0版本，确实够快速。

不过升级到6.0之后，在使用中遇到了一点问题。安装gulp-sass报错了。就是说有一个二进制文件没有下载到，404了。gyp编译失败，爆了一堆错误。
<!-- more -->

起初我怀疑是node-gyp的错误，毕竟新版本的node.js可能调整了目录结构等，导致gyp工作不好了呢，于是重装。再试，依然报错。

gulp-sass是对node-sass的封装，我想就先试试安装node-sass，果然又报错了。看文档，它是支持下载二进制文件到本地的，详细在这里[链接](https://github.com/sass/node-sass#binary-configuration-parameters)。先下载下来，然后执行
    
    npm install node-sass --sass-binary-path=C:\Users\lu7965\Documents\workspace2016\Express-imove\binary\win32-x64-48_binding.node

成功。不过，安装gulp-sass的时候，怎么传递参数，我不知道。还好可以将这个参数保存到系统变量或者.npmrc文件中。我选了后者，在项目根目录新建一个.npmrc文件，加上一句
    
    sass_binary_path=C:\Users\lu7965\Documents\workspace2016\Express-imove\binary\win32-x64-48_binding.node
    
再执行安装，成功。

## 20分钟后补充

没想到啊安装虽然成功，但是还是运行不了，爆了个错误，不知道当前环境。按照github上的issue进行修改：

    /node_modules/node-sass/lib/extensions.js line 31的那个switch中加一句
    
     case 48: return 'Node.js 6.x';
     
继续运行，报错，说没有vender文件。汗，我把二进制指向了外边那个自定义的目录，结果它就不编译了，当然找不到。

新建两级目录 node_modules\node-sass\vendor\win32-x64-47

然后把前边下载的win32-x64-47_binding.node 改名 binding.node放到这个目录中

运行，完美！