## 請簡單解釋什麼是 Single Page Application

`Single Page Application` 簡稱 SPA ，單介面應用程式，顧名思義就是所有動作都在一個頁面上完成，不會重新導向 index.html 以外的地方。其原理是 JavaScript 用 Ajax 動態從 Server 端拿資料，再即時 render 到 client 端上。


## SPA 的優缺點為何

### 優點：

1. 使用者體驗較佳。每次動態更新資料只會更新部分頁面，而不是導向完全不同的頁面。
2. 前後端分工較明確。後端負責提供 API 給前端 render。
3. 就算 JS 掛掉， HTML 檔案還是會顯示基本的畫面而非直接掛掉。

### 缺點：
1. 一個頁面要載入超多 .js 檔案，會跑比較慢。
2. SEO 差。因為真正的內容要等 JS 渲染完，比較笨的爬蟲只看到 HTML 的話就是個空殼 → 可靠 SSR 解決。
3. 前端變的超級複雜，還會有回傳順序的問題。要是沒寫好可能會出現「明明都點到第三頁了，卻顯示第一頁的畫面」這種狀況。


## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

- PHP
拿出資料 → render 到 HTML 上 → 回傳 HTML 檔案給瀏覽器。
以上流程每進行一次就會刷新一次頁面。

- Ajax
PHP 拿出資料 → 變成特定格式(JSON) → 傳給 JavaScript → JavaScript render 到沒有資料的 HTML 上。
以上流程並不會更換頁面， PHP 只負責回傳 API 給前端，再由前端動態 render 到頁面上。