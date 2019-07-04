---
layout: post
title: 移动调试工具介绍
---

首先简单介绍一下Chrome开发者工具

[<img src="{{ site.baseurl }}/images/mobile-debugger/chrome.png" alt="矩阵1"/>]({{ site.baseurl }}/)

1. 设备模式 可以模拟移动设备的分辨率/dpr 定位 网络状态等。可以用于移动开发的早期阶段，移动开发完毕后还是要上真机进行调试。
2. 元素面板 可以自由的操作DOM和CSS来迭代布局和设计页面
3. 控制台面板 在开发期间，可以使用控制台面板记录诊断信息，或者使用它作为 shell在页面上与JavaScript交互。
4. 源代码面板 在源代码面板中设置断点来调试 JavaScript ，或者通过Workspaces（工作区）连接本地文件来使用开发者工具的实时编辑器。
5. 网络面板 使用网络面板了解请求和下载的资源文件并优化网页加载性能。
6. 性能面板 使用时间轴面板可以通过记录和查看网站生命周期内发生的各种事件来提高页面的运行时性能。
7. 内存面板 比时间轴面板提供的更多信息，可以使用“配置”面板，例如跟踪内存泄漏。 
8. 应用面板 使用资源面板检查加载的所有资源，包括IndexedDB与Web SQL数据库，本地和会话存储，cookie，应用程序缓存，图像，字体和样式表。
9. 安全面板 使用安全面板调试混合内容问题，证书问题等等。


相关资源 [Tools for Web Developers](https://developers.google.com/web/tools/chrome-devtools/) 网站上有完整的Chrome调试工具功能指引

# 安卓调试

前言

## 基础设置
### 要求
* 开发计算机上已安装 Chrome 32 或更高版本。
* 开发计算机上已安装 USB 驱动程序（如果您使用 Windows）。 确保设备管理器报告正确的 USB 驱动程序
* 拥有一根可以将您的 Android 设备连接至开发计算机的 USB 电缆。
* Android 4.0 或更高版本。
* 您的 Android 设备上已安装 Chrome（Android 版）。
### 第 1 步：发现您的Android设备
* 在您的 Android 设备上，选择 *设置* > *开发者选项* 。 在运行 Android 4.2 及更新版本的设备上，开发者选项 默认情况下处于隐藏状态。 一般是在 *设置* > *关于手机* > *基带版本* 连续点击七次 后打开开发者选项。
* 打开Chrome的 远程调试 在地址栏输入 `chrome://inspect/` 
* 用usb线连接手机和电脑，这时候在Chrome远程调试页应该会出现 `Pending Authorization` 手机屏幕上出现权限提示

[<img src="{{ site.baseurl }}/images/mobile-debugger/auth.png" alt="矩阵1"/>]({{ site.baseurl }}/)


### 第 2 步：从您的开发计算机调试 Android 设备上的内容。
* 在安卓上打开Chrome
* 新建一个tab并访问网页
* 在电脑的调试页此时应该可以看到

[<img src="{{ site.baseurl }}/images/mobile-debugger/inspect.png" alt="矩阵1"/>]({{ site.baseurl }}/)

* 点击inspect, 和普通的Chrome调试基本一样操作了。

[<img src="{{ site.baseurl }}/images/mobile-debugger/baidu.png" alt="矩阵1"/>]({{ site.baseurl }}/)

## webkit内核的Webview

大前提是 android开发人员在安卓项目代码中开启了调试， 比如翼支付App安卓Debug版就有开启

要启用 `WebView` 调试，请在 `WebView` 类上调用静态方法 [setWebContentsDebuggingEnabled](https://developer.android.com/reference/android/webkit/WebView#setWebContentsDebuggingEnabled(boolean))。

```java
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
    WebView.setWebContentsDebuggingEnabled(true);
}
```
[<img src="{{ site.baseurl }}/images/mobile-debugger/bestpay.png" alt="矩阵1"/>]({{ site.baseurl }}/)


## 提示
有时候点击inspect打开的调试页是空白的，或者等了很久显示一行404.

这是因为手机Webview版本和电脑Chrome版本不一致，它需要去 [chrome-devtools-frontend](https://chrome-devtools-frontend.appspot.com)网站上下载适配工具

所以你打开 SSR ，手动访问下 https://chrome-devtools-frontend.appspot.com ,再回来点击inspect 一般就可以解决。

如果在 远程调试页没有看到手机应用 这是因为有别的工具 比如 微信开发工具 电脑上360手机管家 等 占用了 ADB，需要你手动关闭他们。

## 针对微信/QQ的Webview调试

* qq/微信访问 [http://debugtbs.qq.com](http://debugtbs.qq.com)
* 点击安装线上内核 安装成功后qq浏览器会重启
* 点击DebugX5,进入设置页，点击 信息 Tab
* 勾选 打开TBS内核Inspector调试功能 会再次重启qq浏览器

[<img src="{{ site.baseurl }}/images/mobile-debugger/x5.jpg" alt="矩阵1"/>]({{ site.baseurl }}/)

之后就可以像翼支付WebView一样调试了

## QQ浏览器
访问[https://x5.tencent.com/guide/debug.html](https://x5.tencent.com/guide/debug.html)下载并安装TBS Studio

[<img src="{{ site.baseurl }}/images/mobile-debugger/tbs.png" alt="矩阵1"/>]({{ site.baseurl }}/)

他会主动给你安卓手机安装上QQ浏览器开发者版，之后就可以调试了

[<img src="{{ site.baseurl }}/images/mobile-debugger/tbs2.png" alt="矩阵1"/>]({{ site.baseurl }}/)

## UC浏览器

访问[https://plus.ucweb.com/download](https://plus.ucweb.com/download) 

分别下载 UC浏览器安卓开发者版 UC浏览器开发者工具

[<img src="{{ site.baseurl }}/images/mobile-debugger/uc.png" alt="矩阵1"/>]({{ site.baseurl }}/)

# ios调试

mac os目前比较封闭 能直接通过usb调试的目前我就知道safari 和 safari mobile

1. mac safari 开启开发工具
[<img src="{{ site.baseurl }}/images/mobile-debugger/safari.png" alt="矩阵1"/>]({{ site.baseurl }}/)


2. iphone手机上 打开手机设置->Safari->高级（最下面）->Web检查器打开，JavaScript开关打开

3. 连接电脑，手机会要求输入密码 信任电脑，确认以后就可以调试手机端的safari了

[<img src="{{ site.baseurl }}/images/mobile-debugger/mac.png" alt="矩阵1"/>]({{ site.baseurl }}/)

4. 如果对safari的调试工具不满意怎么办

安装 [ios-webkit-debug-proxy](https://github.com/google/ios-webkit-debug-proxy) 和 [remotedebug-ios-webkit-adapter](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter)  

```bash
brew update
brew unlink libimobiledevice ios-webkit-debug-proxy usbmuxd
brew uninstall --force libimobiledevice ios-webkit-debug-proxy usbmuxd
brew install --HEAD libimobiledevice
brew install --HEAD usbmuxd
brew install --HEAD ios-webkit-debug-proxy
npm install remotedebug-ios-webkit-adapter -g
```

执行 
```bash
remotedebug_ios_webkit_adapter --port=9000
```

# 
## VConsole / Eruda

[https://github.com/Tencent/vConsole](https://github.com/Tencent/vConsole/blob/dev/README_CN.md)

安装
```html
<script src="path/to/vconsole.min.js"></script>
<script>
  // init vConsole
  var vConsole = new VConsole();
  console.log('Hello world');
</script>
```
* 引入 vConsole 模块后，页面前端将会在右下角出现 vConsole 的悬停按钮，可展开/收起面板。
* 千万 不要搞到生产环境上去了，会被批评的

[<img src="{{ site.baseurl }}/images/mobile-debugger/vconsole.png" alt="矩阵1"/>]({{ site.baseurl }}/)

## vue-devtools

[https://github.com/vuejs/vue-devtools](https://github.com/vuejs/vue-devtools/blob/master/shells/electron/README.md)

并非浏览器扩展，是一个独立运行版，可以对远端的vuex状态调试

* 安装
 
```bash
  sudo npm install -g @vue/devtools
```

如果出现 ` permission denied, mkdir '/usr/local/lib/node_modules/@vue/devtools/node_modules/electron/dist'` 的错误提示，可以尝试下边的代码

```bash
    sudo npm install -g @vue/devtools --unsafe-perm=true --allow-root
```

* 使用 
  * 确保手机和电脑在同一个局域网
  * 在命令行输入 `vue-devtools` 进行启动
  * 把下边的代码加入到index.html中
  ````html
   <script>
      window.__VUE_DEVTOOLS_HOST__ = '<your-local-ip>' // default: localhost
      window.__VUE_DEVTOOLS_PORT__ = '<devtools-port>' // default: 8098
    </script>
    <script src="http://<your-local-ip>:8098"></script>
  ````
 
 * 再次用移动设备访问index.html就可以看到了
 * 千万 不要搞到生产环境上去了，会被砍死的，因为用户的手机上 `<script src="http://<your-local-ip>:8098"></script>` 会因为超时而长时间阻塞页面加载

[<img src="{{ site.baseurl }}/images/mobile-debugger/vue.png" alt="矩阵1"/>]({{ site.baseurl }}/)

## spy-debugger

网站地址 [https://github.com/wuchangming/spy-debugger](https://github.com/wuchangming/spy-debugger)

包括页面调试和抓包

集成了 weinre、node-mitmproxy

流程是代理手机请求到本机，本机会劫持流量注入相关js，之后就可以调试了，容易掉线。

* 命令行安装 `spy-debugger`
```bash
    sudo npm install spy-debugger -g
```
 * 手机和PC保持在同一个网络下
 * 命令行输入 `spy-debugger`  一般会展示下边几行内容
```bash
ludeMacBook-Pro:~ lu$ spy-debugger
正在启动代理
本机在当前网络下的IP地址为：192.168.0.128
node-mitmproxy启动端口: 9888
浏览器打开 ---> http://127.0.0.1:55772
``` 
* 设置手机的HTTP代理，代理IP地址设置为PC的IP地址，端口为spy-debugger的启动端口(默认端口：9888)。
    * Android设置代理步骤：设置 - WLAN - 长按选中网络 - 修改网络 - 高级 - 代理设置 - 手动
    * iOS设置代理步骤：设置 - 无线局域网 - 选中网络 - HTTP代理手动
* 手机安装证书，确保命令行`spy-debugger`没有关闭，手机浏览器(非微信)访问 `http://s.xxx` 安装证书 ios新安装的证书需要手动打开证书信任
* 用手机浏览器/App Webview 访问页面，均可被劫持。

[<img src="{{ site.baseurl }}/images/mobile-debugger/spy.png" alt="矩阵1"/>]({{ site.baseurl }}/)


由于它的原理和fiddler 一样，所以也可以用于查看抓包

可以用于欢购ios/android这种app的调试，聊胜于无吧

[<img src="{{ site.baseurl }}/images/mobile-debugger/proxy.png" alt="矩阵1"/>]({{ site.baseurl }}/)
