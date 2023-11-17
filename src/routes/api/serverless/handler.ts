import type { VercelRequest, VercelResponse } from '@vercel/node';
import sharp from 'sharp';
 
export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // This is how we send the image to the serverless function
  // const response = await fetch('/api/serverless', {
  //   method: 'POST',
  //   body: buffer
  // });

  const image = request.body;
  const avif = await sharp(image).avif().toBuffer();
  response.setHeader('Content-Type', 'image/avif');
  response.setHeader('Content-Length', avif.length);
  response.send(avif);
}