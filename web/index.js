
window.addEventListener("popstate", e => (e.state ? e.state.router({pop:true}) : null));

window.mvc = { };

function init() {
    
  return new Promise((resolve, reject) => {

    var dt = new Date();

    firebase.initializeApp(auth.config);
    document.body.removeAttribute('data-nojs');

    global.time = parseInt(pad(dt.getHours(),2)+''+pad(dt.getMinutes(),2));

    window.app = window.domain();
    window.cdn = 'https://cdn.'+app+'.'+tld()+'/file/mzncdn';
    window.dom = {
      "body": document.body,
      "desktop": byId("desktop")
    };
  
    firebase.auth().onAuthStateChanged(user => {
        auth.change(user).then(goto => {
            console.log({goto});
            goto = (user && document.body.dataset.ppp === '/my/account/') ? '/' : window.location.pathname;
            goto.router();
        });
    });

    updateClock(); setInterval('updateClock()', 1000);
    var d = new Date(); 
    var month = global.month[d.getMonth()];
    var day = global.day[d.getDay()];
    var date = d.getDate(); 
    var year = d.getFullYear();
    var stamp = day + ', ' + month + ' ' + date;
    document.getElementById("date").textContent = stamp;
    console.log(stamp); 
                              
    //dom.popup.addEventListener("touchstart", on.touch, {passive: true});
    //dom.popup.addEventListener("touchmove", on.touch, {passive: true});

    //dom.main.addEventListener("touchstart", on.touch, {passive: true});
    //dom.main.addEventListener("touchmove", on.touch, {passive: true});
    
    //dom.header.addEventListener("touchstart", on.touch, {passive: true});
    //dom.header.addEventListener("touchmove", on.touch, {passive: true});
                                   
    //dom.footer.addEventListener("touchstart", on.touch, {passive: true});
    //dom.footer.addEventListener("touchmove", on.touch, {passive: true});

  });

}

function updateClock () {
  var currentTime = new Date ( );

  var currentHours = currentTime.getHours ( );
  var currentMinutes = currentTime.getMinutes ( );
  var currentSeconds = currentTime.getSeconds ( );

  // Pad the minutes and seconds with leading zeros, if required
  currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
  currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

  // Choose either "AM" or "PM" as appropriate
  var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";

  // Convert the hours component to 12-hour format if needed
  currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;

  // Convert an hours component of "0" to "12"
  currentHours = ( currentHours == 0 ) ? 12 : currentHours;

  // Compose the string for display
  var currentTimeString = currentHours + ":" + currentMinutes + " " + timeOfDay;

  // Update the time display
  document.getElementById("time").textContent = currentTimeString;
}