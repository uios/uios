window.editor = {

    create: {

        block: (target) => { //console.log(target);

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

        section: (ev) => {

            var block = ev.closest('block');
            var html = document.getElementById('block-div-section').innerHTML;
            block.querySelector('.block-footer').insertAdjacentHTML('beforebegin',html);

        }

    },

    read: {

        block: (ev) => {

            ev.closest('block').remove();
            
        },

        files: (ev) => {

            modal.popup(byId('files').innerHTML);
                                    
        },
        
        section: (ev) => { alert('editor.delete.section');

            ev.closest('block').remove();
            
        }

    },

    update: {

        block: (ev) => {

            ev.closest('block').remove();
            
        },
        
        section: (ev) => { alert('editor.delete.section');

            ev.closest('block').remove();
            
        }

    },

    delete: {

        block: (ev) => {

            ev.closest('block').remove();
            
        },

        section: (ev) => { alert('editor.delete.section');

            ev.closest('block').remove();
            
        }

    }

}