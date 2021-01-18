window.room = {

    connect: id => { 

        console.log({id,GET});

        window.connection = new WebRTC();
        connection.socketURL = 'wss://rtc.camup.gq/';
        connection.socketMessageEvent = 'video-conference-demo';
        connection.chunkSize = 16000;
        connection.session = { audio: false, video: true, data: true, oneway: true };
        connection.sdpConstraints.mandatory = { OfferToReceiveAudio: false, OfferToReceiveVideo: true };

        var bitrates = 512, resolutions = 'Ultra-HD', videoConstraints = {}, CodecsHandler = connection.CodecsHandler;
        if(resolutions == 'HD') { videoConstraints = { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: 30 }; }
        else if(resolutions == 'Ultra-HD') { videoConstraints = { width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: 30 }; }
        connection.mediaConstraints = { video: videoConstraints, audio: true };

        connection.processSdp = function(sdp,codecs='vp8') {
            if(codecs.length) { sdp = CodecsHandler.preferCodec(sdp, codecs.toLowerCase()); }
            if (resolutions == 'HD') {
                sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, { audio: 128, video: bitrates, screen: bitrates });
                sdp = CodecsHandler.setVideoBitrates(sdp, { min: bitrates * 8 * 1024, max: bitrates * 8 * 1024 });
            }
            if (resolutions == 'Ultra-HD') {
                sdp = CodecsHandler.setApplicationSpecificBandwidth(sdp, { audio: 128, video: bitrates, screen: bitrates });
                sdp = CodecsHandler.setVideoBitrates(sdp, { min: bitrates * 8 * 1024, max: bitrates * 8 * 1024 });
            }
            return sdp;
        };        
        connection.iceServers = [{ 'urls': ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302', 'stun:stun.l.google.com:19302?transport=udp'] }];
        connection.videosContainer = document.getElementById('section-room'); console.log(connection.videosContainer);
        connection.onstream = function(event) {
            var existing = document.getElementById(event.streamid);
            if(existing && existing.parentNode) {  existing.parentNode.removeChild(existing); }
            event.mediaElement.removeAttribute('src');
            event.mediaElement.removeAttribute('srcObject');
            event.mediaElement.muted = true;
            event.mediaElement.volume = 0;
            var video = document.createElement('video'); 
            try {
                video.setAttributeNode(document.createAttribute('autoplay'));
                video.setAttributeNode(document.createAttribute('playsinline'));
            } catch (e) {
                video.setAttribute('autoplay', true);
                video.setAttribute('playsinline', true);
            }
            if(event.type === 'local') { video.volume = 0;
              try { video.setAttributeNode(document.createAttribute('muted')); } 
              catch (e) { video.setAttribute('muted', true); }
            }
            video.muted = true;
            video.onloadedmetadata = () => video.play();
            video.srcObject = event.stream;
            var width = parseInt(connection.videosContainer.clientWidth / 3) - 20;            
            connection.videosContainer.append(video);
            video.id = event.streamid;
            if(event.type === 'local') { connection.socket.on('disconnect', () => { connection.getAllParticipants().length ? null : location.reload(); }); }
            new MutationObserver(waitElem).observe(document.getElementById('section-room'), { childList: true, attributes: true, subtree: true });           
            function waitElem(mutationList, observer) {
                return new Promise(function(resolve, reject) {
                    mutationList.forEach((mutation) => {
                        switch(mutation.type) {
                            case 'childList': console.log({type:mutation.type,children:document.getElementById('section-room').children.length});
                                var video = mutation.target, added = mutation.addedNodes;
                                elems.cams.dataset.cams = elems.cams.children.length;
                                var a = 0; do { a++; }  while(a<added.length);
                                resolve({added,video});
                            break;
                        }
                    });
                });
            }
        };
        connection.onstreamended = event => { document.getElementById(event.streamid) ? document.getElementById(event.streamid).remove() : null; };        connection.onMediaError = function(e) {
            if (e.message === 'Concurrent mic process limit.') {
                if (DetectRTC.audioInputDevices.length < 2) { alert('Please select external microphone. Check github issue number 483.'); return; }
                var secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
                connection.mediaConstraints.audio = { deviceId: secondaryMic };
                connection.join(connection.sessionid);
            }
        };

        connection.onmessage = function(event) { console.log('ONMESSAGE', {event});

            if(event.data.typing === true) { console.log(event); return; }
            //else { $('#key-press').hide().find('span').html(''); return; }

            if (event.data.chatMessage) { room.msg.recv(event); return; }

            if (event.data.checkmark === 'received') {
                var checkmarkElement = document.getElementById(event.data.checkmark_id);
                if (checkmarkElement) { checkmarkElement.style.display = 'inline';  }
                return;
            }
        };

        console.log({GET});
        if(id) {
                //(function reCheckRoomPresence(roomid) {
                    connection.checkPresence(id, function(isRoomExist) { console.log(isRoomExist);
                        if(isRoomExist) { connection.join(id); return; }
                        else {
                            connection.open(id, function(isRoomOpened, roomid, error) {
                                if(isRoomOpened === true) { console.log('YOU ARE CONNECTED TO THIS ROOM'); }
                                else {
                                  if(error === 'Room not available') { connection.join(id); return; }
                                }
                            });                                
                        };
                        //setTimeout(reCheckRoomPresence, 5000);
                    });
                //})();
        }
        if(navigator.connection && navigator.connection.type === 'cellular' && navigator.connection.downlinkMax <= 0.115) { alert('2G is not supported. Please use a better internet service.'); }

    },
    msg: {
        send: (chatMessage,user_id) => {
            if (!chatMessage || !chatMessage.replace(/ /g, '').length) return;
            var checkmark_id = connection.userid + ':' + connection.token();
            room.msg.recv(chatMessage, checkmark_id);
            connection.send({chatMessage: chatMessage, checkmark_id: checkmark_id});
            connection.send({typing: false});
        },
        recv: (event, id, msg='', data='', status) => { //console.log(event);
            if (event.data) {
                msg += edata = event.data.chatMessage;
                event.data.checkmark_id ? connection.send({checkmark: 'received', checkmark_id: event.data.checkmark_id }) : null;
            } 
            else { msg += data = event; }
            if(data.includes('!yt')) { 
                elems.iframe.src = 'https://www.youtube.com/embed/'+yt.id(data.split('!yt')[1].trim())+'?autoplay=1';
            }
            var conversationPanel = elems.messages.parentNode;
            conversationPanel.firstElementChild.insertAdjacentHTML('beforeend',room.msg.view(event,id,msg,status));
            conversationPanel.scrollTop = conversationPanel.clientHeight + (conversationPanel.scrollHeight - conversationPanel.clientHeight);
        },
        view: (event,id,msg,status) => {            
            return '<div class="message'+(event.data ? '' : ' mine')+'" id="'+id+'"'
                        +(id && connection.userid===id.split(':')[0] ? ' ' : ' data-before="'+event.userid+'"')
                        +(status ? ' data-status="received"' : '')                        
                    +'>'+msg+'</div>';
        }
    }
}
