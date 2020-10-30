stack 先進入整個程式碼的區域，也就是 `main()` 被疊上去。
![](https://static.coderbridge.com/img/v61265/16e5edf5b090490e9e60c0909fe4b0b1.jpg)

進入迴圈， i = 0 ，開始跑 `console.log('i:' + i)` ，stack 疊一層`log('i:' + i)`結果輸出 i: 0 。
![](https://static.coderbridge.com/img/v61265/6c5f3d100cfa4069bdb95e7f736bf373.jpg)

跑完後抽掉 `log('i:' + i)`。
![](https://static.coderbridge.com/img/v61265/548581a8d5fc409ca7106f657b560ecc.jpg)

進入下一行，stack 疊加一層 `setTimeout(cb)`，並將這層移至 Web API 中。
![](https://static.coderbridge.com/img/v61265/2b5f103130e7420fa8f59ff94033b544.jpg)

在 Web API 中等待條件被完成，這題為例就是等待 i 秒，而 i 此時為 0 。
![](https://static.coderbridge.com/img/v61265/cf00aea140bf4b4596165e7b50497630.jpg)

cb 被移至 Callback Queue 中，等 stack 被清空。
![](https://static.coderbridge.com/img/v61265/e93899d3db534915ad270be455163f62.jpg)

**timeout 從 stack 離開的同時** ，進入第二層迴圈， i = 1 。
![](https://static.coderbridge.com/img/v61265/c7730aa2c2b349a18a7d194c91371da6.jpg)

開始跑 `console.log('i:' + i)` ，stack 疊一層`log('i:' + i)`結果輸出 i: 1 。
![](https://static.coderbridge.com/img/v61265/012d335531174ab6a339a9dd160d103e.jpg)

跑完後抽掉 `log('i:' + i)`。
![](https://static.coderbridge.com/img/v61265/2e4af7909a7842b9b957ccf96b715093.jpg)

進入下一行，stack 疊加一層 `setTimeout(cb)`，並將這層移至 Web API 中。
![](https://static.coderbridge.com/img/v61265/b07597679b9741b197d6b883199289d1.jpg)

在 Web API 中等待條件被完成，這題為例就是等待 i 秒，而 i 此時為 1 。
![](https://static.coderbridge.com/img/v61265/c74f7b585f7e4b38a0a7fc306e88c297.jpg)

一秒後 cb 被移至 Callback Queue 中，等 stack 被清空。
![](https://static.coderbridge.com/img/v61265/5736e1ac3ef54afcbfda0e82fc2a6715.jpg)


這個過程會重複五次，直到第五圈 `i = 5` 時跳出並抽出 `main()`，此時 stack 如下，可以開始將 callback queue 移到 stack 中了。

![](https://static.coderbridge.com/img/v61265/0cc1037227534a9b9e4f14cb9c6ac91b.jpg)

因為 `i` 這個變數是於 `Global ES` 中被宣告，因此是全域變數，又因為此時迴圈已經全部跑完，i 的值為 5 ，所以 `console.log(i)` 會輸出五。
![](https://static.coderbridge.com/img/v61265/5421e7f0b03442988e9b0173bc069b66.gif)

因此最後輸出為：
```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```