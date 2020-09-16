const items = [...document.querySelectorAll('.comment__main')];

for (const item of items) {
  item.querySelector('.all-comments').addEventListener('click', () => {
    item.querySelector('.user_comments').classList.toggle('hidden');
  });
}
