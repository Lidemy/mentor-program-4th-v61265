/* eslint-disable */

function escape(str){
  return str.replace(/\&/g, '&amp;')
    .replace(/\</g, '&lt;')
    .replace(/\>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/\'/g, '&#x27')
    .replace(/\//g, '&#x2F');
}

// 設定好參數
const commentsDom = $('.comments');
const siteKey = 'v61265';
const loadMoreButton = `<button class="btn btn-block btn-warning load-more">載入更多</button>`;
var lastID = null;

// 得到 token
const getUrlString = location.href;
const url = new URL(getUrlString);
const token = url.searchParams.get('token');
console.log(token);

// 把內容放進頁面
var sequence = 1;
function addCommentToDom(container, comment, isPrepend) {
  var created_at='';
  if (comment.created_at) {
    created_at = escape(comment.created_at);
  } else {
    created_at = 'new!';
  }

  var style = []
  if (sequence % 2 === 1) {
    style = ['border-info mb-3', 'text-info'];
  } else {
    style = ['border-danger mb-3', 'text-danger'];
  }

  const template = `
  <div class="card ${style[0]}" style="max-width: 100%;">
    <div class="card-header">${escape(created_at)}</div>
    <div class="card-body ${style[1]}">
      <h5 class="card-title">${escape(comment.nickname)}</h5>
      <p class="card-text">${escape(comment.content)}</p>
    </div>
  </div>
  `

  if (isPrepend) {
    container.prepend(template);
  } else {
    container.append(template);
  }
  sequence += 1;
}

// 用函式串 API
function getCommentsAPI(siteKey, lastID, cb) {
  // 設定 url
  var url = "http://mentor-program.co/mtr04group6/v61265/week12/board/api_comments.php?site_key=" + siteKey;
  if (lastID) {
    url += "&before=" + lastID;
  }

  //發送 request，並回傳 data
  $.ajax({
    url: url
  }).done((data) => {
    cb(data);
  }); 
}

// 用函式顯示留言
function getComments() {
  getCommentsAPI(siteKey, lastID, (data) => {
    $('.load-more').hide();
    if (!data.ok) {
      alert(data.message);
      return;
    }
    const comments = data.discussion;
    for (const comment of comments) {
      addCommentToDom(commentsDom, comment, false);
    }
    const length = comments.length;
    lastID = comments[length - 1].id;
    console.log(lastID);
    if (lastID > 5) {
      commentsDom.append(loadMoreButton);
    }
  });
}

// 沒錯的話就可以拿資料了
getComments();

// 偵測「顯示更多」
commentsDom.on('click', $('.load-more'), (e) => {
  getComments();
});

// 新增留言 POST
$('.add-comment-form').submit((e) => {
  e.preventDefault();
  const newComments = {
    site_key: 'v61265',
    nickname: $('input[name=nickname]').val(),
    content: $('textarea[name=content]').val()
  }
  $('input[name=nickname]').val('');
  $('textarea[name=content]').val('');
  $.ajax({
    type: 'POST',
    url: 'http://mentor-program.co/mtr04group6/v61265/week12/board/api_add_comment.php',
    data: newComments,
  }).done((data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }

    addCommentToDom(commentsDom, newComments, true);
  });
});
