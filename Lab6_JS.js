window.onload = function() {
    addMarkers();
};

var map = L.map('map').setView([39.8282, -98.5795], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }

async function addMarkers() {
    let coordinate1 = [getRandomInRange(30, 35, 3),getRandomInRange(-90, -100, 3)];
    let coordinate2 = [getRandomInRange(30, 35, 3),getRandomInRange(-90, -100, 3)];
    let coordinate3 = [getRandomInRange(30, 35, 3),getRandomInRange(-90, -100, 3)];
    c1_location = await locationData(coordinate1[0],coordinate1[1]);
    c2_location = await locationData(coordinate2[0],coordinate2[1]);
    c3_location = await locationData(coordinate3[0],coordinate3[1]);
    L.marker(coordinate1).addTo(map);
    L.marker(coordinate2).addTo(map);
    L.marker(coordinate3).addTo(map);
    const marker1 = document.getElementById("marker1");
    const marker1loc = document.getElementById("marker1loc");
    const marker2 = document.getElementById("marker2");
    const marker2loc = document.getElementById("marker2loc");
    const marker3 = document.getElementById("marker3");
    const marker3loc = document.getElementById("marker3loc");

    marker1.textContent = `Marker 1: Latitude: ${coordinate1[0]}, Longitude: ${coordinate1[1]}`
    marker1loc.textContent = `Locality: ${c1_location}`
    marker2.textContent = `Marker 2: Latitude: ${coordinate2[0]}, Longitude: ${coordinate2[1]}`
    marker2loc.textContent = `Locality: ${c2_location}`
    marker3.textContent = `Marker 3: Latitude: ${coordinate3[0]}, Longitude: ${coordinate3[1]}`
    marker3loc.textContent = `Locality: ${c3_location}`


}

async function locationData(latitude, longitude) {
    return fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then((resp) => resp.json())
    .then((data) => data.locality);
}