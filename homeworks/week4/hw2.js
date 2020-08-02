const request = require('request');

const apiUrl = 'https://lidemy-book-store.herokuapp.com';
const action = process.argv[2];
const param = process.argv[3];

function listBooks() {
  request(`${apiUrl}/books?_limit=20`, (err, res, body) => {
    if (err) return console.log('抓取失敗', err);
    let data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      return console.log(e);
    }
    for (let i = 0; i < data.length; i += 1) {
      console.log(data[i].id, data[i].name);
    }
    return true;
  });
}

function readBooks(id) {
  request(`${apiUrl}/books/${id}`, (err, res, body) => {
    if (err) return console.log('抓取失敗', err);
    const data = JSON.parse(body);
    return console.log(data);
  });
}

function deleteBooks(id) {
  request.delete(`${apiUrl}/books/${id}`, (err) => {
    if (err) return console.log('刪除失敗');
    return console.log('刪除成功');
  });
}

function createBooks(name) {
  request.post({ url: `${apiUrl}/books`, form: { name } }, (err) => {
    if (err) return console.log('新增失敗', err);
    return console.log('新增成功');
  });
}

function updateBooks(id, newName) {
  request.patch(
    { url: `${apiUrl}/books/${id}`, form: { newName } }, (err) => {
      if (err) return console.log('更新失敗', err);
      return console.log('更新成功');
    },
  );
}

switch (action) {
  case 'list':
    listBooks();
    break;
  case 'read':
    readBooks(param);
    break;
  case 'delete':
    deleteBooks(param);
    break;
  case 'create':
    createBooks(param);
    break;
  case 'update':
    updateBooks(param, process.argv[4]);
    break;
  default:
    console.log('Available commands: list, read, delete, create and update');
}
