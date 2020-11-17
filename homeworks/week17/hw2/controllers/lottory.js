/* eslint-disable */
const db = require('../models');

const { Prize } = db;

const lottoryController = {
  getAllPrizes: async(req, res, next) => {
    let datas;
    try {
      datas = await Prize.findAll({
        where: {
          isDeleted: 0,
        },
      });
    } catch (err) {
      req.flash('errMessage', err);
      return res.redirect('back');
    }
    const prizes = [];
    for (const data of datas) {
      const {
        name,
        description,
        image,
        probability,
      } = data.dataValues;
      prizes.push({
        name,
        description,
        image,
        probability,
      });
    }
    allPrizes = prizes;
    return next();
  },

  lottory: (req, res) => res.render('lottory', { allPrizes }),

  lottoryResult: (req, res) => {
    // 計算機率總和
    let probabilitySum = 0;
    allPrizes.forEach((prize) => {
      probabilitySum += prize.probability;
    });

    // 隨機選出獎品
    const randomNum = Math.random() * probabilitySum;
    let result;
    let temp = 0;
    for (const prize of allPrizes) {
      temp += prize.probability;
      if (temp >= randomNum) {
        result = prize;
        break;
      }
    }

    res.send(JSON.stringify(result));
    return res.end();
  },
};

module.exports = lottoryController;
