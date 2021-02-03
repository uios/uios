function ajax(url, settings) { ;
  console.log(url);
  //var url = url.includes('https://') ? url : '.'+url
  var dir = window.location.href.split(url); console.log(dir);
  return new Promise((resolve, reject) => {
    var req;  console.log(url);
    if(settings) {
      if(settings.dataType) {
        var data = { 
          method: settings.dataType, 
          body: (settings.data ? JSON.stringify(settings.data) : null), 
          headers: new Headers() 
        };
        if(settings.dataType === "OPTIONS") {
          data.credentials = 'include';
        }
        req = new Request(url, data);
      } else {
        req = url;
      }
    } 
    else {
      req = url;
    }
    console.log({url,req});
    fetch(req)
      .then(response => {
        if(!response.ok) { throw new Error(JSON.stringify({code:response.status,message:response.statusText})); }
        return response.text()
      })
      .then(response => resolve(response))
      .catch(e => reject(JSON.parse(e.message)));
  });
}