## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

VARCHAR 和 TEXT 都不固定長度，最大長度也都是 65,535。但 VARCHAR 可以限制最大長度，因此處理速度快於 TEXT 。


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

瀏覽器每次發出 Request 的時候都是無狀態的，也就是說除非特別標記，否則伺服器不會記得對方上次的紀錄（例如登入資訊）。而 Session 就是為了處理這個問題出現的，其中 Cookie 就是一種 Session 的方法。

Cookie 的資料保存方式有點像集點卡，資料由使用者（瀏覽器）端保存，每次消費（發 Request）帶給店家（伺服器）就可使用點數。

實際上 Cookie 是個文字檔，以下流程用登陸資訊為例，第一次登入成功後伺服器就會透過 Response Header 給瀏覽器一份 Cookie 。之後存在 Cookie 裡的登陸資料由瀏覽器保管，下次對同個伺服器發出 Request 時自動帶上 Request Header 中，只要還沒過期而且符合設定的 Domain ，伺服器就知道是上次那個使用者了。


## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. 若輸入 html 標籤會產生錯誤 
	-> 但我已經用 htmlspecialchars() 了還是出錯，求幫看 orz
2. 偷看後面（喂）發現儲存時用明碼密碼會有問題 
	-> 預想解決方法是用像 token 這種再存在別的地方，不過如果存的地方也被駭進去怎麼辦 XD （還是多一層就會好很多）
3. 如果增新留言前把 Cookie 刪掉，就可以增新沒有使用者的留言
	-> 感覺可以在 handle_add_comments.php 加一層檢查，沒有 $username 就不給過。


