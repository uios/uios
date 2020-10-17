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