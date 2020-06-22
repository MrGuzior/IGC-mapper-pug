const IGCparser = require('igc-parser');
const fs = require('fs');

const flights = [
    './IGC/86ULNQR2_rst.igc',
    './IGC/87NLNQR1_rst.igc',
    './IGC/892LNQR1_rst.igc',
    './IGC/05LLN5S1_rst.igc',
    './IGC/06AV2MF1_rst.igc',
    './IGC/0AMLNQR1.IGC',
    './IGC/06IV1EW1_rst.igc'
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
module.exports.getFlightData = getFlightData;
module.exports.getFlightTask = getFlightTask;
module.exports.getTaskCoords = getTaskCoords;
module.exports.getFlightPath = getFlightPath;
module.exports.getFlightCoords = getFlightCoords;