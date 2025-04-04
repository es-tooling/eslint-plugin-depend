import type {Rule, ESLint} from 'eslint';
import {configFactory as configRecommended} from './configs/recommended.js';
import {config as configLegacyRecommended} from './configs/legacy-recommended.js';
import {rule as banDependencies} from './rules/ban-dependencies.js';

export const rules: Record<string, Rule.RuleModule> = {
  'ban-dependencies': banDependencies
};

const plugin: ESLint.Plugin = {rules};

export const configs = {
  recommended: configLegacyRecommended,
  'flat/recommended': configRecommended(plugin)
};

export default plugin;
