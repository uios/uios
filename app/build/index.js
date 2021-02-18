window.onload = () => { //alert('loaded');

  var dom = {
    doc: document,
    body: document.body,
    main: document.body.querySelector("main")
  };

  dom.body.dataset.load = "ed";

  dom.doc.onclick = event => on.touch.tap(event);

};