const Module = require('module');
import path = require('path');
import sourceMap = require('source-map-support');

import vm = require('vm');

export const cache = {};
export const extensionMap: { [key: string]: () => string } = {};
const originalLoader = Module._extensions['.js'];

/**
 * ensure sourcemap support works with the cache
 */
sourceMap.install({
  retrieveFile: (path) => {
    if (cache[path]) {
      return cache[path].contents.toString();
    } else if (cache[path + '.js']) {
      return cache[path + '.js'].contents.toString();
    }
  }
});

Module._extensions['.js'] = function(module, filename) {
  const file = cache[filename];
  const file2 = cache[filename + '.js'];
  if (file) {
    module._compile(file.contents.toString(), filename);
  } else if (file2) {
    module._compile(file2.contents.toString(), filename);
  } else {
    originalLoader.apply(this, arguments);
  }
};

for (const extension in extensionMap) {
  if (extensionMap[extension]) {
    Module._extensions[extension] = function(module, filename) {
      const file = cache[filename];
      const file2 = cache[filename + '.ts'];
      if (file) {
        module._compile(file.contents.toString(), filename);
      } else if (file2) {
        module._compile(file2.contents.toString(), filename);
      } else {
        originalLoader.apply(this, arguments);
      }
    };
  }
}

const originalModuleResolve = Module._resolveFilename;

Module._resolveFilename = function(request, parent, isMain) {
  let resolvedRequest: string;
  if (parent && /^\./.test(request)) {
    const resolvedDir = path.parse(parent.filename).dir;
    resolvedRequest = path.join('/', resolvedDir, request);
  } else {
    resolvedRequest = request;
  }

  // uncomment for testing
  /* if (/[yourTestFilenameHere.js]/.test(request)) {
    console.log('resolvedRequest:' + resolvedRequest)
    console.log(parent)
  } */

  const file = cache[resolvedRequest];
  const file2 = cache[resolvedRequest + '.js'];
  if (file || file2) {
    return resolvedRequest;
  } else {
    return originalModuleResolve.apply(this, arguments);
  }
};
