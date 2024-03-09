export interface Replacement {
  moduleName: string;
  nodeVersion: string;
  replacement: string;
  mdnPath?: string;
}

export const nativeReplacements: Replacement[] = [
  {
    moduleName: 'object.entries',
    nodeVersion: '7.0.0',
    replacement: 'Object.entries',
    mdnPath: 'Global_Objects/Object/entries'
  }
];
