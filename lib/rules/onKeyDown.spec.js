const subject = require('./onKeyDown');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    }
  }
});

ruleTester.run('data-test/onKeyDown', subject, {
  valid: [
    {
      name: 'basic',
      code: '<Button onKeyDown={fn} dataTest="foo">blah</Button>',
      options: ['always', {
        testAttribute: ['data-test', 'dataTest']
      }]
    },
    {
      name: 'no onKeyDown',
      code: '<Button>blah</Button>'
    },
  ],
  invalid: [
    {
      name: 'missing',
      code: '<Button onKeyDown={fn}>blah</Button>',
      errors: ['Elements with an onKeyDown handler must have one of the following attributes: data-test.']
    },
    {
      name: 'custom attribute missing',
      code: '<Button onKeyDown={fn}>blah</Button>',
      options: ['always', {
        testAttribute: 'data-test-id'
      }],
      errors: ['Elements with an onKeyDown handler must have one of the following attributes: data-test-id.']
    },
    {
      name: 'custom attribute mismatch',
      code: '<Button dataTest="foo" onKeyDown={fn}>blah</Button>',
      options: ['always', {
        testAttribute: 'data-test-id'
      }],
      errors: ['Elements with an onKeyDown handler must have one of the following attributes: data-test-id.']
    },
    {
      name: 'custom attributes missing',
      code: '<Button onKeyDown={fn}>blah</Button>',
      options: ['always', {
        testAttribute: ['data-test-id', 'dataTestId']
      }],
      errors: ['Elements with an onKeyDown handler must have one of the following attributes: data-test-id, dataTestId.']
    }
  ]
});
