import * as dotenv from 'dotenv';
dotenv.config();

export const WS_PORT: number = Number(process.env.WS_PORT) || 8080;
export const HTTP_PORT: number = Number(process.env.HTTP_PORT) || 8080;

export const commandNames = {
  drawCircle: 'draw_circle',
  drawSquare: 'draw_square',
  drawRectangle: 'draw_rectangle',
  mouseDown: 'mouse_down',
  mouseUp: 'mouse_up',
  mouseLeft: 'mouse_left',
  mouseRight: 'mouse_right',
  mousePosition: 'mouse_position',
};

export const directions = { left: 'left', right: 'right', up: 'up', down: 'down' };

export const circlePoints = 360;
