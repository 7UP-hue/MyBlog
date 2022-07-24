---
title: JavaScript事件
date: 2022-07-24 21:47:57
tags: JavaScript
categories: JavaScript学习
---
我对JavaScript对象的一些简单理解
<!-- more -->
### 事件流
事件流描述的是从页面中接收事件的顺序
#### 1.事件冒泡
事件开始时由最具体的元素（文档中嵌套层次最深的那个结点）接收，然后逐级向上传播到不具体的结点（文档）。即自下而上传播
``` html
<!DOCTYPE html>
<html>
<head>
  <title>xxx</title>
</head>
<body>
  <div id="myDiv">Click Me</div>
</body>
</html>
```
在上面的HTML页面中，如果点击了页面中的\<div>元素,那么这个click的传播顺序如下：
1）\<div>
2）\<body>
3）\<html>
4）document
#### 2.事件捕获
事件捕获的思想是不太具体的结点应该更早接收到事件，而最具体的事件应该最后接收到事件。即事件自下而上传播
#### 3.DOM事件流
包括三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段
### 事件处理程序
#### 1.HTML事件处理程序
某个元素支持的每种使劲按，都可以使用一个与相应事件处理程序同名的HTML特性来指定。在下面的代码中，点击按钮就会调用showMsg函数。
```html
<script>
  function showMsg() {
    alert("Hello world!");
  }
</script>
<input type="button" onclick="showMsg" />
```
#### 2.DOM0级事件处理程序
通过JavaScript指定事件处理程序的传统方式，就是将一个函数赋值给一个事件处理程序属性。
```js
var btn = document.getElementById("myBtn")
btn.onclick = function() {
  alert(this.id)
}
```
#### 3.DOM2级事件处理程序
“DOM2级事件”定义了两个方法，用于处理指定和删除事件处理程序的操作：addEventListener()和removeEventListener()
```js
var  btn = document.getElementById("myBtn")
btn.addEventListener("onclick", function(){
  alert(this.id)
}, false) 
//最后这个布尔值参数如果是true，表示在捕获阶段调用事件处理程序；如果是false，表示在冒泡阶段调用事件处理程序。
```
通过addEventListener()添加的事件处理程序只能通过removeEventListener()来移除；移除时传入的参数与添加时使用的参数相同，这也意味着通过addEventListener()添加的匿名函数将无法移除。
```js
var btn = document.getElementById("myBtn")
btn.addEventListener("onclick", function(){
  alert(this.id)
}, false)
// 这里省略了其他代码
btn.removeEventListener("click", function(){ // 没有用
  alert(this.id)
}, false)
// 上面的代码无法移除btn上的点击事件

var btn = document.getElementById("myBtn")
var handler = function() {
  alert(this.id)
}
btn.addEventListener("click", handler, false);
// 这里省略了其他代码
btn.removeEventListener("click", handler, false);
// 有效！
