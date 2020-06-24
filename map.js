function createMap(flight) {
    var map = L.map('map', { center: [flight.startLatitude, flight.startLongitude], zoom: 8 });
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    let flightPathLine = L.polyline(flight.path).addTo(map);
    let flightTaskLine = L.polyline(flight.task, { color: 'green' }).addTo(map);


    // Targeting individual points/lines from the flight path
    ///////////////////////////////////////////////////////////////////
    // let pathTargetLines = [];
    // for (let i = 0; i < flight.path.length; i++) {
    //     if (flight.path[i] !== flight.path[flight.path.length - 1]) {
    //         let line = L.polyline([flight.path[i], flight.path[i + 1]]).addTo(map);
    //         pathTargetLines.push(line);
    //     }
    // }

    // pathTargetLines.forEach(line => {
    //     line.on('mouseover', function () {
    //         console.log(line);
    //     });
    // })

    // // turnpointTargetLines.on('mouseover', function () {
    // //     console.log('here');
    // // });
    ///////////////////////////////////////////////////////////////77

    //L.circle([flight.task[1][0], flight.task[1][1]], { radius: 500, color: 'red' }).addTo(map);

    flight.task.forEach(turnpoint => {
        L.circle([turnpoint[0], turnpoint[1]], { radius: 500, color: 'red' }).addTo(map);
    });
};