import { straightTo, mouse, Button, Point } from '@nut-tree/nut-js';
import { circlePoints } from '../../utils/constants';
import { getCurrentMousePoint } from '../mouse';

export const drawCircle = async (radius: number) => {
  const leftButton = Button.LEFT;
  const currentPoint: Point = await getCurrentMousePoint();
  const center = { x: currentPoint.x - radius, y: currentPoint.y };
  mouse.config.mouseSpeed = 400;

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

export const drawSquare = async (width: number) => {
  await drawRectangle(width, width);
};

export const drawRectangle = async (width: number, length: number) => {
  const leftButton = Button.LEFT;
  const currentPoint: Point = await getCurrentMousePoint();

  mouse.config.mouseSpeed = 100;

  await mouse.pressButton(leftButton);

  const newPoint = { x: currentPoint.x + width, y: currentPoint.y };
  await mouse.move(straightTo(newPoint));

  newPoint.y = newPoint.y - length;
  await mouse.move(straightTo(newPoint));

  newPoint.x = newPoint.x - width;
  await mouse.move(straightTo(newPoint));

  newPoint.y = newPoint.y + length;
  await mouse.move(straightTo(newPoint));

  await mouse.releaseButton(leftButton);
};
