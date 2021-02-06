window.editor = {

    block: {

        create: (target) => { //console.log(target);

            var ement = target.closest('[data-element]');
            if(ement) {  
              var tagName = ement.dataset.element;
              element = `<block class="block block-`+tagName+`">`;
                element += `<header class="block-header header"><section><xmp><`+tagName+`></`+tagName+`></xmp></section></header>`;
                element += `<section class="block-section `+tagName+`"></section>`;
                element += `<footer class="block-footer insert"><section data-evt="editor">`;
                  element += `<div class="create" data-crud="create" data-elem="section"></div>`;
                  element += `<div class="delete" data-crud="delete" data-elem="block"></div>`;
                element += `</section></footer>`;
              element += `</block>`;
              ement.closest('.page').lastElementChild.insertAdjacentHTML('beforebegin',element);   
            }
        },

        read: () => { alert('block.read');

        },

        update: () => { alert('block.update');
            
        },

        delete: (ev) => {

            ev.closest('block').remove();
            
        }

    },

    section: {

        create: (ev) => {

            var block = ev.closest('block');
            var html = document.getElementById('block-div-section').innerHTML;
            block.querySelector('.block-footer').insertAdjacentHTML('beforebegin',html);

        },

        read: () => { alert('block.read');

        },

        update: () => { alert('block.update');
            
        },

        delete: (ev) => { alert('block.delete');

            ev.closest('block').remove();
            
        }

    }

}