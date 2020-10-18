/* eslint-disable */

const url = 'https://api.twitch.tv/kraken';
const client_id = 'h0qt13iquzkklzi1jt1mvb94348gmv';
const accept = 'application/vnd.twitchtv.v5+json';

const template = `
  <div class='stream'>
  <img src='$preview'/>
  <div class='stream__data'>
    <img src='$logo'/>
    <div class='data__desc'>
      <div class='desc__title'>
        $title
      </div>
      <div class='desc__user'>
        $author
      </div>
    </div>
  </div>
  </div>
`;

/* 發送 request 拿遊戲列表 */

/* 留著之前的對照
function getGames(cb) {
  const request = new XMLHttpRequest();
  request.open('GET', `${url}/games/top?limit=5`, true);
  request.setRequestHeader('Client-ID', 'h0qt13iquzkklzi1jt1mvb94348gmv');
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let gamesData;
      try {
        gamesData = JSON.parse(request.response);
      } catch (err) {
        return;
      }
      cb(gamesData);
    }
  };
  request.send();
} */


function getGames(cb) {
  fetch(`${url}/games/top?limit=5`, {
    method: 'GET',
    headers: new Headers({
      'Client-ID': client_id,
      Accept: accept
    })
  }).then((response) => {
    if (response.status >= 200 && response.status < 400) {
      response.json().then(data => cb(data));
    }
  }).catch((err) => {
    console.log(err);
  })
}

/* 發送 request 拿直播清單 */

/* 留著之前的對照
function getStreams(name, cb) {
  const request = new XMLHttpRequest();
  request.open('GET', `${url}/streams?game=${encodeURIComponent(name)}&limit=20`, true);
  request.setRequestHeader('Client-ID', 'h0qt13iquzkklzi1jt1mvb94348gmv');
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let streamsData;
      try {
        streamsData = JSON.parse(request.response).streams;
      } catch (err) {
        return;
      }
      cb(streamsData);
    }
  };
  request.send();
} */

function getStreams(name, cb) {
  fetch(`${url}/streams?game=${encodeURIComponent(name)}&limit=20`, {
    method: 'GET',
    headers:  new Headers({
      'Client-ID': client_id,
      Accept: accept
    })
  }).then(response => {
    if (response.status >= 200 && response.status < 400) {
      response.json().then(data => cb(data.streams));
    }
  }).catch(e => e)
}

/* 更改內容（標題和內文） */
function changeStreams(streams) {
  const title = document.querySelector('.title h1');
  title.innerText = streams[0].game;
  streams.forEach((stream) => {
    const element = document.createElement('div');
    const content = template
      .replace('$preview', stream.preview.large)
      .replace('$logo', stream.channel.logo)
      .replace('$title', stream.channel.status)
      .replace('$author', stream.channel.name);
    document.querySelector('.streams').appendChild(element);
    element.outerHTML = content;
  });
  const placeholder = document.createElement('div');
  placeholder.classList.add('stream-empty');
  document.querySelector('.streams').appendChild(placeholder);
  document.querySelector('.streams').appendChild(placeholder);
}

/* 拿到前五名名稱 & 設定好 navbar 和 第一頁 */
getGames(games => {
  const gamesList = games.top.map(game => game.game.name);
  for (const game of gamesList) {
    const navbarGame = document.createElement('li');
    navbarGame.innerText = game;
    document.querySelector('.navbar__list').appendChild(navbarGame);
  }
  getStreams(gamesList[0], (data) => {
    changeStreams(data);
  });
});

/* 切換選單 */
document.querySelector('.navbar__list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const name = e.target.innerText;
    document.querySelector('.streams').innerHTML = '';
    getStreams(name, (data) => {
      changeStreams(data);
      console.log(data);
    });
  }
});
