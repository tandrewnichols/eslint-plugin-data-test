const subject = require('./onChange');
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

ruleTester.run('data-test/onChange', subject, {
  valid: [
    {
      name: 'basic component',
      code: '<Button onChange={fn} dataTest="foo">blah</Button>'
    },
    {
      name: 'basic dom node',
      code: '<div onChange={fn} data-test="foo">blah</div>'
    },
    {
      name: 'no onChange on a component',
      code: '<Button>blah</Button>'
    },
    {
      name: 'no onChange on a dom node',
      code: '<div>blah</div>'
    },
    {
      name: 'custom attribute on a component',
      code: '<Button onChange={fn} dataTestId="foo">blah</Button>',
      options: ['always', {
        'componentAttribute': 'dataTestId',
        'domAttribute': 'data-test-id'
      }]
    },
    {
      name: 'custom attribute on a dom node',
      code: '<div onChange={fn} data-test-id="foo">blah</div>',
      options: ['always', {
        'componentAttribute': 'dataTestId',
        'domAttribute': 'data-test-id'
      }]
    },
    {
      name: 'ignore as string',
      code: '<div onChange={fn}>Link</div>',
      options: ['always', {
        ignore: 'div'
      }]
    },
    {
      name: 'ignore as array',
      code: '<div onChange={fn}>Link</div>',
      options: ['always', {
        ignore: ['div']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<div onChange={fn}>Link</div>',
      options: ['always', {
        ignorePattern: 'div'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<TextInput onChange={fn} />',
      options: ['always', {
        ignore: ['a', 'div'],
        ignorePattern: ['.*Input']
      }]
    },
  ],
  invalid: [
    {
      name: 'missing on a component',
      code: '<Button onChange={fn}>blah</Button>',
      errors: [makeHandlerError('Button', 'onChange', 'dataTest')]
    },
    {
      name: 'missing on a dom node',
      code: '<div onChange={fn}>blah</div>',
      errors: [makeHandlerError('div', 'onChange', 'data-test')]
    },
    {
      name: 'custom attribute missing on a component',
      code: '<Button onChange={fn}>blah</Button>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('Button', 'onChange', 'dataTestId')]
    },
    {
      name: 'custom attribute missing on a dom node',
      code: '<div onChange={fn}>blah</div>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('div', 'onChange', 'data-test-id')]
    },
    {
      name: 'custom attribute mismatch on a component',
      code: '<Button dataTest="foo" onChange={fn}>blah</Button>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('Button', 'onChange', 'dataTestId')]
    },
    {
      name: 'custom attribute mismatch on a dom node',
      code: '<div dataTest="foo" onChange={fn}>blah</div>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('div', 'onChange', 'data-test-id')]
    },
    {
      name: 'ignore as string',
      code: '<div onChange={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onChange', 'data-test')],
      options: ['always', {
        ignore: 'Link'
      }]
    },
    {
      name: 'ignore as array',
      code: '<div onChange={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onChange', 'data-test')],
      options: ['always', {
        ignore: ['Link']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<div onChange={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onChange', 'data-test')],
      options: ['always', {
        ignorePattern: 'Link'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<div onChange={fn}>Link</div>',
      errors: [makeHandlerError('div', 'onChange', 'data-test')],
      options: ['always', {
        ignorePattern: ['Link']
      }]
    },
  ]
});
