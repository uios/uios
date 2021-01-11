window.on["touch"]["tap"] = (ev,t) => {

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
        if(evt === 'folders') {
            if(elem.classList.contains('edit')) {

            }
            else {
                var folder = target.closest('.folder');
                if(folder) {
                    var name = folder.dataset.name;
                    ('/'+name+'/').router();
                }
            }
        }
        if(evt === "note-header") {
            if(id === 'new') {
                var href = '';
                if(GET.length === 0) { href = '/_/' }
                else { href = '/'+GET[0]+'/' }
                href.router().then(() => {
                    dom.editor.contentEditable = true;
                    dom.editor.focus();
                });
            }            
        }
    }
    
}