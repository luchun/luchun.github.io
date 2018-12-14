---
layout: post
title: TypeScript Basic
---

最近的一个公司项目中，我给项目加上了TypeScript。
目前项目有三名前端，2019年将会增加更多的前端，更多的项目。
一方面我们使用ESLint控制代码风格，但是我觉得ESLint越来越不够了。所以明年所有前端项目，我都将要求使用TypeScript。

Use types in TypeScript

````ecmascript 6
const myVar: string = 'hello';
type myObjectType = { a: string; b: number; }
class MyClass {
myProp: string;
/* ... */
}
````

## 标准类型
TypeScript定义了和JavaScript一样的标准类型，同时新增额 `enum`, `any`, `never` 三种新的标准类型。

* `never`: 表示该类型的值永远不会产生，它是永不返回的函数的返回值。它是与 `any`完全相反的一个值。
* `any`: 表示变量可能包含任何值，就像JavaScript的默认行为一样。
* `string`:
* `array`:
* `boolean`:
* `enum`:  
	````typescript
	enum Color {Red, Green, Blue} 
	let c: Color = Color.Green; // (在JS中 c 是一个int类型的值)
    ````
* `null`
* `undefined`

## 富类型

### `Interface`

描述一个用户对象
````typescript
    interface User {
        name: string;
        birthday?: string; // optional property
    }
````

描述一个函数
```typescript
    interface MyAddFunction {
        (a: number, b: number): number
    }
    const add: MyAddFunction = (a, b) => a + b;

```

描述一个 Cat type 重用 Animal type

````typescript
    interface Animal {
        name: string;
    }
    interface Cat extends Animal {
        mustache_len: number;
    }
    // ---------------------
    interface A { a: string; }
    interface A { b: string; }
    // is the same as 
    interface A {
        a: string;
        b: string;
    }
````
    
### type

type关键字用于创建 类型别名：

重命名一个现有类型
```typescript
type MyString = string;
```

在用于编写doc时很有用


联合类型，扩充
```typescript
type PossibleValues = "open" | "close";
const a: PossibleValues = "open";
interface Car {
speed: string;
}
type CompetitionCar = Car & { competitor_id: string };

```

type与interface的区别

以下用法中，两者没有区别
```typescript
interface A {
a: string;
}
type B = { a: string; }
```


## 函数的类型,参数，返回值类型
```typescript
// inline typing
const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// types with interfaces
interface CapitalizeFunction {
    (str: string) => string;
}
const capitalize: CapitalizeFunction = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
// function as property in object
interface ReactComponentProps {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}
class MyComponent extends React.Component<ReactComponentProps> { }
```

对象作为参数

```typescript
interface MyFunctionArgs {
    name: string;
    security_code: string;
    id?: number;
}
function isCompleteUser({ name, id = 1 }: MyFunctionArgs): boolean {
    return !!name;
}
isCompleteUser({ name: 'a', security_code: 'b' });

```

## 泛型

基本类型和Interface可以很好的描述数据和基本函数签名，泛型可以使类型‘开放’和可以重用。
想象我们需要一个这样的方法
```typescript
function withUID (obj) { 
    return Object.assign({}, obj, { uuid: _.uniqueId() });
}
```


要给函数加上类型，最直观的方式是
```typescript
function withUID (obj: any) { 
    return Object.assign({}, obj, { uuid: _.uniqueId() });
}
```


我们使用 `any` 是因为我们接受任何类型的对象。

问题是类型推断会推测函数返回的类型也是 `any`



泛型就是可以使组件能够接收多种类型，更灵活。
```typescript
function withUID<T>(obj: T) { 
    return Object.assign({}, obj, { uuid: _.uniqueId() });
}
```

泛型可以应用到 `interfaces` `class` 和 `function`上
```typescript
interface A<T, S> {
    a: T;
    b: S;
    c: { id: string } & S;
}
```


泛型可以  “extends”
```typescript
function withUID<T extends object>(obj: T) { 
    return Object.assign({}, obj, { uuid: _.uniqueId() });
}
withUID({ a: 1 }); // is valid
withUID("hello"); // is NOT valid
```

 这里 T 应该满足的条件“是对象类型”
```typescript
interface Person { name: string; }
function withUID<T extends Person>(obj: T) { 
    return Object.assign({}, obj, { uuid: _.uniqueId() });
}
withUID({ name: "POLY", surname: "Chack" }); // is valid

```

泛型可以有默认类型

```typescript
interface A<T=string> {
    name: T;
}
const a:A = { name: "Charly" };
const a:A<number> = { name: 101 };

```

参数的类型可以被其他参数重用
```typescript
function MyFunction<T extends Person, S=T&{ ssid: string }>(
person: S
): S {
/* ... */
}
```

## 重载 可扩展的函数类型


当函数更复杂时，重载就更有用了，想象有这样一个函数
```ecmascript 6
function getArray(...args) {
    if (args.length === 1 && typeof args[0] === 'number') {
        return new Array(args[0])
    } else if (args.length > 1) {
        return Array.from(args);
    }
}
getArray(5) // => [undefined x 5]
getArray('a', 'b', 'c') // => ['a', 'b', 'c']
```

如何定义函数的类型呢。最简单的方法就是重载 `overload`

[<img src="{{ site.baseurl }}/images/overload.jpg" alt="矩阵1"/>]({{ site.baseurl }}/)


注意： 重载没有函数体。

## super type

联合类型
```typescript
interface BaseConfig { version: string; name: string; }
interface DynamicConfig { fromFile: string; }
interface StaticConfig { configuration: object; }
type Configuration = (StaticConfig | DynamicConfig) & BaseConfig;

```
现在 Configuration 可以有两个不同的形状

```typescript
const config: Configuration = {
    version: '1.0',
    name: 'myDynamicConfig',
    fromFile: './config.json'
}; // this is a DynamicConfig
const config: Configuration = {
    version: '1.0',
    name: 'myStaticConfig',
    configuration: { ... }
} // this is a StaticConfig

```
