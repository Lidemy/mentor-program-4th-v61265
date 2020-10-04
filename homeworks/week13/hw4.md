## Webpack 是做什麼用的？可以不用它嗎？

Webpack 是一種 module bundler ，也就是可以將各種資源打包在一起，讓你可以在瀏覽器使用它。

之前使用 node.js 時，如果要將檔案外的模組（例如另一個檔案寫好一個功能後輸出）引入，可以使用 `require`。但這個語法和瀏覽器不相容，相對的瀏覽器要使用 `<script src='目標檔案'>` 引入作為全域變數，但若一次引入不只一個檔案，可能會發生變數名稱衝突，此時就必須使用 jQuery 提供的 .conflic() 排除。

既然沒有支援就自己寫ㄅ，於是就出現各種非官方的模組化規範，直到最近出現 ES6 規範。不過 ES6 的規範支援度還是不好，例如必須開 Server 、 必須在引入時標註 `type="module"；而且在想要引入其他人寫的套件時，必須將整份 `node_modules` 傳上去，或是在 import 輸入完整路徑，十分不好維護。

使用 Webpack 可以將所有檔案包成一個 main.js ，這樣瀏覽器只要引入就好了。更甚者它將模組的概念向外延伸至各種資源，像是 CSS 或圖片，再經過 loader 將資源打包成 .js 檔給瀏覽器使用。


## gulp 跟 webpack 有什麼不一樣？

glup 是一套 `task manager` ，而其中 task 的類型可以有很多種，也可以自訂功能，而 gulp 則是這些任務和流程管理。

webpack 則是 module bundler ，主要目標是將相互依賴的各種資源（可能透過 loader 轉換）包在一起，讓瀏覽器可以取用，但就不能像 gulp 可以自訂義 task 。


## CSS Selector 權重的計算方式為何？

[資料來源](https://ithelp.ithome.com.tw/articles/10196454)

原則：
1. 越詳細優先
3. 如果一樣，後面的會覆蓋前面的

優先順序：
1. !import
2. inline style（直接寫在 HTML 內的 style)
3. ID
4. Class/psuedo-class(偽類)/attribute（屬性選擇器）
5. Element
6. *

若兩者有一個 Selector 有（如上述）優先順序比較前面的東西，就會先排在前面，若沒有則可加總比較：（3 可視為百位數、 4 可視為十位數、 5 可視為個位數）

| seloctor | 百 | 十 | 個 | 加總 |
| -------- | -------- | -------- | -------- | -------- |
| #footer　| 1 | 0  |0 | 100 |
| li.container.red	　| 0 | 2 | 1 | 021 |
| .container li　| 0 | 1  |1 | 011 |

