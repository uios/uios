window.api = {
    endpoint: () => { return 'https://api.'+window.app+'.'+tld(); },
    v1: {
        create: { },
        read: { },
        update: { },
        delete: { }
    }    
}