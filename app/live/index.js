window.addEventListener("popstate", e => { e.state ? e.state.router({reload:true}) : null; });
window.is = {
  mobile: () => { return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); },
  online: () => { return firebase.auth().currentUser; }
}
window.addEventListener("popstate", e => console.log(e.state));
function init(url) {
  return new Promise((resolve, reject) => {
    document.body.removeAttribute('data-nojs');
    firebase.initializeApp(auth.config); 
    firebase.auth().onAuthStateChanged(event => auth.change(event));
    window.GET = route.dir(url);
    url.router().then(resolve());
    require("socket.io-client").connect("https://rtc.camup.gq/").on("message", (msg) => console.info(msg));
  });
}
function ajax(url, settings) { //console.log(url,settings);
  return new Promise((resolve, reject) => { var req;
    if(settings && settings.dataType === 'POST') { req = new Request(url, { method: 'POST', body: (settings.data ? JSON.stringify(settings.data) : null), headers: new Headers() }); } else { req = url; }
    fetch(req).then(response => response.text()).then(res => { try { resolve(res); } catch(e) { resolve(e); } });
  });
}
window.elems = {
  cams: document.getElementById('section-room'),
  chatbox: document.getElementById('chatbox'),
  iframe: document.getElementById('iframe'),
  messager: document.getElementById('messager'),
  messages: document.getElementById('messages')
};
window.yt = window.youtube = {
  id: (u,url=u.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)) => {
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url;
  }
}
console.log(elems);