## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。


### 練習題

簡單記錄一下無法獨力完成的題目，順便在次複習 Closure 的概念，練習說清楚。

題目：https://github.com/Lidemy/mentor-program-4th/issues/16

**Debounce**

目標是實作出一個 debounce 的函式，用起來會像這樣：

```
// 每當 input 的內容有變動，就呼叫 handleChange
$('input').change(handleChange)

// 讓原本發後端 api 的函式 debounce
const debouncedFn = debounce(getAutoSuggestions, 250)

function handleChange(e) {
  // 拿到 input 的值
  const value = e.target.value

  // 發 api 去後端拿搜尋建議，然後 render 出來
  // 細節我就不寫了
  // 在 250ms 內重複呼叫的話不會有反應
  debouncedFn(value)
}
```

因為沒甚麼概念，直接偷看答案：

```
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(...args), delay);
  };
}
```

拆解一下作法。

這個 function 會回傳一個 function ，其中的 timer 這個變數會使用的 `debounce AO` 中的，因此會獨立於被回傳的 function 中扮演紀錄的角色。 `...args` 是展開所有參數的意思。

其回傳的函式開始時如果 `timer` 有值（不是空的），就先清空 `timer` 正在計算的時間從頭開始，然後放一個新的計時器設定 `delay` 毫秒之後執行 `fn(...args)`。

目的是「時間內重複呼叫的話會重新開始計時」，因此可以想像第一次呼叫的時候 `timer` 是 null，所以會直接開始設定計時器並對應的 ID 掛在 `timer` 上。但如果時間還沒到就又叫第二次，此時就會進入 if 中重新設定 `timer` 對應到的計時器時間，之後如果時間到沒有重複呼叫，就會送出執行 `fn(timer)` 。

### 毫無反應只是心得

![](https://i.ibb.co/bdnRfdN/1603349989984.png)

欸反正就是這樣（不是吧）

這週的內容超級理論，有種腦袋被這些概念輪流痛毆的感覺，直到最後的練習題才有「ㄛ～原來我過去一個禮拜在學這ㄍ」的感覺，整體而言算是痛並快樂著。


**Callback Function**

大概一個月前，我曾經夢到有人問我：「大家是不是都搞不太清楚 Callback Function 啊？」醒來之後爆幹心虛。不過看完 [What the heck is the event loop anyway? | Philip Roberts | JSConf EU](https://www.youtube.com/watch?v=8aGhZQkoFbQ) 後，我也是可以抬頭挺胸和夢裡的角色解釋 Callback Function 的人了（驕傲貌）

不過寫作業第二題的時候還是有點卡住，因為進入 Web API 後就可以和 stack 完全獨立運作（所以才叫非同步 R），不過要製作圖解時就不知道要怎麼擺放，只好先做完一邊再說「與此同時」。果然非同步的還是有點難解釋，簡而言之就是人類大腦的局限了吧，要是把胼胝體切掉說不定就可以了（完全不是那麼一回事好嗎）。


**Scope Chain**

雖然有點麻煩，但我還蠻喜歡寫步驟流程的，能線性解釋的東西果然都好解決。有種回去寫大學修述詞邏輯的證明題的感覺，運用規則一步步列出想法真是快樂又踏實。

中間一度卡住的是這個：

```
var a = 5
function test() {
	console.log(a) // undefined
	var a
}
```

和這個的差別：

```
var a = 5
var a
console.log(a) // 5
```

憑什麼第二個宣告 a 就不用管，但第一個卻會被算進去？後來才知道對第一個來說進入 `test()` 時就已經初始化 `a: udefined` 了，而不是本來以為的「現在還沒有被宣告 a ，只好往外找」，是順序的問題。另外找 AO 和 VO 是從自己開始往外找，而不是像法律一樣如果違憲（最高的法律）就要修改，如果用法律的概念可能是越和自己有關的越高層級？和 CSS Selector 的優先順序一樣。

**prototype**

我卡了一整天。

花了整天想辦法搞懂物件導向的 .prototype 概念和指來指去的關係，洗澡的時候忽然想到「咦這不就是柏拉圖嗎？」，才發現用理型的比喻去解釋就通了！例如 `function  Car` 是「汽車的概念」， `new car` 就是創造新的車，但車要怎麼開怎麼維修遵守什麼規則要看 `Car.prototype` 也就是汽車說明書， `car.__proto__` 就是去看說明書的意思， `.construtor` 則是有個人拿到說明書但不知道大家在討論什麼，就給他看「車的概念」。

欸不過這樣會越解釋越複雜，像是「車的概念」要怎麼再簡化，所以這種譬喻大概還是僅限我自己有用的方法 XD