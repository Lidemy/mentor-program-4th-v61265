const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', line => lines.push(line));

function solve(input) {
  let star = '*';
  for (let i = 1; i <= input[0]; i += 1) {
    console.log(star);
    star += '*';
  }
}

rl.on('close', () => solve(lines));
