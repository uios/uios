window.editor = {

    create: {

        block: (target) => {
            var ement = target.closest('[data-element]');
            if(ement) {  
              var tagName = ement.dataset.element;
              var element = byId('block-div').innerHTML; 
              ement.closest('.page').lastElementChild.insertAdjacentHTML('beforebegin',element); 
              target.closest('block').previousElementSibling.find('xmp').innerHTML = '<div></div>';
            }
        },

        header: (target) => {
            var ement = target.closest('[data-element]');
            if(ement) {  
              var tagName = ement.dataset.element;
              var element = byId('block-div').innerHTML;
              target.closest('block').insertAdjacentHTML('beforebegin',element); 
              target.closest('block').previousElementSibling.find('xmp').innerHTML = '<header></header>';
            }
        },

        group: (ev) => {
            var block = ev.closest('block');
            var html = byId('block-div').content.firstElementChild.find('.block-div').outerHTML;
            block.children[1].insertAdjacentHTML('beforeend',html);
        },

        frame: (ev) => {
            var block = ev.closest('.block-div');
            var html = byId('block-div').content.firstElementChild.find('.block-div-group-cell').outerHTML;
            block.find('.block-div-group').insertAdjacentHTML('beforeend',html);
        }

    },

    read: {

        block: (ev) => {

            ev.closest('block').remove();
            
        },

        files: (ev) => {

            modal.popup(byId('files').innerHTML);
                                    
        },
        
        section: (ev) => { //alert('editor.delete.section');

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

        group: (ev) => { 

            var section = ev.closest('.block-section').children;
            //alert('editor.delete.group: '+section.length);

            section.length < 2 ? 
                ev.closest('.block').remove() :
                ev.closest('.block-section > *').remove();
            
        }

    }

}