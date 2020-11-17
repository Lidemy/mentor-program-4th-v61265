const db = require('../models');

const { Article, Category } = db;

const articleController = {
  // 抓文章資料 + render
  index: async (req, res, next) => {
    let articles;
    try {
      articles = await Article.findAll({
        where: {
          isDeleted: 0,
        },
        include: Category,
        order: [['createdAt', 'DESC']],
      });
    } catch (err) {
      console.log(err);
      return next();
    }
    return res.render('index', {
      articles,
    });
  },

  // 抓分類資料 + render
  add: async (req, res, next) => {
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
    return res.render('addArticle', {
      categories,
    });
  },

  // 認證沒有空白 + 增新資料
  handleAdd: (req, res, next) => {
    const { title, categoryId, content } = req.body;
    if (!title || !categoryId || !content) {
      req.flash('errMessage', '有東西漏填囉');
      return next();
    }
    Article.create({
      title,
      categoryId,
      content,
    }).catch((err) => {
      req.flash('errMessage', err);
      return next();
    });
    return res.redirect('/');
  },

  // 抓資料 + render
  item: async (req, res, next) => {
    let article;
    try {
      article = await Article.findOne({
        where: {
          id: req.params.id,
        },
        include: Category,
      });
    } catch (err) {
      console.log(err);
      return next();
    }
    return res.render('itemArticle', { article });
  },

  list: async (req, res, next) => {
    let articles;
    try {
      articles = await Article.findAll({
        where: {
          isDeleted: 0,
        },
        include: Category,
        order: [['createdAt', 'DESC']],
      });
    } catch (err) {
      console.log(err);
      return next();
    }
    return res.render('listArticle', {
      articles,
    });
  },

  delete: (req, res, next) => {
    Article.update({ isDeleted: true }, {
      where: {
        id: req.params.id,
      },
    }).catch((err) => {
      console.log(err);
    });
    return next();
  },

  update: async (req, res, next) => {
    let categories;
    let article;
    try {
      categories = await Category.findAll({
        where: {
          isDeleted: 0,
        },
        order: [['createdAt', 'DESC']],
      });
      article = await Article.findOne({
        where: {
          id: req.params.id,
          isDeleted: 0,
        },
        include: Category,
      });
    } catch (err) {
      console.log(err);
      return next();
    }
    if (!article) {
      return next();
    }
    return res.render('updateArticle', { article, categories });
  },

  handleUpdate: (req, res, next) => {
    const { title, categoryId, content } = req.body;
    if (!title || !categoryId || !content) {
      req.flash('errMessage', '有東西漏填囉');
      return next();
    }
    Article.update({
      title,
      categoryId,
      content,
    }, {
      where: {
        id: req.params.id,
      },
    }).catch((err) => {
      req.flash('errMessage', err);
      return next();
    });
    return res.redirect('/');
  },
};

module.exports = articleController;
