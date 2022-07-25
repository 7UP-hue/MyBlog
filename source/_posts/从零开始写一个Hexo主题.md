---
title: 从零开始写一个Hexo主题
date: 2022-07-22 16:53:31
tags: 
- Hexo
- CSS
categories: Tech
---
介绍：从零开始写一个hexo主题的步骤
<!-- more -->
#### 前言
写作目的：
作为一名前端学习者，想试一下自己写一个Hexo主题
在这里我将记录自己的学习过程以及遇到的问题和解决方式
好像我最初搭建这个博客平台的目的就不是写博客，而是为了做一个自己的、好看的网站，但是在网上看了一圈，大部分博客网站都是运用各种现有的主题制作的，感觉没有很大的学习价值，于是我决定，自己也学着写一个主题

#### 目录结构
在`thems`目录下新建一个`theme-name`(你的主题名字）文件夹，一个主题主要有以下结构：
```
.
├── _config.yml  #主题的配置文件
├── languages    #语言文件夹
├── layout       #布局文件夹，用来存放主题的模板文件
├── scripts      #脚本文件夹
└── source       #资源文件夹，除了模板外的Asset，例如CSS、JS文件等
```
#### 结构模板
大部分博客网站由：顶部导航栏、中间内容区域以及底部信息展示区域三大部分组成。因此我们在这里先设置我们网站的头部以及底部样式。
在`layout`目录下新建`_partial`目录，添加`head.ejs`，`header.ejs`以及`fonter.ejs`文件

##### `layout/_partial/head.ejs`代码:
```ejs
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
  <title>标题</title>
</head>
```

##### `layout/_partial/header.ejs`代码:
```ejs
<header>我是导航栏</header>
```

##### `layout/_partial/footer.ejs`代码：
```js
<footer>我是底部信息</footer>
```
在`layout`中创建`layout.ejs`，`layout.ejs`文件是通用的布局文件模板，我们在后面新增的`ejs`文件都会继承`layout.ejs`，并将其内容填充到`body`中。
##### `layout/layout.ejs`代码：
```ejs
<!DOCTYPE html>
<html>
  <%- partial('_partial/head') %>
  <body>
    <div class="container">
      <%- partial('_partial/header') %>
      <%- body %>
      <%- partial('_partial/footer') %>
    </div>
  </body>
</html> 
```
#### 首页
首页是我们网站加载完毕后的第一个页面
在`layout`中创建`index.ejs`文件,`index.ejs`将会继承`layout.ejs`布局模板生成HTML文件。
##### `layout/index.ejs`代码：
```ejs
<h1>Hello World</h1>
```
将这些文件全部添加完后我们的网站将会是这样
<img src="https://img-blog.csdnimg.cn/b0ab11db523247a393296d45e3fb184f.png" width=700>

#### 编写导航栏和底部信息
##### 编写`layout/_partial/head.ejs`信息
```ejs
<head>    
  <meta http-equiv="content-type" content="text/html; charset=utf-8">    
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">    
  <title>
    <%= config.title %>
  </title>
</head>
```
使用了`config`全局变量，该变量包含的是站点配置（即站点根目录下`_config.yml`中的配置）。
除此之外还有`theme`变量，该变量是主题配置（即主题目录下`_config.yml`中的配置）。
其他配置参照[Hexo](https://hexo.io/zh-cn/docs/variables)文档
##### 编写导航栏部分，`layout/_partial/header.ejs`
```ejs
<header class="header">
  <div class="title">
    <a href="<%= url_for() %>" class="logo">
      <%= config.title %>
    </a>
  </div>
  <nav class="navbar">
    <ul class="menu">
      <% for (name in theme.menu) { %>
        <li class="menu-item">
          <a href="<%- url_for(theme.menu[name]) %>" class="menu-item-link"><%= name %></a>
        </li>
      <% } %> 
    </ul>
  </nav>
</header>
```
在这里我们使用`<% for (name in theme.menu) { %>`遍历我们在`_config.yml`中设置的menu信息
##### 编辑底部信息部分，`layout/_partial/footer.ejs`
```ejs
<footer>
  <p>
    Theme is 
    <a href="/" target="_blank">
      Theme-name
    </a> 
    by 
    <a href="<%= config.url %>" target="_blank">
      <%= config.author %>
    </a>
  </p>    
  <p>
    Powered by 
    <a href="https://hexo.io/" target="_blank" rel="nofollow">
      hexo
    </a> 
    &copy; <%- date(Date.now(), 'YYYY') %>
  </p>
</footer>
```
注意这里的`Theme-name`需要更换为你的主题名字

到这里我们就得到了一个包含导航栏和底部信息的简单页面
![img](https://img-blog.csdnimg.cn/54f093753b4b4676b0be9d8d4c98741f.png)
#### 文章列表
接下来完善首页，使其能显示文章列表。
这里我们要用到`page`变量的`posts`属性拿到文章的数据集合。
##### 编辑`index.ejs`文件
```ejs
<section class="posts">
  <% page.posts.each(function (post) { %>
    <article class="post">
      <div class="post-title">
        <a class="post-title-link" href="<%- url_for(post.path) %>">
          <%= post.title %>
        </a>
      </div>
      <div class="post-content">
        <%- post.content %>
      </div>
      <div class="post-meta">
        <span class="post-time">
          <%- date(post.date, "YYYY-MM-DD") %>
        </span>
      </div>
    </article>
  <% }) %>
</section>
```
由于首页显示文章内容时使用的是`post.content`，即文章的全部内容，有时候我们并不想再首页显示全部内容，这时我们可以将`post.content`改成`post.excerpt`
`post.excerpt`表示文章的摘录部分。我们在文章中添加一个`<!--more-->`标记，之后，`post.excerpt`将会截取标记之前的内容。
#### 添加样式
到这里，我们的框架以及大致内容显示已经完成了，但是由于没有设置样式，现在我们的网站还很丑。于是终于到了最激动人心的一刻了！我们开始添加css样式文件来美化我们的页面。
我们只需要将样式文件放到`css`文件夹中。Hexo在生成文件时会将`source`中的文件赋值到生产的`public`文件夹中，并将`styl`文件编译成`css`文件。
在`source`文件夹中新建`css`文件夹，在 `css` 文件夹中创建 `style.styl`，编写一些基础的样式，并把所有样式 `import`到这个文件。所以最终编译之后只会有 `style.css` 一个文件。创建`_partial/header.styl` 与 `_partial/index.styl` 存放页面导航以及文章的样式，并且在 `style.styl` 中 `import` 这两个文件。
##### 在`style.styl` 中 `import`
接下来我们只需要编辑样式文件，自由发挥即可。
示例：
##### `_partial/header.styl`：
```ejs
.header {
  margin-top: 30px;
}
```
##### `_partial/index.styl`：
```ejs
//代码
```
##### `style.styl`：
```ejs
@import "_partial/header";
@import "_partial/index";
```

最后我们需要将样式文件添加到页面中，这里使用了辅助函数`css()`
##### 编辑`layout/_partial/head.ejs`：
```ejs
<head>    
  <meta http-equiv="content-type" content="text/html; charset=utf-8">    
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">    
  <title>
    <%= config.title %>
  </title>
  <!-- 添加这一行即可 -->
  <%- css('css/style.styl') %>
</head>
```
#### 添加文章详情页
新建`post.ejs`
```ejs
<article class="post">
  <div class="post-title">
    <h2 class="title">
      <%= page.title %>
    </h2>
  </div>
  <div class="post-meta">
    <span class="post-time">
      <%- date(page.date, "YYYY-MM-DD") %>
    </span>
  </div>
  <div class="post-content">
    <%- page.content %>
  </div>
</article>
```
#### 添加归档页
新建`archive.ejs`
```ejs
<section class="archive">
  <ul class="post-archive">
    <% page.posts.each(function (post) { %>
    <li class="post-item">
      <span class="post-date">
        <%= date(post.date, "YYYY-MM-DD") %>
      </span>
      <a class="post-title" href="<%- url_for(post.path) %>">
        <%= post.title %>
      </a>
    </li>
    <% }) %>
  </ul>
</section>
```
#### 添加分类页
新建自定义页面模板`page.ejs`
```ejs
<% if (is_current(theme.menu.categories)) { %>
  <%- partial('_partial/category') %>
<% } else if (is_current(theme.menu.tags)) { %>
  <%- partial('_partial/tag') %>
<% } else { %>
  <%- partial('_partial/custom') %>
<% } %>
```
新建`_partial/category.ejs`
```ejs
<section class="archive">
  <ul class="post-archive">
    <% site.categories.each(function (category) { %>
      <span>
        <%= category.name %>
      </span>
      <% category.posts.forEach(function(post) { %>
      <li class="post-item">
        <span class="post-date">
          <%= date(post.date, "YYYY-MM-DD") %>
        </span>
        <a class="post-title" href="<%- url_for(post.path) %>">
          <%= post.title %>
        </a>
      </li>
      <% }) %>
    <% }) %>
  </ul>
</section>
```
#### 添加标签页
新建`_partial/tag.ejs`
```ejs
<section class="archive">
  <ul class="post-archive">
    <% site.tags.each(function (tag) { %>
      <span>
        <%= tag.name %>
      </span>
      <% tag.posts.forEach(function(post) { %>
        <li class="post-item">
          <span class="post-date">
            <%= date(post.date, "YYYY-MM-DD") %>
          </span>
          <a class="post-title" href="<%- url_for(post.path) %>">
            <%= post.title %>
          </a>
        </li>
      <% }) %>
    <% }) %>
  </ul>
</section>
```
#### 添加自定义页面
新建`_partial/custom.ejs`
```ejs
<article class="post">
  <div class="post-title">
    <h2 class="title">
      <%= page.title %>
    </h2>
  </div>
  <div class="post-meta">
    <span class="post-time">
      <%- date(page.date, "YYYY-MM-DD") %>
    </span>
  </div>
  <div class="post-content">
    <%- page.content %>
  </div>
</article>
```
#### 关于代码高亮
不知道是之前误操作还是怎么的，我发现我的博客内容页中代码高亮失效了。在网上百度了一翻，总算是解决了。
一般情况下`hexo`提供两种高亮方式，`highlight.js`与`prism.js`，这里我选择的是`prism.js`
##### 下载prism
前去官网[https://prismjs.com/download.html](https://prismjs.com/download.html)选择喜欢的主题以及需要的语言，点击下面的两个按钮即可下载`prism.js`以及`prism.css`两个文件
点击预览并选择主题
<img src="https://img-blog.csdnimg.cn/17ad3520647242c4bcb12770b8de89e6.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAc21pbGUteWFu,size_20,color_FFFFFF,t_70,g_se,x_16" width=700>

选择自己需要的语言
<img src="https://img-blog.csdnimg.cn/7482bc20beb0426e80996a804a5b777a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAc21pbGUteWFu,size_20,color_FFFFFF,t_70,g_se,x_16" width=700>

选择自己需要的插件
<img src="https://img-blog.csdnimg.cn/be356de7a8ab442591af5b53e5d2f35a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAc21pbGUteWFu,size_20,color_FFFFFF,t_70,g_se,x_16" width=700>

#### 引入
下载得到css和js文件后分别放到主题的`source/js`和`source/css`目录下
在`header.ejs`中引入这两个文件
```ejs
<%- css('css/prism')  %> 
<%- js('js/prism.js') %>
```
#### 更改默认配置
```yml
# _config.yml
highlight:
  enable: true ##enable表示是否启用
  auto_detect: false
  line_number: true
  tab_replace: ''
  wrap: true
  hljs: false
prismjs:
  enable: false
  preprocess: true
  line_number: true
  tab_replace: ''
```
以上为`Hexo`的默认配置，`highlight`默认开启，因此我们需要将`highlight`关闭，开启`prismjs`
```yml
# _config.yml
highlight:
  enable: false
  # line_number: true
  # auto_detect: false
  # tab_replace: ''
  # wrap: true
  # hljs: false
prismjs:
  enable: true
  preprocess: true
  line_number: true
  tab_replace: ''
```
更改后
这时我们再运行`hexo clean`，`hexo g`，`hexo s`重启项目即可看到代码高亮成功

参考文章：
[https://blog.csdn.net/smileyan9/article/details/124333810](https://blog.csdn.net/smileyan9/article/details/124333810)
[https://www.w3cschool.cn/hexodocument/hexodocument-6m483cn4.html](https://www.w3cschool.cn/hexodocument/hexodocument-6m483cn4.html)

#### 部署时遇到的坑

#### 关于链接
在本地运行时，我的`<a></a>`链接默认都是在当前窗口打开，但是部署到github上后，它们就变成了在新窗口打开链接
因此需要手动给每个`a`标签设置`target="_self`