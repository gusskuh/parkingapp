
var prevPos = null;
var currPos = null;

function getCurrPos(){
  navigator.geolocation.getCurrentPosition(pos => {
      document.querySelector('.cont').innerHTML =`<h1>your position is: ${pos.coords.latitude} | ${pos.coords.longitude}  </h1>`;      
  })
}

getCurrPos();


var x = 0 ;

setInterval(() => {
  console.log('lal');
  x++;
document.querySelector('.cont2').innerHTML = `<p>${x}</p>` 
}, 1000);

