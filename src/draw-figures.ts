import { circlePoints } from './constants';
import { straightTo, mouse, Button, Point } from '@nut-tree/nut-js';
import { Coordinate } from './types';

export const drawCircle = async (radius: number, currentPoint: Coordinate) => {
  const leftButton = Button.LEFT;
  const center = { x: currentPoint.x - 100, y: currentPoint.y };

  await mouse.pressButton(leftButton);

  const slice = (2 * Math.PI) / circlePoints;

  for (let i = 0; i < circlePoints; i++) {
    const angle = slice * i;

    const newX = Math.ceil(center.x + radius * Math.cos(angle));
    const newY = Math.ceil(center.y + radius * Math.sin(angle));
    const newCirclePoint = new Point(newX, newY);

    await mouse.move(straightTo(newCirclePoint));
  }

  await mouse.releaseButton(leftButton);
};
