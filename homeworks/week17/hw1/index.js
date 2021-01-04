const express = require("express");

const app = express();
const port = 5012;
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const userController = require("./controllers/user");
const articleController = require("./controllers/article");
const categoryController = require("./controllers/category");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.errMessage = req.flash("errMessage");
  res.locals.username = req.session.username;
  next();
});

function redirectBack(req, res) {
  return res.redirect("back");
}

function checkAdmin(req, res, next) {
  if (!res.locals.username) {
    return res.redirect("back");
  }
  return next();
}

app.get("/", articleController.index);

// 會員系統
app.get("/login", userController.login);
app.post("/login", userController.handleLogin, redirectBack);
app.get("/logout", checkAdmin, userController.logout);

// 文章系統
app.get("/article/add", checkAdmin, articleController.add, redirectBack);
app.post("/article/add", checkAdmin, articleController.handleAdd, redirectBack);
app.get("/article/item/:id", articleController.item, redirectBack);
app.get("/article/list", articleController.list, redirectBack);
app.get(
  "/article/delete/:id",
  checkAdmin,
  articleController.delete,
  redirectBack
);
app.get(
  "/article/update/:id",
  checkAdmin,
  articleController.update,
  redirectBack
);
app.post(
  "/article/update/:id",
  checkAdmin,
  articleController.handleUpdate,
  redirectBack
);

// 分類系統
app.get("/category/list", categoryController.list, redirectBack);
app.post(
  "/category/list",
  checkAdmin,
  categoryController.handleAdd,
  redirectBack
);
app.get(
  "/category/delete/:id",
  checkAdmin,
  categoryController.delete,
  redirectBack
);
app.get("/category/update/:id", checkAdmin, categoryController.update);
app.post(
  "/category/update/:id",
  checkAdmin,
  categoryController.handleUpdate,
  redirectBack
);
app.get("/category/item/:id", categoryController.item, redirectBack);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}!`);
});
