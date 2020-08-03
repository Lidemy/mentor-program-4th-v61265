const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', line => lines.push(line));

function reverse(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    result += str[i];
  }
  return result;
}

function solve(input) {
  console.log((reverse(input[0]) === input[0]) ? 'True' : 'False');
}

rl.on('close', () => solve(lines));
