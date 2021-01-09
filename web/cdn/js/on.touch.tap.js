window.on['touch']["tap"] = (ev,t) => {

    var target = ev.target;
    var type = t ? t : 'tap';

    var className = target.className;

    var a = target.closest('[data-href]');

    var ie = target.closest('[id]');
    var id = ie.id;

    var elem = target.closest('[data-evt]');
    var evt = elem ? elem.dataset.evt : null;

    if(a) { a.dataset.href.router(); }
    else {
        if(evt === 'apps') {
            event.target.dataset.app ? ("/desktop/apps/"+event.target.dataset.app+"/").router() : null;
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