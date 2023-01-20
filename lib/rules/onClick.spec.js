const subject = require('./onClick');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    }
  }
});

ruleTester.run('data-test/onClick', subject, {
  valid: [
    {
      name: 'basic',
      code: '<Button onClick={fn} dataTest="foo">blah</Button>',
      options: ['always', {
        testAttribute: ['data-test', 'dataTest']
      }]
    },
    {
      name: 'no onClick',
      code: '<Button>blah</Button>'
    },
  ],
  invalid: [
    {
      name: 'missing',
      code: '<Button onClick={fn}>blah</Button>',
      errors: ['Elements with an onClick handler must have one of the following attributes: data-test.']
    },
    {
      name: 'custom attribute missing',
      code: '<Button onClick={fn}>blah</Button>',
      options: ['always', {
        testAttribute: 'data-test-id'
      }],
      errors: ['Elements with an onClick handler must have one of the following attributes: data-test-id.']
    },
    {
      name: 'custom attribute mismatch',
      code: '<Button dataTest="foo" onClick={fn}>blah</Button>',
      options: ['always', {
        testAttribute: 'data-test-id'
      }],
      errors: ['Elements with an onClick handler must have one of the following attributes: data-test-id.']
    },
    {
      name: 'custom attributes missing',
      code: '<Button onClick={fn}>blah</Button>',
      options: ['always', {
        testAttribute: ['data-test-id', 'dataTestId']
      }],
      errors: ['Elements with an onClick handler must have one of the following attributes: data-test-id, dataTestId.']
    }
  ]
});
