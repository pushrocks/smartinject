import * as through2 from 'through2';
import { cache } from './injection';
import { Transform } from 'stream'; // needed for types

export const gulpPipe = () => {
  return through2.obj((file, enc, cb) => {
    cache[file.path] = file;
    return cb(null, file);
  });
};

export interface IFileObject {
  path: string;
  contents: Buffer;
}

export const injectFileArray = async (fileArray: IFileObject[]) => {
  for (const fileObject of fileArray) {
    /* if (/[yourTestFilenameHere.js]/.test(request)) {
      // console.log('injected:' + fileObject.path)
    } */
    cache[fileObject.path] = fileObject;
  }
  return fileArray;
};

export const getFileString = (filePathArg: string) => {
  if (cache[filePathArg]) {
    return cache[filePathArg].contents.toString();
  }
};
