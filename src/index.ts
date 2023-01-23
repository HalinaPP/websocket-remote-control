import WebSocketServer, { createWebSocketStream } from 'ws';
import { WS_PORT, HTTP_PORT } from './utils/constants';
import { parseMessage } from './utils/helpers';
import { runCommand } from './modules/processCommand';
import { httpServer } from './server';

const onConnect = (ws: WebSocketServer) => {
  console.log(`Websocket connected on ${WS_PORT} port`);
  const webSocketStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  webSocketStream.on('data', async (message) => {
    console.log(`get command from client: ${message}`);
    const command = parseMessage(message);

    await runCommand(command, webSocketStream);

    console.log(`command '${message}' completed`);
  });

  webSocketStream.on('error', (err) => {
    console.log(err.message);
  });

  ws.on('close', () => {
    console.log(`Websocket closed on ${WS_PORT} port`);
  });

  process.on('SIGINT', () => {
    process.stdout.write('Close websocket\n');
    ws.close();
    process.exit(0);
  });
};

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wsServer = new WebSocketServer.Server({ port: WS_PORT });

wsServer.on('connection', onConnect);
