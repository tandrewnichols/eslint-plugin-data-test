const subject = require('./anchor');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    }
  }
});

ruleTester.run('data-test/anchor', subject, {
  valid: [
    {
      name: 'basic',
      code: '<a data-test="foo" href="/blah">Link</a>'
    },
    {
      name: 'no href',
      code: '<a>Link</a>'
    },
    {
      name: 'custom attribute',
      code: '<a data-test-id="foo" href="/blah">Link</a>',
      options: ['always', {
        testAttribute: 'data-test-id'
      }]
    },
    {
      name: 'custom attributes',
      code: '<a data-test-id="foo" href="/blah">Link</a>',
      options: ['always', {
        testAttribute: ['data-test-id', 'dataTestId']
      }]
    },
  ],
  invalid: [
    {
      name: 'missing',
      code: '<a href="/blah">Link</a>',
      errors: ['Anchor elements must have one of the following attributes: data-test.']
    },
    {
      name: 'custom attribute missing',
      code: '<a href="/blah">Link</a>',
      errors: ['Anchor elements must have one of the following attributes: data-test-id.'],
      options: ['always', {
        testAttribute: 'data-test-id'
      }]
    },
    {
      name: 'custom attribute mismatch',
      code: '<a data-test="foo" href="/blah">Link</a>',
      errors: ['Anchor elements must have one of the following attributes: data-test-id.'],
      options: ['always', {
        testAttribute: 'data-test-id'
      }]
    },
    {
      name: 'custom attributes missing',
      code: '<a href="/blah">Link</a>',
      errors: ['Anchor elements must have one of the following attributes: data-test-id, dataTestId.'],
      options: ['always', {
        testAttribute: ['data-test-id', 'dataTestId']
      }]
    }
  ]
});
