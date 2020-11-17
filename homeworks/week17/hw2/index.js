/* eslint-disable */
const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const userController = require('./controllers/user');
const adminController = require('./controllers/admin');
const lottoryController = require('./controllers/lottory');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/statics'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.errMessage = req.flash('errMessage');
  res.locals.username = req.session.username;
  res.locals.allPrizes = null;
  next();
});

function redirectBack(req, res) {
  return res.redirect('back');
}

function checkAdmin(req, res, next) {
  if (!res.locals.username) {
    return res.redirect('back');
  }
  return next();
}

// 會員系統
app.route('/login')
  .get(userController.login)
  .post(userController.handleLogin, redirectBack);
app.route('/logout')
  .get(checkAdmin, userController.logout);

// 後台管理
app.route('/admin')
  .get(checkAdmin, adminController.admin)
  .post(checkAdmin, adminController.checkInput, adminController.add, redirectBack);
app.route('/admin/delete/:id')
  .get(checkAdmin, adminController.delete, redirectBack);
app.route('/admin/update/:id')
  .get(checkAdmin, adminController.update, redirectBack)
  .post(checkAdmin, adminController.checkInput, adminController.handleUpdate, redirectBack);

// 前台抽獎
app.route('/lottory')
  .get(lottoryController.getAllPrizes, lottoryController.lottory);
app.route('/lottory/result')
  .get(lottoryController.getAllPrizes, lottoryController.lottoryResult);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}!`);
});
