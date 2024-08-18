const express = require('express');
const router = express.Router();
const AdminMiddleware = require('../middlewares/AdminMiddleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',[AdminMiddleware], { title: 'Express' });
});

module.exports = router;
