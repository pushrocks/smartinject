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
  let resolvedRequest: string
  if (parent && /^\./.test(request)) {
    let resolvedDir = path.parse(parent.filename).dir
    resolvedRequest = path.join('/', resolvedDir, request)
  } else {
    resolvedRequest = request
  }

  // uncomment for testing
  /* if (/[yourTestFilenameHere.js]/.test(request)) {
    console.log('resolvedRequest:' + resolvedRequest)
    console.log(parent)
  } */

  let file = cache[resolvedRequest]
  let file2 = cache[resolvedRequest + '.js']
  if (file || file2) {
    return resolvedRequest
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
    /* if (/[yourTestFilenameHere.js]/.test(request)) {
      // console.log('injected:' + fileObject.path)
    } */
    cache[fileObject.path] = fileObject
  }
  return fileArray
}

export let getFileString = (filePathArg: string) => {
  if (cache[filePathArg]) {
    return cache[filePathArg].contents.toString()
  }
}