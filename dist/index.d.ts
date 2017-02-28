/// <reference types="node" />
import 'typings-global';
import { Transform } from 'stream';
export declare let gulpPipe: () => Transform;
export interface fileObject {
    path: string;
    contents: Buffer;
}
export declare let injectFileArray: (fileArray: fileObject[]) => Promise<fileObject[]>;
