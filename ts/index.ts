import * as through2 from 'through2'; 
import { cache } from './injection';
import { Transform } from 'stream'; // needed for types

export let gulpPipe = function() {
  return through2.obj(function(file, enc, cb) {
    cache[file.path] = file;
    return cb(null, file);
  });
};

export interface fileObject {
  path: string;
  contents: Buffer;
}

export let injectFileArray = async (fileArray: fileObject[]) => {
  for (let fileObject of fileArray) {
    /* if (/[yourTestFilenameHere.js]/.test(request)) {
      // console.log('injected:' + fileObject.path)
    } */
    cache[fileObject.path] = fileObject;
  }
  return fileArray;
};

export let getFileString = (filePathArg: string) => {
  if (cache[filePathArg]) {
    return cache[filePathArg].contents.toString();
  }
};