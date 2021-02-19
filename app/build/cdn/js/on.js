window.on = {

    touch: {

        tap: (event) => {//console.log(event);

            var target = event.target;

            var id = target.closest("[id]");

            var className = target.className;

            var link = target.closest('[data-href]');
            if(link) {
                link.dataset.href.router();
            }

            var library = target.closest('[data-api]');
            if(library) {
                window[library.dataset.api][library.dataset.method][library.dataset.resource](target);                  
            }

            var el = target.closest('[data-browse]');
            if(el) { 
                if(el.dataset.browse === "exit") {
                    modal.exit(el);
                }
            }

            var ev = target.closest("[data-evt]");
            if(ev) {
                var evt = ev.dataset.evt;
            }

            var block = target.closest('block')
            if(block) {
                console.log(cell);
                var cell = target.closest('.block-div-group-cell');
                if(cell && !cell.classList.contains('--focus-cell')) {
                    document.body.dataset.focus = "cell";
                    $(document.body.querySelectorAll('.--focus-cell')).removeClass('--focus-cell');
                    cell.classList.add('--focus-cell');
                } else {
                    document.body.removeAttribute('focus');
                    $(document.body.querySelectorAll('.--focus-cell')).removeClass('--focus-cell');
                } 
            }
        }

    }

}