import type {Rule, ESLint} from 'eslint';
import {configFactory as configRecommended} from './configs/recommended.ts';
import {config as configLegacyRecommended} from './configs/legacy-recommended.ts';
import {rule as banDependencies} from './rules/ban-dependencies.ts';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const {name, version} = JSON.parse(
  readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
);

export const rules: Record<string, Rule.RuleModule> = {
  'ban-dependencies': banDependencies
};

const plugin: ESLint.Plugin = {
  meta: {name, version},
  rules
};

export const configs = {
  recommended: configLegacyRecommended,
  'flat/recommended': configRecommended(plugin)
};

plugin.configs = configs;

export default plugin;
