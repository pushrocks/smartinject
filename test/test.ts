import { tap, expect } from 'tapbundle'

import * as path from 'path'

import * as smartinject from '../dist/index'

tap.test('should inject a file using fileArray', async () => {
  return smartinject.injectFileArray([
    {
      path: path.join(__dirname, 'hi.js'),
      contents: new Buffer(
        `require('./hi2.js')
require('through2')
console.log('this console comment was injected')
`)
    }
  ])
})

tap.test('should log hi to console', async () => {
  require(path.join(__dirname, 'hi.js'))
})

tap.test('should get a string for a filePath', async () => {
  let fileString = smartinject.getFileString(path.join(__dirname, 'hi.js'))
  console.log(fileString)
})

tap.start()
