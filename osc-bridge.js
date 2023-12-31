const WebSocket = require("ws");
const osc = require("osc");

const udpPortSend = new osc.UDPPort({
  localAddress: "127.0.0.1",
  localPort: 57121,
  // This is where sclang is listening for OSC messages.
  remoteAddress: "127.0.0.1",
  remotePort: 57120,
  metadata: true
});

udpPortSend.open();

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (socket) => {
    console.log("A Web Socket connection has been established!");
    const socketPort = new osc.WebSocketPort({
        socket: socket,
        metadata: true
    });

    // set up relays to send and receive messages
    new osc.Relay(socketPort, udpPortSend, {raw: true});
});

wss.on("message", (message) => {
    console.log("received: " + message);
});