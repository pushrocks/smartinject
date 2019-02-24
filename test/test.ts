import { tap, expect } from '@pushrocks/tapbundle';

import * as path from 'path';

import * as smartinject from '../ts/index';

tap.test('should inject a file using fileArray', async () => {
  return smartinject.injectFileArray([
    {
      path: path.join(__dirname, 'hi.js'),
      contents: new Buffer(
        `require('./hi2.js')
require('through2')
console.log('this console comment was injected')
`
      )
    }
  ]);
});

tap.test('should log hi to console', async () => {
  require(path.join(__dirname, 'hi.js'));
});

tap.test('should get a string for a filePath from a .js file', async () => {
  let fileString = smartinject.getFileString(path.join(__dirname, 'hi.js'));
  console.log(fileString);
});

tap.test('should accept a typescript registration', async () => {
  
})

tap.test('should get a string for a file path from a .ts file', async () => {
  let fileString = smartinject.getFileString(path.join(__dirname, 'typescript.example.ts'));
})

tap.start();
