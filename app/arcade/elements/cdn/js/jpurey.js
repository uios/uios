Array.prototype.addClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.classList ? it.classList.add(name) : null; } } else { that[0].classList.add(name); } return that; };
Array.prototype.removeClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.classList ? it.classList.remove(name) : null; } } else { that[0].classList.remove(name); } return that; };
Array.prototype.siblings = function(name) { var i=0, elems=[], that = this[i]; elems.forEach.call(that.parentNode.children, function(a, b, c) { if(a !== that) { elems[i] = a; i++; } }); return elems; };
Array.prototype.toggleClass = function(name) { var that = this; if(that.length>1) { for (var i = that.length; i--;) { var it = this[i]; it.hasClass(name) ? it.classList.remove(name) : it.classList.add(name); } } else { that[0].hasClass(name) ? that[0].classList.remove(name) : that[0].classList.add(name); } return that; };

Element.prototype.find = function(elem) { return this.querySelector(elem); };
Element.prototype.hasClass = function(n) { return new RegExp(' ' + n + ' ').test(' ' + this.className + ' '); };
Element.prototype.index = function() { var whl = this; [].forEach.call(whl.parentNode.children, function(a, b, c) { if(a === whl) { whl = b; } }); return whl; };
Element.qs = s => { return document.querySelector(s); }

window.$ = obj => { return (typeof obj === 'object') ? (NodeList.prototype.isPrototypeOf(obj)) ? [].slice.call(obj) : (Element.prototype.isPrototypeOf(obj) ? [obj] : null) : (typeof obj === 'string' ? [].slice.call(obj) : null); }
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