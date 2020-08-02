const request = require('request');

const apiUrl = 'https://api.twitch.tv/kraken/games/top';
const clientID = 'h0qt13iquzkklzi1jt1mvb94348gmv';

request({
  method: 'GET',
  url: apiUrl,
  headers: {
    'Client-ID': clientID,
    Accept: 'application/vnd.twitchtv.v5+json',
  },
}, (err, res, body) => {
  if (err) return console.log('抓取失敗');
  const data = JSON.parse(body).top;
  for (const i of data) {
    console.log(i.viewers, i.game.name);
  }
  return true;
});
