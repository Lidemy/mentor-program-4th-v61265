/* eslint-disable */
const targetUrl = 'https://salty-mountain-39982.herokuapp.com/lottory/result';
const errorMessage = '系統不穩定，請再試一次';
let info;
let className;

// 拿 API
async function getPrize(cb) {
    fetch(targetUrl)
      .then((response) => {
          if (response.status >= 200 && response.status < 400) {
            response.json().then(data => cb(null, data));
          }
        })
      .catch(err => cb(err));
}

let isClick = true;
$('.btn__lottery').on("click",() => {
  if(isClick) {
    getPrize((err, data) => {
      if (err) {
        alert('系統不穩定，請稍後再試');
        return;
      }
      /* 原本的藏起來 & 新的出來 */
      $('.lottery__wrapper').hide();
      $('.lottery__result').show();
      $('.image').attr('src', data.image);
      $('.card-title')[0].innerText = data.name;
      $('.card-text')[0].innerText = data.description;
    });

    // 防止重複點擊
    isClick = false;
    setTimeout(() => {
      isClick = true;
    }, 1000);
  }
});

$('.btn__lottery__result').click((e) => {
  if(isClick) {
    if (e.target) {
      window.location.reload();
    }

    // 防止重複點擊
    isClick = false;
    setTimeout(() => {
      isClick = true;
    }, 1000);
  }
});
