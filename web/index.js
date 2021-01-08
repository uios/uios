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
                            
    dom.body.onclick = event => on.touch.tap(event,'tap');
                              
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

window.onload = init;