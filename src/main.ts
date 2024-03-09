import {recommended} from './configs/recommended.js';
import {rule as redundantPolyfills} from './rules/redundant-polyfills.js';

export const configs = {
  recommended
};

export const rules = {
  'redundant-polyfills': redundantPolyfills
};
