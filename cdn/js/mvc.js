window.mvc['m'] = {

    

};

window.mvc['v'] = {

    desktop: {

        apps: async(app) => {
            
            //var json = JSON.parse(await ajax('/cdn/json/config/'+app+'.json')); console.log({json});

            var html = ``;
            html += `<div class="app app-`+app+`" data-evt="app">`; //style="width:`+json.size.width+`;height:`+json.size.height+`;"
                html += `<header><section class="name" data-after="`+app+`"></section><section class="actions"><a class="mini"></a><a class="maxi"></a><a class="exit"></a></section></header>`;
                html += `<iframe allow="camera;microphone" src="`+window.location.protocol+`//`+app+`-uios.netlify.app">`;
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