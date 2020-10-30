```
01. var a = 1
02. function fn(){
03.   console.log(a)
04.   var a = 5
05.   console.log(a)
06.   a++
07.   var a
08.   fn2()
09.   console.log(a)
10.   function fn2(){
11.     console.log(a)
12.     a = 20
13.     b = 100
14.   }
15. }
16. fn()
17. console.log(a)
18. a = 10
19. console.log(a)
20. console.log(b)
```

進入程式的 `Global EC` ，初始化 `Global VO`：
```
global VO: {
	a: undefined,
	fn: function
}
```

`01` 處 a 被賦值為 1 ：
```
global VO: {
	a: 1,
	fn: function
}
```

`02` ~ `15` 都只是設定 function ，沒有跑什麼，直到 `16` 處才進入 function fn()（`02` 處）。

進入 finction fn() ，也就是 stack 疊一層 `fn EC` ，初始化 `fn AO`：
```
fn AO: {
	a: undefined,
	fn2: function
}

global VO: {
	a: 1,
	fn: function
}
```

因此 `03` 處的 a 會找到此時 `fn AO`（因為在 `fn EC` 中）的 a ，因此輸出 `undefined` 。

`04` 處 ， `fn AO` 的 a 被賦值為 5 。
```
fn AO: {
	a: 5,
	fn2: function
}

global VO: {
	a: 1,
	fn: function
}
```

因此 `05` 處的 a 會找到此時 `fn AO`（因為在 `fn EC` 中）的 a ，因此輸出 `5` 。

`06` 處， `fn AO` 的 a 被賦值為 6 。
```
fn AO: {
	a: 6,
	fn2: function
}

global VO: {
	a: 1,
	fn: function
}
```

`07` 處宣告 a ，但因為已經被宣告過了所以可以不用管他。

 `08` 處進入 function fn2()（`10` 處）。進入 finction fn() ，也就是 stack 疊一層 `fn2 EC` ，初始化 `fn2 AO`，因為裡面沒有宣告任何變數和函數，因此 AO 是空的。
 
```
fn2 AO: {

}
 
fn AO: {
	a: 6,
	fn2: function
}

global VO: {
	a: 1,
	fn: function
}
```

`11` 處，因為 `fn2 AO` 沒有 a ，因此透過 scope 找到上一層 `fn AO` ， a 為 6 ，輸出。

`12` 處，重新賦值 a = 20 ，但因為 `fn2 AO` 中沒有 a ，因此找到 `fn AO` 中的 a 並賦值。
```
fn2 AO: {

}
 
fn AO: {
	a: 20,
	fn2: function
}

global VO: {
	a: 1,
	fn: function
}
```

`13` 處，重新賦值 b = 100 ，但因為 `fn2 AO` 中沒有 a ，`fn AO` 中也沒有，因此透過 scope chain 找到 `global VO` 宣告且賦值。
```
fn2 AO: {

}
 
fn AO: {
	a: 20,
	fn2: function
}

global VO: {
	a: 1,
	fn: function,
	b: 100
}
```

`fn2` 結束，抽掉 `fn2 EC` 和 `fn2 AO`，回到 `09` 處。
```
fn AO: {
	a: 20,
	fn2: function
}

global VO: {
	a: 1,
	fn: function,
	b: 100
}
```
此時在`fn EC` 中，因此 `09` 的 a 找到 `fn AO` ，回傳 20 。

`fn` 結束，抽掉 `fn EC` 和 `fn AO`，回到 `17` 處。
```
global VO: {
	a: 1,
	fn: function,
	b: 100
}
```
此時在`global EC` 中，因此 `09` 的 a 找到 `global AO` ，回傳 1 。

`18` 重新賦值 a = 10 。

```
global VO: {
	a: 10,
	fn: function,
	b: 100
}
```
`19` 和 `20` 分別輸出 10 和 100。

最後總輸出：
```
undefined
5
6
20
1
10
100
```