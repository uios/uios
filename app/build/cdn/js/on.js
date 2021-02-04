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

            var el = target.closest("[data-evt]");
            if (el) {

              var evt = el.dataset.evt; alert(evt);
              
              if(evt === "create") {    
                var ement = target.closest('[data-element]');
                if(ement) {  
                  var tagName = el.dataset.ement; alert(tagName);
                  element = `<`+tagName+` class="block">`;
                    element += `<header class="block-header header"><section>Element 1</section></header>`;
                    element += `<section class="block-section `+tagName+`"></section>`;
                    element += `<footer class="block-footer insert"><section data-evt="block">`;
                      element += `<div class="create" data-crud="create"></div>`;
                      element += `<div class="delete" data-crud="delete"></div>`;
                    element += `</section></footer>`;
                  element += `</`+tagName+`>`; alert(tagName);
                  el.closest('.page').firstElementChild.insertAdjacentHTML('beforebegin',element);   
                }
              }

              if(evt === "editor") {
                var elem = target.closest('[data-crud]');
                elem ? crud = elem.dataset.crud : null;
              }

            }
        }

    }

}