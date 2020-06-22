## 教你朋友 CLI

# Command line 是什麼？
我們一般看到的視窗叫「圖形化介面」(Graphical User Interface，簡稱 GUI)。但早期還沒有圖形化界面之前，是透過一個文字視窗和電腦溝通，就是 Commend Line Interface ，簡稱 CLI ，其實就是用另一種方式對電腦下指令而已。
## 那我們為什麼要學 CLI？
因為有些功能只能用 CLI ，而且有時用用文字比較快。
不用把 CLI 想得太難，我們其實很習慣用文字溝通了。例如在臉書還沒有「哈」的表情符號可以按之前，我們就會使用 `XD` 來表示笑臉了。
# 在 windows 上使用 Command Line
推薦使用 Git 附加的 Git Bash，可在官網下載：https://git-scm.com/　（點進 Download 後就會自動下載，之後一直按 Next 即可安裝好）
第二選擇是 Cmder。
另外也可以用 [這個網站](https://bellard.org/jslinux/) 模擬 Commit Line 結果。
# 基本指令
以下所有指令其實都是程式，可以在電腦內找到對應的檔案。

| 指令 | 功能 | 指令 | 功能 |
| -------- | -------- | -------- | -------- |
| pwd | 印出所在位置 | ls | 印出現在位置下檔案 |
| cd | 切換資料夾 | clear | 清除頁面上所有資料 |
| man | 使用說明書 |  |  |

## pwd
Print Working Directory，印出所在位置。
![](https://static.coderbridge.com/img/v61265/bc7911a2649f4813a7421c5425a6bc46.png)
如上圖，我現在所下的指令是在「/c/Users/asus zenbook」這個路徑底下。
## ls
LiSt，印出現在資料夾底下檔案。
ls 後方可加參數，例如`ls -al`， a 就是「列出所有檔案，包含隱藏檔」， l 是用列表形式呈現檔案細部資料。
## cd
Change Directory，切換資料夾。
![](https://static.coderbridge.com/img/v61265/d5cb43bfe6fd41c8beb758068484dd46.png)
`cd Videos` 表示移動到現在位置下的資料夾 Videos， `cd ..` 是指回到上一層（就像在解壓縮檔裡面看到的點點）。另外資料夾前面的 `~` 是 ` /c/Users/asus zenbook/ ` 的簡寫。
## clear
把頁面上所有紀錄清空。
## man
MANual，使用說明書。
後面加上指令名稱就會顯示詳細用法。
![](https://static.coderbridge.com/img/v61265/ff52fb023d994690b60c2eb240b10de0.png)
但若用 windows 系統（如圖），因為沒有這個指令，就會顯示不存在。
# 和檔案相關的指令

| 指令 | 功能 | 指令 | 功能 |
| -------- | -------- | -------- | -------- |
| touch | 建立檔案或更改時間 | rm | 移除檔案 |
| mkdir | 建立資料夾 | rmdir | 移除資料夾 |
| mv | 移動檔案或改名 | cp | 複製檔案 |

## touch
功能：建立檔案或是更改時間
![](https://static.coderbridge.com/img/v61265/5bb02afb084547e790206e8f463484ed.png)
如上圖，對已經使用的檔案使用 `touch` ，會更改檔案最後更改時間。
![](https://static.coderbridge.com/img/v61265/8a30f761ad3b4b08b75ad0ae7b3a5fca.png)
如上圖，若本來沒有這個檔案，`touch` 會建立一個。

## rm
ReMove，移除檔案。
![](https://static.coderbridge.com/img/v61265/d291955430974d408f1b9e60bafb7fc6.png)
如圖，刪除 abc.txt 。
其他相關的指令：
`rmdir`：刪除資料夾。
`rm -r`：刪除資料夾及其底下的東西。
`rm -f`：強制刪除（忽略有些檔案的保護），要小心使用。

## mkdir
MaKeDIRrctory，建立資料夾。
**小訣竅：**只打檔案前幾個字再使用 `tab` ，可以不用打完全名。

## mv
MoVe，移動檔案或改名。
```
mv 欲移動檔案 移動目的地
```
**絕對路徑：**從 root 開始存取的路徑，也就是對檔案內容中的「位置」欄。
**相對路徑：**從現在所在的位置開始存取的路徑。
當 mv 的目的地不存在時，就會創造出新的檔案並將欲移動檔案移過去，也就是將檔案重新命名，可以理解為：
```
mv 欲改名檔案 新名稱
```

## cp
CoPy，複製檔案。
```
cp 欲複製檔案 複製後名稱
```
`cp -r`：複製的對象是資料夾時。
**小訣竅：**當操作對象是資料夾時，在指令後方直接加 `dir` 或 ` -r`。

# vim
vim 是大部分系統都會內建的文件編輯器，進入編輯器的語法如下：
```
vim 欲開啟檔案
```
一般模式：進到檔案後預設的模式。
編輯模式：在一般模式按 `i` 進入，之後按 `esc` 離開。這個模式可以自由編輯文件中的文字。
指令模式：在一般模式輸入 `:` 進入，之後按 `esc` 離開。可以對文件下指令，例如 `w` 為寫入 `q` 為離開 vim。 

# 其他指令

| 指令 | 功能 | 指令 | 功能 |
| -------- | -------- | -------- | -------- |
| cat | 連接文件 | less | 分頁印出檔案 |
| grep | 搜尋關鍵字 | wget | 下載檔案 |
| curl | 顯示 response | top | 顯示 process |
| date | 顯示現在時間 | echo | 在檔案上印出內容 |

## cat
```
cat 欲連接檔案1 欲連接檔案2
```
```
cat 欲印出檔案
```
`cat` 功能為連接兩個文件，若後方只有一個檔案，則可用來檢視文件內容。

## less
若檔案內容太多，也可使用 `less` 分頁印出檔案。
```
less 欲分頁印出檔案
```

## grep
```
grep 關鍵字 目標文件
```
![](https://static.coderbridge.com/img/v61265/8d7a44d4af254c42b0322f0ac84334b3.png)
如上圖，會顯示目標文件 `abc` 中有關鍵字 `w` 的那行。
（有些系統似乎會將關鍵字標成不同顏色）
## wget
```
wget 欲下載的檔案網址
```
## curl
```
curl API網址
```
會顯示response。

## top
Table Of Process，印出所有 process ，可用於看電腦狀況。

## date
顯示今天日期和時間

## echo
印出內容的指令，常見的搭配是：
```
echo "欲輸入內容" > 目標檔案
```
如此一來可以不用進入 vim 就改動檔案內容。

# 組合技
## redirection
作為重新導向 input 和 output 之用，例如：
```
ls -al > list_result
```
是將 `ls -al` 的結果輸出成一個叫 `list_result`的檔案。值得注意的是，`>` 後方檔案若原本有內容，會被全部覆蓋掉。若不想被覆蓋，可使用 `>>`，新的內容會出現在原本內容後。
## pipe
pipe 其實就是`|`這個符號。其功能是將左邊的輸入作為右邊輸入，例如：
![](https://static.coderbridge.com/img/v61265/6df84f2286bb43f8a72708ff8f1ba9cb.png)
其中 `cat abc | grep w` 的意思是將前面 `cat abc` 的結果輸入 `grep w`，因此會顯示出和 `grep w abc` 一樣的結果。

# 叛徒 h0w 哥的問題

> 用 command line 建立一個叫做 wifi 的資料夾，並且在裡面建立一個叫 afu.js 的檔案。

1. 建立資料夾： `mkdir wifi`
2. 切換進資校夾： `cd wifi`
3. 建立檔案： `afu.js`