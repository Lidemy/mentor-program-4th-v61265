## 什麼是 Ajax？

Ajax 的全名是 `Asynchronous JavaScript and XML` ，任何和伺服器非同步交換資料都可以叫做 Ajax 。（早期是用 XML 交換，但現在比較常用 JSON）

一般來說程式碼由上往下按照順序跑，如果中間某行跑太久，後面就必須要等。用去拉麵店點餐舉例，同步就是點完餐（送完 request）後，必須站在原地排隊等餐點（response），非同步則是點完後可以拿張號碼牌回座位先做其他事情，等餐點到了再去拿就可以了。

在 JavaScript 中，可以使用  `回呼函式（callback function）` 來達成。回呼函式是指能藉由參數通往另一個函式的函式，因此只要設定拿到 response 後再呼叫這個函式，就不用傻傻待在原地等。


## 用 Ajax 與我們用表單送出資料的差別在哪？

用表單送出 request 時，是用其中的 input 當作資料，並且接收 response 時會換頁。

但用 Ajax 時不需要換頁，可以非同步的接收 response 並用 Javascript 渲染頁面。


## JSONP 是什麼？

JSONP 是 `JSON with Padding` 。

因為考量安全性，透過瀏覽器取得 API 必須遵守同源政策（Same-origin policy，CORS），也就是說除非特別設定，否則不同網域之間無法分享 API （會發 request ，但 response 會被瀏覽器擋下來不給 JavaScript）。

不過有些標籤不被此規範，例如 <img> 或 <scipt> 。JSONP 就是將資料包進 function 中並放在 <scipt> 下，其他人就可以直接使用。


## 要如何存取跨網域的 API？

同上題，因為有同源政策，若要跨網域分享， Server 端要在 Response 的 Header 加上 `Access-Control-Allow-Origin` 設定允許給哪些網域。之後瀏覽器要接收 response 時會先檢查其中是否包含發出 request 的 Origin ，有的話才會回傳。


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

因為我們這週是透過瀏覽器發送 request ，會受到瀏覽器同源政策規範。但第四周的 node.js 直接送到 server ，不會經過瀏覽器，也就沒有問題。

因為 node.js 的 response 是送到你自己的電腦，除了你以外沒有人需要幫你處理 response ，但瀏覽器考量安全，才會多設規範確認雙方都願意交換資料。