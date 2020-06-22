let express = require('express'); // require Express
let router = express.Router(); // setup usage of the Express router engine

const parser = require('../parser.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

let Flight = (id) => {
  return {
    N: 59.101,
    E: 17.211,
    flight: parser.getFlightData(id),
    task: parser.getTaskCoords(id),
    path: parser.getFlightCoords(id)
  }
}

router.get('/map/:id', function (req, res) {
  let flightData = Flight(req.params.id);
  res.render('map', {
    title: "Express API",
    flight: flightData
  });
});

module.exports = router;

