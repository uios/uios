window.addEventListener("popstate", e => (e.state ? e.state.router({pop:true,top:false}) : null));

window.onload = () => {

    window.dom = {
        "body": document.body,
        "editor": byId('editor')
    }

    window.location.pathname.router();

    dom.body.onclick = event => on.touch.tap(event,'tap');

}