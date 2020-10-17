window.on['touch']["tap"] = (ev,t) => {

    var target = ev.target;
    var type = t ? t : 'tap';
    var a = target.closest('[data-href]');

    if(a) { a.dataset.href.router(); }
    else {

    }

}