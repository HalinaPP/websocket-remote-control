import { Duplex } from 'stream';
import { commandNames } from '../../utils/constants';
import { Command } from '../../utils/types';
import { drawCircle, drawRectangle, drawSquare } from '../draw';
import { moveMouseCursor, sendMousePosition } from '../mouse';
import { printScreen } from '../screenshot';

export const runCommand = async (command: Command, duplexStream: Duplex) => {
  try {
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
        await moveMouseCursor(commandName, firstParam);
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
  } catch (error) {
    console.log('Error during running command:', error.message);
  }
};
