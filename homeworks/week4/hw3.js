const request = require('request');

const apiUrl = 'https://restcountries.eu/rest/v2';
const name = process.argv[2];

if (!name) {
  console.log('請輸入國家名稱');
}

request(`${apiUrl}/name/${name}`, (err, res, body) => {
  if (err) {
    return console.log('抓取失敗');
  }
  const data = JSON.parse(body);
  if (data.status === 404) return ('找不到國家資訊');
  for (let i = 0; i < data.length; i += 1) {
    console.log('============');
    console.log('國家:', data[i].name);
    console.log('首都:', data[i].capital);
    console.log('貨幣:', data[i].currencies[0].code);
    console.log('國碼:', data[i].callingCodes[0]);
  }
  return true;
});
