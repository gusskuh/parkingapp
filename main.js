

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

var map;
var stateContainer = [];
var prevState = null;
var currState = null;
var gCurrState = null;
var parkingSpot = null;
var gCurrPos = null;
var x = 0;

function getCurrPos(){
    navigator.geolocation.getCurrentPosition(pos => {
        window.gCurrPos = pos.coords;
        console.log(pos.coords);
        console.log('gcurrpos',gCurrPos);
        x = 1;
        
        
    })
}

getCurrPos();

setTimeout(() => {

    initMap();
}, 2000)



 

function initMap() {
  
    
    map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34, lng: 151 },
    zoom: 15
  });


    map.setCenter({ lat: gCurrPos.latitude, lng: gCurrPos.longitude });
    new google.maps.Marker({
      position: { lat: gCurrPos.latitude, lng: gCurrPos.longitude },
      map: map
    });
  
}

var origin1 = new google.maps.LatLng(0, 0);
navigator.geolocation.getCurrentPosition((pos, error, options) => {
  let crd = pos.coords;
  origin1 = new google.maps.LatLng(crd.latitude, crd.longitude);

  var destinationB = new google.maps.LatLng(crd.latitude, crd.longitude);

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin1],
      destinations: [destinationB],
      travelMode: 'DRIVING'
      // transitOptions: TransitOptions,
      // drivingOptions: DrivingOptions,
      // unitSystem: UnitSystem,
      // avoidHighways: Boolean,
      // avoidTolls: Boolean,
    },
    callback
  );

  function callback(response, status) {
    if (status == 'OK') {
      // var origins = response.originAddresses;
      // var destinations = response.destinationAddresses;

      // for (var i = 0; i < origins.length; i++) {
      //     var results = response.rows[i].elements;
      //     for (var j = 0; j < results.length; j++) {
      //         var element = results[j];
      //         var distance = element.distance.text;
      //         var duration = element.duration.text;
      //         var from = origins[i];
      //         var to = destinations[j];
      //     }
      // }

      let dist = response.rows[0].elements[0].distance.value;

      let speed = dist / 1000 * 360;

      //   console.log('your speed is:', speed, 'km/h!');
      if (speed > 15) {
        if (currState === 'walking' || currState === null) {
          currState = 'driving';
          console.log('maybe started driving break point!!!');
          navigator.geolocation.getCurrentPosition((pos, error, options) => {
            
            parkingSpot = pos.coords;
            // console.log('Parking Spot is:', parkingSpot);
          });
        }
        if (stateContainer.length > 30) {
          stateContainer.shift();
          stateContainer.push('driving');
        } else {
          stateContainer.push('driving');
        }
        // console.log('You are driving!');
      } else {
        if (currState === 'driving' || currState === null) {
          currState = 'walking';
          console.log('maybe started walking break point!!!');
        }
        if (stateContainer.length > 30) {
          stateContainer.shift();
          stateContainer.push('walking');
        } else {
          stateContainer.push('walking');
        }

        // console.log('you are walking!');
        // console.log(stateContainer);
      }
    }
  }

  setInterval(() => {
    navigator.geolocation.getCurrentPosition((pos, error, options) => {
      let crd = pos.coords;
      origin1 = destinationB;
      destinationB = new google.maps.LatLng(crd.latitude, crd.longitude);
      service.getDistanceMatrix(
        {
          origins: [origin1],
          destinations: [destinationB],
          travelMode: 'DRIVING'
        },
        callback
      );
    });
  }, 1000);

});
      setInterval(() => {
        let walkCount = 0;
        let driveCount = 0;
        stateContainer.forEach(el => {
          if (el === 'walking') walkCount++;
          if (el === 'driving') driveCount++;
        });
        if (walkCount / stateContainer.length > 0.75) {
          console.log('YOU ARE WALKING!!!!');
          if (prevState === null) {
            prevState = 'walking';
          } else {
            prevState = gCurrState;
            gCurrState = 'walking';
          }
          document.querySelector('.userStatus').innerHTML = 'YOU ARE WALKING!!!!';
          console.log('prev state:', prevState);
          console.log('current state:', gCurrState);
          if (prevState === 'driving' && currState === 'walking') {
            console.log('You parked at:', parkingSpot);
          }
        }
    
        if (driveCount / stateContainer.length > 0.75) {
          console.log('YOU ARE DRIVING!!!!');
          if (prevState === null) {
            prevState = 'driving';
          } else {
            prevState = gCurrState;
            gCurrState = 'driving';
          }
          document.querySelector('.userStatus').innerHTML = 'YOU ARE DRIVING!!!!';
          if (prevState === 'walking' && currState === 'driving') {
            console.log('parking space is at:', parkingSpot);
    
            new google.maps.Marker({
              position: { lat: parkingSpot.latitude, lng: parkingSpot.longitude },
              map: map
            });
          }
        }
      }, 30000);
