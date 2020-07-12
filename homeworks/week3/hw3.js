const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', line => lines.push(line));

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

rl.on('close', () => solve(lines));
