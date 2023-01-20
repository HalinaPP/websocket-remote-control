import { Coordinate, Command } from './types';
import { drawCircle } from './draw-figures';
import WebSocketServer, { createWebSocketStream } from 'ws';
import { mouse } from '@nut-tree/nut-js';
import { parseMessage } from './helpers';
import { commandNames } from './constants';
import { Duplex } from 'stream';

const runCommand = async (command: Command, duplexStream: Duplex) => {
  const position: Coordinate = await mouse.getPosition();
  console.log('x=', position.x, ' y=', position.y);

  switch (command.name) {
    case commandNames.drawCircle:
      await drawCircle(Number(command.params[0]), position);
      break;
    default:
      duplexStream.write(`mouse_position ${position.x},${position.y}`);
      break;
  }
};

const onConnect = (ws: WebSocketServer) => {
  console.log('new connection');
  const webSocketStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  webSocketStream.on('data', async (message) => {
    console.log('mes=', message);
    const command = parseMessage(message);

    await runCommand(command, webSocketStream);

    webSocketStream.on('error', (err) => {
      console.log(err.message);
    });
  });

  ws.on('error', (err) => {
    console.log(err.message);
  });

  ws.on('close', () => {
    console.log('the client has connected');
  });
};

const wsServer = new WebSocketServer.Server({ port: 8080 });

wsServer.on('connection', onConnect);
