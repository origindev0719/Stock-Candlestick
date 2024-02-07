import fs from 'fs';
import path from 'path';
import errorLogic from '../config/errors.js';

export default file =>
    new Promise((resolve, reject) => {
        fs.readFile(file.path, (err, buffer) => {
            if (err) {
                reject(new Error(errorLogic.FILE_READ_ERROR));
                return;
            }

            resolve({
                buffer,
                extension: path.extname(file.name),
                mimeType: file.type
            });
        });
    });
