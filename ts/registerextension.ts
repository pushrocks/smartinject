import { extensionMap } from './injection';

export const registerExtension = (extensionName: string, compilerFunction) => {
  extensionMap[extensionName] = compilerFunction;
};
