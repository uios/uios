window.mvc['m'] = {

    

};

window.mvc['v'] = {

    page: {

        desktop: {

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

    }

};

window.mvc['c'] = {

};