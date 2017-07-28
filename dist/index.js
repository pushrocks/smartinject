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
    let file = cache[request];
    let file2 = cache[request + '.js'];
    if (file || file2) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMEJBQXVCO0FBRXZCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUU5QixnREFBZ0Q7QUFDaEQscUNBQXFDO0FBS3JDLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFDaEIsWUFBWSxFQUFFLFVBQVUsSUFBSTtRQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ3hDLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQ2hELENBQUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQyxDQUFBO0FBRUYsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFBO0FBQ2QsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUU5QyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLFVBQVUsTUFBTSxFQUFFLFFBQVE7SUFDcEQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzFCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUE7SUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNULE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7QUFDSCxDQUFDLENBQUE7QUFFRCxJQUFJLHFCQUFxQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQTtBQUVuRCxNQUFNLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU07SUFDekQsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3pCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUE7SUFDbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEIsTUFBTSxDQUFDLE9BQU8sQ0FBQTtJQUNoQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0FBQ0gsQ0FBQyxDQUFBO0FBRVUsUUFBQSxRQUFRLEdBQUc7SUFDcEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDekMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUE7UUFDdkIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDdkIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFPVSxRQUFBLGVBQWUsR0FBRyxDQUFPLFNBQXVCO0lBQ3pELEdBQUcsQ0FBQyxDQUFDLElBQUksVUFBVSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDakMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxVQUFVLENBQUE7SUFDckMsQ0FBQztJQUNELE1BQU0sQ0FBQyxTQUFTLENBQUE7QUFDbEIsQ0FBQyxDQUFBLENBQUEifQ==