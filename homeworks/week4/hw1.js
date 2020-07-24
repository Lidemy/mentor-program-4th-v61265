/*
1. 把 API 用物件格式抓下來
2. 先一次try 轉成物件後再一次 try
*/

const request = require('request');

const api = 'https://lidemy-book-store.herokuapp.com';

request(`${api}/books?_limit=10`, (error, response, body) => {
  if (error) return console.log('抓取失敗', error);
  let json;
  try {
    json = JSON.parse(body);
  } catch (e) {
    return console.log(e);
  }
  for (let i = 0; i < json.length; i += 1) {
    console.log(json[i].id, json[i].name);
  }
  return true;
});
