function capitalize(str) {
  if(str[0] >= 'a' && str[0] <= 'z'){
    upper = String.fromCharCode(str.charCodeAt(0) - 32)
    str = str.replace(str[0], upper)
  }
  return str
}


console.log(capitalize('hello'));
console.log(capitalize('Hello'));
console.log(capitalize(',hello'));
