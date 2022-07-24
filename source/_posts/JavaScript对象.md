---
title: JavaScript对象
date: 2022-07-24 21:47:23
tags: JavaScript
categories: JavaScript学习
---
我对JavaScript对象的一些简单理解
<!-- more -->
### 理解对象
#### 属性类型
ES中有两种属性：数据属性和访问器属性
1. 数据属性
  数据属性包含一个数据值的位置。在这个位置可以读取和写入值。数据属性有4个描述其行为的特性。
  * [Configurable]：表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性和，或者能否把属性修改为访问器属性。默认值为true
  * [Enumerable]：表示能否通过for-in循环返回属性。默认值为true
  * [Writable]：表示能否修改属性的值。默认值为true
  * [Value]：包含这个属性的数据值。默认值为undefined
  要修改属性默认的特性，必须使用ES5的Object.defineProperty()方法
  例如：
    ```js
    var person = {};
    Object.defineProperty(person, "name", {
      writable: false, //不能修改属性的值
      value: "Nicholas"
    });
    alert(person.name); //Nicholas
    person.name = "Greg";
    alert(person.name); //Nicholas
    ```
2. 访问器属性
  访问器属性不包含数据值，它有如下4个特性
  * [Configurable]：表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性和，或者能否把属性修改为访问器属性。默认值为true
  * [Enumerable]：表示能否通过for-in循环返回属性。默认值为true
  * [Get]：在读取属性时调用的函数。默认值为undefined
  * [Set]：在写入属性时调用的函数。默认值为undefined
  
### 创建对象
#### 原型模式
我们创建的每个函数都有一个prototype（原型）属性，这个属性是一个指针，指向一个对象，而这个对象的用途就是包含可以由特定类型的所有实例共享的属性和方法。
prototype就是通过调用构造函数而创建的那个对象实例的原型对象。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。
### 继承
ES只支持实现继承，而且其实现继承主要是依靠原型链来实现的
#### 原型链
其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。
构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。假如我们让原型对象等于另一个类型的实例，则此时的原型对象将包含一个指向另一个原型的指针，假如另一个原型优又是另一个类型的实例，那么上述关系仍然成立，如此层层递进，就构成了实例与原型的链条。这就是所谓原型链的基本概念。
```js
function SuperType() {
  this.property = true;
}
SurperType.prototype.getSuperValue = function() {
  return this.property;
};
function SubType() {
  this.subproperty = false;
}
// 继承了SuperType
SuperType.prorotype = new SuperType();

SubType.prototype.getSubValue = function() {
  return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue()); //true