window.on = {

    touch: {
    
        tap: () => {
            console.log(event);

            var target = event.target;

            var id = target.closest("[id]");

            var className = target.className;

            var link = target.closest('[data-href]');
            if(link) {
                link.dataset.href.router();
            }

            var func = target.closest('[data-crud]');
            if (func) {    
              editor[func.dataset.elem][func.dataset.crud](target);
            }
            
            var ev = target.closest("[data-evt]");
            if (ev) {
              var evt = ev.dataset.evt;
            }
        }

    }

}