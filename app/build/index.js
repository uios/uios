window.onload = () => {
  
  var dom = {
    doc: document,
    body: document.body,
    main: document.body.querySelector("main")
  };

  dom.doc.onclick = event => on.touch.tap(event);
  
  dom.body.dataset.load = "ed";

  var path = (dom.body.dataset && dom.body.dataset.path ? dom.body.dataset.path : "/");
  path.router().then(document.body.classList.add('ed'));
  
};
