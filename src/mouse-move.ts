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
