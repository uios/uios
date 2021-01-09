window.mvc['m'] = {

    

};

window.mvc['v'] = {

    desktop: {

        apps: (app) => {
            var html = ``;
            html += `<div class="app">`;
                html += `<header><div data-after="`+app+`"></div></header>`;
                html += `<iframe src="`+window.location.protocol+`//`+app+`.`+window.location.host+`">`;
            html += `</div>`;
            byId('apps').insertAdjacentHTML('beforeend',html);
        },

        index: () => {
            return new Promise((resolve,reject) => {
                resolve();
            });                        
        },

        search: () => {
            return new Promise((resolve,reject) => {
                byId('search').find('.icon').click();
                resolve();
            });                        
        }

    },

    my: {

        account: paths => {
            return new Promise((resolve,reject) => {
                resolve();
            });
        },
        menu: () => {
            return new Promise((resolve,reject) => {
                resolve();
            });                        
        }

    }

};

window.mvc['c'] = {

};