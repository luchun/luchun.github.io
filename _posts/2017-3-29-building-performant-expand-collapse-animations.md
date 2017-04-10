---
layout: post
title: 构建高性能展开/收起动画
---
[原文](https://developers.google.com/web/updates/2017/03/performant-expand-and-collapse?utm_source=CSS-Weekly&utm_campaign=Issue-258&utm_medium=email)

### Bad:  Animating width and height on a container element

    .menu {
      overflow: hidden;
      width: 350px;
      height: 600px;
      transition: width 600ms ease-out, height 600ms ease-out;
    }
    
    .menu--collapsed {
      width: 200px;
      height: 60px;
    }

给 `width` 和 `height` 添加动画的坏处就是，动画的每一帧都会引起重绘。
    
### Good: animating scales
这个效果涉及一些元素的放大缩小，可以使用 scale 缩放。

#### Step 1: Calculate the start and end states
    
    function calculateCollapsedScale () {
      // The menu title can act as the marker for the collapsed state.
      const collapsed = menuTitle.getBoundingClientRect();
    
      // Whereas the menu as a whole (title plus items) can act as
      // a proxy for the expanded state.
      const expanded = menu.getBoundingClientRect();
      return {
        x: collapsed.width / expanded.width,
        y: collapsed.height / expanded.height
      }
    }
    