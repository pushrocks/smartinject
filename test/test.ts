import { tap, expect } from 'tapbundle'

import * as path from 'path'

import * as smartinject from '../dist/index'

tap.test('should inject a file using fileArray', async () => {
  return smartinject.injectFileArray([
    {
      path: path.join(__dirname, 'hi.js'),
      contents: new Buffer(
        `require('./hi2.js')
console.log('this console comment was injected')
`)
    }
  ])
})

tap.test('should log hi to console', async () => {
  require(path.join(__dirname, 'hi'))
})

tap.start()
