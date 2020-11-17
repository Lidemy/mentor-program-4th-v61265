const isImage = require('is-image');

const db = require('../models');

const { Prize } = db;


const adminController = {
  // 拿到資料 + 顯示
  admin: async (req, res) => {
    let data;
    try {
      data = await Prize.findAll({
        where: {
          isDeleted: 0,
        },
      });
    } catch (err) {
      res.send('系統故障，請聯絡生菜', err);
    }
    return res.render('admin', { prizes: data });
  },

  checkInput: async (req, res, next) => {
    const {
      name,
      description,
      image,
      probability,
    } = req.body;
    if (!name || !description || !image || !probability) {
      req.flash('errMessage', '有東西漏填囉！');
      return res.redirect('back');
    }
    if (!isImage(image)) {
      req.flash('errMessage', '圖片格式不正確，請確認後再送出');
      return res.redirect('back');
    }
    if (probability <= 0 || probability % 1 !== 0) {
      req.flash('errMessage', '機率必須要是正整數！');
      return res.redirect('back');
    }
    // 看機率相加是否超過一百
    let prizes;
    try {
      prizes = await Prize.findAll({
        where: {
          isDeleted: 0,
        },
      });
    } catch (err) {
      req.flash('errMessage', 'err');
      return res.redirect('back');
    }
    let sum = 0;
    for (const prize of prizes) {
      if (req.params.id !== prize.dataValues.id) {
        sum += parseInt(prize.dataValues.probability, 10);
      }
    }
    const rest = 100 - sum;
    sum += parseInt(probability, 10);
    if (sum > 100) {
      req.flash('errMessage', `機率相加超過一百了！數字請小於${rest}`);
      return res.redirect('back');
    }
    return next();
  },

  add: (req, res, next) => {
    const {
      name,
      description,
      image,
      probability,
    } = req.body;

    Prize.create({
      name,
      description,
      image,
      probability,
    }).catch((err) => {
      req.flash('errMessage', err);
    });
    return next();
  },

  delete: (res, req, next) => {
    Prize.update({
      isDeleted: 1,
    }, {
      where: {
        id: req.req.params.id,
      },
    }).catch((err) => {
      console.log(err);
    });
    return next();
  },

  update: async (req, res, next) => {
    let prize;
    try {
      prize = await Prize.findOne({
        where: {
          id: req.params.id,
          isDeleted: 0,
        },
      });
    } catch (err) {
      console.log(err);
      return next();
    }
    return res.render('update', { prize });
  },

  handleUpdate: (req, res, next) => {
    const {
      name,
      description,
      image,
      probability,
    } = req.body;
    Prize.update({
      name,
      description,
      image,
      probability,
    }, {
      where: {
        id: req.params.id,
      },
    }).catch((err) => {
      req.flash('errMessage', err);
      return next();
    });
    res.redirect('/admin');
  },
};

module.exports = adminController;
