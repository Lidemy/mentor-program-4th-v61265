## 什麼是 MVC？
資料來源：[MVC架構是什麼？認識 Model-View-Controller 軟體設計模式](https://tw.alphacamp.co/blog/mvc-model-view-controller)

![](https://uploads-ssl.webflow.com/5d3a7aed4e11720246d46f49/5f4f452c994a915d86e7f01e______2017-11-28_17.00.25.png)

MVC 是 `Model` 、 `View` 和 `Controller` 的縮寫，目的是將程式按照功能分成三個部分。

通常 request 會先送到 `Controller` ，`Controller` 就有點像 PM ，分配好工作流程（像是要先確認是否有登入、拿資料生產 API 等等），之後會叫 `Model` 和資料庫拿資料，拿回來資後會給 `View`（可以想成一個模板） 渲染畫面，最後再 response 給 client 。


## 請寫下這週部署的心得

我這週兩個作業分別使用 Nginx 和 Heroku 部屬，一度前天晚上明明只剩下資料庫連接了，一起床被 ssh 擋在外面超崩潰，每次部屬就像是在做創傷後復原，進三步退兩步（不要用這麼難以理解的比喻！）

光是 nginx 部屬就花了超過一天，中間被大提問時代的紀錄救過兩次（感恩讚嘆），最後還是偷偷求助同學才成功。倒是 debug 過程中被同學安撫了四五次「不要急」、「慢慢來」，雖然他講的應該是不要全部一起跑會不知道是哪裡的問題，但我覺得我整個人都非常非常非常需要這個建議！ㄟ也不是說我進度慢成這樣沒關係（嗚嗚），而是看到 CLI 噴錯先不要慌。部屬的問題不像平常寫前端那樣具體指出哪一行，而是會指向一個根本不知道在幹嘛的設定檔，然後 SSH 又是不熟悉的 Ubuntu ，不過現在覺得寫程式沒有問題好像才有問題，靜下心來不要急好像才是正確解法 wwwww 

不過本來有在考慮走後端感覺比較像我想像中的帥氣工程師 (???) ，現在部屬的陰影強成這樣還是先走前端好了（縮在角落）

哪天還要部屬的話會需要的資料：
[Nginx 部屬](https://medium.com/@michael.niedermayr/ssh-to-aws-ec2-instance-using-the-web-browser-786bd4d2663b)
[nginx 和 phpmyadmin 連接](https://websiteforstudents.com/install-nginx-mariadb-and-php-7-2-fpm-with-phpmyadmin-on-ubuntu-16-04-18-04-18-10-lemp-phpmyadmin/)
這兩篇都有提到 `/etc/nginx/sites-available/` 設定檔，是一樣的，小心不要重複設定。



## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？

回、回不去了（O）

我覺得除了可以不用再寫 SQL query ，寫 PHP 的時候是每進入一頁某個 .php 檔案就開始啪塌啪塌進行，自己要什麼資料就要自己用 SQL query 去撈，要什麼畫面就自己渲染。但 express 和 sequelize 使用 VMP 和福斯汽車的生產線一樣進行了專業分工，我的腦袋就會變成「喔進入這個頁面後，我要先做身分認證，然後叫哪個 model 去調資料，最後再請哪個 view 幫忙渲染。」不只是檔案內看起來比較乾淨，連心靈都變得清澈和有條理ㄌ。