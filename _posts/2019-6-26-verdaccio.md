---
layout: post
title: 使用verdaccio部署私有npm服务器
---

入职公司14个月了，带领兄弟们做了有甜橙借钱、分期商城、甜橙借钱H5、CEO贷、分期商城H5、信用卡代偿、甜橙借钱2.0等等多个项目。
虽然项目众多，但都属于信贷类产品，流程整体上还是授信-借钱-还钱三个步骤。其中有多代码、组件、插件可以共用。
如何避免重复工作，实现项目间共享就成了问题。
<!-- more -->

第一次尝试是在2018年年底，尝试通过 `git subtree`进行跨项目的代码共享，多个项目中使用`git subtree`推拉代码。
在任意一个项目中修改了代码后，都可以推送，其他项目拉取最新代码即可。但遗憾的是一直没解决一个问题就是速度问题和`git log` 混乱问题。
它总是把所在项目的全部历史记录都打包上传，尝试了一些方法也没有解决。

最近刚刚做完一个大项目，有点时间，准备尝试第二种方式。私有`npm`服务器。
部署一个私有`npm`服务器，把内部组件放在这里，然后控制权限，只有内部人员登录后可以推拉，可以保证安全。

## 工具选择
《深入浅出Nodejs》这本书的附录D中讲到了如何搭建局域网npm仓库，提到的项目是[npm-registry-couchapp](https://github.com/npm/npm-registry-couchapp)
，这个项目已经被废弃了，所以用它明显不合适了。

同事找到了一个 [sinopia](https://github.com/rlidwka/sinopia) ，不过这个项目已经四年没有更新过了，也不太合适。

后来在谷歌上找到了[verdaccio](https://verdaccio.org/en/)，他是从`sinopia`切出来分支发展起来的，更新频繁，有七千多个`star`，最重要的是他提供了`docker`安装包，很方便。
所以最后选择它。本文主要记录我在云服务器上安装它的过程。

## 部署环境
在百度云购买的双核4G带宽1M的云服务器，系统为 `CentOS Linux release 7.6.1810`,  docker版本为 `docker-compose version 1.23.2, build 1110ad0`

## 部署过程
### (一)创建目录和文件
```
└── /verdaccio 项目目录
   ├──/conf 配置目录
   │  └── config.yaml verdaccio 配置文件
   │  └── htpasswd 用户密码文件
   │
   ├──/storage 包存放目录
   │
   └── docker-compose.yml docker-compose配置文件

```  
### (二) docker-compose 配置

```yaml
version: '2'

services:
  verdaccio:
    container_name: verdaccio
    image:  verdaccio/verdaccio:latest
    volumes:
      - ./conf:/verdaccio/conf:Z
      - ./storage:/verdaccio/storage:Z
    network_mode: bridge
    ports:
      - 4873:4873
    expose:
      - 4873
```
### (三) verdaccio 配置
文档 https://verdaccio.org/docs/en/configuration
```yaml
url_prefix: /verdaccio/

storage: /verdaccio/storage

auth:
  htpasswd:
    file: /verdaccio/conf/htpasswd
    max_users: -1
security:
  api:
    jwt:
      sign:
        expiresIn: 60d
        notBefore: 1
  web:
    enable: false
    sign:
      expiresIn: 7d

uplinks:
  npmjs:
    url: https://registry.npm.taobao.org/

packages:
  '@chun/*':
    access: $authenticated
    publish: $authenticated

  '@*/*':
    access: $all
    publish: $all
    proxy: npmjs

  '**':
    access: $all
    publish: $all
    proxy: npmjs

middlewares:
  audit:
    enabled: true

logs:
  - {type: stdout, format: pretty, level: trace}
```

这里因为我的服务器上有多个项目，需要用nginx进行反向代理，所以这里设置了`url_prefix: /verdaccio/`

我不希望有其他用户通过 `npm adduser` 进入我的私有仓库，所以我将最大用户数设置为-1，代表不可以注册。

我不需要别人通过网页看到我的仓库服务器，所以将 web `enable: false`

packages 这里我将我的私有项目都放在`@chun`这个目录下，并且只能是认证过的用户才能推拉。

### (四) htpasswd 介绍
 
 用[htpasswd-generator](http://www.htaccesstools.com/htpasswd-generator/) 生成 htpasswd 文件，内容是`用户名:加密密码`，每行代表一个用户，可以手动添加。
 
 ### (五) 使用中遇到的问题
 一个是它报没有htpasswd的权限，我用 `sudo chown -R 100:101 /verdaccio` 修改权限还是不行。请教了一位同事后，使用 `chmod 777 /verdaccio/htpasswd`后解决了。
 
 第二个问题是发布包的时候报 /verdaccio/.verdaccio-db.json 权限不足，我只好手动创建了这个文件并且通过chmod修改了权限解决了问题。
 
 第三个问题是 web `enable: false` 并没有将网页关闭掉，还没有解决。
 
 ### (六) nginx上的反向代理配置
 
 ```yaml
 location ~ ^/verdaccio/(.*)$ {
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
          proxy_set_header Host $host;
          proxy_set_header X-Forwarded-Proto $scheme;
          proxy_set_header X-NginX-Proxy true;
          proxy_pass http://127.0.0.1:4873/$1;
          proxy_redirect off;
        }
```

### (七) 启动
`docker-compose up -d` 启动，这里安装的时候遇到了点问题，一直超时，后来我才想起来我在百度云的安全策略设置为屏蔽了80端口。
## 使用过程
### 创建包
先尝试创建一个包，使用`npm init` 即可，创建的`package.json`如下
```json
{
  "name": "@chun/types",
  "main": "",
  "version": "1.0.3",
  "description": "add types for our project",
  "scope": "@chun",
  "keywords": [
    "typescript"
  ],
  "author": "luchun",
  "license": "MIT"
}
```
### 登录 
`npm adduser --registry https://your-npm-site.com`
输入前边在htpasswd创建时输入的用户名和密码

这里遇到了一个问题，它一直说ssl验证错误，估计是因为我走的是nginx代理。这里可以 `npm config set strict-ssl false` 关闭全局ssl校验。
也可以在项目根目录的.npmrc中添加 `strict-ssl=false`。这个问题后边要解决一下

### 推送
`npm publish --registry https://your-npm-site.com`

### 使用

在要使用该组件的项目的.npmrc中添加一句 `@chun:registry=https://your-npm-site.com/` 在`@chun`这个scope下的包都会走私有仓，其他的走官方仓库。
这里因为我设置了认证用户才可以拉取，所以也需要先 `npm adduser --registry https://your-npm-site.com` 进行登录。
