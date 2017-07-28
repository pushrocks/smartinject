import 'typings-global'

let Module = require('module')
import path = require('path')
import sourceMap = require('source-map-support')
import through2 = require('through2')
import vm = require('vm')

import { Transform } from 'stream'

sourceMap.install({
  retrieveFile: function (path) {
    if (cache[path]) {
      return cache[path].contents.toString()
    } else if (cache[path + '.js']) {
      return cache[path + '.js'].contents.toString()
    }
  }
})

let cache = {}
let originalLoader = Module._extensions['.js']

Module._extensions['.js'] = function (module, filename) {
  let file = cache[filename]
  let file2 = cache[filename + '.js']
  if (file) {
    module._compile(file.contents.toString(), filename)
  } else if (file2) {
    module._compile(file2.contents.toString(), filename)
  } else {
    originalLoader.apply(this, arguments)
  }
}

let originalModuleResolve = Module._resolveFilename

Module._resolveFilename = function (request, parent, isMain) {
  let file = cache[request]
  let file2 = cache[request + '.js']
  if (file || file2) {
    return request
  } else {
    return originalModuleResolve.apply(this, arguments)
  }
}

export let gulpPipe = function () {
  return through2.obj(function (file, enc, cb) {
    cache[file.path] = file
    return cb(null, file)
  })
}

export interface fileObject {
  path: string
  contents: Buffer
}

export let injectFileArray = async (fileArray: fileObject[]) => {
  for (let fileObject of fileArray) {
    cache[fileObject.path] = fileObject
  }
  return fileArray
}
