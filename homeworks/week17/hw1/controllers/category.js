const db = require('../models');

const { Category, Article } = db;

const categoryController = {
  // 拿資料 + 顯示
  list: async (req, res, next) => {
    let categories;
    try {
      categories = await Category.findAll({
        where: {
          isDeleted: 0,
        },
        order: [['createdAt', 'DESC']],
      });
    } catch (err) {
      console.log(err);
      return next();
    }
    return res.render('listCategory', {
      categories,
    });
  },

  // 確認沒有空格 + 建立
  handleAdd: (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      req.flash('errMessage', '請輸入分類名稱');
      return next();
    }
    Category.create({
      name,
    }).catch((err) => {
      req.flash('errMessage', err);
    });
    return next();
  },

  // 刪除 + 把底下文章放到未分類
  delete: (req, res, next) => {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    }).catch((err) => {
      console.log(err);
    });
    Article.update({ categoryId: 0 }, {
      where: {
        categoryId: req.params.id,
      },
    }).catch((err) => {
      console.log(err);
    });
    return next();
  },

  // 找到 content + render
  update: async (req, res) => {
    let category;
    try {
      category = await Category.findOne({
        where: {
          id: req.params.id,
          isDeleted: 0,
        },
      });
    } catch (err) {
      console.log(err);
      return res.redirect('back');
    }
    return res.render('updateCategory', { category });
  },

  // 得到結果 + 更新
  handleUpdate: (req, res, next) => {
    const { name } = req.body;
    if (!name) {
      req.flash('errMessage', '名稱不能空白');
      return next();
    }
    Category.update({ name }, {
      where: {
        id: req.params.id,
      },
    }).catch((err) => {
      req.flash('errMessage', err);
      return next();
    });
    return res.redirect('/category/list');
  },

  item: async (req, res, next) => {
    let category;
    let articles;
    try {
      category = await Category.findOne({
        where: {
          id: req.params.id,
        },
      });
      articles = await Article.findAll({
        where: {
          categoryId: req.params.id,
          isDeleted: 0,
        },
        include: Category,
        order: [['createdAt', 'DESC']],
      });
    } catch (err) {
      console.log(err);
      return next();
    }
    return res.render('itemCategory', { articles, category });
  },
};

module.exports = categoryController;
