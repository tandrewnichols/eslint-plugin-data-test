const subject = require('./onChange');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    }
  }
});

ruleTester.run('data-test/onChange', subject, {
  valid: [
    {
      name: 'basic',
      code: '<Button onChange={fn} dataTest="foo">blah</Button>',
      options: ['always', {
        testAttribute: ['data-test', 'dataTest']
      }]
    },
    {
      name: 'no onChange',
      code: '<Button>blah</Button>'
    },
  ],
  invalid: [
    {
      name: 'missing',
      code: '<Button onChange={fn}>blah</Button>',
      errors: ['Elements with an onChange handler must have one of the following attributes: data-test.']
    },
    {
      name: 'custom attribute missing',
      code: '<Button onChange={fn}>blah</Button>',
      options: ['always', {
        testAttribute: 'data-test-id'
      }],
      errors: ['Elements with an onChange handler must have one of the following attributes: data-test-id.']
    },
    {
      name: 'custom attribute mismatch',
      code: '<Button dataTest="foo" onChange={fn}>blah</Button>',
      options: ['always', {
        testAttribute: 'data-test-id'
      }],
      errors: ['Elements with an onChange handler must have one of the following attributes: data-test-id.']
    },
    {
      name: 'custom attributes missing',
      code: '<Button onChange={fn}>blah</Button>',
      options: ['always', {
        testAttribute: ['data-test-id', 'dataTestId']
      }],
      errors: ['Elements with an onChange handler must have one of the following attributes: data-test-id, dataTestId.']
    }
  ]
});
