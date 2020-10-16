/* eslint-disable */

import $ from 'jquery';
import { getCommentsAPI, newComments } from './api';
import { addCommentToDom, getStyle } from './utils';
import { css, getLoadMoreButton, getForm } from './templates';


// 初始化
export function init(options) {
  const siteKey = options.siteKey;
  const apiUrl = options.apiUrl;
  var lastID = 0;
  var containerElement = $(options.containerSelector);

  const loadMoreClassName = `${siteKey}-load-more`;
  const commentsClassName = `${siteKey}-comments`;
  const formClassName = `${siteKey}-add-comment-form`

  // 表單和樣式
  containerElement.append(getForm(formClassName, commentsClassName));
  getStyle(css);

  // 用函式顯示留言
  function getComments() {
    getCommentsAPI(apiUrl, siteKey, lastID, (data) => {
      $('.' + loadMoreClassName).hide();
      if (!data.ok) {
        alert(data.message + siteKey);
        return;
      }
      const comments = data.discussion;
      for (const comment of comments) {
        addCommentToDom(commentsDom, comment, false);
      }
      const length = comments.length;
      if (length === 0) return;
      lastID = comments[length - 1].id;
      if (lastID > 5 && length >= 5) {
        commentsDom.append(getLoadMoreButton(loadMoreClassName));
      }
    });
  }

  // 拿到資料
  const commentsDom = $(`.${commentsClassName}`);
  getComments();

    // 偵測「顯示更多」
  commentsDom.on('click', $('.' + loadMoreClassName), () => {
    getComments();
  });

  // 新增留言 POST
  $(`.${formClassName}`).submit((e) => {
    e.preventDefault();
    const nicknameDom = $(`.${formClassName} input[name=nickname]`);
    const contentDom = $(`.${formClassName} textarea[name=content]`)
    const newCommentsContent = {
      site_key: siteKey,
      nickname: nicknameDom.val(),
      content: contentDom.val()
    }
    newComments(apiUrl, newCommentsContent, (data) => {
      addCommentToDom(commentsDom, newCommentsContent, true);
    })
    nicknameDom.val('');
    contentDom.val('');
  });
}




