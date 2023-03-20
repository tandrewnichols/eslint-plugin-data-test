const subject = require('./onSubmit');
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

ruleTester.run('data-test/onSubmit', subject, {
  valid: [
    {
      name: 'basic component',
      code: '<Button onSubmit={fn} dataTest="foo">blah</Button>'
    },
    {
      name: 'basic dom node',
      code: '<div onSubmit={fn} data-test="foo">blah</div>'
    },
    {
      name: 'no onSubmit on a component',
      code: '<Button>blah</Button>'
    },
    {
      name: 'no onSubmit on a dom node',
      code: '<div>blah</div>'
    },
    {
      name: 'custom attribute on a component',
      code: '<Button onSubmit={fn} dataTestId="foo">blah</Button>',
      options: ['always', {
        'componentAttribute': 'dataTestId',
        'domAttribute': 'data-test-id'
      }]
    },
    {
      name: 'custom attribute on a dom node',
      code: '<div onSubmit={fn} data-test-id="foo">blah</div>',
      options: ['always', {
        'componentAttribute': 'dataTestId',
        'domAttribute': 'data-test-id'
      }]
    },
    {
      name: 'ignore as string',
      code: '<div onSubmit={fn}>Link</div>',
      options: ['always', {
        ignore: 'div'
      }]
    },
    {
      name: 'ignore as array',
      code: '<div onSubmit={fn}>Link</div>',
      options: ['always', {
        ignore: ['div']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<div onSubmit={fn}>Link</div>',
      options: ['always', {
        ignorePattern: 'div'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<div onSubmit={fn}>Link</div>',
      options: ['always', {
        ignorePattern: ['div']
      }]
    },
  ],
  invalid: [
    {
      name: 'missing on a component',
      code: '<Button onSubmit={fn}>blah</Button>',
      errors: [makeHandlerError('Button', 'onSubmit', 'dataTest')]
    },
    {
      name: 'missing on a dom node',
      code: '<div onSubmit={fn}>blah</div>',
      errors: [makeHandlerError('div', 'onSubmit', 'data-test')]
    },
    {
      name: 'custom attribute missing on a component',
      code: '<Button onSubmit={fn}>blah</Button>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('Button', 'onSubmit', 'dataTestId')]
    },
    {
      name: 'custom attribute missing on a dom node',
      code: '<div onSubmit={fn}>blah</div>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('div', 'onSubmit', 'data-test-id')]
    },
    {
      name: 'custom attribute mismatch on a component',
      code: '<Button dataTest="foo" onSubmit={fn}>blah</Button>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('Button', 'onSubmit', 'dataTestId')]
    },
    {
      name: 'custom attribute mismatch on a dom node',
      code: '<div dataTest="foo" onSubmit={fn}>blah</div>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('div', 'onSubmit', 'data-test-id')]
    },
    {
      name: 'ignore as string',
      code: '<div onSubmit={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onSubmit', 'data-test')],
      options: ['always', {
        ignore: 'Link'
      }]
    },
    {
      name: 'ignore as array',
      code: '<div onSubmit={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onSubmit', 'data-test')],
      options: ['always', {
        ignore: ['Link']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<div onSubmit={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onSubmit', 'data-test')],
      options: ['always', {
        ignorePattern: 'Link'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<div onSubmit={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onSubmit', 'data-test')],
      options: ['always', {
        ignorePattern: ['Link']
      }]
    },
  ]
});
