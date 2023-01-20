import { Command } from './types';

export const parseMessage = (message: string): Command => {
  const messageParts = message.split(' ');
  const [name, ...params] = messageParts;
  return { name, params };
};
