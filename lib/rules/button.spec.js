const subject = require('./button');
const { RuleTester } = require('eslint');
const { makeDomError } = require('../utils');

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
        domAttribute: 'data-test-id'
      }]
    },
    {
      name: 'ignore as string',
      code: '<button>Link</button>',
      options: ['always', {
        ignore: 'button'
      }]
    },
    {
      name: 'ignore as array',
      code: '<button>Link</button>',
      options: ['always', {
        ignore: ['button']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<button>Link</button>',
      options: ['always', {
        ignorePattern: 'button'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<button>Link</button>',
      options: ['always', {
        ignorePattern: ['button']
      }]
    },
  ],
  invalid: [
    {
      name: 'missing',
      code: '<button>blah</button>',
      errors: [makeDomError('Button', 'data-test')]
    },
    {
      name: 'custom attribute missing',
      code: '<button>blah</button>',
      errors: [makeDomError('Button', 'data-test-id')],
      options: ['always', {
        domAttribute: 'data-test-id'
      }]
    },
    {
      name: 'custom attribute mismatch',
      code: '<button data-test="foo">blah</button>',
      errors: [makeDomError('Button', 'data-test-id')],
      options: ['always', {
        domAttribute: 'data-test-id'
      }]
    },
    {
      name: 'ignore as string',
      code: '<button>Link</button>',
      errors: [makeDomError('Button', 'data-test')],
      options: ['always', {
        ignore: 'Link'
      }]
    },
    {
      name: 'ignore as array',
      code: '<button>Link</button>',
      errors: [makeDomError('Button', 'data-test')],
      options: ['always', {
        ignore: ['Link']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<button>Link</button>',
      errors: [makeDomError('Button', 'data-test')],
      options: ['always', {
        ignorePattern: 'Link'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<button>Link</button>',
      errors: [makeDomError('Button', 'data-test')],
      options: ['always', {
        ignorePattern: ['Link']
      }]
    },
  ]
});
