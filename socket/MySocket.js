const WebSocket = require("ws");

function MySocket() {
  const mySocket = {};

  const connections = [];

  mySocket.initialize = (server) => {
    const wss = new WebSocket.Server({ server: server });

    wss.on("connection", (ws) => {
      connections.push(ws);

      ws.on("message", (msg) => {
        console.log("Got message");
      });

      console.log(`Got connection have ${connections.length} now`);
    });
  };

  mySocket.notifyAll = () => {
    console.log(`Notifying ${connections.length}  clients `);
    connections.forEach((ws) => ws.send("Refresh"));
  };

  return mySocket;
}

module.exports = MySocket();
