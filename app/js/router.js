String.prototype.router = function(a, b=a ? a : {}, pop=b.pop ? b.pop : null, path=this.valueOf().replace(/\/?$/, '/')) { //window.location.href = state;
  return new Promise(function(resolve, reject) {
    path ? view(route(path)).then(data => {

        var paths = data.paths ? data.paths : path, packet = null;
        console.log(1,{data,paths});
        if(Object.keys(data).includes('paths')) {
          var packet = data.packet;
          paths = data.paths;
        } 
        else { paths = data; }
        console.log(2,{data,paths});
        
        return new Promise(function(resolve, reject) { console.log({paths});

          var root = paths.GOT[0];
          var port = document.body.find('[data-page="'+paths.page+'"]');

          if(root) { document.body.dataset.root = root; } 
          else { document.body.removeAttribute('data-root'); }
          
          if(global.ppp.includes(paths.page)) {
            document.body.dataset.ppp = paths.page;
            document.body.dataset.url = paths.path;
          } 
          else {
            document.body.dataset.page = paths.page;
            document.body.dataset.path = paths.path;
            document.body.removeAttribute('data-ppp');
            document.body.removeAttribute('data-url');
          }  

          var path = packet && packet.state ? packet.state : paths.path; //console.log({path});
          window.GET = paths.GOT;
          document.body.classList.contains('loading') ? document.body.classList.remove('loading') : null;
          auth.user() ?
            document.body.dataset.uid = auth.user().uid : 
            (document.body.dataset.uid ? document.body.removeAttribute('uid') : null);
          history.pushState(path,'Spriii',path);
          resolve(paths);

        });

    }) : reject({error:error["404"]});
  });
};
function view(paths) {
  return new Promise(function(resolve, reject) {

    var get = paths.GOT;
    var root = paths.GOT[0];
    var x2 = true;

    document.body.removeAttribute('data-menu');

    var port = document.body.find('[data-port="'+paths.path+'"]');
    if(root) {
      port ? document.body.dataset.root = (port.closest('.view') ? port.closest('.view').dataset.root = root : null) : port = document.body.find('[data-port="'+paths.page+'"]');
      //console.log('CHECK',{paths}); //console.log({port},paths.page);
    } 
    else { 
        port = document.body.find('[data-port="/"]');
        document.body.removeAttribute('data-root');
    }
    paths.section = port;
    
    if(root) {
        
      if(root === 'my') {
        var pages = ["account","desktop"];
        if(get.length>1) { 
          if(pages.includes(get[1])) { mvc.v.page.my[get[1]]().then(resolve(paths)); }
          else if(get[1] === "account") { 
            if(auth.user()) { mvc.v.page.my.account(paths).then(resolve(paths)); } 
            else { mvc.v.page.my.login().then(resolve(paths)); }
          }
        } else {
          if(auth.user()) { mvc.v.page.my.desktop(auth.user()).then(resolve(paths)); } 
          else { mvc.v.page.my.menu(port).then(resolve(paths)); }
        }
      }   
        
      if(root === 'desktop') {
        if(get.length>1) {
        } else {
          mvc.v.page.my.desktop(auth.user()).then(resolve(paths));
        }
      }   
      
    }
    else { 
      resolve(paths);
    }
  });
}
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
        arr: {arr1, arr2}, 
        page:routes.url(arr1), 
        path:routes.url(routes.dir(state.replace('#',''))), 
        port:routes.url(arr2), 
        state, 
        section
    };
    data.section = document.querySelector('[data-port="'+data.port+'"]') ? document.querySelector('[data-port="'+data.port+'"]').closest('.section') : null;
    console.log({data},routes.url(arr2)); 
    return data;
}
window.routes = {
  dir: (url,g=[]) => {
    url.split('/').forEach((a,i) => { g[i] = a; }); 
    g[0] === "" ? g.shift() : null; g[g.length - 1] === "" ? g.pop() : null; return g; 
  },
  url: dir => { return dir.length === 0 ? '/' : '/'+dir.join('/')+'/'; }      
} 