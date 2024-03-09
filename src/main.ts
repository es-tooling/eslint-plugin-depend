import {recommended} from './configs/recommended.js';
import {rule as redundantPolyfills} from './rules/redundant-polyfills.js';
import {rule as avoidMicroUtils} from './rules/avoid-micro-utilities.js';

export const configs = {
  recommended
};

export const rules = {
  'redundant-polyfills': redundantPolyfills,
  'avoid-micro-utilities': avoidMicroUtils
};
