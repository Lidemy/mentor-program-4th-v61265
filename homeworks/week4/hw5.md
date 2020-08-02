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