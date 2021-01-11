String.prototype.router = function(a, b=a ? a : {}, pop=b.pop ? b.pop : null, path=this.valueOf().replace(/\/?$/, '/')) { //window.location.href = state;
  return new Promise(function(resolve, reject) {
    if(path) {  

      var paths = route(path);
      var root = paths.GOT[0];

      if(root) { document.body.dataset.root = root; } 
      else { document.body.removeAttribute('data-root'); }
      
      document.body.dataset.page = paths.page;
      document.body.dataset.path = paths.path;

      window.GET = paths.GOT;
      document.body.classList.contains('loading') ? document.body.classList.remove('loading') : null;
      //auth.user() ?
        //document.body.dataset.uid = auth.user().uid : 
        //(document.body.dataset.uid ? document.body.removeAttribute('uid') : null);
      history.pushState(path,'Spriii',path);
      resolve(paths);

    }
  });
};
window.route = state => { //console.log({state});
    var GOT = state===window.location.origin ? [] : routes.dir(state);
    var data, n = 0, arr1 = [], arr2 = [], section, view = GOT && GOT[0] ? GOT[0] : '/';  
    var root = GOT[0];
    if(GOT.length > 0) { do { var m = GOT[n];
      if(m.includes('#')) { arr1[n] = '*'; arr2[n] = m; }
      else { arr1[n] = arr2[n] = m; }
    n++; } while( n < GOT.length); }    
    var data = {
        GOT:arr2,
        page:routes.url(arr1), 
        path:routes.url(routes.dir(state.replace('#','')))
    };
    //console.log({data},routes.url(arr2)); 
    return data;
}
window.routes = {
  dir: (url,g=[]) => {
    url.split('/').forEach((a,i) => { g[i] = a; }); 
    g[0] === "" ? g.shift() : null; g[g.length - 1] === "" ? g.pop() : null; return g; 
  },
  url: dir => { return dir.length === 0 ? '/' : '/'+dir.join('/')+'/'; }      
}