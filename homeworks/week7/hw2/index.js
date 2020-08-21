/*
自己嘗試：
1. 如果按 faq__ques ， faq__item 就增加 .active。
2. 再按一次就取消 >> 用 toggle 好了。
*/

const items = [...document.querySelectorAll('.faq__item')];
for (const item of items) {
  const more = item.querySelector('.more');
  item.querySelector('.faq__ques').addEventListener('click', () => {
    item.classList.toggle('active');
    if (more.innerText === '+') {
      more.innerText = '-';
    } else {
      more.innerText = '+';
    }
  });
}
