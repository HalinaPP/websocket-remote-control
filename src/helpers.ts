import { mouse, Point } from '@nut-tree/nut-js';
import { Command } from './types';

export const parseMessage = (message: string): Command => {
  const messageParts = message.split(' ');
  const [name, ...params] = messageParts;
  return { name, params };
};

export const getCurrentMousePoint = async (): Promise<Point> => {
  return await mouse.getPosition();
};
