---
layout: post
title: Progressive Web App(PWA) 升级
---
关于PWA的一些误解
<!-- more -->
### 关于pwa的一些误解
1)  **不是Application才需要PWA**

    一个PWA可能是一个blog,一个营销网站，或者别的什么。
    PWA只是优化代码，快速交付的一种途径。你可以并且应当使用这些新特性，不必纠结网站内容。
  
2)  **不是SPA才需要PWA** 

    不是只有React-Redux的SPA才需要PWA, 即使是Jekyll的博客也可以从PWA中获益。
    
3)  **PWA并非只用于Google Android**    
 
    PWA与平台无关

4)  **PWA现在就可以使用**    
 
    "P"代表渐进，它的一切都可以看做是一个额外增强。如果旧浏览器不支持，也不会引发问题。
    
### pwa的好处

* 更快，更安全的用户体验
* 更好的google ranking
* 更好的可用性
* 更好的表现
* 离线可用

即使不希望用户"安装" 你的PWA（如添加到主屏幕），切换到PWA同样拥有很多好处。
事实上，制定PWA所需的所有步骤将会积极改善您的网站，并被广泛认为是最佳实践。
  
### Step 1:  Manifest

manifest 只是一个描述PWA的所有元数据的JSON文件。 
像应用程序的名称，语言和图标这样的东西进去。 
此信息将告诉浏览器将其保存为快捷方式时如何显示应用程序。 看起来像这样：

    {
      "lang": "en",
      "dir": "ltr",
      "name": "This is my awesome PWA",
      "short_name": "myPWA",
      "icons": [
        {
          "src": "\/assets\/images\/touch\/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image\/png"
        }
      ],
      "theme_color": "#1a1a1a",
      "background_color": "#1a1a1a",
      "start_url": "/",
      "display": "standalone",
      "orientation": "natural"
    }
    
这通常称为“manifest.json”，并链接到网站的<head>：

    <link rel="manifest" href="manifest.json">
    
多个平台需要多种不同尺寸的 icon, [Real Favicon Generator](http://realfavicongenerator.net/) 
可以上传一张大icon来生成多张不同尺寸的icon

### Step 1:  HTTPS

PWA 需要通过安全连接进行服务，因此HTTPS协议是必须的。 
HTTPS加密用户发送到服务器的数据，并防止入侵者篡改其连接。 
最近，谷歌也非常赞成HTTPS上的网站，并将其排名高于非安全竞争对手。

要切换到HTTPS，您将需要受信任的权限的SSL证书。 
如何获取它们取决于您的托管情况，但通常有两种常用的方法：

👉如果您操作自己的服务器或对其拥有root权限，请查看[LetsEncrypt](https://letsencrypt.org/)。 
这是一个免费，开放和直接的证书颁发机构，允许任何人开始使用HTTPS。
 这很容易设置，并且与其他当局一样信任。
 
👉如果你在使用共享主机，很多供应商不允许你使用LetsEncrypt的控制级别。 
相反，他们通常提供每月或年费的SSL证书。 
如果您不确定如何获得证书，请联系您的托管服务提供商。 

获得证书后，您可能需要对代码进行一些调整，以便所有资源都在安全的线路上获取。 
有关该过程的更多信息，[请阅读keyCDN的详细指南](https://www.keycdn.com/blog/http-to-https/)

### Step 3: Service Worker.

这是奇迹发生的地方。 
Service Worker 本质上就是一个Javascript，它作为浏览器和主机之间的中间人。
 它自动安装在支持的浏览器中，可以拦截对您的站点的请求，并以不同的方式对其进行响应。
 
您可以通过在项目的根目录创建一个Javascript文件来设置新的SW。 让我们称之为sw.js. 
该文件的内容取决于您想要实现的内容 - 我们将在一秒钟内完成。 

要让浏览器知道我们打算使用这个文件作为Service Worker，我们需要先注册。 
在您的网站的主要脚本中，包括一个这样的 function：

    function registerServiceWorker() {
      // register sw script in supporting browsers
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js', { scope: '/' }).then(() => {
          console.log('Service Worker registered successfully.');
        }).catch(error => {
          console.log('Service Worker registration failed:', error);
        });
      }
    }
    
`scope` 参数定义SW应该能够拦截的请求。 它是域根的相对路径。
 例如，如果您将此设置为 `/articles`，
 则可以控制到 `yourdomain.com/articles/my-post` 的请求，
 但不能控制到 `yourdomain.com/contact` 的请求。    
    
#### 离线是新的黑域
    
Service Workers 可以做很多很酷的事情。 
其中之一是能够缓存内容到本地存储，从而使用户在离线时可用。 
即使在线，也将对页面加载时间产生巨大的影响，
因为请求可以完全绕过网络，内容即时可用。    

除了使用传统的浏览器缓存，您可以在安装 worker 时定义要缓存的资源列表，
因此用户不必先浏览到页面以进行缓存。 以下是可能的样子：
    
    // sw.js
    self.addEventListener('install', e => {
     e.waitUntil(
       // after the service worker is installed,
       // open a new cache
       caches.open('my-pwa-cache').then(cache => {
         // add all URLs of resources we want to cache
         return cache.addAll([
           '/',
           '/index.html',
           '/about.html',
           '/images/doggo.jpg',
           '/styles/main.min.css',
           '/scripts/main.min.js',
         ]);
       })
     );
    });
    
🔥热点提示：如果您想要快速开始离线，强烈建议使用[sw-precache](https://github.com/GoogleChrome/sw-precache)。 
这是Google上的一个工具，它与现有的Gulp或Grunt构建过程集成，
生成 service worker 文件。    

只需传递一个文件列表，它将自动跟踪所有更改，
并保持您的 Service Worker 缓存最新。 
因为sw-precache集成到您的站点的构建过程中，
您可以使用通配符来预处理与特定模式匹配的所有资源，如下所示：

    import gulp from 'gulp';
    import path from 'path';
    import swPrecache from 'sw-precache';
    
    const rootDir = '/';
    
    gulp.task('generate-service-worker', callback => {
      swPrecache.write(path.join(rootDir, 'sw.js'), {
        staticFileGlobs: [
          // track and cache all files that match this pattern
          rootDir + '/**/*.{js,html,css,png,jpg,gif}',
        ],
        stripPrefix: rootDir
      }, callback);
    });
    
在你的构建中运行这个任务，你不必再担心缓存无效了！
 对于较小的，主要是静态的站点，您可以使其预处理每个图像，HTML，JavaScript和CSS文件。 
 对于具有大量动态内容的网站，或者并不总是需要的许多大型图像，
 预处理网站的“骨架”子集通常是最有意义的。   
 
PS：要深入了解离线支持的主题，
请务必查看Jake Archibald的[“The Offline Cookbook”](https://jakearchibald.com/2014/offline-cookbook/)。  

### 测试PWA
    
Chrome [Lighthouse扩展](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)是一种用于检查逐行Web应用程序的性能，
可访问性和遵守PWA规范的测试工具。    

它以不同的视口和网络速度测试您的网站，测量首次渲染的时间和其他性能因素，
并为仍需改进的领域提供有价值的建议。 
对于一般的网站来说是一个很好的基准。

### 进一步阅读

希望这能让您快速了解如何开始使用PWA。 
如果你想深入了解，这里有一些很好的地方可以学习更多：

* [Your First Progressive Web App](https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/)
* [ A beginner’s guide to PWAs](https://www.smashingmagazine.com/2016/08/a-beginners-guide-to-progressive-web-apps/)
* [Intro to Progressive Web Apps](https://www.udacity.com/course/intro-to-progressive-web-apps--ud811)

