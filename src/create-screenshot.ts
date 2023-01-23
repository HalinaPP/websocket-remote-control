import { Duplex } from 'stream';
import { getCurrentMousePoint } from './helpers';
import Jimp from 'jimp';
import { Point, providerRegistry, Region, ScreenClass } from '@nut-tree/nut-js';
import { IMAGE_DIMENSIONS } from './constants';

const getRegion = async () => {
  try {
    const { width, height } = IMAGE_DIMENSIONS;
    const currentMousePoint: Point = await getCurrentMousePoint();
    return new Region(currentMousePoint.x - width / 2, currentMousePoint.y - height / 2, width, height);
  } catch (error) {
    throw new Error(`getRegion error: ${error.message}`);
  }
};

const grabImage = async () => {
  const region: Region = await getRegion();
  try {
    const screenCl = new ScreenClass(providerRegistry);

    const grabbedImage = await screenCl.grabRegion(region);
    const rgbImage = await grabbedImage.toRGB();
    return rgbImage;
  } catch (error) {
    throw new Error(`grab image error: ${error.message}`);
  }
};

const getBase64 = async (image: Jimp) => {
  const base64 = await image.getBase64Async(Jimp.MIME_PNG);

  return base64.slice(22);
};

export const printScreen = async (duplexStream: Duplex) => {
  try {
    const grabbedImage = await grabImage();
    const { width, height, data } = grabbedImage;

    console.log(`screenshot image buffer has size:  ${data.byteLength} bytes`);

    new Jimp({ data, width, height }, async (err, image) => {
      const base64 = await getBase64(image);

      duplexStream.write(`prnt_scrn ${base64}`);
    });
  } catch (error) {
    console.log('print screen error', error.message);
  }
};
