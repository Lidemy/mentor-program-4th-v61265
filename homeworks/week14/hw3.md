全篇參考資料：[後端基礎作業：短網址設計與佈署](https://hugh-program-learning-diary-js.medium.com/%E5%BE%8C%E7%AB%AF%E5%9F%BA%E7%A4%8E%E4%BD%9C%E6%A5%AD-%E7%9F%AD%E7%B6%B2%E5%9D%80%E8%A8%AD%E8%A8%88%E8%88%87%E4%BD%88%E7%BD%B2-632bd1a4961)

## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

資料來源：[什麼是 DNS？](https://aws.amazon.com/tw/route53/what-is-dns/)
DNS 全名 `Domain Name System` 網域，它將人們可讀取的網域名稱 (例如，www.amazon.com) 轉換為機器可讀取的 IP 地址 (例如，192.0.2.44)。
Google 提供 DNS 讓使用者有更多 DNS 可以選擇。Google 標榜這個  DNS 「快速」，是因為 Google 到處都有伺服器，因此使用 Google 提供的 DNS 可以更快速的將網域轉換成 IP ，而不是指影響網頁本身的速度。對 Google 方來說也可以得到使用者的數據資料。不過值得注意的是，因為 Google 的主要收入來源就是投放廣告，因此一直有販賣隱私的爭議。


## 什麼是資料庫的 lock？為什麼我們需要 lock？

Transaction 指的是一組一次牽涉到多個  query 的操作，實際應用例如轉帳和購物。例如交易的時後小明給小美一百塊，這意味著小明少了一百，而小美多了一百這兩個操作。

此時只有兩個人還好，但使用者一多像是搶購票券之類的就會出問題，因為多筆資料同時進行更改時可能造成互相影響，比如說只有十張票卻有一百個人搶，發生 race condition ，最後發生超賣情形。

要避免這種狀況，只要在有人交易時先把門鎖上或放個標示說：「裡面有人ㄛ~」就可以避免了，這就是資料庫的 lock 。回到資料庫，為了維持 Transaction 的一致性（consistency）和隔離性（isolation），我們可以在資料被讀取或寫入時掛上一個 lock （像是公眾廁所燈有人使用時就會亮），其他 transaction 可以決定是否要等待或依然讀取。


## NoSQL 跟 SQL 的差別在哪裡？

參考資料：[了解NoSQL不可不知的5項觀念](https://www.ithome.com.tw/news/92506) 、 [網站部署](https://hackmd.io/VP6Jq8d0Ru-jVGiO94w-Yw?view)

無論是 SQL 或 NoSQL 指的都是拿來查詢資料庫的語言，而非資料庫系統。

#### 關聯式資料庫 SQL
- 儲存格式為 table （像是表格那樣）
- table 之間互相關聯（例如 id 都一樣）
- 結構穩定，但相對彈性低，也不支援 JOIN 。
- Transaction 遵守 ACID 。
- 常見如 MySQL、PostgreSQL、Microsoft SQL Server、SQLite

#### 非關聯式資料庫 NoSQL
- Not Only SQL
- 用不同型態儲存，因此資料可放的型態也更多元（例如陣列）
- 結構較不明顯，因此彈性更高，適合搜集數據。
- 相對的，查詢資料也比較慢。
- 使用 key-value 存資料，可以想像成 JSON。 
- 具有水平擴充能力，只要增加新的伺服器節點，就可以不斷擴充資料庫系統的容量。
- Transaction 遵守 CAP 。
- 常見如 mongodb。


## 資料庫的 ACID 是什麼？

參考資料： [維基百科 - ACID](https://zh.wikipedia.org/wiki/ACID)

Transaction 是指由一系列資料庫操作組成的一個完整的邏輯過程，為了保證 Transaction 的正確性，要符合以下四個特性：
- 原子性 atomicity：要嘛全部失敗，要嘛全部成功。可以想像匯款的時後只有成功（錢過去了）或失敗（錢沒過去），不會出現這邊錢減少但那邊卻沒增加的情形。如果過程中發生錯誤，則會退回開始前的狀態，就像什麼都沒發生一樣。
- 一致性 consistency：維持資料的一致性。也就是錢的總數相同。
- 隔離性 isolation：多筆交易不會互相影響，比如說不能同時改同一個值，詳細作法可看前兩題。
- 持久性 durability：交易成功之後，寫入的資料不會不見，就算系統故障也不會消失。