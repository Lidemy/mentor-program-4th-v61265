## 交作業流程

1. 把雲端上的最新版本抓下來 `git pull origin master` ，確保和最新狀況一樣等等才能順利上傳。
2. 開一個新 branch `git branch (branch name)` 並切換過去 `git checkout (branch name)` 。也可用組合技 `git branch -b (branch name)`。 
3. 在自己的電腦裡編輯作業，寫寫寫。（記得要檢查）
4. 寫完之後建立一個新 commit `git commit -am "說明"` ，若有新增的檔案則用 `git add .` 和 `git commit -m "說明"`。
5. 把檔案上傳 `git push origin (branch name)` 。
6. 在 GitHub 上 pull requst 。
7. 到系統作業列表新增作業。
8. 等助教 merge 。
9. 切回 master `git checkout master`。
10. 把最新檔案抓下來 `git pull origin master`
11. 刪掉本地的 branch `git branch -d (branch name)`

