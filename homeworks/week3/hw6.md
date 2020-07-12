![](https://i.imgflip.com/47apna.jpg)

## hw1：好多星星

### 思路

1. 總共有 n 行 → 重複進行 n 次（1~n）;
2. 第一行有一顆星星;
3. 第二行有兩顆星星。以此類推，第 x 行有 x-1 行的星星數 +1。

### 寫法

```
function solve(input) {
  let star = '*';
  for (let i = 1; i <= input[0]; i += 1) {
    console.log(star);
    star += '*';
  }
}
```

### 心得
看到好多同學的心得都用 repeat 函式，變成 `console.log('*'.repeat(i));` 。確實直接讓第 x 行有 x 顆星星最直觀，算是學到一課！


## hw2：水仙花數

### 思路

1. 輸入的兩數間逐一判斷是否等於自己通過 narcissus 函式的結果，若是就印出來。
2. 水仙花數判斷函式：先將數字轉為字串，每個數字 n 再進行自己的 n 次方。

### 寫法

```
function narcissus(n) {
  const newN = `${n}`;
  const time = newN.length;
  let ans = 0;
  for (let j = 0; j < n.length; j += 1) {
    ans += Number(newN[j]) ** time;
  }
  return ans;
}

function solve(input) {
  const newInput = input[0].split(' ');
  const a = Number(newInput[0]);
  const b = Number(newInput[1]);
  for (let i = a; i <= b; i += 1) {
    if (narcissus(i) === i) console.log(i);
  }
}
```

### 心得

LIOJ 的題目最麻煩的是要將輸入拆解成數字，而且拆完之後還是以字串形式出現，因此我都會習慣先轉成數字。但進入 narcissus 的迴圈後，又只有字串可以得到長度和個別位數，也就是說還要轉成字串後拆開轉成數字。數字轉字串時，因為數字加字串會輸入字串，所以我都會習慣 `+= ''` ，但這個做法不得到 ESlint 允許，只好使用 ES6 的 Template Literals 轉換。

但也有不用轉字串就得到各個位數的方法，比如說 Huli 提到的除以十之後的餘數就是個位數，除以十之後無條件捨去再除以十的餘數就是十位數。


## hw3：判斷質數

### 思路

1. 從 2~(n-1) 如果 n 能整除任何數，就不是質數，不然就是質數。
2. 1 不是質數。

### 寫法

```
function solve(input) {
  for (let i = 1; i < input.length; i += 1) {
    let isPrime = 'Prime';
    const num = Number(lines[i]);
    for (let j = 2; j < num; j += 1) {
      if (num % j === 0) isPrime = 'Composite';
    }
    if (num === 1) isPrime = 'Composite';
    console.log(isPrime);
  }
}

```

### 心得

看到 MoreCoke 的 [心得](https://github.com/Lidemy/mentor-program-4th-MoreCoke/blob/master/homeworks/week3/hw6.md) ，發現原來只要根號內沒有因數，那該數就會是質數。奇怪但實用的知識增加了！


## hw4：判斷迴文

### 思路

1. 開一個新的空字串，從最後一個字開始添加。
2. 如果輸入本身和 1 過後的結果一樣，回傳 'True' ，否則回傳 'False' 。

### 寫法

```
function back(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    result += str[i];
  }
  return result;
}

function solve(input) {
  console.log((back(input[0]) === input[0]) ? 'True' : 'False');
}
```

### 心得

偷偷用這題熟悉三元運算子，其實如果 True 和 False 是小寫，就可以直接印出 `(back(input[0]) === input[0])` 。雖然這題禁止使用內建函式，但還是提醒一下自己之後可以使用 `.reverse` 。


## hw5：聯誼順序比大小

### 思路

1. 因為可以輸入超過 JavaScript 最大值，直接比大小會造成誤差。
2. 函式 compare 會回傳 a 是否大於 b 。
3. 如果兩數長度一樣，就從最大的位數 (n[0]) 開始比。
4. 如果長度不同，就回傳比較長的。
5. 看要比大比小，決定回傳哪個。

### 寫法

```
function compare(n1, n2) {
  const a = n1.length;
  const b = n2.length;
  if (a === b) {
    for (let j = 0; j < a; j += 1) {
      if (n1[j] !== n2[j]) return (n1[j] > n2[j]);
    }
  }
  return (a > b);
}

function solve(input) {
  for (let i = 1; i < input.length; i += 1) {
    const temp = input[i].split(' ');
    if (temp[0] === temp[1]) {
      console.log('DRAW');
    } else if (temp[2] === '1') {
      console.log(compare(temp[0], temp[1]) ? 'A' : 'B');
    } else {
      console.log(compare(temp[0], temp[1]) ? 'B' : 'A');
    }
  }
}
```

### 心得

一開始沒看清楚範圍，當然就華麗的過不去。看了 spectrum 的討論才學到，如果用 `BigInt(value)` 就不會被範圍限制。這題繼續快樂使用三元子判斷，不然太多狀況要 if 了會寫太長。

在判斷兩個數同樣長度的時候，我本來寫的是：

```
if (n1[j] === n2[j]) continue;
return ((n1[j] > n2[j]) ? true: false);
```
概念是「如果這個位數一樣大，就繼續往後找，不一樣再判斷大小」，但遇到兩個問題：
1. 回傳 true: false 很多餘，就算只是 return `n1[j] > n2[j]` 也會得到一樣的答案。
2. ESlint 不准我用 continue 。

因此後來乾脆反過來寫：「如果他們不等於再來再來判斷大小」，也順便省掉一行，真棒。

最後，非常同意 WooooHuan 的心得寫的：

> 聯誼時在卡片上寫了 500 多位數，只為了比大小，感覺會被討厭