window.onload = () => {
  
  var dom = {
    body: document.body,
    main: document.body.querySelector("main")
  };

  dom.body.onclick = (event) => {
    console.log(event);

    var target = event.target;
    var id = target.closest("[id]");
    var el = target.closest("[data-evt]");

    var className = target.className;

    if (el) {
      
      var evt = el.dataset.evt;
      
      if (evt === "create") {    
        if(target.dataset && target.dataset.element) {  
          var tagName = target.dataset.element;
          var element = ``;
          var html = `<`+tagName+` class="block">`;
          if(tagName === "header") {
            element += `<header></header><section></section><footer></footer>`;       
          }
          if(tagName === "block") {
            element += `<block class="block"><header></header><section></section><footer></footer></block>`;       
            element += `<section class="insert" data-evt="create" data-element="block"></section>`;
          }
          if(tagName === "footer") {
            element += `<footer class="block"><header></header><section></section><footer></footer></footer>`;       
          }
          html += `</`+tagName+`>`;
          el.closest('.page').firstElementChild.insertAdjacentHTML('beforebegin',element);   
        }
      }
      
    }
  };

  /*BLOB*/  
  
};
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

  function getBlobURL(code, type) {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  }
  function getPageURL(html,css,js) {
    const cssURL = getBlobURL(css, 'text/css');
    const jsURL = getBlobURL(js, 'text/javascript');
    const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${js && `<script src="${jsURL}">${atob('PC9zY3JpcHQ+')}`}
      </head>
      <body>
        ${html || ''}
      </body>
    </html>
  `;
    return getBlobURL(source, 'text/html');
  }