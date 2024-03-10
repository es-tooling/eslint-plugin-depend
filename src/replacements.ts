interface ReplacementLike {
  moduleName: string;
}

export interface SimpleReplacement extends ReplacementLike {
  type: 'simple';
  replacement: string;
}

export interface NativeReplacement extends ReplacementLike {
  type: 'native';
  mdnPath: string;
  nodeVersion: string;
  replacement: string;
}

export interface DocumentedReplacement extends ReplacementLike {
  type: 'documented';
  docPath: string;
  moduleName: string;
}

export type Replacement =
  | NativeReplacement
  | DocumentedReplacement
  | SimpleReplacement;

export const lighterReplacements: Replacement[] = [
  {
    type: 'documented',
    moduleName: 'npm-run-all',
    docPath: 'npm-run-all'
  }
];

export const microUtilities: Replacement[] = [
  {
    type: 'simple',
    moduleName: 'is-number',
    replacement: `Use typeof v === 'number'`
  },
  {
    type: 'simple',
    moduleName: 'is-plain-object',
    replacement: `Use typeof v === 'object' && v !== null && v.constructor === Object`
  },
  {
    type: 'simple',
    moduleName: 'is-primitve',
    replacement: `Use v === null || (typeof v !== 'function' && typeof v !== 'object')`
  },
  {
    type: 'simple',
    moduleName: 'is-regexp',
    replacement: `Use v instanceof RegExp, or if cross-realm, use Object.prototype.toString.call(v) === '[object RegExp]'`
  },
  {
    type: 'simple',
    moduleName: 'is-travis',
    replacement: `Use ('TRAVIS' in process.env)`
  },
  {
    type: 'simple',
    moduleName: 'is-npm',
    replacement: `Use process.env.npm_config_user_agent?.startsWith('npm')`
  },
  {
    type: 'simple',
    moduleName: 'clone-regexp',
    replacement: `Use new RegExp(regexpToCopy)`
  },
  {
    type: 'simple',
    moduleName: 'split-lines',
    replacement: `Use str.split(/\\r?\\n/)`
  },
  {
    type: 'simple',
    moduleName: 'is-windows',
    replacement: `Use process.platform === 'win32'`
  },
  {
    type: 'simple',
    moduleName: 'is-whitespace',
    replacement: `Use str.trim() === '' or /^\s*$/.test(str)`
  },
  {
    type: 'simple',
    moduleName: 'is-string',
    replacement: `Use typeof str === 'string'`
  },
  {type: 'simple', moduleName: 'is-odd', replacement: `Use (n % 2) === 1`},
  {type: 'simple', moduleName: 'is-even', replacement: `Use (n % 2) === 0`}
];

export const nativeReplacements: Replacement[] = [
  {
    type: 'native',
    moduleName: 'object.entries',
    nodeVersion: '7.0.0',
    replacement: 'Object.entries',
    mdnPath: 'Global_Objects/Object/entries'
  },
  {
    type: 'native',
    moduleName: 'date',
    nodeVersion: '0.10.0',
    replacement: 'Date',
    mdnPath: 'Global_Objects/Date'
  },
  {
    type: 'native',
    moduleName: 'for-each',
    nodeVersion: '0.12.0',
    replacement: 'for...of (using `Object.entries` if dealing with objects)',
    mdnPath: 'Statements/for...of'
  },
  {
    type: 'native',
    moduleName: 'array.of',
    nodeVersion: '4.0.0',
    replacement: 'Array.of',
    mdnPath: 'Global_Objects/Array/of'
  },
  {
    type: 'native',
    moduleName: 'number.isnan',
    nodeVersion: '0.10.0',
    replacement: 'Number.isNaN',
    mdnPath: 'Global_Objects/Number/isNaN'
  },
  {
    type: 'native',
    moduleName: 'array.prototype.findindex',
    nodeVersion: '4.0.0',
    replacement: 'Array.prototype.findIndex',
    mdnPath: 'Global_Objects/Array/findIndex'
  },
  {
    type: 'native',
    moduleName: 'array.from',
    nodeVersion: '4.0.0',
    replacement: 'Array.from',
    mdnPath: 'Global_Objects/Array/from'
  },
  {
    type: 'native',
    moduleName: 'object-is',
    nodeVersion: '0.10.0',
    replacement: 'Object.is',
    mdnPath: 'Global_Objects/Object/is'
  },
  {
    type: 'native',
    moduleName: 'hasown',
    nodeVersion: '0.10.0',
    replacement:
      'Object.prototype.hasOwnProperty.call(obj, prop) (or in later versions of node, `Object.hasOwn(obj, prop)`)',
    mdnPath: 'Global_Objects/Object/hasOwnProperty'
  },
  {
    type: 'native',
    moduleName: 'has-own-prop',
    nodeVersion: '0.10.0',
    replacement:
      'Object.prototype.hasOwnProperty.call(obj, prop) (or in later versions of node, `Object.hasOwn(obj, prop)`)',
    mdnPath: 'Global_Objects/Object/hasOwnProperty'
  },
  {
    type: 'native',
    moduleName: 'array-map',
    nodeVersion: '0.10.0',
    replacement: 'Array.prototype.map',
    mdnPath: 'Global_Objects/Array/map'
  },
  {
    type: 'native',
    moduleName: 'is-nan',
    nodeVersion: '0.10.0',
    replacement: 'Number.isNaN',
    mdnPath: 'Global_Objects/Number/isNaN'
  },
  {
    type: 'native',
    moduleName: 'node.extend',
    nodeVersion: '4.0.0',
    replacement:
      'Object.assign, or if deep clones are needed, use structuredClone',
    mdnPath: 'Global_Objects/Object/assign'
  },
  {
    type: 'native',
    moduleName: 'extend-shallow',
    nodeVersion: '4.0.0',
    replacement:
      'Object.assign, or if deep clones are needed, use structuredClone',
    mdnPath: 'Global_Objects/Object/assign'
  },
  {
    type: 'native',
    moduleName: 'xtend',
    nodeVersion: '4.0.0',
    replacement:
      'Object.assign, or if deep clones are needed, use structuredClone',
    mdnPath: 'Global_Objects/Object/assign'
  },
  {
    type: 'native',
    moduleName: 'defaults',
    nodeVersion: '4.0.0',
    replacement:
      'Object.assign, or if deep clones are needed, use structuredClone',
    mdnPath: 'Global_Objects/Object/assign'
  },
  {
    type: 'native',
    moduleName: 'function-bind',
    nodeVersion: '0.10.0',
    replacement: 'Function.prototype.bind',
    mdnPath: 'Global_Objects/Function/bind'
  },
  {
    type: 'native',
    moduleName: 'regexp.prototype.flags',
    nodeVersion: '6.0.0',
    replacement: 'RegExp.prototype.flags (e.g. `/foo/g.flags`)',
    mdnPath: 'Global_Objects/RegExp/flags'
  },
  {
    type: 'native',
    moduleName: 'array.prototype.find',
    nodeVersion: '4.0.0',
    replacement: 'Array.prototype.find',
    mdnPath: 'Global_Objects/Array/find'
  },
  {
    type: 'native',
    moduleName: 'object-keys',
    nodeVersion: '0.10.0',
    replacement: 'Object.keys(obj)',
    mdnPath: 'Global_Objects/Object/keys'
  },
  {
    type: 'native',
    moduleName: 'define-properties',
    nodeVersion: '0.10.0',
    replacement: 'Object.defineProperties',
    mdnPath: 'Global_Objects/Object/defineProperties'
  },
  {
    type: 'native',
    moduleName: 'left-pad',
    nodeVersion: '8.0.0',
    replacement: 'String.prototype.padStart',
    mdnPath: 'Global_Objects/String/padStart'
  },
  {
    type: 'native',
    moduleName: 'pad-left',
    nodeVersion: '8.0.0',
    replacement: 'String.prototype.padStart',
    mdnPath: 'Global_Objects/String/padStart'
  },
  {
    type: 'native',
    moduleName: 'filter-array',
    nodeVersion: '0.10.0',
    replacement: 'Array.prototype.filter',
    mdnPath: 'Global_Objects/Array/filter'
  },
  {
    type: 'native',
    moduleName: 'array-every',
    nodeVersion: '0.10.0',
    replacement: 'Array.prototype.every',
    mdnPath: 'Global_Objects/Array/every'
  },
  {
    type: 'native',
    moduleName: 'index-of',
    nodeVersion: '0.10.0',
    replacement: 'Array.prototype.indexOf',
    mdnPath: 'Global_Objects/Array/indexOf'
  },
  {
    type: 'native',
    moduleName: 'last-index-of',
    nodeVersion: '0.10.0',
    replacement: 'Array.prototype.lastIndexOf',
    mdnPath: 'Global_Objects/Array/lastIndexOf'
  }
];
