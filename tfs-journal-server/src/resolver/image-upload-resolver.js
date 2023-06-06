import { nanoid } from 'nanoid';
import path from 'path';
import sharp from 'sharp';

import { decodeToken } from '../helpers/decode-token.js';

// eslint-disable-next-line consistent-return
export const imageUploadResolver = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const info = await decodeToken(token);
    if (!info.email) {
      throw new Error('Invalid token.');
    }
  } catch (e) {
    return res.status(401).send('Invalid token.');
  }
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.image;

  const extensionName = path.extname(file.name);
  const allowedExtension = ['.png', '.jpg', '.jpeg', '.svg', '.webp'];

  if (!allowedExtension.includes(extensionName)) {
    return res.status(422).send('Invalid Image');
  }

  const filename = `${nanoid()}.webp`;
  const pathRes = `./public-images/${filename}`;

  await sharp(file.data)
    .webp({ quality: 20 })
    .toFile(pathRes, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.send({ status: 'success', filename });
    });
};
