import {rule} from '../../rules/avoid-micro-utilities.js';
import {RuleTester} from 'eslint';

const ruleTester = new RuleTester({
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2022
  }
});

const tseslintParser = require.resolve('@typescript-eslint/parser');

ruleTester.run('avoid-micro-utilities', rule, {
  valid: [
    'const foo = 303;',
    {
      code: `import foo = require('unknown-module');`,
      parser: tseslintParser
    },
    {
      code: `import foo from 'unknown-module';`
    },
    {
      code: `const foo = require('unknown-module');`
    },
    {
      code: `
        const moduleName = 'is-' + 'number';
        require(moduleName);
      `
    },
    {
      code: `
        const moduleName = 'is-' + 'number';
        await import(moduleName);
      `
    }
  ],

  invalid: [
    {
      code: `const foo = require('is-number');`,
      errors: [
        {
          line: 1,
          column: 13,
          messageId: 'avoid',
          data: {
            name: 'is-number',
            replacement: `Use typeof v === 'number'`
          }
        }
      ]
    },
    {
      code: `import foo from 'is-number';`,
      errors: [
        {
          line: 1,
          column: 1,
          messageId: 'avoid',
          data: {
            name: 'is-number',
            replacement: `Use typeof v === 'number'`
          }
        }
      ]
    },
    {
      code: `const foo = await import('is-number');`,
      errors: [
        {
          line: 1,
          column: 19,
          messageId: 'avoid',
          data: {
            name: 'is-number',
            replacement: `Use typeof v === 'number'`
          }
        }
      ]
    },
    {
      code: `import foo = require('is-number');`,
      parser: tseslintParser,
      errors: [
        {
          line: 1,
          column: 1,
          messageId: 'avoid',
          data: {
            name: 'is-number',
            replacement: `Use typeof v === 'number'`
          }
        }
      ]
    }
  ]
});
