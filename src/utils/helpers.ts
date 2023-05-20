import { Command } from './types';

export const parseMessage = (message: string): Command => {
  const [name, ...params] = message.split(' ');
  return { name, params };
};
