const subject = require('./onSubmit');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    }
  }
});

ruleTester.run('data-test/onSubmit', subject, {
  valid: [
    {
      name: 'basic',
      code: '<Button onSubmit={fn} dataTest="foo">blah</Button>',
      options: ['always', {
        testAttribute: ['data-test', 'dataTest']
      }]
    },
    {
      name: 'no onSubmit',
      code: '<Button>blah</Button>'
    },
  ],
  invalid: [
    {
      name: 'missing',
      code: '<Button onSubmit={fn}>blah</Button>',
      errors: ['Elements with an onSubmit handler must have one of the following attributes: data-test.']
    },
    {
      name: 'custom attribute missing',
      code: '<Button onSubmit={fn}>blah</Button>',
      options: ['always', {
        testAttribute: 'data-test-id'
      }],
      errors: ['Elements with an onSubmit handler must have one of the following attributes: data-test-id.']
    },
    {
      name: 'custom attribute mismatch',
      code: '<Button dataTest="foo" onSubmit={fn}>blah</Button>',
      options: ['always', {
        testAttribute: 'data-test-id'
      }],
      errors: ['Elements with an onSubmit handler must have one of the following attributes: data-test-id.']
    },
    {
      name: 'custom attributes missing',
      code: '<Button onSubmit={fn}>blah</Button>',
      options: ['always', {
        testAttribute: ['data-test-id', 'dataTestId']
      }],
      errors: ['Elements with an onSubmit handler must have one of the following attributes: data-test-id, dataTestId.']
    }
  ]
});
