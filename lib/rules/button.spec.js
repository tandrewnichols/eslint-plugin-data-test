const subject = require('./button');
const { RuleTester } = require('eslint');

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    }
  }
});

ruleTester.run('data-test/button', subject, {
  valid: [
    {
      name: 'basic',
      code: '<button data-test="foo">blah</button>'
    },
    {
      name: 'custom attribute',
      code: '<button data-test-id="foo">blah</button>',
      options: ['always', {
        testAttribute: 'data-test-id'
      }]
    },
    {
      name: 'custom attributes',
      code: '<button data-test-id="foo">blah</button>',
      options: ['always', {
        testAttribute: ['data-test-id', 'dataTestId']
      }]
    },
  ],
  invalid: [
    {
      name: 'missing',
      code: '<button>blah</button>',
      errors: ['Button elements must have one of the following attributes: data-test.']
    },
    {
      name: 'custom attribute missing',
      code: '<button>blah</button>',
      errors: ['Button elements must have one of the following attributes: data-test-id.'],
      options: ['always', {
        testAttribute: 'data-test-id'
      }]
    },
    {
      name: 'custom attribute mismatch',
      code: '<button data-test="foo">blah</button>',
      errors: ['Button elements must have one of the following attributes: data-test-id.'],
      options: ['always', {
        testAttribute: 'data-test-id'
      }]
    },
    {
      name: 'custom attributes missing',
      code: '<button>blah</button>',
      errors: ['Button elements must have one of the following attributes: data-test-id, dataTestId.'],
      options: ['always', {
        testAttribute: ['data-test-id', 'dataTestId']
      }]
    }
  ]
});
