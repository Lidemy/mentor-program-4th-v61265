/* eslint-disable */

const targetUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const errorMessage = '系統不穩定，請再試一次';
let info;
let className;

/* 設定資料 */
const lottoryResults = [
  {
    prize: 'NONE',
    info: '銘謝惠顧',
    className: 'none',
  }, {
    prize: 'FIRST',
    info: '恭喜你中頭獎了！日本東京來回雙人遊！',
    className: 'first',
  }, {
    prize: 'SECOND',
    info: '二獎！90 吋電視一台！',
    className: 'second',
  }, {
    prize: 'THIRD',
    info: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
    className: 'third',
  },
];

/* 發送 request */
function getPrize(cb) {
  const request = new XMLHttpRequest();
  request.open('GET', targetUrl, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let data;
      /* 測試是否有誤 */
      try {
        data = JSON.parse(request.response);
      } catch (err) {
        cb(errorMessage);
        console.log(err);
        return;
      }
      if (!data.prize) {
        cb(errorMessage);
        return;
      }
      /* 都沒問題就回傳 data */
      cb(null, data);
    } else {
      cb(errorMessage);
    }
  };
  request.onerror = () => {
    cb(errorMessage);
  };
  request.send();
}

/* 監聽是否按下按鈕 */
document.querySelector('.btn__lottery').addEventListener('click', () => {
  /* 如果出錯就只跳 errorMessage */
  getPrize((err, data) => {
    if (err) {
      alert(err);
      return;
    }
    /* 設定好 info 和 className */
    for (const result of lottoryResults) {
      if (data.prize === result.prize) {
        ({ prize, info, className } = result);
      }
    }
    /* 原本的藏起來 & 新的出來 */
    document.querySelector('.lottery__wrapper').classList.toggle('hidden');
    document.querySelector('.lottery__result').classList.toggle('hidden');
    /* 換背景和字 */
    document.querySelector('.lottery').classList.add(className);
    document.querySelector('.lottery__result h2').innerText = info;
  });
});

document.querySelector('.btn__lottery__result').addEventListener('click', (e) => {
  if (e.target) {
    window.location.reload();
  }
});
