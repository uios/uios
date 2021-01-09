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
        
      if(root === 'apps') {

      }
      
      if(root === 'my') {
        var pages = ["account","desktop"];
        if(get.length>1) { 
          if(pages.includes(get[1])) { mvc.v.my[get[1]]().then(resolve(paths)); }
          else if(get[1] === "account") { 
            if(auth.user()) { mvc.v.my.account(paths).then(resolve(paths)); } 
            else { mvc.v.my.login().then(resolve(paths)); }
          }
        } else {
          if(auth.user()) { mvc.v.my.desktop(auth.user()).then(resolve(paths)); } 
          else { mvc.v.my.menu(port).then(resolve(paths)); }
        }
      }   
        
      if(root === 'desktop') {
        if(get.length > 1) {
          if(get[1] === "search") {
            byId('start-menu').classList.add('menu');
            byId('desktop').classList.add('blur');
            byId("search").find('input[type="text"]').focus();
            resolve(paths);
          } 
          else if(get[1] === "apps") {
            if(get.length > 2) {
              byId('start-menu').classList.remove('menu');
              byId('desktop').classList.remove('blur');
              mvc.v.desktop.apps(get[2]);
              resolve(paths);
            } else {
              byId('start-menu').classList.add('menu');
              byId('desktop').classList.add('blur');
              resolve(paths);      
            }      
          }
          else {
            resolve(paths);            
          }
        } 
        else {
          byId('start-menu').classList.remove('menu');
          byId('desktop').classList.remove('blur');
          resolve(paths);    
        }
      }   
      
    }
    else { 
      resolve(paths);
    }
  });
}