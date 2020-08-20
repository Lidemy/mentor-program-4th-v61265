## 什麼是 DOM？

資料來源：[Day03-深入理解網頁架構：DOM](https://ithelp.ithome.com.tw/articles/10202689)

DOM 的全名是 `Document Oject Model` 文件物件模型，就是將 HTML 內各種標籤定義成物件，方便和 JavaScript 溝通。被定義的物件們會成為樹狀結構例如下圖：

![](https://www.w3schools.com/js/pic_htmltree.gif)

透過 DOM ，我們可以使用 JavaScript 改變網頁介面、監聽事件並做出反應，以及和伺服器交換資料。


## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

事件傳遞依照順序會經過三個階段：
1. CAPTURING_PHASE，也就是大家說的捕獲階段
2. AT_TARGET
3. BUBBLING_PHASE，也就是冒泡階段

以下的圖可以解釋三者順序：

![](https://static.coderbridge.com/img/techbridge/images/huli/event/eventflow.png)

在監聽事件時的第三個參數可加階段（true = 捕獲階段、 false = 冒泡階段）。值得注意的是，不管程式寫的順序為何，傳遞機制都會是先發生捕獲再冒泡，只有 AT_TARGET 會被寫的順序影響。

## 什麼是 event delegation，為什麼我們需要它？

像是本週的 hw3 製作 todolist ，如果一條一條監聽，程式碼就會變得很複雜，而且也無法替新增的 item 增加監聽。

與此同時上一題中，當我們點到 target 時，也會觸發到上層的元素，因此我們可以利用事件傳遞機制，進行事件代理（event delegation），解決以上問題。

例如在 todolist 中，我們只要將監聽器掛在 item 們的上一層，當監聽器偵測到再往下看是誰被點擊並做出反應就好，這樣新增的 item 也可以被監聽到。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

`event.preventDefault()` 是阻止預設行為發生。例如 subnit 被按下去預設就會送出表單，或是 a 按下去就會觸發超連結，這時如果這樣寫就不會送出表單：

```
submit.addEventListener('click', (e) => {
  e.preventDefault();
}, false)
```

`event.stopPropagation()` 則是阻止事件傳遞，和第二題的傳遞順序有關，如果在哪個階段加上 `.stopPropagation()` 就不會再傳遞給下個節點，但該節點的事件還是會被觸發，如果全都要阻止可用 `e.stopImmediatePropagation()` 。