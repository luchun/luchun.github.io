---
layout: post
title: 10 Habits of a Happy Node Hacker 2016 
---
Node 开发的十个好习惯
<!-- more -->
## 10 Habits of a Happy Node Hacker 2016 


原文 [10 Habits of a Happy Node Hacker (2016)](https://blog.heroku.com/archives/2015/11/10/node-habits-2016?utm_source=javascriptweekly&utm_medium=email)

### 1.使用 `npm init` 开始每个新项目

`npm init` 将为项目生成 `package.json`文件，从工作目录中生成一些常见属性。

    mkdir my-awesome-app
    cd my-awesome-app
    npm init --yes
    
使用 `--yes` 跳过询问，然后打开package.json来做修改。

第一件事是指定一个`engines`，使用你的node版本(`node -v`)

    "engines": {
        'node': '4.2.1'
    }
    
### 2.使用智能 `.npmrc` 配置

使用 `--save`自动更新package.json，npm安装这些包会以`^`开头，导致模块在不同的版本之间漂移。如果想在所有环境保持一致的依赖，一个解决方法是这样安装包：

    npm install foobar --save --save-exact
    
更好的方法是把选项添加到`~/.npmrc` 中

    npm config set save=true
    npm config set save-exact=true
    cat ~/.npmrc

之后安装 依赖将自动保存到package.json中。

### 3. 使用ES6

    let user = users.find(u=>u.id === ID)
    console.log(`Hello, ${ user.name }!`);
    
### 4.坚持使用小写
    
在OSX 和windows平台时，对待`myclass.js`和`MYClass.js`是一样的，而Linux不会。node做为跨平台工具，我们应坚持小写。


### 5. Cluster 你的应用 (大概是群集化的意思)

node运行时被限制在单核CPU和1.5GB内存，将它部署在大型服务器上会造成资源浪费。

如果想使用多核和超过1.5G内存，应该把应用Cluster化。

    const CONCURRENCY = process.env.WEB_CONCURRENCY || 1
    
工具有 forky 和throng


### 6.环境意识

不在项目中乱扔环境配置文件，而使用环境变量

首先 安装 node-foreman:

    npm install --save --save-exact foreman
    
创建一个 Profile文件，声明应用的进程类型

    web: bin/web
    worker:bin/worker
    
现在可以使用 `nf` 程序来启动应用
    
    "scripts":{
      "start:: "nf start"
    }
    
要支持本地开发环境，可以创建 `.gitignore` 文件，把 `.env` 文件加入进来。 使用 `node-foreman` 时，`.env` 文件将会被加载进来：
    
    DATABASE_URL='postgres://localhost/foobar'
    HTTP_TIMEOUT=10000
    
现在，一个简单的命令（`npm start`）将会使 `web` 和 `worker` 进程在那个环境下
同时运转起来。然后，当你部署你的项目时，它会在新的主机上自动适应这些环境变量。

比起 `config/abby-dev.js、config/brian-dev.js，config/qa1.js、config/qa2.js、config/prod.js`，这个更加简单灵活。


### 7.避免垃圾回收

如果想对垃圾回收有更多的控制 ，可以在`Procfile` 文件中给 V8 添加一些标志：
    
    web: node --optimize_for_size --max_old_space_size=920 --gc_interval=100 server.js
    
这个尤其重要，如果你的应用是运行在一个少于 1.5 GB 内存的环境上。
例如，你想要把 node 调整到一个 512 MB 的容器上，试试这个：

    web: node --optimize_for_size --max_old_space_size=460 --gc_interval=100 server.js

### 8.把事情链接起来

### 9. 仅 git 重要的部分