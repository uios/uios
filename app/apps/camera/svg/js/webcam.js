window.webcam = {
    global: {
        width: 1920, 
        height: 0
    },
    audio: null,
    blank: event => {
        console.log(event);                    
    },
    clear: target => {
        dom.camera.classList.remove('snap');
        dom.camera.find('img').removeAttribute('src');
        dom.camera.find('#camera-photo').innerHTML = `<div class="audio waveform"><div class="controls"><a class="play"></a></div><audio></audio></div><img class="photo"><video class="video"></video>`;
        dom.camera.find('[type="file"]').remove();
        dom.camera.insertAdjacentHTML('afterbegin','<input style="display:none;" type="file" onchange="webcam.file(this);">');
    },
    constraints: {
        vertical: { video: {width: {exact: 1080}, height: {exact: 1920}} },
        horizontal: {
            video: {
                width: { min: 640, ideal: 1920, max: 4096 },
                height: { min: 400, ideal: 1080, max: 2160 },
                aspectRatio: { ideal: 1.7777777778 },
                facingMode: 'environment'
            } 
        }
    },
    canplay: event => {
        var video = event.target;
        if(!video.classList.contains('canplay')) {
            var width = webcam.global.width;
            var height = video.videoHeight / (video.videoWidth/width);
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            video.classList.add('canplay');
        }
    },
    file: input => { 

        var files = input.files;

        if(files.length > 0) {
            if(files.length === 1) {
                var reader = new FileReader();
                var file = files[0];
                console.log({file});
                reader.readAsDataURL(file);
                reader.onload = () => onLoad(reader.result,file.type);
                reader.onloadstart = () => { console.log(); };
                reader.onprogress = evt => onProgress(evt);
                reader.onabort = () => { };
                reader.onerror = () => console.log(reader.error);
            }
        }
        function onLoad(file,type) {
            var format = byId('lens').dataset.media;
            if(['merch','pages','photo'].includes(format)) {
                var canvas = byId('canvas');
                var video = byId('camera-video');
                var width = webcam.global.width;
                var photo = byId('camera-photo');
                var context = canvas.getContext('2d');
                var img = new Image();
                img.src = file;
                img.addEventListener("load", () => { console.log({img});
                    webcam.global.width = photo.width = canvas.width = width;
                    webcam.global.height = photo.height = canvas.height = height = img.height/(img.width/width);
                    context.drawImage(img, 0, 0, width, height); console.log({width,height});
                    if(width && height) {
                        canvas.width = width;
                        canvas.height = height;
                        var png = canvas.toDataURL(type);
                        context.drawImage(img, 0, 0, width, height);
                        webcam.media = file;
                        dom.camera.classList.add('snap');
                        photo.find('img').setAttribute('src', png);
                        photo.find('img').dataset.type = type;
                        byId('camera-download').href = 'url('+png+')';
                        dom.camera.classList.add('snap');
                    }                
                    dom.camera.find('#camera-photo').find('img').src = file;
                    //byId('camera-download').href = file;
                });
            }
            if(format === 'video') {
                dom.camera.find('#camera-photo').find('video').src = file
                //byId('camera-download').href = file;
                dom.camera.classList.add('snap');
            }
            if(format === 'audio') {
                webcam.audio = WaveSurfer.create({
                    container: '.view-create .waveform',
                    cursorColor: '#777',
                    progressColor: '#000',
                    responsive: true,
                    waveColor: '#fff'
                });
                webcam.audio.loadBlob(files[0]);
                webcam.audio.on('ready',() => {        
                    webcam.media = file;
                    dom.camera.find('#camera-photo').find('audio').setAttribute('src', file);           
                });
                dom.camera.classList.add('snap'); 
                //byId('camera-download').href = file;
            }
        }
        function onProgress(evt) {
            console.log({evt});
            if (evt.lengthComputable) {
                var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
                if(percentLoaded < 100) { console.log(percentLoaded); }
            }            
        }

    },
    media: null,
    io: cam => {
        return new Promise((resolve,reject) => {
            //dom.body.dataset.cam === "true" ? dom.body.dataset.cam = "false" : dom.body.dataset.cam = "true";
            webcam.switch();
        });
    },
    lens: target => {
        var lens = target.closest('#lens');
        var media = target.closest('.media');
        var kodak = target.classList.contains('kodak');
        if(media) { 
            lens.dataset.media = media.dataset.format;
            if((webcam.mode() === 'capture' && lens.dataset.media === 'audio' && browser.agent() === 'iOS')) { lens.dataset.disabled = 'true'; }
            else if(webcam.capture() === false && webcam.mode() === 'capture') { lens.dataset.disabled = 'true'; }
            else if(webcam.mode() === 'camera' && !webcam.stream) { lens.dataset.disabled = 'true';}
            else { lens.removeAttribute('data-disabled'); }
        }
        else if(kodak) {
            webcam.snap(lens.dataset.media);
        }
    },
    play: (paths) => {
        return new Promise((resolve, reject) => { //console.log(link,arrayRemove(link,""));
            var video = byId('webcam');
            var camera = video.closest('.camera-video');

            if(window.width < window.height) { constraints = webcam.constraints.horizontal; }
            else { constraints = webcam.constraints.horizontal; }

            navigator.mediaDevices.getUserMedia(constraints).then(async stream => {
                window.stream = stream;
                var track = stream.getVideoTracks()[0];
                video.srcObject = webcam.stream = stream;
                video.onloadedmetadata = data => { console.log({video,track});
                    var capabilities = track.getCapabilities(); console.log({capabilities});
                    if(capabilities.zoom) { }
                    if(capabilities.torch) { }
                    //$(all('.io')).addClass('i').removeClass('o');
                    dom.body.dataset.cam = true;
                    lens.dataset.disabled = 'false';
                    $(camera).addClass('playing')[0].find('video').play();
                    dom.camera.dataset.mode = 'camera';
                    resolve({paths});
                }
            }).catch(err => {
                $(camera).removeClass('playing');
                dom.body.dataset.cam = false;
                resolve({paths,err});
            });
        });
    },
    resize: image => {

    },
    skip: () => {
        ('/create/'+byId('lens').dataset.media+'/').router();
    },
    save: target => {
        var cam = byId('webcam');
        var format = byId('lens').dataset.media;
        var img = byId('camera-photo').find('img');
        var type = dom.camera.find('[type="file"]').files[0].type;
        console.log({format});
        if(format === 'merch') {            
            var thumbnails = byId('create-thumbnails');
            var thumbnail = '<a><img></a>';
            var context = canvas.getContext('2d');
            var image = byId('create-image').find('img');
            context.drawImage(img, 0, 0, img.width, img.height);
            var png = canvas.toDataURL(type);
            console.log({type,png});
            byId('create-image').innerHTML = '<img">';
            byId('create-image').firstChild.src = png;
            if(thumbnails.children.length < 6) {
                thumbnails.insertAdjacentHTML('afterbegin',thumbnail);
                thumbnails.firstChild.find('img').src = png;
                byId('create-thumbnails').parentNode.previousElementSibling.innerHTML = '<img src="'+png+'">';
                thumbnails.find('img').src = png;
                webcam.clear(target);   
            }
            ('/create/'+format+'/').router().then(() => {
                dom.camera.classList.remove('snap');
            });
        }    
        else if(format === 'photo') {
            var image = byId('camera-photo').innerHTML;
            byId('create-image').innerHTML = image;
            ('/create/'+format+'/').router();
        }        
        else if(format === 'video') {
            var thumbnails = byId('create-thumbnails');
            var thumbnail = '<a><img></a>';
            if(thumbnails.children.length < 6) {
                var png = canvas.toDataURL('image/png');
                thumbnails.insertAdjacentHTML('afterbegin',thumbnail);
                byId('create-thumbnails').parentNode.previousElementSibling.innerHTML = '<img src="'+png+'">';
                thumbnails.firstChild.find('img').src = png;
                webcam.clear(target);
            }
            ('/create/'+format+'/').router();
        }        
        else if(format === 'audio') {
            var thumbnails = byId('create-thumbnails');
            var thumbnail = '<a><img></a>';
            if(thumbnails.children.length < 6) {
                var png = canvas.toDataURL('image/png');
                thumbnails.insertAdjacentHTML('afterbegin',thumbnail);
                byId('create-thumbnails').parentNode.previousElementSibling.innerHTML = '<img src="'+png+'">';
                thumbnails.firstChild.find('img').src = png;
                webcam.clear(target);
            }
            ('/create/'+format+'/').router();
        }             
        else if(format === 'pages') {
            var thumbnails = byId('create-thumbnails');
            var thumbnail = '<a><img></a>';
            if(thumbnails.children.length < 6) {
                var png = canvas.toDataURL('image/png');
                thumbnails.insertAdjacentHTML('afterbegin',thumbnail);
                byId('create-thumbnails').parentNode.previousElementSibling.innerHTML = '<img src="'+png+'">';
                thumbnails.firstChild.find('img').src = png;
                webcam.clear(target);
            }
            ('/create/'+format+'/').router();
        }   
    },
    snap: target => {
        var cam = byId('webcam');
        var format = target.previousElementSibling.dataset.media;
        var mode = byId('camera').dataset.mode;
        var lens = byId('lens');
        if(lens.dataset && lens.dataset.disabled !== "true") {
            if(mode === 'camera' && webcam.stream) {
                if(format === 'merch') {
                    var video = target.parentNode.previousElementSibling.find('video');
                    var width = webcam.global.width;
                    var photo = byId('camera-photo');
                    var context = canvas.getContext('2d');
                    webcam.global.width = photo.width = canvas.width = width;
                    webcam.global.height = photo.height = canvas.height = height = video.videoHeight/(video.videoWidth/width);
                    if(cam.clientHeight < cam.clientWidth) { }
                    context.drawImage(cam, 0, 0, width, height); console.log({width,height});
                    if(width && height) {
                        var data = canvas.toDataURL('image/png'); console.log({data});
                        canvas.width = width;
                        canvas.height = height;
                        var png = canvas.toDataURL('image/png');
                        context.drawImage(video, 0, 0, width, height);
                        cam.closest('.camera').classList.add('snap');
                        photo.find('img').setAttribute('src', data);
                        byId('camera-download').href = 'url('+png+')';
                    }
                }
                if(format === 'photo') {
                    var video = target.parentNode.previousElementSibling.find('video');
                    var width = webcam.global.width;
                    var photo = byId('camera-photo');
                    var context = canvas.getContext('2d');
                    webcam.global.width = photo.width = canvas.width = width;
                    webcam.global.height = photo.height = canvas.height = height = video.videoHeight/(video.videoWidth/width);
                    if(cam.clientHeight < cam.clientWidth) { }
                    context.drawImage(cam, 0, 0, width, height); console.log({width,height});
                    if(width && height) {
                        var data = canvas.toDataURL('image/png'); console.log({data});
                        canvas.width = width;
                        canvas.height = height;
                        var png = canvas.toDataURL('image/png');
                        context.drawImage(video, 0, 0, width, height);
                        cam.closest('.camera').classList.add('snap');
                        photo.find('img').setAttribute('src', data);
                        byId('camera-download').href = 'url('+png+')';
                    }
                }
                if(format === 'video') { }
                if(format === 'audio') { }
                if(format === 'pages') {
                    var video = target.parentNode.previousElementSibling.find('video');
                    var width = webcam.global.width;
                    var photo = byId('camera-photo');
                    var context = canvas.getContext('2d');
                    webcam.global.width = photo.width = canvas.width = width;
                    webcam.global.height = photo.height = canvas.height = height = video.videoHeight/(video.videoWidth/width);
                    if(cam.clientHeight < cam.clientWidth) { }
                    context.drawImage(cam, 0, 0, width, height); console.log({width,height});
                    if(width && height) {
                        var data = canvas.toDataURL('image/png'); console.log({data});
                        canvas.width = width;
                        canvas.height = height;
                        var png = canvas.toDataURL('image/png');
                        context.drawImage(video, 0, 0, width, height);
                        cam.closest('.camera').classList.add('snap');
                        photo.find('img').setAttribute('src', data);
                        byId('camera-download').href = 'url('+png+')';
                    }
                }
            }
            else if(mode === 'capture') {
                var file = cam.closest('.camera').find('[type="file"]');  
                if(format === 'merch') { 
                    file.accept = 'image/*'; 
                    file.capture = 'environment';
                }
                if(format === 'photo') { 
                    file.accept = 'image/*'; 
                    file.capture = 'environment';
                }
                if(format === 'video') { 
                    file.accept = 'video/*'; 
                    file.capture = 'environment';
                }
                if(format === 'audio') { 
                    file.accept = 'audio/*'; 
                    file.removeAttribute('capture');
                }
                if(format === 'pages') {
                    file.accept = 'image/*'; 
                    file.capture = 'environment';
                }
                file.click();
            }
            else if(mode === 'cloud') { byId('webcam-source').click(); }
            else if(mode === 'system') {
                var file = cam.closest('.camera').find('[type="file"]');
                if(format === 'merch') { 
                    file.accept = 'image/*';
                }
                if(format === 'photo') { 
                    file.accept = 'image/*';
                }
                if(format === 'video') { 
                    file.accept = 'video/*';
                }
                if(format === 'audio') { 
                    file.accept = 'audio/mp3'; 
                }
                if(format === 'pages') {
                    file.accept = 'image/*';
                }
                file.removeAttribute('capture');
                file.click();
            }
        } else {
            notify({msg:"Mode not supported."})
        }
    },
    stop: (paths) => {
        return new Promise((resolve, reject) => { 
        if(webcam.stream) {
            var video = byId('webcam');
            webcam.stream.getTracks().forEach(track => track.stop());
            video.parentNode.classList.remove('playing');
            //$(all('.io')).removeClass('i').addClass('o');
            //dom.body.dataset.cam = false;
        }
        });
    },
    stream: null,
    switch: data => {
        var modes = webcam.modes();
        var mode = webcam.mode();
        var km = Object.keys(modes);
        var ki = parseInt(keyByVal(km,mode));
        var vm = Object.values(modes);
        var ml = km.length;
        var nv = ml - 1 === ki ? km[0] : km[ki+1];
        if(data) {        
            mode = data;
        } else {
            mode = query.array.next(webcam.modes(),webcam.mode());
            var lens = byId('lens');
            //if(mode === 'camera'  && webcam.camera() === false) { lens.dataset.disabled = 'true'; }
            if(mode === 'capture' && webcam.capture() === false) { lens.dataset.disabled = 'true'; }
            else if(mode === 'capture' && webcam.capture() === false && byId('lens').dataset.media === 'audio' && browser.agent() === 'iOS') { lens.dataset.disabled = 'true'; }
            else if(mode === 'camera' && !webcam.stream) { lens.dataset.disabled = 'true';  }
            else { lens.removeAttribute('data-disabled'); }
            dom.camera.dataset.mode = mode;
        }
        webcam[((mode === "camera")) ? 'play' : 'stop']();
        console.log(webcam.capture(),{modes,mode},{km,vm},{ml,ki},{nv});
    },
    camera: () => { return dom.body.dataset.cam === "true"; },
    capture: () => { return dom.camera.find('[type="file"]').capture !== undefined; },
    modes: () => {
        var camera = webcam.camera();
        var capture = webcam.capture();
        var cloud = true;
        var system = true;
        var modes = {camera,capture,cloud,system};
        return modes;
    },
    mode: () => {
        var mode = dom.camera.dataset.mode;
        return mode;
    },
    tags: target => {
        var button = target.closest('.tags');
        if(target.closest('.hash')) { $(button).toggleClass('hashtag'); }
    },
    load: {
        down: target => { target.href = canvas.toDataURL('image/png'); },
        up: event => { }
    }
}
function keyByVal(object, value) { return Object.keys(object).find(key => object[key] === value); }
