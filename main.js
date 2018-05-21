var gPrevPos = null;
var gCurrPos = null;
var gLat = 0;
var gLng = 0;
var map;
var origin1 = null;
var destinationB;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: gLat, lng: gLng },
    zoom: 20
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      destinationB = pos;
      map.setCenter(pos);
      var marker = new google.maps.Marker({
        position: pos,
        map: map
      });
    });
  } else {
    // Browser doesn't support Geolocation
    console.log("Browser doesn't support Geolocation");
  }
}

document.querySelector('.userStatus').innerHTML='you are walking!';




  setTimeout(function() {
    document.querySelector('.userStatus').innerHTML='you are driving!';
  },5000)


// var service = new google.maps.DistanceMatrixService();
// setInterval(() => {
//   navigator.geolocation.getCurrentPosition((pos, error, options) => {
//     let crd = pos.coords;
//     // var marker = new google.maps.Marker({
//       //   position: {lat: crd.latitude, lng: crd.longitude},
//       //   map: map,
//       //   title: 'Hello World!'
//       // });
      
//       origin1 = destinationB;
//       destinationB = new google.maps.LatLng(crd.latitude, crd.longitude);
      
//       service.getDistanceMatrix(
//         {
//           origins: [origin1],
//           destinations: [destinationB],
//           travelMode: "DRIVING"
//         },
//         callback
//       );
//     });
//   }, 2000);

// function callback(response, status) {
//   if (status == "OK") {
//     let dist = response.rows[0].elements[0].distance.value;
//     // console.log(response.rows[0].elements[0].distance.value);

//     let speed = dist / 1000 * 360;
//     // console.log("speed", speed);

//     if (speed > 15) {
//       console.log("your speed is over 15km/h");
//       // document.querySelector('.userStatus').innerHTML= 'you are driving!';

//     } else {
//       console.log("your speed is less than 15 km/h");
//       // document.querySelector('.userStatus').innerHTML='you are walking!';
//     }
//   }
// }
