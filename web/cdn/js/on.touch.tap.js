window.on['touch']["tap"] = (ev,t) => {

    var target = ev.target;
    var type = t ? t : 'tap';

    var className = target.className;

    var a = target.closest('[data-href]');

    var ie = target.closest('[id]');
    var id = ie.id;

    var dataset = target.dataset;

    var elem = target.closest('[data-evt]');
    var evt = elem ? elem.dataset.evt : null;

    if(a) { a.dataset.href.router(); }
    else {
        if(evt === 'apps') {
            if(event.target.closest('[data-app]')) { 
                ("/desktop/apps/"+event.target.closest('[data-app]').dataset.app+"/").router();
            }
        }
        if(evt === 'app') {
            if(className === 'exit') { elem.remove(); }
        }
        if(evt === "auth") {
            var provider = dataset.provider; alert(provider);
            if(provider === "google") {
                
            }
        }
        if(evt === 'search') {
            if(className === 'icon') {
                if(GET.length > 1) {
                    '/desktop/'.router();
                } else {
                    '/desktop/apps/'.router();
                }
            }
        }
        if(evt === 'splash') {
            '/my/'.router()
        }
    }

}