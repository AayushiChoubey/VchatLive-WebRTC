let APP_ID = 'b34c7b0a937f458cb8f1f448b709cb50';

let token = null;
let uid = String(Math.floor(Math.random() * 10000))

let client;
let channel;

let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']

        }
    ]
};

let init = async () => {
     client = AgoraRTM.createInstance(APP_ID);
     await client.login({ uid, token});

        channel = client.createChannel('main');
         await channel.join();

         channel.on('MemberJoined', handleUserJoined);
        // channel.on('MemberLeft', handleUserLeft)

         client.on('MessageFromPeer', handleMessageFromPeer)
     

    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    document.getElementById('user-1').srcObject = localStream;

}


let handleMessageFromPeer = async (message, peerId) => {
    message = JSON.parse(message.text);
    console.log("Message From Peer :", message);
}

let handleUserJoined = async (MemberId) => {
    console.log("User Joined :", MemberId);
    createOffer(MemberId);
} 



let createOffer = async (MemberId) => {
    peerConnection = new RTCPeerConnection();

    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;

    if(!localStream) {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        document.getElementById('user-1').srcObject = localStream;
    }

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
        });
    }

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            client.sendMessageToPeer({text:JSON.stringify({'type':'candidate', 'candidate':event.candidate})}, MemberId);
        }
    }


    let offer= await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    client.sendMessageToPeer({text:JSON.stringify({'type':'offer', 'offer':offer})}, MemberId);
}


init();