---
layout: post
title: 网页检查离线状态
---

并不是网站的每个部分都可以离线工作，
有些内容不可以被缓存，有的部分需要与服务器交互。
离线优化网站应当适应连接的变化。
<!-- more -->
# 离线检查
检查离线的方法包括 `offline`事件和 `navigator.onLine` 属性。
我们可以组合使用它们

    let isOffline = false;
    window.addEventListener('load', checkConnectivity);
    
    // when the page has finished loading,
    // listen for future changes in connection
    function checkConnectivity() {
      updateStatus();
      window.addEventListener('online', updateStatus);
      window.addEventListener('offline', updateStatus);
    }
    
    // check if we're online, set a class on <html> if not
    function updateStatus() {
      if (typeof navigator.onLine !== 'undefined'){
        isOffline = !navigator.onLine;
        document.documentElement.classList.toggle('is-offline', isOffline);
        ...
      }
    }
    
 ⚠️  注意：在线事件可能存在误报：用户可能连接到网络（被解释为在线），但较高的可能会阻止实际的Internet访问。
  离线事件有点更可靠，因为“离线”用户可能无法访问。
 