window.auth = {
    config: {
      apiKey: "AIzaSyAxGGhCoWY4cSh4idtQww-eLL1emdWVtak",
      authDomain: "camup-25ba8.firebaseapp.com",
      databaseURL: "https://camup-25ba8.firebaseio.com",
      projectId: "camup-25ba8",
      storageBucket: "camup-25ba8.appspot.com",
      messagingSenderId: "527337704739",
      appId: "1:527337704739:web:778bf7a39fd06dca80d096",
      measurementId: "G-8Z5XQNLJ0P"
    },
    change: user => { console.log('auth.js auth.change', user);
        return new Promise((resolve, reject) => { resolve(); });
    },
    isEmail: email => { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); },
    login: (email, password) => {                
        auth.isEmail(email) ? firebase.auth().signInWithEmailAndPassword(results.email, password).then(e => { 
            notify('Logged in successfully', 2); (localStorage.returnUrl ? localStorage.returnUrl : '/home/').route(); resolve(e);
        }).catch(error => notify(error.message,2) && resolve(error)) : null;        
    },
    register: (email,password) => { console.log({email, auth: isOnline()});
        return new Promise((resolve, reject) => {        
            if(auth.isEmail(email)) {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(f => { var uid = f.user.uid; console.log(uid); })
                .catch(err => { var notif; console.log(err,2);
                    if(err.code === "auth/email-already-in-use") { error = 'This user exists already. Sign in as this user in order to add password authentication.'; }
                    notify(error,3);
                });
            } 
            else { notify('You must register with a valid email address.',3); }
        });        
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
              firebase.auth().signInWithPopup(provider).then(e => { localStorage[net+'Token'] = e.credential.accessToken; }).catch(error => notify(error.message,2));            
          }
          if(typeof event === "object") { event.forEach(k => oAuth(k)); }
          else if(typeof event === "string") { oAuth(event); }
        }
    },
    close: (network) => { return new Promise((resolve, reject) => firebase.auth().signOut().then(resolve()), error => reject(data)); },
    update: (displayName) => {
        isOnline() ? isOnline().updateProfile({displayName}).then(() => console.log('auth.js auth.update:',displayName), () => notify('There was an error changing your username.',2)) : notify('You must be logged in to change your username',2);
    }
}