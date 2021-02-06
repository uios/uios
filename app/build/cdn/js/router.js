/*ROUTES
/
/code/
/code/{id}/
/ide/{id}/
ROUTES*/

String.prototype.router = function(a) {
  //auth.user() ?
  //document.body.dataset.uid = auth.user().uid :
  //(document.body.dataset.uid ? document.body.removeAttribute('uid') : null);
  var path = this.toString();
  var paths = rout.e(path);
  var root = paths.GOT[0];
  
  console.log({paths});
  document.body.dataset.page = paths.page;
  document.body.dataset.path = paths.path;

  return new Promise(function (resolve, reject) {
    if (path) {
      view(path).then((state) => {
                          
          var m = window.location.origin;
          var url = new URL(state.path,m);
          var search = url.search;
          var path = url.pathname.replace(/\/?$/, "/");

          if (root) {
            document.body.dataset.root = root;
          } else {
            document.body.removeAttribute("data-root");
          }

          var state =
            path +
            (url.search ? url.search : window.location.search) +
            (url.hash ? url.hash : window.location.hash);
          document.body.classList.contains("loading")
            ? document.body.classList.remove("loading")
            : null;
          //history.pushState(state,'Frontend Development Suite',state);
          window.GET = paths.GOT;
          resolve(paths);
        })
        .catch((e) => {
          //alert(404);
          console.log(404,e);
          reject(e);
        });
    } else {
      reject({ code: 400, message });
    }
  });
};
window.rout = {};
window.rout.e = (state) => {
  //console.log({state});
  var GOT = rout.es.dir(state, 2);
  var n = 0,
    arr1 = [],
    arr2 = rout.es.dir(state);
  var root = GOT[0];
  if (GOT.length > 0) {
    do {
      var m = GOT[n];
      if (
        m.includes("#") //||
        //(root === 'home' && n === 2)
      ) {
        arr1[n] = "*";
      } else {
        arr1[n] = m;
      }
      n++;
    } while (n < GOT.length);
  }
  var data = {
    GOT: arr2,
    page: rout.es.url(arr1),
    path: rout.es.url(rout.es.dir(state.replace("#", ""), 0))
  };
  return data;
};
window.rout.es = {
  dir: (url, num, g = []) => {
    //console.log({url},num);
    url.split("/").forEach((a, i) => {
      g[i] = a;
    });
    g[0] === "" ? g.shift() : null;
    g[g.length - 1] === "" ? g.pop() : null;
    return g;
  },
  url: (dir) => {
    return dir.length === 0 ? "/" : "/" + dir.join("/") + "/";
  }
};

function view(path) {
  var state = rout.e(path);
  var get = state.GOT;
  var root = get[0];
  return new Promise(function async(resolve, reject) {
    if (root) {
      resolve(state);
    } else {
      resolve(state);
    }
  });
}
