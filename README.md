<h1> VchatLive WebRTC</h1>

A peer to peer <b>WebRTC</b> application with controls

<h3> Introduction</h3>
This project uses WebRTC for real-time communication between two peers using Agora for signalling.<br>
<br>

The Agora RTM Web SDK is a JavaScript library loaded by an HTML web page. The Agora RTM Web SDK library uses APIs in the web browser to establish real-time messaging services.

AgoraRTM is the exported module of the Agora RTM SDK. If you import the Agora RTM Web SDK using the <script> tag, the SDK creates a global variable called AgoraRTM, which includes all the module members.

Please use the RtmClient.on and RtmChannel.on methods to add event listeners to the RtmClient and RtmChannel objects.<br>
Documentation link :https://api-ref.agora.io/en/signaling-sdk/web/1.x/index.html


<h2>WebRTC</h2>
The WebRTC (Web Real Time Communication) API allows us to communicate peer to peer without the hassle of setting up network communication protocols, NAT traversals, different audio and video codecs, etc.

Note: NAT (Network Address Translation) is the mechanism by which the devices on a network are given public IPs to communicate on the internet.
