let express = require('express'); // require Express
let router = express.Router(); // setup usage of the Express router engine

const IGCparser = require('igc-parser');
const fs = require('fs');

const flights = [
  './IGC/86ULNQR2_rst.igc',
  './IGC/87NLNQR1_rst.igc',
  './IGC/892LNQR1_rst.igc',
  './IGC/05LLN5S1_rst.igc',
  './IGC/06AV2MF1_rst.igc',
  './IGC/0AMLNQR1.IGC'
]


const getFlightData = (id) => {
  return IGCparser.parse(fs.readFileSync(flights[id], 'utf8'));
}

const getFlightTask = (id) => {
  return getFlightData(id).task;
}

const getTaskCoords = (id) => {
  const task = getFlightTask(id);
  let taskCoordArr = [];
  for (let i = 0; i < task.points.length; i++) {
    taskCoordArr.push([task.points[i].latitude, task.points[i].longitude])
  }
  taskCoordArr.pop();
  taskCoordArr.shift();
  return taskCoordArr;
}

const getFlightPath = (id) => {
  return getFlightData(id).fixes;
}

const getFlightCoords = (id) => {
  const path = getFlightPath(id);
  let pathCoordArr = [];
  for (let i = 0; i < path.length; i++) {
    pathCoordArr.push([path[i].latitude, path[i].longitude])
  }
  return pathCoordArr;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

let Coords = (id) => {
  return {
    N: 59.101,
    E: 17.211,
    string: 'Vängsö',
    flight: getFlightData(id),
    task: getTaskCoords(id),
    path: getFlightCoords(id)
  }
}

router.get('/map/:id', function (req, res) {
  let coords = Coords(req.params.id)
  res.render('map', {
    title: "Express API",
    coords: coords
  });
});

module.exports = router;