const bcrypt = require('bcrypt');

const db = require('../models');

const { User } = db;

const userController = {
  /* 當初創建帳號用，留著以備不時之需
  add: (req, res) => {
    const { username, password} = req.body
    bcrypt.hash(password, 10, function(err, hash) {
      User.create({
        username,
        password: hash
      })
    });
  },
  */

  login: (req, res) => res.render('login'),

  // 檢查漏填 + 拿資料 + 比對
  handleLogin: async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errMessage', '有東西漏填囉！');
      return next();
    }
    let user;
    try {
      user = await User.findOne({
        where: {
          username,
        },
      });
    } catch (err) {
      console.log(err);
      return next();
    }
    if (!user) {
      req.flash('errMessage', '請輸入正確帳號密碼');
      return next();
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        req.flash('errMessage', err);
        return next();
      }
      if (!result) {
        req.flash('errMessage', '請輸入正確帳號密碼');
        return next();
      }
      return console.log('success');
    });
    req.session.username = user.username;
    return res.redirect('/admin');
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect('/');
  },
};

module.exports = userController;
