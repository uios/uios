window.editor = {

    create: {

        block: (target) => { //console.log(target);

            var ement = target.closest('[data-element]');
            if(ement) {  
              var tagName = ement.dataset.element;
              var element = byId('block-div').innerHTML; 
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