import {recommended} from './configs/recommended.js';
import {rule as banDependencies} from './rules/ban-dependencies.js';

export const configs = {
  recommended
};

export const rules = {
  'ban-dependencies': banDependencies
};
