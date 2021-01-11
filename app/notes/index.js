window.onload = () => {

    window.dom = {
        "body": document.body        
    }

    window.location.pathname.router();

    dom.body.onclick = event => on.touch.tap(event,'tap');

}