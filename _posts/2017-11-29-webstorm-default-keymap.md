---
layout: post
title:  Webstorm 快捷键
---
Webstorm用的久了 ，记住一些快捷键会方便很多
<!-- more -->
### table of Contents

1. **[Editing](#Editing)**
2. **[Multiple carets and selections](#multiple-carets-and-selections)**
3. **[VCS/Local History](#vcslocal-history)**
4. **[Search/Replace](#searchreplace)**
5. **[Usage Search](#usage-search)**
6. **[Navigation](#navigation)**
7. **[Refactoring](#refactoring)**
8. **[Running](#running)**
9. **[Debugging](#debugging)**
10. **[General](#general)**

## Editing 

### `⌃ Space` (`Control + Space`) 基本代码完成。 完成名称和关键字

这个快捷键其实不需要使用，默认webstorm就会有代码完成提示，在Mac os 上这个快捷键也被 输入法切换 占用了，需要自己设置。

![Basic code completion](http://ofn6njofy.bkt.clouddn.com/blogweb_ide_completing_class_name.png)
  
> * 📖 [Auto-Completing Code and Paths](https://www.jetbrains.com/help/webstorm/auto-completing-code-and-paths.html) 


### ![High][high_img] `⌥ ↩︎` ( `Alt + Enter` ) 显示 意图动作 和 快速修复

WebStorm有很多意图来帮助您快速应用修复，生成代码或更改一些项目设置。 
将插入符号放在突出显示或带下划线的代码上，然后按 **Alt + Enter** 查看可用意图操作的列表。 例如：

 ![alt enter](http://ofn6njofy.bkt.clouddn.com/blogquick-fix-npm.png)

> * 📖 [Applying Intention Actions](https://www.jetbrains.com/help/webstorm/applying-intention-actions.html) 


### ![High][high_img] `⌘ P`  ( `Command + P` ) 查看参数信息

鼠标悬停在 function 的参数上 ，按下 `Command + P` ，可以查看参数的信息

![Parameter Information](http://ofn6njofy.bkt.clouddn.com/blogWX20171129-134628.png)
  
> * 📖 [Viewing Method Parameter Information](https://www.jetbrains.com/help/webstorm/viewing-method-parameter-information.html) 


### ![High][high_img] `⌃ J`  (  `Control + J` ) quick documentation lookup

在光标所在的 参数 / function 等等 ，按下 `Control + J` ，可以查看相关的文档

![quick documentation lookup](http://ofn6njofy.bkt.clouddn.com/blogWX20171129-135545.png)
  
> * 📖 [Viewing Definition](https://www.jetbrains.com/help/webstorm/viewing-definition.html#d255807e7) 


### ![High][high_img] `⌘ mouse over code` (  `Command + 鼠标于代码上悬浮` )  查看详细信息

按住 Command 后将鼠标移动到想要查看的 变量 / 参数 等等 上，可以看到相关的定义或信息

![Brief Info](http://ofn6njofy.bkt.clouddn.com/WX20171129-141102@2x.png)
  
> * 📖 [Viewing Definition](https://www.jetbrains.com/help/webstorm/viewing-definition.html#d255807e7) 


### `⌘ F1` (`Command + F1`) 查看光标位置 错误/警告 描述信息   

![Show descriptions of error or warning at caret](http://ofn6njofy.bkt.clouddn.com/blogWX20171129-141715.png)


### ![High][high_img] `⌃ ↩︎` / `⌘  N` （control + enter / command + N）  生成代码

![Generate code](http://ofn6njofy.bkt.clouddn.com/WX20171129-143717@2x.png)
  
> * 📖 [Generate code](https://www.jetbrains.com/help/webstorm/auto-completing-code-and-paths.html) 


### ![High][high_img] `⌥ ⌘ T ︎` （`Command + Alt + T`）  代码包围 (if..else, try..catch, for, etc.)

对代码进行包围操作 (如 if..else, try..catch, for, etc. 等等)

例如对下面这个 await 代码 ，使用try catch 包围。选中代码块后  `Command + Alt + T` 选择 try...catch

![Surround with](http://ofn6njofy.bkt.clouddn.com/WX20171129-144010.png)


![Surround with](http://ofn6njofy.bkt.clouddn.com/WX20171129-144223.png)


### ![High][high_img] `⌘ J ︎` （`Command + J`） 插入实时模板 Insert Live template 

Webstorm 内置了大量的代码模板，可以节省很多工作量。
在设置中可以查看所以的代码模板定义，也可以自己添加新的代码模板。 
并且覆盖范围广，js html vue pug css 都有预制模板。

代码模板会出现在智能提示中 , 如在js文件中输入 `iter` 第一条只能提示回车后会生成一个for ..of 循环代码块。

也可以在输入前 按下 （`Command + J`） 出现所有可用模板列表，边输入边进行过滤。或滑动列表进行选择。

![Insert Live template](http://ofn6njofy.bkt.clouddn.com/ws_insert_parameterized_live_template.png)

> * 📖 [Simple, Parameterized and Surround Live Templates](https://www.jetbrains.com/help/webstorm/simple-parameterized-and-surround-live-templates.html) 
> * 📖 [Creating Code Constructs by Live Templates](https://www.jetbrains.com/help/webstorm/creating-code-constructs-by-live-templates.html) 


### ![High][high_img] `⌘ /︎` （`Command + /︎`） 对行代码进行 注释/取消注释 

> * 📖 [Commenting and Uncommenting Blocks of Code](https://www.jetbrains.com/help/webstorm/commenting-and-uncommenting-blocks-of-code.html) 


### ![High][high_img]`⌘ ⇧ /︎` （`Command + /︎`） 对块代码进行 注释/取消注释

> * 📖 [Commenting and Uncommenting Blocks of Code](https://www.jetbrains.com/help/webstorm/commenting-and-uncommenting-blocks-of-code.html) 


### ![High][high_img]`⌥ ↑` （`Alt +  方向上︎`）  选择连续增加的代码块

在html中非常好用，会逐级向上选中代码块。

如 有 `body>main>section>div>p>span>''hello world'` 这样的html结构，光标在`hello world`。连续点击 （`Alt +  方向上︎`） ，选中的代码块也会从 text 到 span 到 p 最终到 body。

这个功能在js 或其他语言中都可用


### ![High][high_img]`⌥ ↓` （`Alt +  方向上下`）    将当前选中恢复到上一个选中状态 

基本可以看做是前一个快捷键的反操作，前一个操作如果选多了，可以使用这个操作缩小选择。


### `⌃ ⇧ Q︎` (`Control Shift Q`)  查看上下文信息


### ![High][high_img]`⌥ ⌘ L︎` (`Alt Command L`) Reformat code 重新格式化代码

如果在选中的代码块上执行， 则会重新格式化选中；如果没有选中的代码块

![Reformat code](http://ofn6njofy.bkt.clouddn.com/Reformat_code.gif)


### `⌥ ⌘ I`  (`Alt Command I`) 对行(多行) 自动缩进


### ![High][high_img]`⇥`   (`Tab`) 缩进选定的行 

### ![High][high_img]`⇧ ⇥`  (Shift Tab) 取消对选定行的缩进 是上一个操作的逆操作

![Indent selected lines](http://ofn6njofy.bkt.clouddn.com/Indent_selected_lines.gif)


### ![High][high_img]`⌘ ⇧ V︎`   (`Command Shift V`) 从近期缓存区复制
![Paste_from_recent_buffers](http://ofn6njofy.bkt.clouddn.com/Paste_from_recent_buffers.gif)


### ![High][high_img]`⌘ D`   (`Command D`) Duplicate current line or selected block

![Duplicate current line or selected block](http://ofn6njofy.bkt.clouddn.com/Duplicate_current_line_or_selected_block.gif)


### ![High][high_img]`⌘ ⌫`   (`Command Delete`) 删除光标所在的行 

![Delete line at caret](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-073359.gif)


### ![High][high_img]`⌥ ⇧ ︎↑`   (`Alt Shift 方向键上`) 对选中的代码 或 光标所在行 进行 向上移动 

![Move line up](http://ofn6njofy.bkt.clouddn.com/move-line-selection-up-down.gif)


### ![High][high_img]`⌥ ⇧ ︎↓`   (`Alt Shift 方向键下`) 对选中的代码 或 光标所在行 进行 向下移动 

![Move line down](http://ofn6njofy.bkt.clouddn.com/FlawlessWhichAlbacoretuna-size_restricted.gif)


### ![High][high_img]`⌃ ⇧ ︎J`    (`Control Command J`) 向下合并行 

![Join lines](http://ofn6njofy.bkt.clouddn.com/join_line.gif)


### ![High][high_img]`⌘ ↩︎`    (`Command Enter`) 拆分一个新行

和直接使用回车不一样 光标的位置不会改变

![Split line](http://ofn6njofy.bkt.clouddn.com/split_line.gif)


### ![High][high_img]`⇧  ↩︎`    (`Shift Enter`) 开始新的一行

在当前光标行直接开始一个新行，不会从光标处折断行

![Start new line](http://ofn6njofy.bkt.clouddn.com/start_new_line.gif)


### ![High][high_img]`⌘ ⇧ U` (`Command Shift U`) 切换选中的代码块 / 光标所在单词 的大小写
        
![Toggle Upcase](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-095838.gif)
        
        
        
### `⌥ ⌘ ⇧ ]` (`Alt Command Shift ]`)  从当前位置选择到代码块结束位置 
 
 
 
### `⌥ ⌘ ⇧ [`   (`Alt Command Shift [`) 从当前位置选择到代码块开始位置

![Select from current to end](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-095111.gif)
  
  
  
### ![High][high_img]`⌥ ⌦`   (`Alt Fn Delete`) Delete to word end


### ![High][high_img]`⌥ ⌫`   (`Alt Delete`) Delete to word start

![Delete to word start / Delete to word end](http://ofn6njofy.bkt.clouddn.com/delete_word.gif)


### ![High][high_img]`⌘ +` / `⌘ -`  (`Command +` / `Command -`) 展开折叠当前的代码块

![Expand/collapse code block](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-115931.gif)
  
 
 
 
### ![High][high_img]` ⌘ ⇧ +`  (`Command Shift +`) 全部展开


### ![High][high_img]` ⌘ ⇧ -`  (`Command Shift -`) 全部折叠

![Collapse all](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-120125.gif)


### ![High][high_img]` ⌘ W` (`Command W`)关闭当前激活的编辑器标签tab

![Close active editor tab](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-120017.gif)
  


**[⬆ back to top](#table-of-contents)**


## Multiple carets and selections 


> * 📖 [Multicursor](https://www.jetbrains.com/help/webstorm/multicursor.html) 


### ![High][high_img]` ⌥  Click` (`Alt 点击`) Add or remove caret

![Add or remove caret](http://ofn6njofy.bkt.clouddn.com/Add_or_remove_caret.gif)
  

### ![High][high_img]` ⌃ ⌘ G` (`Control Command G`)  Select all occurrences

![Select all occurrences](http://ofn6njofy.bkt.clouddn.com/Select_all_occurrences.gif)
  

### ![High][high_img]` ⌃ G`  (`Control G`)  Select next occurrence

![Select next occurrence](http://ofn6njofy.bkt.clouddn.com/Select_next_occurrence.gif)
  

### ` ⌃ ⇧ G` (`Control Shift G`)  Unselect occurrence

![Unselect occurrence](http://ofn6njofy.bkt.clouddn.com/Unselect_occurrence.gif)
    

### `⎋`  (`Escape`) Unselect all occurrences or carets 

![Unselect all occurrences or carets](http://ofn6njofy.bkt.clouddn.com/Unselect_all_occurrences_or_carets.gif)
 
 
 
 
 **[⬆ back to top](#table-of-contents)**

 
## VCS/Local History 

> * 📖  [Version control with WebStorm](https://www.jetbrains.com/help/webstorm/version-control-with-webstorm.html)

### ![High][high_img]`⌃ V ` (`Control V`)  打开 版本控制系统 快速操作框

![‘VCS’ quick popup](http://ofn6njofy.bkt.clouddn.com/VCS_quick_popup.gif)


### ![High][high_img]` ⌘ K ` (`Command V`) 将项目的更改提交到版本控制系统中

![Commit project to VCS](http://ofn6njofy.bkt.clouddn.com/Commit_project_to_VCS.gif)


### ![High][high_img]` ⌘ T ` (`Command T`) 从版本控制系统中更新代码

![Update project from VCS](http://ofn6njofy.bkt.clouddn.com/Update_project_from_VCS.gif)


### ` ⌥ ⇧ C ` (`Alt Shift C`) 查看最近的更改

![View recent changes](http://ofn6njofy.bkt.clouddn.com/View_recent_changes.gif)


**[⬆ back to top](#table-of-contents)**


## Search/Replace 

> * 📖  [Version control with WebStorm](https://www.jetbrains.com/help/webstorm/version-control-with-webstorm.html)


### ![High][high_img]` ⌘ F ` / ` ⌘ R ` (`Command F` / `Command R`) 当前文件内 查找 / 替换

> * 📖  [Finding and replacing text in a fil](https://www.jetbrains.com/help/webstorm/finding-and-replacing-text-in-a-file.html)


 ![Search/Replace](https://www.jetbrains.com/help/img/idea/2017.3/wi_findText.png)

 
### ` ⌘ G ` / ` ⌘ ⇧ G ` (`Command G` / `Command Shift G`) 查找 下一个 / 前一个

### ![High][high_img]` ⇧ ⌘ F ` (`Command Shift F`) 在路径内查找 Find in path 

> * 📖  [Find and Replace in Path](https://www.jetbrains.com/help/webstorm/find-and-replace-in-path.html)

 
### ![High][high_img]` ⇧ ⌘ R ` (`Command Shift R`) 在路径内查找和替换 Replace in path

> * 📖  [Find and Replace in Path](https://www.jetbrains.com/help/webstorm/find-and-replace-in-path.html)


**[⬆ back to top](#table-of-contents)**

##  Usage Search

> * 📖  [Finding Usages](https://www.jetbrains.com/help/webstorm/finding-usages.html)


### ` ⌥ F7 ` (`Alt F7`) 在项目中查找使用情况

选中要查找的 字符 ，并按下 `Alt F7` 即可查看有哪些文件使用了该 属性/方法

> * 📖  [Finding Usages in Project](https://www.jetbrains.com/help/webstorm/finding-usages-in-project.html)

 ![Finding Usages in Project](http://ofn6njofy.bkt.clouddn.com/Jietu20171130-161452.jpg)


### ` ⌘ F7 ` (`Command F7`) 在当前文件中查找使用情况

> * 📖  [Finding Usages in the Current File](https://www.jetbrains.com/help/webstorm/finding-usages-in-the-current-file.html)



### `⇧ ⌘ F7 ` (`Command Shift F7`) 在当前文件高亮使用情况 

> * 📖  [Highlighting Usages](https://www.jetbrains.com/help/webstorm/highlighting-usages.html)



### `⌥ ⌘ F7 ` (`Alt Command F7`) 显示使用情况列表 Show usages

 ![Show usages](http://ofn6njofy.bkt.clouddn.com/WX20171130-162200.png)

**[⬆ back to top](#table-of-contents)**


## Navigation

### ![High][high_img]` ⌘ B `, ` ⌘ Click ` (`Command B` / `Command Click`) 立即前往声明位置 Go to declaration
可以立即跳转到函数或方法的定义位置 或者 变量 / class / 组件 /css 样式声明 

![Go to declaration](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2015/06/gotodeclaration@2x.gif)

 
### ` ⌘ O ` (`Command O`) 前往  class 定义的位置 Go to class

输入并前往  class 定义的位置

### ![High][high_img]` ⌘ ⇧ O ` (`Command Shift O`) 打开文件 Go to file

输入并前往  文件 

### ` ⌘ ⌥ O ` (`Alt Command O`) 打开符号 Go to symbol

查找并打开 符号 声明的位置 

### ![High][high_img]`⇧ ⌘ ] ` (`Command Shift ]`) 激活下一个编辑Tab  Go to next editor tab

前往下一个打开的编辑器 tab 
 
### ![High][high_img]`⇧ ⌘ [ ` (`Command Shift []`) 激活前一个编辑Tab Go to previous editor tab

前往前一个打开的编辑器 tab 

 
### `F12` 打开最近的工具窗 Go back to previous tool window

 
### ` ⎋ ` (`Escape`) 从工具窗切换回编辑区 Go to editor (from tool window)

 
### ![High][high_img]` ⌘ L ` (`Command L`) 前往行 Go to line
 
 
### ![High][high_img]` ⌘ E ` (`Command E`) 最近打开的文件列表 Recent files popup

 
### ` ⌥ ⌘ ←` (`Alt Command 方向左`) 向后导航 Navigate back


### ` ⌥ ⌘ →` (`Alt Shift 方向右`) 向前导航 Navigate forward


### ` ⌘ ⇧ ⌫` (`Command Shift Delete`)  导航到最近的编辑位置 Navigate to last edit location


### ` ⌥ F1` (`Alt F1`) 在任何视图中选择当前文件或符号 Select current file or symbol in any view

可能包括从 项目结构中查看本文件 / 导航条中查看本文件 / 资源管理器中查看本文件 等等

 
### ` ⌥ ⌘ B` (`Alt Command B`) 查看实例 Go to implementation(s)

 
### ` ⌥ Space`, ` ⌘ B` (`Alt space` / `Command B`) 打开快速定义查找 Open quick definition lookup

 
### ` ⌃ ⇧ B` (`Control Shift B`) 前往类型声明 Go to type declaration


### ` ⌘ U ` (`Command U `) 前往 super class / super method Go to super-method/super-class


### ` ⌃  ↑` (`Control ↑`) 前往上一个方法 Go to Go to previous method


### ` ⌃  ↓` (`Control ↓`) 前往下一个方法 Go to next method


### ` ⌥ ⌘ ] ` (`Alt Command ]`) 前往代码块结束位置 Move to code block end


### ` ⌥ ⌘ [ ` (`Alt Command [`) 前往代码块开始位置 Move to code block start

 
### ` ⌃ M ` (`Control M`) 移动光标到对应的括号 Move caret to matching brace

 
### ![High][high_img]` ⌘ F12 ` (`Command F12`) 显示文件结构 File structure popup

 
### ` ⌃ H ` (`Control H`) 类型继承 Type hierarchy

 
### ` ⌃ ⌥ H ` (`Control Alt H`) 调用继承 Call hierarchy

 
### ![High][high_img]` F2 ` 前往下一个高亮的错误 Next highlighted error

 
### ![High][high_img]` ⇧ F2 ` (`Shift F2`) 前往上一个高亮的错误 Previous highlighted error


### ` F4 `, ` ⌘ ↓ ` 跳转到源代码 Jump to source

 
### ` ⌘ ↑ ` (`Command ↑`) 跳到导航条 Jump to navigation bar

 
### ![High][high_img]` F3` 切换 添加/取消 书签 Toggle bookmark

很多同事用 TODO 来标记一些事宜， 用书签更好些

 
### ![High][high_img]` ⌥ F3` 添加带助记符的书签 Toggle bookmark with mnemonic

书签还可以带编号 0-9 A-Z，0-9的书签可以用下边的方法快速定位 

 
### ![High][high_img]` ⌃ 0` ... `⌃ 9` 前往带编号的书签 Go to numbered bookmark

### ![High][high_img]` ⌘ F3 ` 显示所有书签 Show bookmarks

**[⬆ back to top](#table-of-contents)**

## Refactoring


### ![High][high_img]`⌃ T ` 对代码进行重构 Refactor this

 ![Refactor this](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2015/06/refactorthis@2x.gif)


### ![High][high_img]`F5` / `F6` 复制/移动当前文件 Copy / Move

 ![Copy / Move](http://ofn6njofy.bkt.clouddn.com/Copy_Move.gif)


### ![High][high_img]`⌘ ⌦` (`Command Fn Delete`) 安全删除 Safe Delete

Webstorm 会查找使用情况并在提示下进行删除 

> * 📖  [Safe Delete](https://www.jetbrains.com/help/webstorm/refactoring-source-code.html#ws_refactoring_context_independent_refactorings_safe_delete_file)


### ![High][high_img]`⇧ F6` (`Shift F6`) 重命名 Rename

 ![Rename](http://ofn6njofy.bkt.clouddn.com/Rename.gif)


### `⌘ F6` (`Command F6`) 更改功能签名 Change function signature

> * 📖  [Extract Method](https://www.jetbrains.com/help/webstorm/refactoring-javascript.html#javascript_change_signature)


### `⌥ ⌘ N` (`Alt Command N`) 重构为 Inline variable

> * 📖  [JavaScript refactoring: Inline Variable](https://blog.jetbrains.com/webstorm/2009/10/javascript-refactoring-inline-variable/

 ![Inline variable](http://ofn6njofy.bkt.clouddn.com/Inline_variable.gif)


### `⌥ ⌘ V` (`Alt Command V`) 提取 变量/常量 Extract Variable

> * 📖  [Extract Variable](https://www.jetbrains.com/help/webstorm/refactoring-javascript.html#javascript_extract_variable)

 
### `⌥ ⌘ P` (`Alt Command P`) 提取参数 Extract Parameter

> * 📖  [Extract Parameter](https://www.jetbrains.com/help/webstorm/refactoring-javascript.html#javascript_extract_parameter)

**[⬆ back to top](#table-of-contents)**

## Running


### `⌃ ⌥ R`  (`Control Alt R`) 选择配置并运行 Select configuration and run


### `⌃ ⌥ D`  (`Control Alt D`) 选择配置并调试 Select configuration and debug

 
### `⌃ D` / `⌃ R` (`Control D` / `Control R`) 运行/调试 Run/Debug


### `⌃ ⇧ D` / `⌃ ⇧ R` (`Control Shift D` / `Control Shift R`) 从编辑器运行上下文配置 Run context configuration from editor


### ` ⌃ ⌘ R`  (`Control Command R`) 重新执行测试 Rerun tests


### ` ⌥  F11` (`Alt F11`) 执行 Gulp/Grunt/npm 任务 Run Gulp/Grunt/npm tasks

**[⬆ back to top](#table-of-contents)**


## Debugging


### `F8` / `F7`  步入/步入 Step over / step into


### ` ⇧ F7 `  (`Shift F7`) 智能步入 Smart step into


### ` ⇧ F8 `  (`Shift F8`) 智能步出 Step out


### ` ⌥ F9 ` (`Alt F9`) 运行到光标位置 Run to cursor


### ` ⌥ F8 ` (`Alt F8`) 运行表达式 Evaluate expression


### ` ⌥ ⌘ R ` (`Alt Command R`) 暂停 Resume


### ` ⌘ F8 ` (`Command F8`) 切换断点 Toggle breakpoint


### `⇧ ⌘ F8 ` (`Command Shift F8`) 查看断点 View breakpoints

**[⬆ back to top](#table-of-contents)**


## General


### ![High][high_img]` Double ⇧ ` (`Shift Shift`) 到处搜索 Search everywhere

“到处搜索”弹出窗口允许在项目中以及在IDE中搜索任何内容。

可以搜索代码中的文件，符号，函数，变量，类或组件并快速导航到它们：

![Search everywhere](https://d3nmt5vlzunoa1.cloudfront.net/webstorm/files/2015/06/search-everything.png)



### ![High][high_img]` ⇧ ⌘ A ` (`Command Shift A`) 查找操作 Find Action

![Find Action](http://ofn6njofy.bkt.clouddn.com/Find_Action.png)


### ![High][high_img]`⌘ 0 ` ...`⌘ 9` 打开对应的工具窗 Open corresponding tool window

* `⌘ 1` 文件目录 
* `⌘ 2` 最爱
* `⌘ 6` TODO 列表
* `⌘ 7` 文件结构
* `⌘ 9` 版本控制
 

 
### `⇧ ⌘ F12 ` (`Command Shift F112`) 切换编辑器最大化 Toggle maximizing editor


### `⌥ ⇧ F ` (` Alt Shift F`) 添加到最爱 Add to Favorites


### `⌥ ⇧ I ` (`Alt Shift I`) 用当前配置文件检查当前文件 Inspect current file with current profile


### `⌃ §` , ``` ⌃ ` ``` 快速切换当前的模式 Quick switch current scheme


### ![High][high_img]`⌘ , ` (`Command ,`) 打开偏好设置 Open Preferences


### `⌃ ⇥ ` (`Control Tab`) 在工具窗和编辑器tab之间切换 Switch between tabs and tool window



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

**[⬆ back to top](#table-of-contents)**

## 后记 
* ![high_img][high_img]  意味着项目是 **推荐记住的**。

* 想要输入 代表mac键盘的特殊字符 或者是 emoji ，需要同时按住 `control command space` 

* 还有一个挺有用的快捷输入方式 那就是生成 JSdoc。 在 function 上边 先 输入 /** 接着按下回车

---

**[⬆ back to top](#table-of-contents)**


[low_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png
[medium_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png
[high_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png