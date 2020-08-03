const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', line => lines.push(line));

function solve(input) {
  for (let i = 1; i < input.length; i += 1) {
    let isPrime = true;
    const num = Number(lines[i]);
    for (let j = 2; j < num; j += 1) {
      if (num % j === 0) isPrime = false;
    }
    if (num === 1) isPrime = false;
    console.log(isPrime ? 'Prime' : 'Composite');
  }
}

rl.on('close', () => solve(lines));

/*

原本寫法：
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

Huli：
簡單講一下目前這樣寫的壞處，就是如果題目要求輸出的字串（Prime, Composite）要改的話，你要改三個地方
而且是散落各地

比較建議的做法是你的 isPrime 存的是 boolean，最後輸出時才輸出題目要求的字串

*/
