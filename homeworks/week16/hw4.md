```
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

**「this 指到的東西和他在哪被呼叫無關，而是怎麼被呼叫的問題」**
我自己的理解是除了箭頭函式以外， this 對應到哪個東西就是看誰呼叫他。
像是 `obj.inner.hello()` ，其中的 this 對應到的就是呼叫他的 `obj.inner` ，因此會 log 出 2 。
而 `obj2.hello()` 的 this 則是對應到 `obj2` ，最後會 log 出 `obj2.value`，也就是 `obj.inner.value` ，也就是 2。
最後的 `hello()` ，因為找不到誰呼叫他，會被當成預設的全域。此時若設定嚴格模式會輸出 `undefined` ，node js 則是 `global` ，瀏覽器的話是 `window` 。
