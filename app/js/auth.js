function notify(packet) {
    alert(packet.msg);
}
window.auth = {
    config: {
        apiKey: "AIzaSyBxGXe52WtXo_B5iKBo9BQZSfAwYFhLRO8",
        authDomain: "uios-83649.firebaseapp.com",
        projectId: "uios-83649",
        messagingSenderId: "47824486713",
        appId: "1:47824486713:web:51f3a124b42b1080"
    },
    change: (user) => { //console.log({user});
        return new Promise((resolve, reject, url) => {
            var goto = '/';
            if(user) {
                user.photoURL ? dom.avi.style.backgroundImage = 'url("' + user.photoURL + '")' : null;
                goto = (document.body.dataset.page === '/my/account/' ? '/' : window.location.pathname)
            } else {
                byId('feed-alerts').innerHTML = "";
                dom.avi.removeAttribute('style');
                document.body.removeAttribute('data-uid');
                goto = window.location.pathname+window.location.hash+window.location.search;
            }
            resolve(goto);
        });
    },
    check: uid => {
        return new Promise((resolve, reject, url) => {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(jwt => {
                ajax(api.endpoint()+'/auth/firebase/verify', {dataType: "POST", data: jwt}).then((j,json=JSON.parse(j)) => {
                    var response = json.response; resolve(response);
                }).catch(err => {
                    resolve(err);
                })
            }).catch(error => console.log({error}));
        });
    },
    profile: () => { (auth.user() ? "/users/"+auth.user().uid+"/" : "/my/account/").router() },
    verify: uid => {
        return new Promise((resolve, reject, url) => {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(jwt => {
                ajax(api.endpoint()+'/auth/firebase/verify', {dataType: "POST", data: jwt})
                    .then((j,json=JSON.parse(j)) => resolve(json));
            }).catch(error => console.log({error}));
        });
    },
    getIdToken: () => {
        return new Promise((resolve, reject, url) => {
            firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(jwt => { resolve(); });
        });
    },
    isEmail: email => { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); },
    login: {
        user: (event) => {
        event.preventDefault();
        var email = event.target.find('.username').value;
        var password = event.target.find('.password').value;
        console.log({email,password});
        return new Promise((resolve, reject) => {

            firebase.auth().signInWithEmailAndPassword(email, password).then(e => {

              (localStorage.returnUrl ? localStorage.returnUrl : '/home/').router();
              resolve(e);

            }).catch(function(error) {

              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(error.code +': '+ error.message);
              notify({msg: 'There is no user matching these credentials'},2);
              
            });

        });
        }
    },
    setup: {
        account: event => { alert(true);
            event.preventDefault();
            var target = event.target;
            var email = target.find('.email').value,
                password = target.find('.secret').value;
            console.log({target,email, auth: auth.user()});
            return new Promise((resolve, reject) => {
              ajax(api.endpoint()+'/v1/read/auth', {dataType: "POST", data: {email,password}}).then(e => {
                console.log(e);
                var results = JSON.parse(e), count = results.count, user = auth.user(); console.log(results,user);
                    if(count===0) {        
                        if(auth.isEmail(email)) {
                            firebase.auth().createUserWithEmailAndPassword(email, password).then(f => { var uid = f.user.uid; console.log(uid);
                                console.log({email});
                                ajax(api.endpoint()+'/v1/create/users', {dataType: "POST", data: {email,password,uid}}).then(e => { 
                                    console.log('CREATE',e,auth.user()); 
                                    //('/users/'+auth.user().uid+'/').router();
                                });
                            }).catch(err => { var notif; console.log(err,2);
                                if(err.code === "auth/email-already-in-use") { error = 'This user exists already. Sign in as this user in order to add password authentication.'; }
                                alert(error,3);
                            });
                        } 
                        else { alert('You must register with a valid email address.',3); }
                    }
                    else { alert('This user exists already.',3); }
                
              })
            });  
        },     
        shop: () => {} 
    },
    state: (event) => {
        if(typeof event === "string" || (typeof event === 'object')) {
          var oAuth = (net) => { var provider; firebase.auth().useDeviceLanguage();
            if(net === 'facebook') { provider = new firebase.auth.FacebookAuthProvider(); }
            else if(net === 'github') { provider = new firebase.auth.GithubAuthProvider(); }
            else if(net === 'google') { provider = new firebase.auth.GoogleAuthProvider(); provider.addScope('https://www.googleapis.com/auth/drive'); provider.addScope('https://www.googleapis.com/auth/drive.readonly'); provider.addScope('https://www.googleapis.com/auth/drive.appdata'); }
            else if(net === 'github') { provider = new firebase.auth.GithubAuthProvider(); }
            else if(net === 'microsoft') { provider = new firebase.auth.OAuthProvider('microsoft.com'); }
            else if(net === 'twitter') { provider = new firebase.auth.TwitterAuthProvider(); } 
            isOnline() ? firebase.auth().currentUser.linkWithPopup(provider).then((result) => { var credential = result.credential, user = result.user;  }) :
              firebase.auth().signInWithPopup(provider).then(e => {
                localStorage[net+'Token'] = e.credential.accessToken;
                auth.check(uid).then(response => { console.log({response});
                    alert(goto);
                    goto.router().then(resolve());
                });         
              }).catch(error => console.log(error.message,2));            
          }
          if(typeof event === "object") { event.forEach(k => oAuth(k)); }
          else if(typeof event === "string") { oAuth(event); }
        }
    },
    close: (network) => { return new Promise((resolve, reject) => firebase.auth().signOut().then(resolve()), error => reject(data)); },
    framework: (framework) => { return framework.isauth && isOnline() ? 'isauth' : 'noauth'},
    update: (displayName) => { isOnline() ? isOnline().updateProfile({displayName}).then(() => console.log('auth.js auth.update:',displayName), () => notify('There was an error changing your username.',2)) : notify('You must be logged in to change your username',2); },
    user: () => { return firebase.auth().currentUser; }
}
function isOnline() { return firebase.auth().currentUser; }
