/*
功能：
1. 按 enter >> 增新 label
2. 按 x >> 刪掉元素
3. 按元素 >> 刪除線開關
*/

/* eslint-disable */

function escapeHtml(unsafe) {
  return unsafe
    .replace('/&/g', '&amp;')
    .replace('/</g', '&lt;')
    .replace('/>/g', '&gt;')
    .replace('/"/g', '&quot;')
    .replace("/'/g", '&#039;');
}

document.querySelector('.title input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const value = document.querySelector('.title input').value;
    if (!value) return;
    const newItem = document.createElement('label');
    newItem.classList.add('list__item');
    newItem.innerHTML = `
      <div class='item__content'>
      <input type='checkbox' />
      <span class='content'>${escapeHtml(value)}</span>
      </div>
      <div class='list__delete'>X</div>
    `;
    document.querySelector('.list').append(newItem);
    document.querySelector('.title input').value = '';
  }
});

document.querySelector('.list').addEventListener('click', (e) => {
  const parent = e.target.parentNode;
  if (e.target.classList.value === 'list__delete') {
    document.querySelector('.list').removeChild(parent);
  } else {
    if (e.target.type === 'checkbox') {
      parent.querySelector('.content').classList.toggle('item__done');
    }
  }
});
