## Event Loop

```
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

stack 先進入整個程式碼的區域，也就是 `main()` 被疊上去。
![](https://static.coderbridge.com/img/v61265/2a18af90e0c845e99cee1b3caad0fab4.jpg)

開始跑第一行 `console.log(1)` ，stack 疊一層`log(1)`結果輸出 1 。
![](https://static.coderbridge.com/img/v61265/25a9b3430f9f4ecc9ab0721d285b7571.jpg)

跑完後抽掉 `log(1)`，進入程式碼第二行， stack 疊加一層 `setTimeout(cb)`，並將這層移至 Web API 中。
![](https://static.coderbridge.com/img/v61265/4d40b6eaf0884529b9d849e2064e330e.jpg)

在 Web API 中等待條件被完成，這題為例就是等待 0 秒。
![](https://static.coderbridge.com/img/v61265/988497c823f845609d7c2df087dced0a.jpg)

cb 被移至 Callback Queue 中，等 stack 被清空。
![](https://static.coderbridge.com/img/v61265/edf2c874e2e94c43bfd5bd622a3922c0.jpg)

**timeout 從 stack 離開的同時**，第三行的 `log(3)` 被移入 stack 最上方，並且結果輸出 3 。
![](https://static.coderbridge.com/img/v61265/536fbd376280471b88fb15d18880a314.jpg)

跑完後抽掉 `log(3)`，進入程式碼第四行， stack 疊加一層 `setTimeout(cb)`，並將這層移至 Web API 中。
![](https://static.coderbridge.com/img/v61265/6b87b55a1c8e4523a20adb1e5dd0cc3a.jpg)

在 Web API 中等待條件被完成，這題為例就是等待 0 秒。
![](https://static.coderbridge.com/img/v61265/56a4c018e0714c77b4248ceb52e766c4.jpg)

cb 被移至 Callback Queue 中，等 stack 被清空。
![](https://static.coderbridge.com/img/v61265/b361e7058c994be999f973e960eb5907.jpg)

**timeout 從 stack 離開的同時**，程式碼下一行的 `log(5)` 被移入 stack 最上方，並且結果輸出 5 。
![](https://static.coderbridge.com/img/v61265/3a767f479ed944eeaa1fe32d22d5e5b8.jpg)

`log(5)` 被執行完成，被抽出 stack 。
![](https://static.coderbridge.com/img/v61265/5efc541ae07b440cbc025241732d052c.jpg)

`main()` （整個程式碼）被執行完，被抽出 stack 。
![](https://static.coderbridge.com/img/v61265/176e648b7bb04468b8ccb8bd91885056.jpg)

stack 空了， callback queue 依序移入執行。
![](https://static.coderbridge.com/img/v61265/cc3646a59321430386a9b16308406dc3.jpg)

執行 `log(2)` ，結果輸出 2 。
![](https://static.coderbridge.com/img/v61265/1ef57493e82346fea0a0f7de9bdf4308.jpg)

`log(2)` 執行完， `cb` 也執行完了，依序從 stack 抽掉。 stack 又空了，從 callback queue 引入下一個。
![](https://static.coderbridge.com/img/v61265/ed9d38e663844024b80f7b8b7ed684be.jpg)

執行 `log(4)` ，結果輸出 4 。
![](https://static.coderbridge.com/img/v61265/feef0b715f5c48dba573c1485d9d75b1.jpg)

`log(2)` 執行完， `cb` 也執行完了，依序從 stack 抽掉。 stack 又空了，沒有東西需要執行，結束。
![](https://static.coderbridge.com/img/v61265/6dfaf4cd8d6d4cf8a7c2e0df1e87ada3.jpg)
