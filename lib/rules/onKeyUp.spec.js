const subject = require('./onKeyUp');
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

ruleTester.run('data-test/onKeyUp', subject, {
  valid: [
    {
      name: 'basic component',
      code: '<Button onKeyUp={fn} dataTest="foo">blah</Button>'
    },
    {
      name: 'basic dom node',
      code: '<div onKeyUp={fn} data-test="foo">blah</div>'
    },
    {
      name: 'no onKeyUp on a component',
      code: '<Button>blah</Button>'
    },
    {
      name: 'no onKeyUp on a dom node',
      code: '<div>blah</div>'
    },
    {
      name: 'custom attribute on a component',
      code: '<Button onKeyUp={fn} dataTestId="foo">blah</Button>',
      options: ['always', {
        'componentAttribute': 'dataTestId',
        'domAttribute': 'data-test-id'
      }]
    },
    {
      name: 'custom attribute on a dom node',
      code: '<div onKeyUp={fn} data-test-id="foo">blah</div>',
      options: ['always', {
        'componentAttribute': 'dataTestId',
        'domAttribute': 'data-test-id'
      }]
    },
    {
      name: 'ignore as string',
      code: '<div onKeyUp={fn}>Link</div>',
      options: ['always', {
        ignore: 'div'
      }]
    },
    {
      name: 'ignore as array',
      code: '<div onKeyUp={fn}>Link</div>',
      options: ['always', {
        ignore: ['div']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<div onKeyUp={fn}>Link</div>',
      options: ['always', {
        ignorePattern: 'div'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<div onKeyUp={fn}>Link</div>',
      options: ['always', {
        ignorePattern: ['div']
      }]
    },
  ],
  invalid: [
    {
      name: 'missing on a component',
      code: '<Button onKeyUp={fn}>blah</Button>',
      errors: [makeHandlerError('Button', 'onKeyUp', 'dataTest')]
    },
    {
      name: 'missing on a dom node',
      code: '<div onKeyUp={fn}>blah</div>',
      errors: [makeHandlerError('div', 'onKeyUp', 'data-test')]
    },
    {
      name: 'custom attribute missing on a component',
      code: '<Button onKeyUp={fn}>blah</Button>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('Button', 'onKeyUp', 'dataTestId')]
    },
    {
      name: 'custom attribute missing on a dom node',
      code: '<div onKeyUp={fn}>blah</div>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('div', 'onKeyUp', 'data-test-id')]
    },
    {
      name: 'custom attribute mismatch on a component',
      code: '<Button dataTest="foo" onKeyUp={fn}>blah</Button>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('Button', 'onKeyUp', 'dataTestId')]
    },
    {
      name: 'custom attribute mismatch on a dom node',
      code: '<div dataTest="foo" onKeyUp={fn}>blah</div>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('div', 'onKeyUp', 'data-test-id')]
    },
    {
      name: 'ignore as string',
      code: '<div onKeyUp={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onKeyUp', 'data-test')],
      options: ['always', {
        ignore: 'Link'
      }]
    },
    {
      name: 'ignore as array',
      code: '<div onKeyUp={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onKeyUp', 'data-test')],
      options: ['always', {
        ignore: ['Link']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<div onKeyUp={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onKeyUp', 'data-test')],
      options: ['always', {
        ignorePattern: 'Link'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<div onKeyUp={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onKeyUp', 'data-test')],
      options: ['always', {
        ignorePattern: ['Link']
      }]
    },
  ]
});
