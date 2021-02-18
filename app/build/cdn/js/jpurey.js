Array.prototype.addClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.classList ? it.classList.add(name) : null; } } else { that[0] ? that[0].classList.add(name) : null; } return that; };
Array.prototype.remove = function(name) { var that = this; if(that.length>0) { for (var i = that.length; i--;) { var it = this[i]; it.remove(); } } return that; };
Array.prototype.removeClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.classList ? it.classList.remove(name) : null; } } else { that[0] ? that[0].classList.remove(name) : null; } return that; };
Array.prototype.siblings = function(name) { var i=0, elems=[], that = this[i]; elems.forEach.call(that.parentNode.children, function(a, b, c) { if(a !== that) { elems[i] = a; i++; } }); return elems; };
Array.prototype.toggleClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.hasClass(name) ? it.classList.remove(name) : it.classList.add(name); } } else { that[0].hasClass(name) ? that[0].classList.remove(name) : that[0].classList.add(name); } return that; };

Element.prototype.display = function(display) { this.ariaHidden = (display === true || display === false) ? display : this.ariaHidden === "true" ? false : true; return this; }
Element.prototype.find = function(elem) { return this.querySelector(elem); };
Element.prototype.all = function(elem) { return this.querySelectorAll(elem); };
Element.prototype.hasClass = function(n) { return new RegExp(' '+n+' ').test(' '+this.className+' '); };
Element.prototype.index = function() { var whl = this; [].forEach.call(whl.parentNode.children, (a, b, c) => (a === whl) ? whl = b : null); return whl; };

window.all = function(str) { return document.querySelectorAll(str); };
window.byId = s => { return document.getElementById(s); }
window.s = (ar,a,b) => { return ar === 1 ? a : b; }
window.$ = obj => { return (typeof obj === 'object') ? (NodeList.prototype.isPrototypeOf(obj)) ? [].slice.call(obj) : (Element.prototype.isPrototypeOf(obj) ? [obj] : null) : (typeof obj === 'string' ? [].slice.call(obj) : null); }

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
