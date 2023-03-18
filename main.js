let localStream;
let remoteStream;
let peerConnection;

let init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    document.getElementById('user-1').srcObject = localStream;

    createOffer();
}

let createOffer = async () => {
    peerConnection = new RTCPeerConnection();

    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;

    let offer= await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    console .log("Offer :",offer);

}


init();