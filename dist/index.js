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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMEJBQXVCO0FBRXZCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUUvQixnREFBaUQ7QUFDakQscUNBQXNDO0FBS3RDLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFDaEIsWUFBWSxFQUFFLFVBQVUsSUFBSTtRQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3hDLENBQUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBO0FBR0YsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ2YsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUU5QyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsTUFBTSxFQUFFLFFBQVE7SUFDcEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDVCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFDdkMsQ0FBQztBQUNILENBQUMsQ0FBQTtBQUVELElBQUkscUJBQXFCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFBO0FBRW5ELE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTTtJQUN6RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDMUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNULE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFDckQsQ0FBQztBQUNILENBQUMsQ0FBQTtBQUVVLFFBQUEsUUFBUSxHQUFHO0lBQ3BCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3pDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFBO1FBQ3ZCLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBT1UsUUFBQSxlQUFlLEdBQUcsQ0FBTyxTQUF1QjtJQUN6RCxHQUFHLENBQUMsQ0FBQyxJQUFJLFVBQVUsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFBO0lBQ3JDLENBQUM7SUFDRCxNQUFNLENBQUMsU0FBUyxDQUFBO0FBQ2xCLENBQUMsQ0FBQSxDQUFBIn0=