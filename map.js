function createMap(flight) {
    var map = L.map('map', { center: [flight.N, flight.E], zoom: 8 });
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
    }).addTo(map);

    L.polyline(flight.path).addTo(map);
    L.polyline(flight.task, { color: 'green' }).addTo(map);

    L.circle([flight.task[1][0], flight.task[1][1]], { radius: 500, color: 'red' }).addTo(map);
};