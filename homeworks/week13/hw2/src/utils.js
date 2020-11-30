/* eslint-disable */

export function escape(str) {
  return str
    .replace(/\&/g, "&amp;")
    .replace(/\</g, "&lt;")
    .replace(/\>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/\'/g, "&#x27")
    .replace(/\//g, "&#x2F");
}

// 把內容放進頁面
export function addCommentToDom(container, comment, isPrepend) {
  var created_at = "";
  if (comment.created_at) {
    created_at = escape(comment.created_at);
  } else {
    created_at = "new!";
    console.log(comment);
  }

  const template = `
  <div class="card border-info mb-3" style="margin-top: 20px;">
    <div class="card-header">${escape(created_at)}</div>
    <div class="card-body text-info">
      <h5 class="card-title">${escape(comment.nickname)}</h5>
      <p class="card-text">${escape(comment.content)}</p>
    </div>
  </div>
  `;

  if (isPrepend) {
    container.prepend(template);
  } else {
    container.append(template);
  }
}
