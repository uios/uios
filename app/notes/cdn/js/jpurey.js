window.byId = s => { return document.getElementById(s); }

function ajax(url, settings) { //console.log(url,settings);
  return new Promise((resolve, reject) => { var req;
    if(settings && settings.dataType === 'POST') { req = new Request(url, { method: 'POST', body: (settings.data ? JSON.stringify(settings.data) : null), headers: new Headers() }); } else { req = url; }
    fetch(req).then(response => {
      try {
        if(response.status === 404) { reject({code:404,message:'Not Found'}); }
        else { response.text().then(res => resolve(res)); }
      } 
      catch(e) { reject(e); } 
    });
  });
}