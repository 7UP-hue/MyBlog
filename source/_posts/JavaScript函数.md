---
title: JavaScript函数
date: 2022-07-24 21:47:35
tags: JavaScript
categories: JavaScript学习
---
我对JavaScript对象的一些简单理解
<!-- more -->
### Function类型
#### 函数表达方式
* 函数声明
  ```js
  function sum (num1, num2) {
    return num1 + num2;
  }
  ```
* 函数表达式
  ```js
  var sum = function(num1, num2) {
    return num1 + num2;
  }
  ```
* 二者区别
  ```js
  alert(sum(10, 10));
  function sum (num1, num2) {
    return num1 + num2;
  }
  ```
  在代码开始执行之前，解析器会将函数声明提到源代码的顶部，因此，即使声明函数的代码在调用它的代码的后面，也能正确执行。而如果在上面的例子中把函数声明换成函数表达式则会在执行期间导致错误
#### 作为值的函数
因为ECMAScript中的函数本身就是变量，所以函数也可以作为值来使用。
  ```js
  function com(propertyName) {
    return function(object1, object2) {
      // object1[propertyName] 等价于 object1.propertyName
      var value1 = object1[propertyName];
      var value2 = object2[propertyName];
      return value1 > value2;
    }
  }
  ```
  这样我们就自定义了一个排序规则，可以将这个规则作为参数传给sort函数
#### 函数内部属性
函数内部有两个特殊的对象：arguments和this
* arguments
  一个类数组对象，包含着传入函数中的所有参数。
* this
  this引用的是函数执行的环境对象——或者也可以说是this值
  ```js
  window.color = "red";
  var o = { color: "blue" };
  function sayColor() {
    alert(this.color);
  }
  sayColor(); //red
  o.sayColor = sayColor;
  o.sayColor(); //blue
  ```
#### 函数属性和方法
每个函数都包含两个属性：length和prototype
* length
  表示函数希望接受手的命名参数的个数
* prototype
  对于ES中的引用类型而言，prototype是保存他们所有实例方法的真正所在

每个函数都包含两个非继承而来的方法，apply()和call()。这两个方法的用途都是在**特定的作用域**下调用函数，实际上等于设置函数体内的this对象的值。
* apply
  apply()方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。第二个参数可以是Array的实例，也可以是arguments对象
  例如：
  ```js
  function sum(num1, num2) {
    return num1 + num2;
  }
  function callSum1(num1, num2) {
    return sum.apply(this, arguments); // 传入arguments对象
  }
  function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]); //传入数组
  }
  alert(callSum1(10, 10)); // 20
  alert(callSum2(10, 10)); // 20
  ```
* call
  call()方法与apply()方法的作用相同，它们的区别仅在于接收参数的方式不同
apply()和call()真正强大的地方是能够扩充函数赖以运行的作用域
  ```js
  window.color = "red";
  var o = { color: "blue" };
  function sayColor() {
    alert(this.color);
  }
  sayColor(); //red
  
  sayColor(this); //red
  sayColor(window); //red
  sayColor(o); //blue
  ```