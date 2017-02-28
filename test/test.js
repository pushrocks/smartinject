"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("typings-test");
const path = require("path");
const smartinject = require("../dist/index");
describe('smartinject', function () {
    it('should inject a file using fileArray', function () {
        return smartinject.injectFileArray([
            {
                path: path.join(__dirname, 'hi.js'),
                contents: new Buffer(`require('./hi2.js')
console.log('this console comment was injected')
`)
            }
        ]);
    });
    it('should log hi to console', function () {
        require(path.join(__dirname, 'hi.js'));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3QkFBcUI7QUFHckIsNkJBQTRCO0FBRTVCLDZDQUE0QztBQUU1QyxRQUFRLENBQUMsYUFBYSxFQUFFO0lBQ3BCLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtRQUN2QyxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQztZQUMvQjtnQkFDSSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO2dCQUNuQyxRQUFRLEVBQUUsSUFBSSxNQUFNLENBQ3BDOztDQUVDLENBQUM7YUFDVztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLDBCQUEwQixFQUFFO1FBQzNCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBO0lBQzFDLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==