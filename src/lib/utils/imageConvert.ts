import * as avif from '@jsquash/avif';
import * as jpeg from '@jsquash/jpeg';
import * as png from '@jsquash/png';
import * as webp from '@jsquash/webp';

async function decode (sourceType: string, fileBuffer: ArrayBuffer) {
  switch (sourceType) {
    case 'avif':
      return await avif.decode(fileBuffer);
    case 'jpeg':
      return await jpeg.decode(fileBuffer);
    case 'png':
      return await png.decode(fileBuffer);
    case 'webp':
      return await webp.decode(fileBuffer);
    default:
      throw new Error(`Unknown source type: ${sourceType}`);
  }
}

async function encode (outputType: string, imageData: ImageData) {
  switch (outputType) {
    case 'avif':
      return await avif.encode(imageData);
    case 'jpeg':
      return await jpeg.encode(imageData);
    case 'png':
      return await png.encode(imageData);
    case 'webp':
      return await webp.encode(imageData);
    default:
      throw new Error(`Unknown output type: ${outputType}`);
  }
}

/**
 * 
 * Converts an image to avif format
 * @param sourceType - the type of the image to be converted, i.e. 'png', 'jpeg', 'webp', 'avif'
 * @param fileBuffer - an image buffer of the image to be converted - i.e. from a file upload
 * @returns an image buffer of the converted image in avif format
 */
async function convert(sourceType: string, fileBuffer: ArrayBuffer) {
  const imageData = await decode(sourceType, fileBuffer);
  return encode('avif', imageData);
}