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
const sourceMap = require("source-map-support");
const through2 = require("through2");
sourceMap.install({
    retrieveFile: function (path) {
        if (cache[path]) {
            return cache[path].contents.toString();
        }
    }
});
let cache = {};
let originalLoader = Module._extensions['.js'];
Module._extensions['.js'] = function (module, filename) {
    let file = cache[filename];
    if (file) {
        module._compile(file.contents.toString(), filename);
    }
    else {
        originalLoader.apply(this, arguments);
    }
};
let originalModuleResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain) {
    let file = cache[request];
    if (file) {
        return request;
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
        cache[fileObject.path] = fileObject;
    }
    return fileArray;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMEJBQXVCO0FBRXZCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUUvQixnREFBaUQ7QUFDakQscUNBQXNDO0FBS3RDLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFDaEIsWUFBWSxFQUFFLFVBQVUsSUFBSTtRQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pDLENBQUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBR0gsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUUvQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsTUFBTSxFQUFFLFFBQVE7SUFDcEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDVCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDeEMsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLElBQUkscUJBQXFCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFBO0FBRW5ELE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTTtJQUN6RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNULE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFDckQsQ0FBQztBQUNILENBQUMsQ0FBQztBQUdTLFFBQUEsUUFBUSxHQUFHO0lBQ3BCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3pDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBT1MsUUFBQSxlQUFlLEdBQUcsQ0FBTyxTQUF1QjtJQUN6RCxHQUFHLENBQUMsQ0FBQyxJQUFJLFVBQVUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFBO0lBQ3JDLENBQUM7SUFDRCxNQUFNLENBQUMsU0FBUyxDQUFBO0FBQ2xCLENBQUMsQ0FBQSxDQUFBIn0=