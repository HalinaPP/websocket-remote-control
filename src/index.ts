import { Command } from './types';
import { drawCircle, drawSquare } from './draw-figures';
import WebSocketServer, { createWebSocketStream } from 'ws';
import { getCurrentMousePoint, parseMessage } from './helpers';
import { commandNames } from './constants';
import { Duplex } from 'stream';
import { mouseMove } from './mouse-move';

const runCommand = async (command: Command, duplexStream: Duplex) => {
  const { name: commandName, params } = command;
  const firstParam = Number(params[0]);

  switch (commandName) {
    case commandNames.drawCircle:
      await drawCircle(firstParam);
      duplexStream.write(commandName);
      break;
    case commandNames.drawSquare:
      await drawSquare(firstParam);
      duplexStream.write(commandName);
      break;
    case commandNames.drawRectangle:
      break;
    case commandNames.mouseDown:
    case commandNames.mouseUp:
    case commandNames.mouseLeft:
    case commandNames.mouseRight:
      await mouseMove(commandName, firstParam);
      duplexStream.write(commandName);
      break;
    default:
      break;
  }

  const position = await getCurrentMousePoint();
  console.log('x=', position.x, ' y=', position.y);

  duplexStream.write(`mouse_position_${position.x},${position.y}`);
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

  ws.on('close', () => {
    console.log('the client has connected');
  });

  ws.on('message', (message) => {
    console.log('server=', message.toString());
  });
};

const wsServer = new WebSocketServer.Server({ port: 8080 });

wsServer.on('connection', onConnect);
