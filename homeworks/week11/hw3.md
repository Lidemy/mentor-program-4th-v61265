## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

如果註冊時的密碼直接被存入資料庫中，資料庫只要直接被偷看（像是在圖書館使用時上廁所忘了換頁），或用以下幾種攻擊直接叫出密碼，使用者的資訊就會受到威脅，因此存在資料庫中密碼欄位的密碼最好不是原始的樣子。

雜湊和加密都是把原始的明碼輸入轉換成密碼，都是只要輸入字串和方法一樣，就可以得到一樣的密碼。差別在加密是一對一，因此若知道加密規則和輸出結果，就可以回推出原本的明碼，是一對一的關係；但雜湊 (hash) 是多對一的關係，也就是雖然每次輸入都會得到同樣的輸出，但因為不止這組輸入會得到一樣的輸出，因此就算知道加密規則和結果，也無法回推原本是哪個字串。


## `include`、`require`、`include_once`、`require_once` 的差別

資料來源：
[簡單談談PHP中的include、include_once、require以及require_once語句](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/213553/)
[](https://sanji0802.wordpress.com/2008/02/25/php%E5%BC%95%E7%94%A8%E6%AA%94%E6%A1%88%E7%9A%84%E5%87%BD%E6%95%B8%E5%8D%80%E5%88%A5requirerequire_onceincludeinclude_once/)

這四個都是將其他檔案引入並執行的函式，主要差別如下：

1. 可否重複呼叫
`include` 和 `include_once` 功能相同，差別只在於可否重複被呼叫。`require` 和 `require_once` 也是。
`include` 和 `require` 都可重複被呼叫。相較之下 `include_once` 和 `require_once` 不行，意思是如果同個檔案在另一個檔案中被呼叫兩次就會跳出警告，因為 PHP 不允許相同名稱的函數被重複宣告。不重複呼叫可以防止呼叫的檔案中又呼叫了自己，造成檔案一直重複呼叫的狀況發生，因此大部分情況下會建議使用 `include_once` 和 `require_once`。

2. 可否重複使用
`include` 的執行方式是執行該檔案，但 `require` 則是執行並直接取代它本身，也就是說如果今天有個 function 被包含在其中，每次使用該檔案之前都要用 `include` 呼叫，但 `require` 只要呼叫一次即可。

3. 啟動時間
`require` 在 PHP 被執行前就啟動。 `include` 則是跑到那行才啟動，這樣流程比較簡單。

3. 如果呼叫失敗
因為啟動時間的差異， `include` 找不到檔案會直接進行下一行，但 `require` 會導致程式中止。


## 請說明 SQL Injection 的攻擊原理以及防範方法

SQL Injection 是在輸入的字串中夾帶 SQL 的語法，又因為字串拼接設計不良，夾帶進去的內容被當成 SQL 語法的一部份執行而導致的資安漏洞。以下舉個例子：

程式碼如下：
```
$sql = sprintf("INSERT INTO comments(username, content) VALUES('%s', '%s')", $_POST['username'], $_POST['content']);
```

只要我在 content 的欄位輸入 `'), ('not_me', (select password from users));#` ，就會變成這樣：
```
$sql = INSERT INTO comments(username, content) VALUES('me', ''), ('not_me', (select password from users));#')
```
因為井字號後面會變成附註，因此變成新增兩條留言，第二條的 username 和 content 附註，其中內容甚至可以叫出所有用戶的資料。超危險。

**解決方法：使用 SQL 內建機制拼接**

```
$sql = 
// 這邊預留空間的方法是用問號 '?'
$stmt = $conn->prepare($sql) ;
// 先準備好
$stmt->bind_param('<拼接什麼>', $<變數1>, $<變數2>) ;
// 如果要拼接兩個字串，就用 'ss' ，整數的話就是 'i'
$result = $stmt->execute()
// 執行 query
// 接著用原本的判斷式檢測是否執行成功

$result = $stmt->get_result()
//這樣才算拿到結果
```


##  請說明 XSS 的攻擊原理以及防範方法

XSS 全名 `Cross-Site Scripting` ，也就是跨網站執行 JavaScript。例如顯示留言的地方的 HTML 如下：

```
<div class='content'><?php echo $row['content']?><div>
```

這時只要使用者輸入 html 或 JavaScript 語法，例如 `<script>alert('hacked')</script>` ，就會直接被解讀為程式碼的一部份並被執行。

**防範方法：字元跳脫**

函式 `htmlspecialchars()` 可將 html 的特殊符號轉換成純文字。

值得注意的是，因為資料庫儲存原始資料就好，因此建議在輸出處使用。另外，因為不知道攻擊會從哪裡來，因此建議所有輸出都使用字元跳脫。


## 請說明 CSRF 的攻擊原理以及防範方法
參考資料：
[讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)
[[week 11] 資訊安全 - 雜湊與加密 & 常見攻擊：SQL Injection、XSS](https://github.com/heidiliu2020/This-is-Codediary/blob/week11/week11_%E8%B3%87%E8%A8%8A%E5%AE%89%E5%85%A8_%E9%9B%9C%E6%B9%8A%E8%88%87%E5%8A%A0%E5%AF%86%E3%80%81%E5%B8%B8%E8%A6%8B%E6%94%BB%E6%93%8A.md)

CSRF 的全名是 `是 Cross Site Request Forgery`（跨站請求偽造）。也被稱為 one-click attack 或 session riding。簡單來說就是「在不同 domain 下，偽造使用者本人發出的 request」。

平時登入網站後會得到一組 SESSION ，之後就算離開該網站，瀏覽器還是會幫你在 COOKIE 中保留 SESSION 一段時間。此時如果有個釣魚網站騙你在不知情的情況下，對該網站送出 Request （例如放在按鈕或圖片中），此時因為瀏覽器還留著你的 SESSION ，該網站以為是合法請求並接受，這樣一來釣魚網站就可以用你的身分在該網站進行操作。

**不同層面的防範辦法**

對使用者端來說，最好懂的就是隨時清空 SESSION，不過這就代表每次都要重新登入，很麻煩。

Server 端可以進行雙重驗證，像是輸入驗證碼就很直接，但每個動作都要輸入一次驗證碼有點麻煩，因此最好的方法是多加一層雙重認證。可以用表單中夾帶 CSRF token ，資料確認時也要保證其有被帶上才執行，產生和儲存都由 Server 端負責，但如果攻擊者先發出 request 就可破解；第二種方法是 Double Submit Cookie ，利用「cookie 只會從相同 domain 帶上來」的特性，把資料存在使用端，但只要攻擊者掌握任何 subdomain 就可破解；最後一種是由 Client 產生 token ，同時放到表單和 cookie 中。

瀏覽器方面， Chrome 也有提供 SameSite cookie 幫 cookie 加上一層驗證。
