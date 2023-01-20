const subject = require('./onKeyUp');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    }
  }
});

ruleTester.run('data-test/onKeyUp', subject, {
  valid: [
    {
      name: 'basic',
      code: '<Button onKeyUp={fn} dataTest="foo">blah</Button>',
      options: ['always', {
        testAttribute: ['data-test', 'dataTest']
      }]
    },
    {
      name: 'no onKeyUp',
      code: '<Button>blah</Button>'
    },
  ],
  invalid: [
    {
      name: 'missing',
      code: '<Button onKeyUp={fn}>blah</Button>',
      errors: ['Elements with an onKeyUp handler must have one of the following attributes: data-test.']
    },
    {
      name: 'custom attribute missing',
      code: '<Button onKeyUp={fn}>blah</Button>',
      options: ['always', {
        testAttribute: 'data-test-id'
      }],
      errors: ['Elements with an onKeyUp handler must have one of the following attributes: data-test-id.']
    },
    {
      name: 'custom attribute mismatch',
      code: '<Button dataTest="foo" onKeyUp={fn}>blah</Button>',
      options: ['always', {
        testAttribute: 'data-test-id'
      }],
      errors: ['Elements with an onKeyUp handler must have one of the following attributes: data-test-id.']
    },
    {
      name: 'custom attributes missing',
      code: '<Button onKeyUp={fn}>blah</Button>',
      options: ['always', {
        testAttribute: ['data-test-id', 'dataTestId']
      }],
      errors: ['Elements with an onKeyUp handler must have one of the following attributes: data-test-id, dataTestId.']
    }
  ]
});
