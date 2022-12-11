
map = L.map('map', {doubleClickZoom: false}).locate({setView: true, watch: true, maxZoom: 16});

let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});
osm.addTo(map);

//WORKING adding Json data to the map
fetch('world/data/platform.geojson')
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
              layer.bindPopup(feature.properties.name);
            },
        }).addTo(map);
    })
//Marker Cluster
//map.addLayers(markers);

map.on('locationfound', onLocationFound);
//L.marker([50.5, 30.5]).addTo(map) Adds a point manually
let gpsMarker = null;
let gpsCircleMarker;

function onLocationFound(e) {
    let radius = e.accuracy / 2;
    let popupContent = "You are within " + radius + " meters from this point";

    if (gpsMarker == null) {
        gpsMarker = L.marker(e.latlng).addTo(map);
        gpsMarker.bindPopup(popupContent);
        gpsCircleMarker = L.circle(e.latlng, radius).addTo(map);
    }
    else {
        gpsMarker.getPopup().setContent(popupContent);
        gpsMarker.setLatLng(e.latlng);
        gpsCircleMarker.setLatLng(e.latlng);
        gpsCircleMarker.setRadius(radius);
    }

    let url = '/update_location/';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({'latitude': e.latlng.lat, 'longitude': e.latlng.lng})
    })
        .then((response) => {
            return response.json()
        })
}


    //ISS Location

    let IconS = L.icon({
        iconUrl: 'static/images/Satellite.png',
        iconSize: [50, 40],
        iconAnchor: [25,10]
    });

    let satIcon = L.icon({
        iconUrl: 'static/images/starlink.png',
        iconSize: [50, 40],
        iconAnchor: [25,10]
    });
    /*
    62daedf3235e3708bca4a70e
    62daedf4235e3708bca4a74d
    62daedf4235e3708bca4a74f
    62daedf4235e3708bca4a750
    62daedf4235e3708bca4a751
    62daedf4235e3708bca4a756
    */

    let satPos;
    let satArr = [];

    // //Deprecated query for other satellites when it was realized the website has no others
    document.querySelector("#input").addEventListener("keyup", async (e) => {
    if(e.key === "Enter") {
        let input = document.querySelector("#input");
        let url2 = `https://api.spacexdata.com/v4/starlink/${input.value}`;
        satArr.push(input.value);
        console.log(satArr);
        const response = await fetch(url2);
        const data = await response.json();
        //console.log(data);
        let latSat = data.latitude;
        let lonSat = data.longitude;
        satPos = L.marker([latSat, lonSat], {icon: satIcon}).addTo(map).bindPopup("StarLink Satellite");

        let satUrl = '/update_satellite/';

        fetch(satUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({'satId': input.value, 'latitude': latSat, 'longitude': lonSat})
        })
            .then((response) => {
                return response.json()
            })
    }})


    let mkr = L.marker([0,0], {icon: IconS}).addTo(map);
    let bool = true;
    let altitude = 0;
    let latitude = 0;
    let longitude = 0;
    let c =[];
    let url = 'https://api.wheretheiss.at/v1/satellites/25544'


    let polylineOptions = {
        color: 'red',
        weight: 6,
        opacity: .8
    }
    let sPath = L.polyline([], polylineOptions).addTo(map);

    async function ISS(){
        const response = await fetch(url);
        const data = await response.json();
        altitude = data.altitude;
        latitude = data.latitude;
        longitude = data.longitude;

        mkr.setLatLng([latitude, longitude]).addTo(map)
            .bindPopup("International Space Station \n" +
                "Latitude:" + latitude + "\n" +
                "Longitude:" + longitude + "\n" +
                "Altitude" + altitude, {
                maxWidth: 500,
                maxHeight: 500,
            });
        sPath.addLatLng([latitude,longitude]);
    }

    setInterval(function(){
        ISS();
    }, 8000);

const geoJsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: .9,
    fillOpacity: 0.8,
}


//let poiMarkers = L.markerClusterGroup();
//Load GeoJSON

/*fetch('world/data/platform.geojson')
    .then(function (response) {
        return response.json();
    }).then(function(data){

        let geoJsonLayer = L.geoJSON(data, {
            pointToLayer: function (feature, latlng){
                return L.marker(latlng, {icon: icon});
            },
            onEachFeature: function (feature, layer){
                layer.bindPopup(feature.properties.name);
            }
        }).addTo(map);
        poiMarkers.addLayer(geoJsonLayer);
        map.addLayer(poiMarkers);
});*/

// fetch('world/data/platform.geojson')
//     .then(function (response) {
//         return response.json();
//     }).then(function(data){
//         L.geoJSON(data, {
//             pointToLayer: function (feature, latlng){
//                 return L.circleMarker(latlng, geoJsonMarkerOptions))
//             }
//
//         }).addTo(map);
// })

//Marker Cluster
//map.addLayers(markers);

// let poiMarkers = L.markerClusterGroup();
// poiMarkers.addLayer(poiMarkers);
// map.addLayer(poiMarkers);