import { Command } from './types';
import { drawCircle, drawRectangle, drawSquare } from './draw-figures';
import WebSocketServer, { createWebSocketStream } from 'ws';
import { parseMessage } from './helpers';
import { commandNames, WS_PORT, HTTP_PORT } from './constants';
import { Duplex } from 'stream';
import { mouseMove, sendMousePosition } from './mouse-move';
import { httpServer } from './server';
import { printScreen } from './create-screenshot';

const runCommand = async (command: Command, duplexStream: Duplex) => {
  const { name: commandName, params } = command;
  const firstParam = Number(params[0]);
  const secondParam = Number(params[1]) ?? 0;

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
      await drawRectangle(firstParam, secondParam);
      duplexStream.write(commandName);
      break;
    case commandNames.mouseDown:
    case commandNames.mouseUp:
    case commandNames.mouseLeft:
    case commandNames.mouseRight:
      await mouseMove(commandName, firstParam);
      duplexStream.write(commandName);
      break;
    case commandNames.mousePosition:
      await sendMousePosition(duplexStream);
      break;
    case commandNames.printScreen:
      await printScreen(duplexStream);
      duplexStream.write(commandName);
      break;
    default:
      break;
  }

  /* duplexStream.write(commandName, () => {
     console.log(commandName, ' finished');
   });*/
};

const onConnect = (ws: WebSocketServer) => {
  console.log(`Websocket connected on ${WS_PORT} port`);
  const webSocketStream = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  webSocketStream.on('data', async (message) => {
    console.log(message);
    const command = parseMessage(message);

    await runCommand(command, webSocketStream);

    webSocketStream.on('error', (err) => {
      console.log(err.message);
    });
  });

  ws.on('close', () => {
    console.log(`Websocket closed on ${WS_PORT} port`);
  });

  process.on('SIGINT', () => {
    process.stdout.write('Closing websocket...\n');
    ws.close();
    process.exit(0);
  });
};

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wsServer = new WebSocketServer.Server({ port: WS_PORT });

wsServer.on('connection', onConnect);
