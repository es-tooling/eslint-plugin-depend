export interface Replacement {
  moduleName: string;
  nodeVersion?: string;
  replacement: string;
  mdnPath?: string;
}

export const nativeReplacements: Replacement[] = [
  {
    moduleName: 'object.entries',
    nodeVersion: '7.0.0',
    replacement: 'Object.entries',
    mdnPath: 'Global_Objects/Object/entries'
  },
  {
    moduleName: 'date',
    nodeVersion: '0.10.0',
    replacement: 'Date',
    mdnPath: 'Global_Objects/Date'
  },
  {
    moduleName: 'for-each',
    replacement: 'for...of (using `Object.entries` if dealing with objects)'
  },
  {
    moduleName: 'array.of',
    nodeVersion: '4.0.0',
    replacement: 'Array.of',
    mdnPath: 'Global_Objects/Array/of'
  },
  {
    moduleName: 'number.isnan',
    nodeVersion: '0.10.0',
    replacement: 'Number.isNaN',
    mdnPath: 'Global_Objects/Number/isNaN'
  },
  {
    moduleName: 'array.prototype.findindex',
    nodeVersion: '4.0.0',
    replacement: 'Array.prototype.findIndex',
    mdnPath: 'Global_Objects/Array/findIndex'
  },
  {
    moduleName: 'array.from',
    nodeVersion: '4.0.0',
    replacement: 'Array.from',
    mdnPath: 'Global_Objects/Array/from'
  },
  {
    moduleName: 'object-is',
    nodeVersion: '0.10.0',
    replacement: 'Object.is',
    mdnPath: 'Global_Objects/Object/is'
  },
  {
    moduleName: 'hasown',
    nodeVersion: '0.10.0',
    replacement:
      'Object.prototype.hasOwnProperty.call(obj, prop) (or in later versions of node, `Object.hasOwn(obj, prop)`)',
    mdnPath: 'Global_Objects/Object/hasOwnProperty'
  },
  {
    moduleName: 'array-map',
    nodeVersion: '0.10.0',
    replacement: 'Array.prototype.map',
    mdnPath: 'Global_Objects/Array/map'
  },
  {
    moduleName: 'is-nan',
    nodeVersion: '0.10.0',
    replacement: 'Number.isNaN',
    mdnPath: 'Global_Objects/Number/isNaN'
  },
  {
    moduleName: 'node.extend',
    nodeVersion: '4.0.0',
    replacement:
      'Object.assign, or if deep clones are needed, use structuredClone',
    mdnPath: 'Global_Objects/Object/assign'
  },
  {
    moduleName: 'function-bind',
    nodeVersion: '0.10.0',
    replacement: 'Function.prototype.bind',
    mdnPath: 'Global_Objects/Function/bind'
  },
  {
    moduleName: 'regexp.prototype.flags',
    nodeVersion: '6.0.0',
    replacement: 'RegExp.prototype.flags (e.g. `/foo/g.flags`)',
    mdnPath: 'Global_Objects/RegExp/flags'
  },
  {
    moduleName: 'array.prototype.find',
    nodeVersion: '4.0.0',
    replacement: 'Array.prototype.find',
    mdnPath: 'Global_Objects/Array/find'
  },
  {
    moduleName: 'object-keys',
    nodeVersion: '0.10.0',
    replacement: 'Object.keys(obj)',
    mdnPath: 'Global_Objects/Object/keys'
  },
  {
    moduleName: 'define-properties',
    nodeVersion: '0.10.0',
    replacement: 'Object.defineProperties',
    mdnPath: 'Global_Objects/Object/defineProperties'
  }
];
