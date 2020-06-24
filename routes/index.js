let express = require('express'); // require Express
let router = express.Router(); // setup usage of the Express router engine

const parser = require('../parser.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

let Flight = (id) => {
  const task = parser.getTaskCoords(id);
  const path = parser.getFlightCoords(id);
  const flight = parser.getFlightData(id);
  return {
    startLatitude: task[0][0],
    startLongitude: task[0][1],
    flightData: flight,
    task: task,
    path: path
  }
}

router.get('/map/:id', function (req, res) {
  let flightData = Flight(req.params.id);
  res.render('map', {
    title: "IGC Mapper",
    flight: flightData
  });
});

router.get('/chart', (req, res) => {
  res.render('chart', {
    title: "IGC Chart"
  })
})

module.exports = router;

