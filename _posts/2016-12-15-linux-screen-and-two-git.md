---
layout: post
title: Linux screen & two remote git
---

一直在命令行中跑 node ,当关闭bash之后，任务就会停止。今天在发布项目到 aws时我就考虑，一旦我关闭了ssh ，不就停止了吗。
找了一下，linux 有个 screen 命令，只要在 npm前加个 screen ,就会新开一个screen，并且只要任务没结束，它就不会被关闭。
当再次登录到aws后，执行 `screen -ls` 就可以显示所有正在运行的screen, 执行 `screen -r ` 加上要切换到的screen 端口，就可以切换过去。
 
 
---

 另一个问题是，如果一个项目 有 两个 git 源。比如说我的项目使用的是公司内部的gitlib，我在家想同步是不可能的，在aws 的ssh里想git clone 也是不行的
 所以我用了bitbucket这个在线仓储。
 其实一个项目可以有多个 remote,只要不重名就行了（名字默认是 `origin`）
    
    git remote add aws https://luchun@bitbucket.org/luchun/md.git
    git push aws  master 
 
 这样我给bitbucket起了一个aws的名字就好了。
 使用sourcetree提交的时候，可以选择提交到哪一个远端仓库.
    
    
 

	