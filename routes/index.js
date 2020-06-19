var express = require('express'); // require Express
var router = express.Router(); // setup usage of the Express router engine

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/map', function (req, res) {
  res.render('map', {
    title: "Express API"
  });
});

module.exports = router;