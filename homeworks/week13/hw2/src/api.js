/* eslint-disable */

// 串 api 的函式
export function getCommentsAPI(apiUrl, siteKey, lastID, cb) {
  // 設定 url
  var url = `${apiUrl}api_comments.php?site_key=` + siteKey;
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

// 拿留言 api
export function newComments(apiUrl, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comment.php`,
    data: data
  }).done((data) => {
    if (!data.ok) {
      alert(data.message);
      return;
    }
    cb(data)
  });
}