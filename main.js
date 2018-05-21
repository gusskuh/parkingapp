
var gPrevPos = null;
var gCurrPos = null;
var gLat = 0;
var gLng = 0; 

var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: gLat, lng: gLng},
  zoom: 20,
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };

    map.setCenter(pos);
    var marker = new google.maps.Marker({
      position: pos,
      map: map
    });
  });
} else {
  // Browser doesn't support Geolocation
 console.log('Browser doesn\'t support Geolocation');
}







