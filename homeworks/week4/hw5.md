# hw5：簡答題
參考資料：
[zoeaeen13 同學的作業](https://github.com/Lidemy/mentor-program-4th-zoeaeen13/blob/master/homeworks/week4/hw5.md)
[API 到底是什麼？ 用白話文帶你認識](https://medium.com/codingbar/api-%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E9%BA%BC-%E7%94%A8%E7%99%BD%E8%A9%B1%E6%96%87%E5%B8%B6%E4%BD%A0%E8%AA%8D%E8%AD%98-95f65a9cfc33)
[HTTP 狀態碼](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status)

## 請以自己的話解釋 API 是什麼？

API 全名為 `Application Programming Interface`，中文翻譯為「應用程式介面」。簡單來說就是交換資料的管道。

舉例來說好了，今天你進到一家拉麵店，要如何和廚房說你要什麼品項？因為你已經來過很多次了，所以走到拉麵販賣機前點餐，而　`這個販賣機就是 API` 。你和廚房可以透過販賣機溝通（使用 API），你開店的時候別人也可以從販賣機點餐（提供 API）。

讓我們整理一下：
- 店面 = 網站或 APP
- 販賣機 = API
- 你 = 使用者
- 廚房 = 資料庫
- 拉麵 = 資料

## 請找出三個課程沒教的 HTTP status code 並簡單介紹
`status code` 表示一個 HTTP 要求是否已經被完成，代表 API 層的執行狀態。
status code 大約分成幾種：
- 1xx = Informational（資訊）
- 2xx = Success（成功）
- 3xx = Redirect（重定向）
- 4xx = User error（客戶端錯誤）
- 5xx = Server error（伺服器端錯誤）

以下列出課程沒提到的 HTTP status code：
`201 Created`：請求成功且新的資源成功被創建，通常用於 POST 或一些 PUT 請求後的回應。
`400 Bad Request`：此回應意味伺服器因為收到無效語法，而無法理解請求。
`403 Forbidden`：用戶端並無訪問權限，例如未被授權，所以伺服器拒絕給予應有的回應。不同於 401，伺服端知道用戶端的身份。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

參考資料：
[[Week4] JS 實作串接 API（一）](https://www.coderbridge.com/@v61265/96aabb89d7f74d968b6d616223c9f97e)
[[Week4] JS 實作串接 API（二）](https://www.coderbridge.com/@v61265/c25ef83b1cf1425eabff8edbd0aefa00)

Base URL: https://v61265.com

| 說明 | Method | path | 參數 | 範例 |
| -------- | -------- | -------- |
| 獲取所有餐廳資料 | GET | /restaurants | _limit:限制回傳資料數量 | /restaurants?_limit=5 |
| 獲取單一餐廳資料 | GET | /restaurants/:id | 無 | /restaurant/10 |
| 新增餐廳 | POST | /restaurants | name: 店名 | 無 |
| 刪除餐廳 |DELETE| /reataurants/:id | 無 | 無 |
| 更改餐廳資訊 | PATCH | /restaurants/:id | name: 店名 | 無 |

## 回傳所有餐廳資料
```
const request = require('request');

request('https://v61265.com/reataurants', (err, res, body) => {
  // 這裡是你要的內容
});
```

## 回傳單一餐廳資料
```
const request = require('request')

request(`https://v61265.com/restaurants/${id}`, (err, res, body) => {
  //這裡是你要的內容
});
```

## 增新餐廳
```
const request = require('request');

request.post( {
  url: 'https://v61265.com/restaurants',
  form: {
    name //新餐廳名稱
  },
}, (err, res, body) => {
  //這裡是你想要的內容
});
```

## 刪除餐廳
```
const request = require('request');

request.delete(`https://v61265.com/restaurants/${id}`, (err, res, body) => {
  //這裡可以加其他東西
});
```

## 更改餐廳資訊
```
const request = require('request');

request.patch( {
  url: `https://v61265.com/restaurants/${id}`,
  form: { name }
}, (err,res,body) => {
  //可以加其他東西
});
```

最後附上有時間可以回頭看的： [[原來後端要知道] 如何寫 API 文件？ #Apiary #API Blueprint # Markdown](https://ithelp.ithome.com.tw/articles/10230804)