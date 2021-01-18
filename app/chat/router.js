String.prototype.router = function(a,b=(a ? a : {}), pop=(b.pop ? b.pop : null),url=this.valueOf()) { //window.location.href = state;  
  var path = url.split('#')[0], hash = url.split('#')[1]; console.log({path,hash,url});
  return new Promise(function(resolve, reject) {
    if(path) { 
      var GOT = route.dir(url), container = GOT[0] ? 'room' : 'main';
      if(container) { 
        document.body.dataset.section = container;
        var view = container === 'main' ? 'home' : 'room';
        ajax('/cdn/js/'+view+'.html').then(template => { console.log({path,GOT});
          if(GOT[0]) { room.connect(GOT[0]); }
          pop ? null : history.pushState(null,'uiOS',path);
          window.GET = route.dir(path);
          resolve({path,GET});
        });
      }
    }
  });
};
window.route = {
    dir: (url,g=[]) => { url.split('/').forEach((a,i) => { g[i] = a; }); g[0] === "" ? g.shift() : null; g[g.length - 1] === "" ? g.pop() : null; return g; },
    url: dir => { return dir.length === 0 ? '/' : '/'+dir.join('/')+'/'; }    
}