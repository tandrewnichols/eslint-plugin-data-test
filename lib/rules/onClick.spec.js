const subject = require('./onClick');
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

ruleTester.run('data-test/onClick', subject, {
  valid: [
    {
      name: 'basic component',
      code: '<Button onClick={fn} dataTest="foo">blah</Button>'
    },
    {
      name: 'basic dom node',
      code: '<div onClick={fn} data-test="foo">blah</div>'
    },
    {
      name: 'no onClick on a component',
      code: '<Button>blah</Button>'
    },
    {
      name: 'no onClick on a dom node',
      code: '<div>blah</div>'
    },
    {
      name: 'custom attribute on a component',
      code: '<Button onClick={fn} dataTestId="foo">blah</Button>',
      options: ['always', {
        'componentAttribute': 'dataTestId',
        'domAttribute': 'data-test-id'
      }]
    },
    {
      name: 'custom attribute on a dom node',
      code: '<div onClick={fn} data-test-id="foo">blah</div>',
      options: ['always', {
        'componentAttribute': 'dataTestId',
        'domAttribute': 'data-test-id'
      }]
    }
  ],
  invalid: [
    {
      name: 'missing on a component',
      code: '<Button onClick={fn}>blah</Button>',
      errors: [makeHandlerError('Button', 'onClick', 'dataTest')]
    },
    {
      name: 'missing on a dom node',
      code: '<div onClick={fn}>blah</div>',
      errors: [makeHandlerError('div', 'onClick', 'data-test')]
    },
    {
      name: 'custom attribute missing on a component',
      code: '<Button onClick={fn}>blah</Button>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('Button', 'onClick', 'dataTestId')]
    },
    {
      name: 'custom attribute missing on a dom node',
      code: '<div onClick={fn}>blah</div>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('div', 'onClick', 'data-test-id')]
    },
    {
      name: 'custom attribute mismatch on a component',
      code: '<Button dataTest="foo" onClick={fn}>blah</Button>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('Button', 'onClick', 'dataTestId')]
    },
    {
      name: 'custom attribute mismatch on a dom node',
      code: '<div dataTest="foo" onClick={fn}>blah</div>',
      options: ['always', {
        componentAttribute: 'dataTestId',
        domAttribute: 'data-test-id'
      }],
      errors: [makeHandlerError('div', 'onClick', 'data-test-id')]
    }
  ]
});
