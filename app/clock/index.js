window.onload = () => {  
    updateClock();
    setInterval('updateClock()', 1000);
}
function updateClock () {
  var d = new Date ();

  var currentHours = d.getHours ( );
  var currentMinutes = d.getMinutes ( );
  var currentSeconds = d.getSeconds ( );

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  // Compose the string for display
  var hm = currentHours + ":" + currentMinutes;
  var dString = hm + ":" + currentSeconds + " " + timeOfDay;

  // Update the time display  
  var month = global.month[d.getMonth()];
  var day = global.day[d.getDay()];
  var date = d.getDate(); 
  var year = d.getFullYear();
  var stamp = day + ', ' + month + ' ' + date;

  document.getElementById("time").textContent = dString;
  document.getElementById("date").textContent = stamp;

  var special = Object.keys(global.times).includes(hm);
  if(special) {
    document.body.classList.add('special');
  }
  else {
    document.body.classList.remove('special');
  }

}