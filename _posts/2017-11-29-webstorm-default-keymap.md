---
layout: post
title:  Webstorm 快捷键
---
Webstorm用的久了 ，记住一些快捷键会方便很多

# 编辑


## `⌃ Space` (`Control + Space`) 基本代码完成。 完成名称和关键字

这个快捷键其实不需要使用，默认webstorm就会有代码完成提示，在Mac os 上这个快捷键也被 输入法切换 占用了，需要自己设置。

![Basic code completion](http://ofn6njofy.bkt.clouddn.com/blogweb_ide_completing_class_name.png)
  
> * 📖 [Auto-Completing Code and Paths](https://www.jetbrains.com/help/webstorm/auto-completing-code-and-paths.html) 



## `⌥ ↩︎` ( `Alt + Enter` ) 显示 意图动作 和 快速修复

WebStorm有很多意图来帮助您快速应用修复，生成代码或更改一些项目设置。 
将插入符号放在突出显示或带下划线的代码上，然后按 **Alt + Enter** 查看可用意图操作的列表。 例如：

 ![alt enter](http://ofn6njofy.bkt.clouddn.com/blogquick-fix-npm.png)

> * 📖 [Applying Intention Actions](https://www.jetbrains.com/help/webstorm/applying-intention-actions.html) 



## `⌘ P`  ( `Command + P` ) 查看参数信息

鼠标悬停在 function 的参数上 ，按下 `Command + P` ，可以查看参数的信息

![Parameter Information](http://ofn6njofy.bkt.clouddn.com/blogWX20171129-134628.png)
  
> * 📖 [Viewing Method Parameter Information](https://www.jetbrains.com/help/webstorm/viewing-method-parameter-information.html) 



## `⌃ J`  (  `Control + J` ) quick documentation lookup

在光标所在的 参数 / function 等等 ，按下 `Control + J` ，可以查看相关的文档

![quick documentation lookup](http://ofn6njofy.bkt.clouddn.com/blogWX20171129-135545.png)
  
> * 📖 [Viewing Definition](https://www.jetbrains.com/help/webstorm/viewing-definition.html#d255807e7) 



## `⌘ mouse over code` (  `Command + 鼠标于代码上悬浮` )  查看详细信息

按住 Command 后将鼠标移动到想要查看的 变量 / 参数 等等 上，可以看到相关的定义或信息

![Brief Info](http://ofn6njofy.bkt.clouddn.com/WX20171129-141102@2x.png)
  
> * 📖 [Viewing Definition](https://www.jetbrains.com/help/webstorm/viewing-definition.html#d255807e7) 



## `⌘ F1` (`Command + F1`) 查看光标位置 错误/警告 描述信息   

![Show descriptions of error or warning at caret](http://ofn6njofy.bkt.clouddn.com/blogWX20171129-141715.png)


## `⌃ ↩︎` / `⌘  N` （control + enter / command + N）  生成代码

![Generate code](http://ofn6njofy.bkt.clouddn.com/WX20171129-143717@2x.png)
  
> * 📖 [Generate code](https://www.jetbrains.com/help/webstorm/auto-completing-code-and-paths.html) 


## `⌥ ⌘ T ︎` （`Command + Alt + T`）  代码包围 (if..else, try..catch, for, etc.)

对代码进行包围操作 (如 if..else, try..catch, for, etc. 等等)

例如对下面这个 await 代码 ，使用try catch 包围。选中代码块后  `Command + Alt + T` 选择 try...catch

![Surround with](http://ofn6njofy.bkt.clouddn.com/WX20171129-144010.png)


![Surround with](http://ofn6njofy.bkt.clouddn.com/WX20171129-144223.png)


## `⌘ J ︎` （`Command + J`） 插入实时模板 Insert Live template 

Webstorm 内置了大量的代码模板，可以节省很多工作量。
在设置中可以查看所以的代码模板定义，也可以自己添加新的代码模板。 
并且覆盖范围广，js html vue pug css 都有预制模板。

代码模板会出现在智能提示中 , 如在js文件中输入 `iter` 第一条只能提示回车后会生成一个for ..of 循环代码块。

也可以在输入前 按下 （`Command + J`） 出现所有可用模板列表，边输入边进行过滤。或滑动列表进行选择。

![Insert Live template](http://ofn6njofy.bkt.clouddn.com/ws_insert_parameterized_live_template.png)

> * 📖 [Simple, Parameterized and Surround Live Templates](https://www.jetbrains.com/help/webstorm/simple-parameterized-and-surround-live-templates.html) 
> * 📖 [Creating Code Constructs by Live Templates](https://www.jetbrains.com/help/webstorm/creating-code-constructs-by-live-templates.html) 


## `⌘ /︎` （`Command + /︎`） 对行代码进行 注释/取消注释 

> * 📖 [Commenting and Uncommenting Blocks of Code](https://www.jetbrains.com/help/webstorm/commenting-and-uncommenting-blocks-of-code.html) 


## `⌘ ⇧ /︎` （`Command + /︎`） 对块代码进行 注释/取消注释

> * 📖 [Commenting and Uncommenting Blocks of Code](https://www.jetbrains.com/help/webstorm/commenting-and-uncommenting-blocks-of-code.html) 


## `⌥ ↑` （`Alt +  方向上︎`）  选择连续增加的代码块

在html中非常好用，会逐级向上选中代码块。

如 有 `body>main>section>div>p>span>''hello world'` 这样的html结构，光标在`hello world`。连续点击 （`Alt +  方向上︎`） ，选中的代码块也会从 text 到 span 到 p 最终到 body。

这个功能在js 或其他语言中都可用


## `⌥ ↓` （`Alt +  方向上下`）    将当前选中恢复到上一个选中状态 

基本可以看做是前一个快捷键的反操作，前一个操作如果选多了，可以使用这个操作缩小选择。


## `⌃ ⇧ Q︎`  查看上下文信息


## `⌥ ⌘ L︎`  Reformat code 重新格式化代码

如果在选中的代码块上执行， 则会重新格式化选中；如果没有选中的代码块

![Reformat code](http://ofn6njofy.bkt.clouddn.com/Reformat_code.gif)


## `⌥ ⌘ I`  对行(多行) 自动缩进


## `⇥`  缩进选定的行 

## `⇧ ⇥`  取消对选定行的缩进 是上一个操作的逆操作

![Indent selected lines](http://ofn6njofy.bkt.clouddn.com/Indent_selected_lines.gif)

## `⌘ ⇧ V︎`  从近期缓存区复制
![Paste_from_recent_buffers](http://ofn6njofy.bkt.clouddn.com/Paste_from_recent_buffers.gif)


## `⌘ D`  Duplicate current line or selected block

![Duplicate current line or selected block](http://ofn6njofy.bkt.clouddn.com/Duplicate_current_line_or_selected_block.gif)


## `⌘ ⌫`  删除光标所在的行 

![Delete line at caret](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-073359.gif)


## `⌥ ⇧ ︎↑`  对选中的代码 或 光标所在行 进行 向上移动 

![Move line up](http://ofn6njofy.bkt.clouddn.com/move-line-selection-up-down.gif)

## `⌥ ⇧ ︎↓`  对选中的代码 或 光标所在行 进行 向下移动 

![Move line down](http://ofn6njofy.bkt.clouddn.com/FlawlessWhichAlbacoretuna-size_restricted.gif)


## `⌃ ⇧ ︎J`   向下合并行 

![Join lines](http://ofn6njofy.bkt.clouddn.com/join_line.gif)


## `⌘ ↩︎`   拆分一个新行

和直接使用回车不一样 光标的位置不会改变

![Split line](http://ofn6njofy.bkt.clouddn.com/split_line.gif)

## `⇧  ↩︎`   开始新的一行

在当前光标行直接开始一个新行，不会从光标处折断行

![Start new line](http://ofn6njofy.bkt.clouddn.com/start_new_line.gif)


## `⌘ ⇧ U`  切换选中的代码块 / 光标所在单词 的大小写
        
![Toggle Upcase](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-095838.gif)
        
## `⌥ ⌘ ⇧ ]`  从当前位置选择到代码块结束位置 
 
## `⌥ ⌘ ⇧ [`  从当前位置选择到代码块开始位置

![Select from current to end](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-095111.gif)
  
## `⌥ ⌦`  Delete to word end

## `⌥ ⌫`  Delete to word start

![Delete to word start / Delete to word end](http://ofn6njofy.bkt.clouddn.com/delete_word.gif)

## `⌘ +` / `⌘ -` 展开折叠当前的代码块

![Expand/collapse code block](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-115931.gif)
  
 
## ` ⌘ ⇧ +` 全部展开

## ` ⌘ ⇧ -` 全部折叠

![Collapse all](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-120125.gif)


## ` ⌘ W` 关闭当前激活的编辑器标签tab

![Close active editor tab](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-120017.gif)
  



# Multiple carets and selections 

// TODO 
## ` ⌥  Click`  Add or remove caret

// TODO 
## ` ⌃ ⌘ G`  Select all occurrences

// TODO 
## ` ⌃ G`  Select next occurrence

// TODO 
## ` ⌃ ⇧ G`  Unselect occurrence

// TODO 
## `⎋`  Unselect all occurrences or carets 

# Running

// TODO 
## `⌃ ⌥ R`  Select configuration and run

// TODO 
## `⌃ ⌥ D`  Select configuration and debug

// TODO 
## `⌃ D` / `⌃ R`  Run/Debug

// TODO 
## `⌃ ⇧ D` / `⌃ ⇧ R`  Run context configuration from editor

// TODO 
## ` ⌃ ⌘ R`  Rerun tests

// TODO 
## ` ⌥  F11`  Run Gulp/Grunt/npm tasks

# Debugging

// TODO 
## `F8` / `F7`  Step over / step into

// TODO 
## ` ⇧ F7 `  Smart step into

// TODO 
## ` ⇧ F8 `  Step out

// TODO 
## ` ⌥ F9 ` Run to cursor

// TODO 
## ` ⌥ F8 ` Evaluate expression

// TODO 
## ` ⌥ ⌘ R ` Resume

// TODO 
## ` ⌘ F8 ` Toggle breakpoint

// TODO 
## `⇧ ⌘ F8 ` View breakpoints

# Navigation

// TODO 
## ` ⌘ B `, ` ⌘ Click ` Go to declaration

// TODO 
## ` ⌘ O ` Go to class

// TODO 
## ` ⌘ ⇧ O ` Go to file

// TODO 
## ` ⌘ ⌥ O ` Go to symbol

// TODO 
## `⇧ ⌘ ] ` Go to next editor tab

// TODO 
## `⇧ ⌘ [ ` Go to previous editor tab

// TODO 
## `F12` Go back to previous tool window

// TODO 
## ` ⎋ ` Go to editor (from tool window)

// TODO 
## ` ⌘ L ` Go to line

// TODO 
## ` ⌘ E ` Recent files popup

// TODO 
## ` ⌥ ⌘ ←` Navigate back

// TODO 
## ` ⌥ ⌘ →` Navigate forward

// TODO 
## ` ⌘ ⇧ ⌫` Navigate to last edit location

// TODO 
## ` ⌥ F1` Select current file or symbol in any view

// TODO 
## ` ⌥ ⌘ B` Go to implementation(s)

// TODO 
## ` ⌥ Space`, ` ⌘ B` Open quick definition lookup

// TODO 
## ` ⌃ ⇧ B` Go to type declaration

// TODO 
## ` ⌘ U ` Go to super-method/super-class

// TODO 
## ` ⌃  ↑` Go to Go to previous method

// TODO 
## ` ⌃  ↓` Go to next method

// TODO 
## ` ⌥ ⌘ ] ` Move to code block end

// TODO 
## ` ⌥ ⌘ [ ` Move to code block start

// TODO 
## ` ⌃ M ` Move caret to matching brace

// TODO 
## ` ⌘ F12 ` File structure popup


// TODO 
## ` ⌃ H ` Type hierarchy

// TODO 
## ` ⌃ ⌥ H ` Call hierarchy

// TODO 
## ` F2 ` Next highlighted error

// TODO 
## ` ⇧ F2 ` Previous highlighted error

// TODO 
## ` F4 `, ` ⌘ ↓ ` Jump to source

// TODO 
## ` ⌘ ↑ ` Jump to navigation bar

// TODO 
## ` F3` Toggle bookmark

// TODO 
## ` ⌥ F3` Toggle bookmark with mnemonic

// TODO 
## ` ⌃ 0` ... `⌃ 9` Go to numbered bookmark

// TODO 
## ` ⌘ F3 ` Show bookmarks

# Search/Replace 

// TODO 
## ` ⌘ F ` / ` ⌘ R ` Find / Replace

// TODO 
## ` ⌘ G ` / ` ⌘ ⇧ G ` Find next/previous

// TODO 
## ` ⇧ ⌘ F ` Find in path

// TODO 
## ` ⇧ ⌘ R ` Replace in path

# Usage Search

// TODO 
## ` ⌥ F7 ` Find usages

// TODO 
## ` ⌘ F7 ` Find usages in file

// TODO 
## `⇧ ⌘ F7 ` Highlight usages in file

// TODO 
## `⌥ ⌘ F7 ` Show usages

# Refactoring

// TODO 
## `⌃ T ` Refactor this

// TODO 
## `F5` / `F6` Copy / Move

// TODO 
## `⌘ ⌦` Safe Delete

// TODO 
## `⇧ F6` Rename

// TODO 
## `⌘ F6` Change function signature

// TODO 
## `⌥ ⌘ N` Inline variable

// TODO 
## `⌥ ⌘ V` Extract Variable

// TODO 
## `⌥ ⌘ C` Extract Constant 

// TODO 
## `⌥ ⌘ P` Extract Parameter

# VCS/Local History

// TODO 
## `⌃ V ` ‘VCS’ quick popup


// TODO 
## ` ⌘ K ` Commit project to VCS

// TODO 
## ` ⌘ T ` Update project from VCS

// TODO 
## ` ⌥ ⇧ C ` View recent changes

# General

// TODO 
## ` Double ⇧ ` Search everywhere

// TODO 
## ` ⇧ ⌘ A ` Find Action

// TODO 
## `⌘ 0 ` ...`⌘ 9` Open corresponding tool window

// TODO 
## `⇧ ⌘ F12 ` Toggle maximizing editor

// TODO 
## `⌥ ⇧ F ` Add to Favorites

// TODO 
## `⌥ ⇧ I ` Inspect current file with current profile

// TODO 
## `⌃ §` , ``` ⌃ ` ``` Quick switch current scheme

// TODO 
## `⌘ , ` Open Preferences

// TODO 
## `⌃ ⇥ ` Switch between tabs and tool window



## mac 键盘符号对应

* ` ⌦ ` 表示同时按下 `fn + delete` Forward delete
* ` ⌫ ` delete 键
* ` ⌘ ` command 键
* ` ⌥ ` alt/option 键
* ` ⇧ ` shift 键
* ` ⌃ ` control 键
* ` ⎋ ` escape 键 (键盘左上角 esc 键)
* ` ↑ ` ` ↓ ` ` ← `  ` → ` 键盘上的方向键 
* ` § ` 或 ``` ` ```  tab键上方的 顿号键 更多解释["§" symbol ](https://apple.stackexchange.com/questions/176968/what-is-the-meaning-of-the-symbol-on-the-upper-left-corner-of-the-mac-keybo)
* ` ⇥ ` tab 键 


## 后记 

* 想要输入 代表mac键盘的特殊字符 或者是 emoji ，需要同时按住 `control command space` 

---


[low_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png
[medium_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png
[high_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png