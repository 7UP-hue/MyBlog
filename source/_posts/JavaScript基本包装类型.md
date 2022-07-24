---
title: JavaScript基本包装类型
date: 2022-07-24 21:48:13
tags: JavaScript
categories: JavaScript学习
---
我对JavaScript对象的一些简单理解
<!-- more -->
### 基本包装类型
ES提供了3个特殊的引用类型：Boolean、Number和String。这些类型与其他的引用类型相似，但同时也具有与各自的基本类型相应的特殊行为。每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们能够调用一些方法来操作这些数据
```js
var s1 = "shjoeih yowijpog";
var s2 = s1.substring(2); //按理说s1是一个基本数据类型，是没有方法的
```
在读取一个基本类型值时，后台都会自动完成下列处理
1. 创建String类型的一个实例
2. 在实例上调用指定的方法
3. 销毁这个实例

可以将以上三个步骤想想成执行了下面的代码
```js
var s1 = new String("shjoeih yowijpog");
var s2 = s1.substring(2);
s1 = null;
```
引用类型和基本包装类型的主要区别就是对象的生存期。使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前那一段时间都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁
```js
var s1 = "hsoeith w";
s1.color = "red";
alert(s1.color); //undefined
```
第二行创建的String对象在执行第三行代码时以及被销毁了。