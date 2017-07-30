"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-global");
let Module = require('module');
const path = require("path");
const sourceMap = require("source-map-support");
const through2 = require("through2");
sourceMap.install({
    retrieveFile: function (path) {
        if (cache[path]) {
            return cache[path].contents.toString();
        }
        else if (cache[path + '.js']) {
            return cache[path + '.js'].contents.toString();
        }
    }
});
let cache = {};
let originalLoader = Module._extensions['.js'];
Module._extensions['.js'] = function (module, filename) {
    let file = cache[filename];
    let file2 = cache[filename + '.js'];
    if (file) {
        module._compile(file.contents.toString(), filename);
    }
    else if (file2) {
        module._compile(file2.contents.toString(), filename);
    }
    else {
        originalLoader.apply(this, arguments);
    }
};
let originalModuleResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain) {
    let resolvedRequest;
    if (parent && /^\./.test(request)) {
        let resolvedDir = path.parse(parent.filename).dir;
        resolvedRequest = path.join('/', resolvedDir, request);
    }
    else {
        resolvedRequest = request;
    }
    // uncomment for testing
    /* if (/[yourTestFilenameHere.js]/.test(request)) {
      console.log('resolvedRequest:' + resolvedRequest)
      console.log(parent)
    } */
    let file = cache[resolvedRequest];
    let file2 = cache[resolvedRequest + '.js'];
    if (file || file2) {
        return resolvedRequest;
    }
    else {
        return originalModuleResolve.apply(this, arguments);
    }
};
exports.gulpPipe = function () {
    return through2.obj(function (file, enc, cb) {
        cache[file.path] = file;
        return cb(null, file);
    });
};
exports.injectFileArray = (fileArray) => __awaiter(this, void 0, void 0, function* () {
    for (let fileObject of fileArray) {
        /* if (/[yourTestFilenameHere.js]/.test(request)) {
          // console.log('injected:' + fileObject.path)
        } */
        cache[fileObject.path] = fileObject;
    }
    return fileArray;
});
exports.getFileString = (filePathArg) => {
    if (cache[filePathArg]) {
        return cache[filePathArg].contents.toString();
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMEJBQXVCO0FBRXZCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUM5Qiw2QkFBNkI7QUFDN0IsZ0RBQWdEO0FBQ2hELHFDQUFxQztBQUtyQyxTQUFTLENBQUMsT0FBTyxDQUFDO0lBQ2hCLFlBQVksRUFBRSxVQUFVLElBQUk7UUFDMUIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUN4QyxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNoRCxDQUFDO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQTtBQUVGLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTtBQUNkLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7QUFFOUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLE1BQU0sRUFBRSxRQUFRO0lBQ3BELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFBO0lBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDVCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FB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