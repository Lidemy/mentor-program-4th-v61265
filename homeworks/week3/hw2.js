const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', line => lines.push(line));

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

rl.on('close', () => solve(lines));
