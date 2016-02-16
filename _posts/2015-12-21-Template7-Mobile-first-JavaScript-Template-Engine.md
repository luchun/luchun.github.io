---
layout: post
title: Template7 Mobile-first JavaScript Template Engine
---
## Template7 移动优先的额模板引擎

因为是开发Swiper滑动插件的那个公司开发的，在javascript 周刊中推荐到了，所以看了看。


[网站地址](http://www.idangero.us/template7/#.VndmClV97IU)   
[Github](https://github.com/nolimits4web/Template7)

Template7是一个移动优先的javascript模板引擎，使用了[Handlebars](http://handlebarsjs.com/)近似的语法，它是[Framework7](http://www.idangero.us/framework7/#.VndgklV97IU)的默认模板引擎。它体积超小（压缩约6kb）,又超级快(在移动Safari中比Handlebars快2-3倍)。


### Download and install Template7

第一部下载我们需要的Template7文件：
 * 可以从Github仓库下载Template7
 * 也可以通过Bower安装，命令为 `$ bower install template7`
 
在下载的/安装的 包中我们需要 dist/folder文件夹下的 Javascript文件(.js) 

并将需要的脚本引入到我们的 HTML 文件中:
    
    <html>
        <head>
            ...
            <script src="path/to/template7.min.js"></script>
        </head>
        <body>
            ...
        </body>
    </html>      

### Templates

Template7 模板看起来像Handlebars模板，它是常规的HTML但嵌套了handlebars表达式：

    <div class="list-block">
      <ul>
        {{#each items}}
        <li class="item-content">
          <div class="item-inner">
            <div class="item-title">{{title}}</div>
          </div>
        </li>
        {{/each}}
      </ul>
    </div>

### Expressions syntax

Template7支持以下语法的表达式：

#### Variables:

* `{{title}}` - 普通变量.在当前上下文打印"title"变量值
* `{{../title}}` - 普通变量.在父上下文中打印"title"变量值 
* `{{../../title}}` - 普通变量.在父上下文的父上下文中打印"title"变量值 
* `{{this}}` - 普通变量.打印等于当前上下文的变量
* `{{person.name}}` - 普通变量.打印当前上下文中的"person"变量的"name"属性值
* `{{../person.name}}` - 普通变量.同样但是上下文是父上下文
* `{{@index}}` - 连接到额外的数据变量.这类数据变量可以在helpers中使用

#### Block expressions：

* `{{#each}}` - 开始块表达式

* `{{else}}` - 开始 “对立” 的块表达式 (如果支持)

* `{{/each}}` - 结束块表达式

* `{{#each reverse="true"}}` - 开始块表达式 通过传递 `reverse:true` 哈希参数

### Helpers

Helpers 能够作为普通表达式和块表达式：

* `{{join myArray delimiter=", "}}` - 在当前上下文执行 "join" helper并传递 "myArray" 参数和 `delimiter:', '` 哈希参数

### Compilation and Rendering

Template7 是一个全局的 Window 函数

首先我们需要传递string 模板，例如，我们保存在script标签下:

    <script id="template" type="text/template7">
        <p>Hello, my name is {{firstName}} {{lastName}}</p>
    </script>

现在我们要在javascript中转换，Template7将转换我们的模板string为普通的Javascript函数:

    var template = $$('#template').html();

    // compile it with Template7
    var compiledTemplate = Template7.compile(template);

    // Now we may render our compiled template by passing required context
    var context = {
        firstName: 'John',
        lastName: 'Doe'
    };
    var html = compiledTemplate(context);

现在，`html` 将包含：

    <p>Hello, my name is John Doe</p>

### Built-In Helpers

Template7 Helpers 像是 传递上下文中的预定义函数.

#### {{#each}}...{{else}}...{{/each}}

`{{#each}}` 是一个块级表达式，可以遍历数组或者对象属性来遍历items. 

下边附加的变量在 helper 中可用：

* `@index` - item 的键值，只在数组中。

* `@first` - 数组的第一个元素，只在数组中。

* `@last` - 数组的最后一个元素，只在数组中。

* `@key` - 当前对象的属性名称，只在对象中。

<table>
 <thead>
     <tr>
         <th>Template -></th>
         <th>Context -></th>
         <th>Output</th>
     </tr>
 </thead>
  <tbody>
      <tr>
          <td colspan="3" >
              Iterate through Array items
          </td>
      </tr>
      <tr>
          <td>
                ```<p>Here are the list of people i know:</p>```
                
                ```<ul>
                  {{#each people}}
                  <li>{{firstName}} {{lastName}}</li>
                  {{/each}}    
                </ul>```
          </td>
          <td>
              ```{
                  people : [
                    {
                      firstName: 'John',
                      lastName: 'Doe'
                    },
                    {
                      firstName: 'Mark',
                      lastName: 'Johnson'
                    },
                  ]
                }```    
          </td>
          <td>
              ```<p>Here are the list of people i know:</p>```
               
               
            ```<ul>
                  <li>John Doe</li>
                  <li>Mark Johnson</li>
                </ul>```    
          </td>
      </tr>
      <tr>
          <td>
              ```<p>Here are the list of people i know:</p>
                <ul>
                  {{#each people}}
                  <li>{{@index}}. {{this}}</li>
                  {{/each}}    
                </ul> ```      
          </td>
          <td>
              ```{
                  people : ['John Doe', 'Mark Johnson']
                }   ```   
          </td>
          <td>
              ```<p>Here are the list of people i know:</p>
                <ul>
                  <li>0. John Doe</li>
                  <li>1. Mark Johnson</li>
                </ul>  ```
          </td>
      </tr>
      <tr>
          <td colspan="3">
              Iterate through Object properties
          </td>
      </tr>
      <tr>
          <td>
             ``` <p>Car properties:</p>
                <ul>
                  {{#each props}}
                  <li>{{@key}}: {{this}}</li>
                  {{/each}}
                </ul>```
          </td>
          <td>
             ``` {
                  props: {
                    power: '150 hp',
                    speed: '200 km/h',
                  }
                }```
          </td>
          <td>
             ``` <p>Car properties:</p>
                <ul>
                  <li>power: 150 hp</li>
                  <li>speed: 200 kn/h</li>
                </ul>```
          </td>
      </tr>
      <tr>
          <td colspan="3">
              {{else}} expression.
          </td>
      </tr>
      <tr>
          <td>
              ```<p>Car properties:</p>
                <ul>
                  {{#each props}}
                  <li>{{@key}}: {{this}}</li>
                  {{else}}
                  <li>No properties</li>
                  {{/each}}
                </ul>```
          </td>
          <td>
              ```{
                  props: {
                    power: '150 hp',
                    speed: '200 km/h',
                  }
                }```
          </td>
          <td>
             ``` <p>Car properties:</p>
                <ul>
                  <li>power: 150 hp</li>
                  <li>speed: 200 kn/h</li>
                </ul>```
          </td>
      </tr>
      <tr>
          <td>
            ```  <p>Car properties:</p>
                <ul>
                  {{#each props}}
                  <li>{{@key}}: {{this}}</li>
                  {{else}}
                  <li>No properties</li>
                  {{/each}}
                </ul>```
          </td>
          <td>```{}```</td>
          <td>
              ```<p>Car properties:</p>
                <ul>
                  <li>No properties</li>
                </ul>```
          </td>
      </tr>
  </tbody>
</table>






























#### {{#if}}...{{else}}...{{/if}}

{{#if}} helper 当传递的上下文非 "false"（或"undefined"或"null"或""或"0"）是渲染内容，其他情况它渲染相反的内容，通过可选的传递到 {{else}}中的表达式：

<table>
    <thead>
        <th>
            Template ->
        </th>
        <th>
            Context ->
        </th>
        <th>
            Output
        </th>
    </thead>
    <tbody>
        <tr>
            <td>
                ```<a href="#" {{#if active}}class="active"{{/if}}>{{title}}</a>```
            </td>
            <td>
                	
                ```{
                  active: true,
                  title: 'Link',
                }```
            </td>
            <td>
                ```<a href="#" class="active">Link</a>```
            </td>
        </tr>
        <tr>
            <td colspan="3">
                {{else}} expression.
            </td>
        </tr>
        <tr>
            <td>
                ```<p>Hello, my name is {{name}}.</p>
                {{#if hobby}}
                <p>I have hobby</p>
                {{else}}
                <p>I don't have hobby</p>
                {{/if}}   ```   
            </td>
            <td>
                ```{
                  name: 'John Doe',
                  hobby: false
                }```
            </td>
            <td>
                ```<p>Hello, my name is John Doe.</p>
                <p>I don't have hobby</p>```
            </td>
        </tr>
    </tbody>
</table>



#### {{#unless}}...{{else}}...{{/unless}}

{{#unless}} helper 渲染内容当传递的上下文是 "false" (or "undefined" or "null" or "" or "0") , 其他情况下它渲染可选的传递到{{eles}}中的表达式：

<table>
    <thead>
        <tr>
            <th>
                Template ->
            </th>
            <th>
                Context ->
            </th>
            <th>
                Output
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
               ``` {{#with props}}
                <p>Car has {{power}} power and {{speed}} maximum speed</p>
                {{/with}}```
            </td>
            <td>
                ```{
                  props: {
                    power: '150 hp',
                    speed: '200 km/h',
                  }
                }```
            </td>
            <td>
                ```<p>Car has 150 hp power and 200 km/h maximum speed</p>```
            </td>
        </tr>
    </tbody>
</table>

#### {{#variableName}}...{{/variableName}}

当你在表达式上下文中传递块表达式，如果上下文是Array 它将像 {{#each}}一样工作，如果是Object 它将像{{#with}}一样工作：

<table>
    <thead>
        <tr>
            <th>
                Template ->
            </th>
            <th>
                Context ->
            </th>
            <th>
                Output
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                ```<ul>
                  {{#people}}
                  <li>{{name}} - {{age}} years old</li>
                  {{/people}}
                </ul>```
            </td>
            <td>
                ```{
                  people: [
                    {
                      name: 'John Doe',
                      age: 18
                    },
                    {
                      name: 'Mark Johnson',
                      age: 21
                    }
                  ]  
                }```
            </td>
            <td>
               ``` <ul>
                  <li>John Doe - 18 years old</li>
                  <li>Mark Johnson - 21 years old</li>
                </ul>```
            </td>
        </tr>
        <tr>
            <td>
              ```  {{#props}}
                <p>Car has {{power}} power and {{speed}} maximum speed</p>
                {{/props}}```
            </td>
            <td>
               ``` {
                  props: {
                    power: '150 hp',
                    speed: '200 km/h',
                  }
                }```
            </td>
            <td>
             ```   <p>Car has 150 hp power and 200 km/h maximum speed</p>```
            </td>
        </tr>
    </tbody>
</table>


#### {{join delimiter=""}}

这个helper 会将使用传递的符号将Array连接为字符串


<table>
    <thead>
        <tr>
            <th>
                Template ->
            </th>
            <th>
                Context ->
            </th>
            <th>
                Output
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                ```<h3>"{{title}}" TV Show</h3>
                    <p>Was released in year {{year}}</p>
                    <p>Genres: {{join genres delimiter=", "}}</p>```
            </td>
            <td>
                ```{
  title: 'Friends',
  year: 2001,
  genres: ['comedy', 'drama']
}```
            </td>
            <td>
               ```<h3>"Friends" TV Show</h3>
<p>Was released in year 2001</p>
<p>Genres: comedy, drama</p>```
            </td>
        </tr>
       
    </tbody>
</table>

#### {{escape}}

该helper返回转译后的HTML 字符串.它只转译以下字符 : ` < > " & `


<table>
    <thead>
        <tr>
            <th>
                Template ->
            </th>
            <th>
                Context ->
            </th>
            <th>
                Output
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                ```<h1>{{title}}</h1>
<p>{{escape body}}</p>```
            </td>
            <td>
                ```{
  title: 'Paragraphs',
  body: 'We need to use <p> tags to add paragraphs in HTML',
}```
            </td>
            <td>
               ```<h1>Paragraphs</h1>
<p>We need to use &lt;p&gt; tags to add paragraphs in HTML</p>
```
            </td>
        </tr>
      
    </tbody>
</table>

#### {{js "expression"}}

这个行内 helper 允许执行一些简单的Javascript在模板中修改/检查 上下文：

<table>
    <thead>
        <tr>
            <th>
                Template ->
            </th>
            <th>
                Context ->
            </th>
            <th>
                Output
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                ```<h3>{{title}}</h3>
<p>Price: ${{js "this.price * 1.2"}} </p>
<p>{{js "this.inStock ? 'In Stock' : 'Not in stock'"}} </p>```
            </td>
            <td>
                ```{
  title: 'iPhone 6 Plus',
  price: 1000,
  inStock: true
}```
            </td>
            <td>
               ```<h3>iPhone 6 Plus</h3>
<p>Price: $1200</p>
<p>In stock</p>
```
            </td>
        </tr>
      
    </tbody>
</table>

#### {{#js_compare "expression"}}...{{/js_compare}}

块级 helper 来简单比较上下文变量.它渲染内容当 Javascript表达式非"false"时(or "undefined" or "null" or "" or "0")，其他情况它渲染{{else}}中的表达式


<table>
    <thead>
        <tr>
            <th>
                Template ->
            </th>
            <th>
                Context ->
            </th>
            <th>
                Output
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                ```<h3>{{title}}</h3>
<p>Price: ${{price}} </p>
<p>{{#js_compare "color === 'white' && memory > 16"}}Not in stock{{else}}In stock{{/js_compare}} </p>```
            </td>
            <td>
                ```{
  title: 'iPhone 6 Plus',
  price: 1000,
  inStock: true
}```
            </td>
            <td>
               ```<h3>iPhone 6 Plus</h3>
<p>Price: $1000</p>
<p>Not in stock</p>
```
            </td>
        </tr>
         <tr>
            <td><p>{{#js_compare "a === b"}}A equals to B{{else}}A not equal to B{{/js_compare}} </p>```
            </td>
            <td>
                ```{
  a: 5,
  b: 34
}```
            </td>
            <td>
               ```<p>A not equal to B</p>
```
            </td>
        </tr>
    </tbody>
</table>

注意在 js 和 js_compare helper 中你应当使用 this.variableName 而不是 variableName

### Using Custom Helpers

Template7 允许通过下边的方式来注册自定义helpers:

    Template7.registerHelper(name, helper)

     * name - string - helper name
     * helper - function - helper function to handle passed context
     
Helper 函数可以接收多个需要的参数，如上下文，字符串和哈希数据。

下边是一个注册“{{#if}}”的helper的例子:

    Template7.registerHelper('if', function (condition, options) {
      // "this" in function context is equal to the expression execution context
      // "condition" argument contains passed context/condition
      /*
        @options contains object with the wollowing properties and methods:
        "hash" - contains passed hash object with parameters
        "fn" - method to pass helper block content further to compilier
        "inverse" - method to pass helper block inverse ({{else}}) content further to compilier
        "data" - contains additional expression data, like @index for arrays or @key for object
      */

      // First we need to check is the passed context is function
      if (typeof condition === 'function') condition = condition.call(this);

      // If context condition
      if (condition) {
        // We need to pass block content further to compilier with the same context and the same data:
        options.fn(this, options.data);
      }
      else {
        // We need to pass block inverse ({{else}}) content further to compilier with the same context and the same data:
        options.inverse(this, options.data);
      }
    }); 
    
或者是 {{join}} helper:

    Template7.registerHelper('join', function (arr, options) {
      // First we need to check is the passed arr argument is function
      if (typeof arr === 'function') arr = arr.call(this);

      /* 
        Passed delimiter is in the options.hash object:
        console.log(options.hash) -> {delimiter: ', '}
      */

      // And return joined array
      return arr.join(options.hash.delimiter);
    });      
    
 我们可以创建helper来创建 Franework7 的列表块链接:
 
    {{link url title target="_blank"}}
    
    Template7.registerHelper('link', function (url, title, options){
      var ret = '<li>' +
                  '<a href="' + url + '" class="item-content item-link" target="' + options.hash.target + '">' +
                    '<div class="item-inner">' +
                      '<div class="item-title">' + title + '</div>' +
                    '</div>' +
                  '</a>' +
                '</li>';
      return ret;
    });
    
<table>
    <thead>
        <tr>
            <th>
                Template ->
            </th>
            <th>
                Context ->
            </th>
            <th>
                Output
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                ```<div class="list-block">
  <ul>
    {{#each links}}
    {{link url title target="_blank"}}
    {{/each}}    
  </ul>
</div>```
            </td>
            <td>
                ```{
  links: [
    {
      url: 'http://google.com',
      title: 'Google'
    },
    {
      url: 'http://idangero.us',
      title: 'iDangero.us'
    },
  ]
}```
            </td>
            <td>
               ```<div class="list-block">
  <ul>
    <li>
      <a href="http://google.com" target="_blank" class="item-link item-content">
        <div class="item-inner">
          <div class="item-title">Google</div>
        </div>
      </a>
    </li>
    <li>
      <a href="http://idangero.us" target="_blank" class="item-link item-content">
        <div class="item-inner">
          <div class="item-title">iDangero.us</div>
        </div>
      </a>
    </li>
  </ul>
</div>
```
            </td>
        </tr>
    
    </tbody>
</table>

### Remove Custom Helpers

Template7 允许通过以下方法移除自定义helper:

    Template7.unregisterHelper(name)

    name - string - helper name

### Global Context

Template7 同样支持全局上下文，它可以在任意上下文中访问到.

我们可以在 `Template7.global` 属性中指定它：

    Template7.global = {
        os: 'iOS',
        browser: 'Chrome',
        username: 'johndoe',
        email: 'john@doe.com'
    };
    
在模板中连接它我们需要使用`{{@global}}` 变量:

    <p>Hello, {{@global.username}}. Your email is {{@global.email}}</p>

### Access To Root Context

有些时候我们需要连接到传递给模板的根上下文.
这时候我们需要使用`{{@root}}`变量。
当我们深入多层上下文时很有用：

    {
        persons: [
            {
                name: 'John',
                hobby: ['Cars', 'Food']
            },
            {
                name: 'Kyle',
                hobby: ['Travel', 'Puzzles']
            },

        ],
        showHobby: true
    }    

    {{#each persons}}
    <h2>{{name}}</h2>
    <h3>Hobby:</h3>
    {{#if @root.showHobby}}
        <ul>
            {{#each hobby}}
                <li>{{this}}</li>
            {{/each}}
        </ul>
    {{/if}}
    {{/each}} 
    
### Partials

Template7 允许通过partials来复用模板，Partials是指可以被其他模板调用的正常Template7模板。 

我们可以注册 /解除注册 partials 通过下边的方法:

    Template7.registerPartial(name, template) - register partial

    name - string - partial name
    helper - string - partial template


    Template7.unregisterPartial(name) - unregister partial

    name - string - partial name
    
之后我们就可以使用特殊helper `{{> "partialName"}}` 来使用partials

Template:

    <ul class="users">
        {{#each users}}
        {{> "user"}}
        {{/each}}
    </ul>
    <ul class="admins">
        {{#each admins}}
        {{> "user"}}
        {{/each}}
    </ul>
    
Register partial:

    Template7.registerPartial('user', '<li><h2>{{firstName}} {{lastName}}</h2><p>{{bio}}</p></li>')
    
Apply to the template this context:

    {
    users: [
        {
            firstName: 'John',
            lastName: 'Doe',
            bio: 'Lorem ipsum dolor'
        },
        {
            firstName: 'Jane',
            lastName: 'Doe',
            bio: 'Donec sodales euismod augue'
        }
    ],
    admins: [
        {
            firstName: 'Mike',
            lastName: 'Doe',
            bio: 'Lorem ipsum dolor'
        },
        {
            firstName: 'Kate',
            lastName: 'Doe',
            bio: 'Donec sodales euismod augue'
        }
    ]
    }

And we will get the following output:

    <ul class="users">
    <li>
        <h2>John Doe</h2>
        <p>Lorem ipsum dolor</p>
    </li>
    <li>
        <h2>Jane Doe</h2>
        <p>Donec sodales euismod augue</p>
    </li>
    </ul>
    <ul class="admins">
        <li>
            <h2>Mike Doe</h2>
            <p>Lorem ipsum dolor</p>
        </li>
        <li>
            <h2>Kate Doe</h2>
            <p>Donec sodales euismod augue</p>
        </li>
    </ul>    
    
