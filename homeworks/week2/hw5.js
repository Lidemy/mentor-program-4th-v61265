function join(arr, concatStr) {
  var result = arr[0]
  for(i = 1; i < arr.length; i++){
    result += concatStr + arr[i]
  }
  return result
}

function repeat(str, times) {
  var result = ''
  for(j = 1; j <= times; j++){
    result += str
  }
  return result
}

console.log(join(['a'], '!'));
console.log(join([1, 2, 3], ''));
console.log(join(['a', 'b', 'c'], '!'));
console.log(join(['a', 1, 'b', 2, 'c', 3], ','));
console.log(repeat('a', 5));
console.log(repeat('yoyo', 2))