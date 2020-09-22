if (document.querySelector('.update_user')) {
  document.querySelector('.update_user').addEventListener('click', (e) => {
    const parent = e.target.parentNode.parentNode;
    parent.querySelector('form').classList.toggle('hidden');
  });
}
