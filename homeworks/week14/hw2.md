因為學長姐和同學寫過太多優秀的完整部屬心得了，這篇就簡單紀錄（因為忘記邊做邊截圖了嗚嗚）我自己跟著做時遇到的問題：防火牆、無法 ping 以及 phpmyadmin 設定問題。

## 先當個小傻瓜跟著做

一開始我乖乖跟著這篇做：[部署 AWS EC2 遠端主機 + Ubuntu LAMP 環境 + phpmyadmin](https://github.com/Lidemy/mentor-program-2nd-yuchun33/issues/15)

直到佈置完 phpmyadmin ， IPv4/phpmyadmin 卻出現「404 Not Found」。試圖解決這個狀況的時後一度把 phpmyadmin 裝不回去，後來想到我是用 Tasksel 下載 LAMP 的，於是把整個 Tasksel 重裝後又回到原點 XD

最後參考了同學的筆記： [
[ 紀錄 ] 部屬 AWS EC2 雲端主機 + LAMP Server + phpMyAdmin](https://mtr04-note.coderbridge.io/2020/09/15/-%E7%B4%80%E9%8C%84-%08-%E9%83%A8%E5%B1%AC-aws-ec2-%E9%9B%B2%E7%AB%AF%E4%B8%BB%E6%A9%9F-/)

```
sudo ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin
```

改動檔案位置就搞定了！

太好了，我決定先關電腦去睡覺，心想隔天應該就會完成了吧，懷抱樂觀的心態沉沉睡去。

## 醒來世界都不一樣了

隔天我想用 FileZella 開始傳送檔案，卻出現錯誤訊息：「錯誤:	FATAL ERROR: Network error: Connection refused」。連 ssh 都顯示「ssh: connect to host 52.199.209.140 port 22: Connection refused」進不去了 QQ

這時我想用 `ping` 查看網路是否被連接，結果是一直出現「要求等候逾時。」不過與此同時不管用網域或 IP 位置都可以正常顯示。用別台電腦都是這個結果，看來應該是遠端主機出問題，回去查看 AWS：

![](https://i.ibb.co/8K1CJWv/Fire-Shot-Capture-022-EC2-Management-Console-ap-northeast-1-console-aws-amazon-com.png)

看起來沒有問題啊，那應該就是 SSH 的防火牆的鍋了。

於是我打掉重開一台 EC2 ，參考了 [如何遠端連接虛擬主機上的 mySQL 資料庫 ？](https://github.com/Lidemy/mentor-program-2nd-futianshen/issues/33) 打開防火牆的 port 3306，離開後卻還是無法再進入。

我是被詛咒了吧！不是有那種古老的故事嗎？因為工程師女巫或巫師很生氣我父母沒邀請他參加我的出生派對，一氣之下就下了「這孩子未來怎麼部屬都會失敗」的詛咒。太狠毒了，真的是。（並沒有這種詛咒）

一氣之下，我先參考 [虛擬機器安裝ssh，關閉防火牆](https://www.itread01.com/content/1544077696.html) 關掉火牆。

```
ufw disable
```

世界和平，FileZella 終於可以進入了。

## 為了寫這個作業還是要面對一下

雖然關掉防火牆很美好，但一來是聽起來就超危險，二來還是應該要理解一下發生了什麼吧，逃避既可恥又沒用。

開始前我照慣例 ping 一下：

![](https://i.ibb.co/C00GDjg/image.png)

居然還是不行！查看 [故障診斷連接至您的執行個體](https://docs.aws.amazon.com/zh_tw/AWSEC2/latest/UserGuide/TroubleshootingInstancesConnecting.html#troubleshoot-instance-ping) ：

> 如果無法從執行個體發出 ping 指令，請確定安全群組外傳的規則，可允許 ICMP 傳輸流量，來讓 Echo Request 訊息傳到所有目的地，或是傳到您想要對其執行 ping 的主機。

打開之後就可以了：

![](https://i.ibb.co/8K1CJWv/Fire-Shot-Capture-022-EC2-Management-Console-ap-northeast-1-console-aws-amazon-com.png)

最後要回頭面對防火牆：[如何在Ubuntu 16.04上使用UFW设置防火墙](https://www.howtoing.com/how-to-set-up-a-firewall-with-ufw-on-ubuntu-16-04)

```
sudo ufw enable // 懷抱虔誠的心打開它 → 會出現可能會影響當前連線的警告，選 yes
sudo ufw allow ssh // 允許使用 ssh 連接
sudo ufw allow 22 //  允許 22 port
sudo ufw allow http // 允許 http
sudo ufw allow ftp // 允許 ftp
```

最後再用 `sudo ufw status verbose` 查詢開啟狀態：

![](https://i.ibb.co/KX1ks76/image.png)

搞定辣！！！！！（灑花）