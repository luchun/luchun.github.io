---
layout: post
title: 在威墨时的工作回忆
---
最近刚刚忙完一个项目，有些空闲时间，来总结一下上一份工作。
离开上一家公司已经一年多了，公司的官网一直还保留着离开时的样子。网站的[humans.txt](https://www.vidahouse.com/humans.txt)还保留在1年半以前，我的足迹也留在了上边。
我离开之后不久，我带领的前端团队陆续离职。目前还有两个妹子留在那里，听说后来也没有继续招聘前端。
公司业务没有做大，老板坚持一年多还在寻找投资，挺不容易的。 

## 关于[humans.txt](http://humanstxt.org/ZH)

robots.txt文件告诉搜索引擎哪些页面可以抓取，哪些页面不能抓取。
而humans.txt文件则是为人类准备的，包含参加该网页设计和建立的相关人员的信息。

一种浪漫情怀的文件，如果运维在nginx里配置了屏蔽txt文件就完蛋了，vidahouse很开放，或者说作为初创公司它没有运维人员。
网站项目都是前端自行维护的，在这一年多里我接触了pm2,nginx等等。

## 服务端渲染

官网的第一个版本，是nodejs+express+ejs模板实现的。
我入职的时候已经做了一些，主要是页面展示，没什么交互。后来陆续加上了登录注册，个人中心，论坛等功能。
做完第一版之后我感觉不是很满意，当时也学了一点Vue.js的东西，把评论这种功能用Vue.js重写了。还是觉得不好。
整个网站被搞得乱七八糟，Vue.js jQuery BootStrap 什么都有。
2016年年底的时候，Nuxt.js出现了，我决定用Nuxt.js重做整个项目。
为什么官网要部署在Node.js上，因为我们是一家小公司，老板想做SEO，想排名靠前。
如果只是一些纯静态页面还好，当有了用户的作品详情，帖子详情这些东西之后，用了vue.js，用了vue.js就要上ssr。
而Nuxt.js是一个不错的ssr工具。

## [Nuxt.js](https://zh.nuxtjs.org/)
Nuxt.js是我非常喜欢的一个工具，在它0.x版本的时候就开始使用，现在已经发展到 v2.8.1了。目前他的渲染模式已经支持三种了：

* SSR模式： 服务端渲染，传输给客户端的是基于vue.js组件的html，而不是纯javascript。vue.js官方有ssr工具，但自己实施起来很繁琐。nuxt.js提供了开箱即用的ssr，并且已经解决了常见陷阱。
* 静态站点生成：静态站点是个热门话题。比如我的博客使用`jekyll`生成的。Vue-press也是一个不错的工具，我在公司内部分享时，都是采用vue-press将markdown文件转为静态站点。nuxt.js也有这个功能。
* SPA: vue.js本身就是用于做spa单页面应用的，nuxt.js用来做spa时更像是vue-cli工具。

2017年时v0.x的nuxt.js最热门的用途就是ssr。后来换了公司不需要ssr了，也没在用过。如果以后有机会做需要ssr的站点，我还是会选择该工具。

## Sitemap

vidahouse的sitemap[入口在此](https://www.vidahouse.com/sitemap-index.xml)

已经用`Nuxt.js`做了SSR服务端渲染为什么还需要做Sitemap呢，其实这是两个东西。蜘蛛来到了首页，他可以从首页进入内部链接，比如navbar上的一排a链接是可以进入的。
这种叫内链，用户的首页我们也希望被蜘蛛爬到，比如用户A的首页是user/a。如果从首页或者从首页到某页再到某页能有这个链接，确实可以被爬取到。
可是大多数用户的首页没有机会被推荐到首页/二级页面。而我们还希望被爬虫看到，就需要sitemap了。sitemap是向爬虫声明我们网站有哪些链接的网站地图。
由于网站的用户/帖子量可能十分巨大，都放在一个xml文件里不现实了。这时候sitemam.xml可能就变成了入口。内部声明有哪些xml压缩包。
当时vidahouse的sitemap.xml如下

[<img src="{{ site.baseurl }}/images/vidahouse/WX20190704-093432@2x.png" alt="矩阵1"/>]({{ site.baseurl }}/)

里边包含三个压缩包，压缩包解压之后内容大概如下:

[<img src="{{ site.baseurl }}/images/vidahouse/WX20190704-093451@2x.png" alt="矩阵1"/>]({{ site.baseurl }}/)

每一行代表一个连接，以及更新频率，更新日期，权重等信息。

使用的工具是 [sitemap.js](https://github.com/ekalinin/sitemap.js)。
数据来源是服务端开发从数据库中导出的全部userid(用户id),postid(帖子id),caseid(案例id)
做了大概一个月之后，谷歌开始收录了，点击更多也能看到帖子这些了。

[<img src="{{ site.baseurl }}/images/vidahouse/WX20190704-094355@2x.png" alt="矩阵1"/>]({{ site.baseurl }}/)

[<img src="{{ site.baseurl }}/images/vidahouse/WX20190704-094557@2x.png" alt="矩阵1"/>]({{ site.baseurl }}/)



## pm2 nginx

本地开发的时候跑项目就是 `npm run start`，但是这玩意一旦崩了就整个挂了。所以用了 [pm2](http://pm2.keymetrics.io/)，
他可以监视node项目，发生崩溃时可以马上重启。类似的工具还有 `forever` 、 `nodemon`，我没有对比过。

用了nodejs为什么还要用nginx，主要是为了做反向代理，可以将443端口的请求转发到你内部的8080端口等等。
还可以开启gzip，nodejs项目自己也可以做gzip。

## 后台管理系统
在公司期间，还做了几个后台管理系统。其实也是fork [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)这个项目做的。
当时它还没这么火，初次见到他的代码，真的很惊叹作者的代码水平，真的很高。 现在这个作者在github至少有10W的star量了。
当时他好像在华尔街日报工作，也不知道跳槽了没有。

## 权限管理
有后台就会有权限管理，最大的那个后台系统有十几个模块，案例管理，帖子管理，活动管理，新闻管理等等吧，如何做权限管理。
我把用户的权限设计为一个数组，比如用户A的权限为 ['case', 'post']，用户B的权限是['news', 'case']就代表了用户A可以进入案例管理、帖子管理，
用户B可以进入新闻管理、案例管理。还有一个最大的权限 ['admin']，可以进入所有的模块。
在vue-router实例的beforeEach回调中，先判断用户权限list中是否有该模块的权限码或者是否admin。管理用户权限时就操作他的权限List就行了。


