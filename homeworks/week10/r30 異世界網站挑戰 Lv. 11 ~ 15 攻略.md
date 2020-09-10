
## r3:0 異世界網站挑戰 Lv. 11 ~ 15 攻略

之前好像會有點跑版，全篇同步放於 [r3:0 異世界網站挑戰 Lv. 11 ~ 15 攻略](https://www.coderbridge.com/@v61265/3b7e22d3f13845aa8872ae77973341ce) ，直接於部落格觀看可以獲得較佳體驗～ 

# 前情提要
遊戲連結：[r3:0 異世界網站挑戰](https://r30challenge.herokuapp.com/)
因為之前的關卡已經有人 [寫過了](https://hsiangfeng.github.io/javascript/20190728/313613648/) ，因此這篇就只寫最近更新的 11 ~ 15 關。

# 十一關
![](https://static.coderbridge.com/img/v61265/a87d552441bf49578eb5da42d466f6b6.png)
###### 內容果然還是很中二 XDDD
用右鍵打開檢查後，發現有個 API 因為同源政策串接失敗，因此我們要避開瀏覽器，使用 Node.js 得到 API 。
![](https://static.coderbridge.com/img/v61265/485db60c57504e21b71048ad8f74ed7a.png)
```
const request = require('request');
request.post({uri:'https://glacial-everglades-11859.herokuapp.com/api.php'}, function(err, res, body) {
    console.log(body);
})
```
執行後就可以得到 token 前往下一關了 XD

# 十二關
![](https://static.coderbridge.com/img/v61265/b26a62ac23ab4a53baa14b3002552bc9.png)
###### 這吐槽意外的很精準啊 (?)
點開網址後會出現很像 PTT 風格的討論版，上面的「管理員登入」讓人卡好久，後來才發現他不是 submit 只是普通文字，超惡趣味 (?) 

真正的機關在 .js 檔裡面：
![](https://static.coderbridge.com/img/v61265/433787f94e9245baa779a50f5075e547.png)
id 不等於 888888 才會送出 request，那 id=888888 的那條訊息到底有甚麼呢？我們用 Node.js 發出 request 看看：
```
const request = require('request');
request('http://r30challenge.herokuapp.com/news_api.php?id=888888', function(err, res, body) {
    console.log(body);
})
```
出現了！ 
`能看到這則留言的你，想必就是天選之人吧！ {fakeituntilyoumakeit} 拯救這個世界吧！`

# 十三關
![](https://static.coderbridge.com/img/v61265/1fa9dbd9f62740f299db3ce7f36b722c.png)
###### 老實說我非常佩服主角堅持吐槽
點開瀏覽器的 Response Header ，會發現 Set-cookie 那攔寫 `Set-Cookie: token=do_you_really_know_how_to_set_cookie?; Comment=real_token_is:{you_are_cookie_master}`
輸入就可以破關了～

# 十四關
![](https://static.coderbridge.com/img/v61265/439e3fbe38444888a27420cbef24ff82.png)
基本上就是變向的猜數字遊戲了，反應時間越長表示越接近標準答案。
![](https://static.coderbridge.com/img/v61265/fcfb8c2cc1f74e89bb4f59c80da2e8b1.png)

# 十五關
![](https://static.coderbridge.com/img/v61265/529ca75440b946fba2c2913f12985fbd.png)
###### 從第二句看來，我們主角已經對異世界產生認同感ㄌ
不知道要做什麼的時候，只要打開 Devtool 就可以找到線索！果然 .php 檔中找到一段被隱藏的程式碼：
```
<!-- secret logic
          function isTokenValid($token) {
            $h = date('H');
            $m = date('i'); 
            $a = $h * $m + 42;
            $count = 0;
            for($i = 0; $i < 8; $i++) {
              $count += ord($token[$i]) - 65;
            }
            if ($count <= 100) {
              return false;
            }
            return $a % $count === 0;
          }
        -->
```
從上述整理出以下線索：
1. token 有八個字。
2. 這八個字的 ASCII 各自減掉 65 後相加等於 `$count`，必須大於一百。
3. `$a` 是送出時間的小時（24 小時寫法）乘以分鐘再加上 42 ，必須可以整除 `$count`。

最後我設定在五分鐘後 16 點 35 送出，如此一來 $a 就等於 602 ，其大於一百的因數只有 301 。英文字母中 ASCII 最大的 z 是 122：
122 - 65 = 57
301 / 57 = 5.2（有五個 z）
301 % 57 = 16
剩下三個可以放 2 個 ASCII 為 73 的 I 和一個 65 的 A ， 最後成功在時間內送出 `?token=zzzzzIIA` 。

# 簡易破關心得
![](https://static.coderbridge.com/img/v61265/45d1db85ee064f618afd88d62d13a897.png)
我還是回去當我的工程師好了（#
沒有啦，老實說我卡最久的是第十一關。一來是發現接下來的路沒有攻略可以偷看，二來是作賊心虛，看到 API 無論如何先害怕慌張一下，而且一直覺得 POST 應該就是要新增什麼東西，因此就算有 url 了，找不到要 POST 的東西又讓我更慌張，最後還是看到第十週心得偷偷去問 [Nicolakacha](https://github.com/Nicolakacha) 同學才解開，真的是十分感謝（合十）
這個系列都好有趣，滿足我市面上優質的免費解謎遊戲不夠的困擾，尤其這次完全透過螢幕感受到製作者的中二之力迎面而來 XD
如上面所說，我前十關偶爾會偷看別人的解答，是因為這幾關比較新才還沒有人製作攻略。不過完全靠自己解出來的關卡爽度就是不一樣，因此我也不是很確定這篇文章對其他人到底是好是壞，但總之我玩得很爽，希望能幫到你：）