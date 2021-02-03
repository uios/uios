window.on = {

    touch: {
    
        tap: () => {
            console.log(event);

            var target = event.target;
            var id = target.closest("[id]");
            var el = target.closest("[data-evt]");

            var className = target.className;

            if (el) {

              var evt = el.dataset.evt;

              if (evt === "block") {    
                if(target.dataset && target.dataset.element) {  
                  var tagName = target.closest('.block').tagName;
                  var element = ``;
                  element = `<`+tagName+` class="block">`;
                    element += `<header class="block-header header"><section>Element 1</section></header>`;
                    element += `<section class="block-section `+tagName+`"></section>`;
                    element += `<footer class="block-footer insert"><section data-evt="block">`;
                      element += `<div class="create" data-crud="create"></div>`;
                      element += `<div class="delete" data-crud="delete"></div>`;
                    element += `</section></footer>`;
                  element += `</`+tagName+`>`;
                  el.closest('.page').firstElementChild.insertAdjacentHTML('beforebegin',element);   
                }
              }

            }
        }

    }

}