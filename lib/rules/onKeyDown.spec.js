const subject = require('./onKeyDown');
const { RuleTester } = require('eslint');
const { makeHandlerError } = require('../utils');

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
      name: 'basic component',
      code: '<Button onKeyDown={fn} dataTest="foo">blah</Button>'
    },
    {
      name: 'basic dom node',
      code: '<div onKeyDown={fn} data-test="foo">blah</div>'
    },
    {
      name: 'no onKeyDown on a component',
      code: '<Button>blah</Button>'
    },
    {
      name: 'no onKeyDown on a dom node',
      code: '<div>blah</div>'
    },
    {
      name: 'custom attribute on a component',
      code: '<Button onKeyDown={fn} dataTestId="foo">blah</Button>',
      options: ['always', {
        'componentAttribute': 'dataTestId',
        'domAttribute': 'data-test-id'
      }]
    },
    {
      name: 'custom attribute on a dom node',
      code: '<div onKeyDown={fn} data-test-id="foo">blah</div>',
      options: ['always', {
        'componentAttribute': 'dataTestId',
        'domAttribute': 'data-test-id'
      }]
    },
    {
      name: 'ignore as string',
      code: '<div onKeyDown={fn}>Link</div>',
      options: ['always', {
        ignore: 'div'
      }]
    },
    {
      name: 'ignore as array',
      code: '<div onKeyDown={fn}>Link</div>',
      options: ['always', {
        ignore: ['div']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<div onKeyDown={fn}>Link</div>',
      options: ['always', {
        ignorePattern: 'div'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<div onKeyDown={fn}>Link</div>',
      options: ['always', {
        ignorePattern: ['div']
      }]
    },
  ],
  invalid: [
    {
      name: 'missing on a component',
      code: '<Button onKeyDown={fn}>blah</Button>',
      errors: [makeHandlerError('Button', 'onKeyDown', 'dataTest')]
    },
    {
      name: 'missing on a dom node',
      code: '<div onKeyDown={fn}>blah</div>',
      errors: [makeHandlerError('div', 'onKeyDown', 'data-test')]
    },
    {
      name: 'custom attribute missing on a component',
      code: '<Button onKeyDown={fn}>blah</Button>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('Button', 'onKeyDown', 'dataTestId')]
    },
    {
      name: 'custom attribute missing on a dom node',
      code: '<div onKeyDown={fn}>blah</div>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('div', 'onKeyDown', 'data-test-id')]
    },
    {
      name: 'custom attribute mismatch on a component',
      code: '<Button dataTest="foo" onKeyDown={fn}>blah</Button>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('Button', 'onKeyDown', 'dataTestId')]
    },
    {
      name: 'custom attribute mismatch on a dom node',
      code: '<div dataTest="foo" onKeyDown={fn}>blah</div>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('div', 'onKeyDown', 'data-test-id')]
    },
    {
      name: 'ignore as string',
      code: '<div onKeyDown={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onKeyDown', 'data-test')],
      options: ['always', {
        ignore: 'Link'
      }]
    },
    {
      name: 'ignore as array',
      code: '<div onKeyDown={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onKeyDown', 'data-test')],
      options: ['always', {
        ignore: ['Link']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<div onKeyDown={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onKeyDown', 'data-test')],
      options: ['always', {
        ignorePattern: 'Link'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<div onKeyDown={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onKeyDown', 'data-test')],
      options: ['always', {
        ignorePattern: ['Link']
      }]
    },
  ]
});
