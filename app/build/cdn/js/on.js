window.on = {

    touch: {
    
        tap: () => {
            console.log(event);

            var target = event.target;
            var id = target.closest("[id]");
            var el = target.closest("[data-evt]");

            var className = target.className;

            if (el) {

              var evt = el.dataset.evt; alert(evt);
              
              if (evt === "create") {    
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

            }
        }

    }

}