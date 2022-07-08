import fs from 'fs';
import { diskStorage } from 'multer';

export const image = diskStorage({
  // Specify where to save the file
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/image');
  },
  // Specify the file name
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const removeFile = (fullpath: string) => {
  try {
    fs.unlinkSync(fullpath);
  } catch (error) {
    throw new Error(error);
  }
};