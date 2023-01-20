const subject = require('./input');
const { RuleTester } = require('eslint');

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
      name: 'custom attribute',
      code: '<input data-test-id="foo" type="text" />',
      options: ['always', {
        testAttribute: 'data-test-id'
      }]
    },
    {
      name: 'custom attribute with readonly',
      code: '<input readonly type="text" />',
      options: ['always', {
        testAttribute: 'data-test-id'
      }]
    },
    {
      name: 'custom attributes',
      code: '<input data-test-id="foo" type="text" />',
      options: ['always', {
        testAttribute: ['data-test-id', 'dataTestId']
      }]
    }
  ],
  invalid: [
    {
      name: 'missing',
      code: '<input type="text" />',
      errors: ['Input elements must have one of the following attributes: data-test.']
    },
    {
      name: 'readonly ignored',
      code: '<input readonly type="text" />',
      options: ['always', {
        ignoreReadonly: false
      }],
      errors: ['Input elements must have one of the following attributes: data-test.']
    },
    {
      name: 'custom attribute missing',
      code: '<input type="text" />',
      options: ['always', {
        testAttribute: 'data-test-id'
      }],
      errors: ['Input elements must have one of the following attributes: data-test-id.']
    },
    {
      name: 'custom attribute mismatch',
      code: '<input data-test="foo" type="text" />',
      options: ['always', {
        testAttribute: 'data-test-id'
      }],
      errors: ['Input elements must have one of the following attributes: data-test-id.']
    },
    {
      name: 'custom attributes missing',
      code: '<input type="text" />',
      options: ['always', {
        testAttribute: ['data-test-id', 'dataTestId']
      }],
      errors: ['Input elements must have one of the following attributes: data-test-id, dataTestId.']
    }
  ]
});
