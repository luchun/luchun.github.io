---
layout: post
title: Eslint忽略npm link 文件夹
---
今天在一个由vue-cli 生成的项目中，通过npm link 引用了另一个文件夹，项目执行起来后就开始报错，记录下处理过程
<!-- more -->

```
 error  in C:/web_project/packages/contract/lib/clpContract.umd.js

Module build failed (from ./node_modules/eslint-loader/index.js):
Error: Failed to load plugin 'prettier' declared in '..\..\packages\contract\.eslintrc.js » @vue/eslint-config-prettier': Cannot find module 'eslint-plugin-prettier'
Require stack:
- C:\web_project\micro_frontend\dapeng\__placeholder__.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:980:15)
    at Function.resolve (internal/modules/cjs/helpers.js:78:19)

```
我只想使用`packages/contract/lib/clpContract.umd.js` ，它却要在里边执行eslint。
这是路径引起的问题，vue-cli默认的eslint配置会忽略`/node_modules/`，但是npm link 把实际项目目录暴露了出来，这个目录不在排除范围内。

解决思路：
1. 先用 `vue inspect` 审查一下vue的配置

```
 /* config.module.rule('eslint') */
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/,
          'C:\\web_project\\micro_frontend\\dapeng\\node_modules\\@vue\\cli-service\\lib',
        ],
        use: [
          {
            loader: 'C:\\web_project\\micro_frontend\\dapeng\\node_modules\\eslint-loader\\index.js',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue'
              ],
              cache: true,
              cacheIdentifier: '30ba96d9',
              emitWarning: false,
              emitError: false,
              eslintPath: 'C:\\web_project\\micro_frontend\\dapeng\\node_modules\\eslint',
              formatter: undefined
            }
          }
        ]
      }
    ]
  },

```

我们在vue.config.js里增加排除文件
```
  chainWebpack: (config) => {
    //链式配置
    config.module
        .rule('eslint')
        .exclude
        .add(/packages/)
        .end()
  },
```

再执行就可以了
