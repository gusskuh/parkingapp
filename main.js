
// var prevPos = null;
// var currPos = null;

// function getCurrPos(){
//   navigator.geolocation.getCurrentPosition(pos => {
//       document.querySelector('.cont').innerHTML =`<h1>your position is: ${pos.coords.latitude} | ${pos.coords.longitude}  </h1>`;      
//   })
// }

var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: -34.397, lng: 150.644},
  zoom: 8,
});



