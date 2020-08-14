## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

資料來源： [HTML常用標籤彙總、CSS常用屬性彙總](https://www.itread01.com/content/1546973283.html)
`<base>`：規定頁面上的所有連結規定預設地址或預設目標。
- href: 連結規定預設地址
- target: 頁面開啟方式，取值同<a>的target
`<center>`：對其所包括的文字進行水平居中。
`<hr> `：建立一條水平線。


## 請問什麼是盒模型（box modal）

參考資料： [前端基礎：CSS盒模型（box model）](https://medium.com/@hugh_Program_learning_diary_Js/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A4%8E-css-%E7%9B%92%E6%A8%A1%E5%9E%8B-box-model-1b977df8d3d0)

盒模型是指在 CSS 中，將每個元素視為一個盒子（BOX），再針對該盒子做調整。

由內至外依序是：content → padding → border → margin，值得注意的是，因為預設上除了 content 以外的都是往外長，因此若調整外面三個會影響整體大小，例如：

```
.example {
    width: 100px;
    padding: 10px;
    border: 12px;
}
/*整個盒子的寬度是 100 + 10 * 2（因為有兩邊） + 12 * 2 = 144px*/
```

解決方法之一是用減法，例如就把 width 設成 56 ，但這樣一來要多算一次很麻煩，而且要是 PM 忽然想把 border 設成 13 怎麼辦。因此會採取另一個屬性： `box-sizing:border`，設定 width 和 height 時就會將 padding 和 border 一起算進來了～


## 請問 display: inline, block 跟 inline-block 的差別是什麼？

參考資料： [前端基礎：CSS盒模型（box model）](https://medium.com/@hugh_Program_learning_diary_Js/%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A4%8E-css-%E7%9B%92%E6%A8%A1%E5%9E%8B-box-model-1b977df8d3d0)

`block` 表示什麼屬性都可以調，是 <div> 、 <h1> 、 <p> 等標籤的預設屬性，同時也表示元素本身會占滿整行。

`inline` 就可和其他元素並排，是 <span> 和 <a> 的預設屬性，但無法調整寬高和上下邊距，padding 的上下可以調整，但不會影響到其他元素。 

但如果想要並排又想調整上下，就可以使用 `inline-block` ，它也是 <botton> 、 <input> 和 <select> 的預設屬性。值得注意的是，使用 inline-block 時元素和元素中的空白也會被顯示，若想刪掉只要刪掉空白或在空白處使用附註連接就好。


## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

參考資料： [CSS Layout - The position Property](https://www.w3schools.com/css/css_positioning.asp)

`static`：預設的屬性，不會受到 top 、 bottom 、 left 、right 和 z-index 影響。
`relative`：設定的上下左右都是相對原本的位置，但不會脫離整個排序（還是會和其他元素互相影響）。
`absolute`：相較於「往上找第一個不是 static 的元素」移動，如果往上找都沒有，其效果就會類似 fixed 。
`fixed`：相較於螢幕可見範圍的位置，可以想像有些網站怎麼滑都還是在左右的廣告。