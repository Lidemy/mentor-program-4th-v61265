## 請列出 React 內建的所有 hook，並大概講解功能是什麼

### useState
```js
const [state, useState] = useState(第一次 render 的初始值)
```

如此一來就可以在 component 中設定並儲存 state ，之後呼叫 `setState(newState)` 就可修改了。

state 的變動也會引起相關 component 的 re-render。

值得注意的是 state 本身是如 object 一樣 immutable 的，因此通常刪除值時會用 `.fliter()` 、修改時用 `.map()` 、新增時用 `([...state, newValue])`。


### useEffect
```js
useEffect(() => {
	// 這裡的行為會在初次 render 完以及 dependencies 改動時都執行一次
	
	return () => {
		// clean-up function ，這裡的行為會在component 被移除（包含每次 re-render 前和 unmount）先執行一次
	}
}, [dependencies ，只要這裡的 state 改變， useEffect 就會重新執行，若沒有則表示只在初次 render 時就執行])
```

適合拿來做有 side effect 的動作，例如 fetch 。

### useLayoutEffect
```
useLayoutEffect(() => { // do something }, [array, dependency])
```

和 useEffect 很像，差別在是在 virtual DOM 比對後執行 paint 畫面同時執行，就不會有資料還沒拿進來所以空白的狀態，可以改善使用者體驗，但要小心畫面被 block 。

### useContext

如果專案太大，可能出現 Prop Drilling 一層一層把 props 傳太深的狀況， useContext 就是要避免這個狀況。

用法如下：
```js
// contexts 檔案中
export const TitleContext = creatContext(初始值); //創新的 context

// App.js
import { TitleContext } from './contexts'
<TitleContext.Provider value={title}> // 用來包住的檔案都可以傳入並使用 context
	<Demo>
<TitleContext.Provide>

// Demo.js
export default function Demo() {
	const [title] = useState(TitleContext);  // 把 context 拿出來
	return (
		<TitleContext.Provider>
			<div>
				title: {title}
			</div>
		</TitleContext.Provider>
	)
}
```

應用：驗證使用者是否登入。


### useRef
```js
const refContainer = useRef(初始值);
```

useRef 和 useState 很像，不過是 mutable 的。因為會回傳一個物件，所以改變 `.current` 時不會重新 render 相關 component 。

可用於存取 id 之類的和 DOM 節點相關的資訊，也可以用於 uncontroller component。


### useMemo

useMmeo 的功能是防止無關的區域 re-render，常使用於複雜的計算。

```js
const s = useMemo(() => {
	return {
		color: value? 'red' : 'blue';
	}
}, [dependencies ])
```
如此一來，只有 value 改變的時候，才會重新執行一次並回傳新的 object 。

很像的還有 memo ，不過 memo 是給 component 用的， useMemo 是給資料用的。


### useCallback

```js
const handleButtonClick = useCallback(() => {
	// 有動作
}, [dependencies ])
```

和 useMemo 一樣是拿來提高效能。不過 useMemo 最終產出是值，而 useCallback 則是回傳 function 。

除了 dependencies 改變外，如果呼叫到 useCallback 的函式，就會因為被存起來所以被認為是同個 function 而不會 re-render 。

### useReducer
```js
const [當前的值, dispatch aka 觸發條件] = useReducer(reducer aka 處理函式, 初始值)
```

有點像 useState ，只是當專案變大 state 變多，則可使用 useReducer 管理。

### useImperativeHandle
```
useImperativeHandle(ref, createHandle, [deps])
```

用途：取用 child component 中的值或 function 。

### useDebugValue 
在自定義的 Hook 中使用，傳進 useDebugValue() 的值會在開發人員工具中會作為標籤顯示在該 Hook 旁。



## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

官方提供的 lifecycle
![](https://ppt.cc/fvAMXx@.png)

小訣竅：`will` 是在之前， `did` 表示之後。

因為在趕進度，就列出最最最基本和常用的。

### mount
在 component 被 render 出來前，第一次建造 component 並掛到 DOM 上，稱作 mount 。

**constructor**
在 mount 之前被呼叫，可視為 functional component 的 useLayoutEffect() 。此時要針對 state 和 props 做初始化。

**render**
顧名思義，就是 render DOM 。

**ComponentDidMount**
component 第一次被掛在 DOM 上後執行 ，可以決定這個 component 要不要 render。適合做 side Effect 如 fetch 。


### updating
因為 state 或 props 被更動而重新渲染，被稱作 update 。

**componentDidUpdate()**
state 改變後會觸發。

**shouldComponentUpdate**
會回傳一個 boolean ，決定 state 改變後是否 render 和 componentDidUpdate()。

**componentDidUpdate**
在 state 或 props 改變後會觸發的 method，適合做 side Effect 如 fetch 。


### unmount
相對於 mount ，是 component 從 DOM 上拿下來的過程。

**componentWillUnmount**
unmount 前觸發。可以清理一些之後不會再用到的 function 和監聽等。


### 錯誤處理
**static getDerivedStateFromError(error)**
接收錯誤並回傳值以更新 state。



## 請問 class component 與 function component 的差別是什麼？

### 思考模式：
`class component` 是以 lifecycle method 思考。
`function component` 用 `hooks` 思考（什麼改變時我要針對什麼做改變）。

### props：
`class component` 使用前要先在 constructor 初始化，因為 this 會改變，所以永遠會調用到最新的 props，需要使用閉包才能捕獲 props 。
`function component` 可以直接傳入。

### state：
`class component` 用 `this.state={init}` 設置以及存取。
`function component` 使用第一題的 useState hook 。

### 其他
因為思考上 class component 是以生命週期思考，因此有更好的可讀性，但因為涉及物件導向，使用 this 時要更加小心。相較之下 function component 的 hook 更靈活，不過就要維護時就要花更多時間理解。
（這部分正在趕進度，更詳細的物件導向之後會回頭看！）


## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

以增加 todo 為例子好了。

之前使用 jQuery 時最直觀的做法就是讓 input 快樂更改自己的值，直到 submit 才去抓 input 的值。這種做法就是 `uncontrolled component` ，因為送出前 input 的資料雖然會在畫面上改變，但並不在 React 的控制中。

相對的 `controlled component` 則是將所有變動交給 state ，再由 state 給 component 渲染畫面，一個控制狂的概念。

方法如下：
1. 建立一個 state `const [value, setValue] = useState()`
2. 管理 input render 出來的東西。 `<input value={value}/>`。到這一步為止，使用者在 input 出現任何東西都不會被顯現。
3. 掛個監聽在 input 上，並設定 function 改變 value 值。
```
<input value={value} onChange={(e)=> {
	setValue(e.target.value)
}} />
```

就像是你問鄰居小孩要不要出來玩球，雖然他都答應了（有 render 出東西），controlled component 是有先回家問過媽媽允許；但 uncontrolled component 則是先玩，回家再跟媽媽報備。後者雖然看似省了幾道工，但有可能出現認知不同的問題，像是媽媽以為是羽毛球但其實是足球，隔天幫他報名羽毛球隊（好爛的例子 XD），回到網頁就是資料和畫面不同步，因此 react 會優先推薦前者。
