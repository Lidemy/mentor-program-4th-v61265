## 請解釋後端與前端的差異。

使用者可以看的到的部分都是前端，像是新增網頁和設計都是；後端則是負責和資料庫溝通。
用 Google 表單類比的話，我們在填寫表單時回答的問題是前端負責；如果設計者針對大家的回應開一個試算表，那麼和這個試算表溝通就是後端的工作。
當然大部分的功能需要前後端合力才能達成，例如用搜尋引擎時，前端負責接收我們輸入的關鍵字，交給後端去資料庫中尋找，並回傳結果給前端，最後由前端顯示結果。更詳細可以參考下一題。


## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

! [](https://i.ibb.co/t3ZG7Gb/image.jpg)

1. 你傳送 request 給瀏覽器。這裡又細分瀏覽器傳給作業系統，再傳送給硬體，這裡瀏覽器、作業系統和硬體就像郵差送信一樣。
2. 傳送到 DNS Surver ， DNS Surver 會回傳 IP 位置給前端。
3. 前端將 requst傳送到 IP 位置。
4. Google 的 Surver 去 DB 找資料。
5. 沿著原來的路徑傳送 Rrsponse 給 Survur 、硬體，作業系統、瀏覽器。
6. 我們會在瀏覽器上看到結果。

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

`whoami`：顯示使用者名稱。
`exit`：關閉 Terminal。
`tail`：印出檔案最後幾行。
