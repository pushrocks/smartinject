import 'typings-test'
import { expect } from 'smartchai'

import * as path from 'path'

import * as smartinject from '../dist/index'

describe('smartinject', function() {
    it('should inject a file using fileArray', function() {
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

    it('should log hi to console', function() {
        require(path.join(__dirname, 'hi.js'))
    })
})