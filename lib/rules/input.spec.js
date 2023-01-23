const subject = require('./input');
const { RuleTester } = require('eslint');
const { makeDomError } = require('../utils');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    }
  }
});

ruleTester.run('data-test/input', subject, {
  valid: [
    {
      name: 'basic',
      code: '<input data-test="foo" type="text" />'
    },
    {
      name: 'readonly',
      code: '<input readonly type="text" />'
    },
    {
      name: 'not ignoring readonly',
      code: '<input readonly data-test="foo" />',
      options: ['always', {
        readonly: true
      }]
    },
    {
      name: 'custom attribute',
      code: '<input data-test-id="foo" type="text" />',
      options: ['always', {
        domAttribute: 'data-test-id'
      }]
    },
    {
      name: 'custom attribute with readonly',
      code: '<input readonly type="text" />',
      options: ['always', {
        domAttribute: 'data-test-id'
      }]
    }
  ],
  invalid: [
    {
      name: 'missing',
      code: '<input type="text" />',
      errors: [makeDomError('Input', 'data-test')]
    },
    {
      name: 'readonly ignored',
      code: '<input readonly type="text" />',
      options: ['always', {
        readonly: true
      }],
      errors: [makeDomError('Input', 'data-test')]
    },
    {
      name: 'custom attribute missing',
      code: '<input type="text" />',
      options: ['always', {
        domAttribute: 'data-test-id'
      }],
      errors: [makeDomError('Input', 'data-test-id')]
    },
    {
      name: 'custom attribute mismatch',
      code: '<input data-test="foo" type="text" />',
      options: ['always', {
        domAttribute: 'data-test-id'
      }],
      errors: [makeDomError('Input', 'data-test-id')]
    }
  ]
});
