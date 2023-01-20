import { Duplex } from 'stream';
import { mouse, Point, straightTo } from '@nut-tree/nut-js';
import { directions } from './constants';
import { getCurrentMousePoint } from './helpers';

export const mouseMove = async (commandName: string, length: number) => {
  const [, direction] = commandName.split('_');
  const currentPoint: Point = await getCurrentMousePoint();

  let newPoint: Point;

  switch (direction) {
    case directions.left:
      newPoint = new Point(currentPoint.x - length, currentPoint.y);
      break;
    case directions.right:
      newPoint = new Point(currentPoint.x + length, currentPoint.y);
      break;
    case directions.up:
      newPoint = new Point(currentPoint.x, currentPoint.y - length);
      break;
    case directions.down:
      newPoint = new Point(currentPoint.x, currentPoint.y + length);
      break;
    default:
      newPoint = currentPoint;
      break;
  }

  await mouse.move(straightTo(newPoint));
};

export const sendMousePosition = async (duplexStream: Duplex) => {
  const position = await getCurrentMousePoint();
  console.log('x=', position.x, ' y=', position.y);

  duplexStream.write(`mouse_position ${position.x},${position.y}`);
};
