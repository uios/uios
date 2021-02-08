
  window.onload = () => { //alert('loaded');

    var dom = {
      doc: document,
      body: document.body,
      main: document.body.querySelector("main")
    };

    dom.body.dataset.load = "ed";

    dom.doc.onclick = event => on.touch.tap(event);

  };
  
  window.byLabel = function(obj, label) {
    if(obj.label === label) { return obj; }
    for(var i in obj) {
        if(obj.hasOwnProperty(i)){
            var foundLabel = findObjectByLabel(obj[i], label);
            if(foundLabel) { return foundLabel; }
        }
    }
    return null;
  };