const subject = require('./Link');
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

ruleTester.run('data-test/Link', subject, {
  valid: [
    {
      name: 'React Router Link',
      code: '<Link to="/something" data-test="foo">blah</Link>'
    },
    {
      name: 'Next Link',
      code: '<Link href="/something" data-test="foo">blah</Link>'
    },
    {
      name: 'Other Link component',
      code: '<Link>blah</Link>'
    },
    {
      name: 'Link with custom attribute',
      code: '<Link to="/something" data-test-id="foo">blah</Link>',
      options: ['always', {
        domAttribute: 'data-test-id'
      }]
    },
    {
      name: 'ignore as string',
      code: '<Link href="/blah">Link</Link>',
      options: ['always', {
        ignore: 'Link'
      }]
    },
    {
      name: 'ignore as array',
      code: '<Link href="/blah">Link</Link>',
      options: ['always', {
        ignore: ['Link']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<Link href="/blah">Link</Link>',
      options: ['always', {
        ignorePattern: 'Link'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<Link href="/blah">Link</Link>',
      options: ['always', {
        ignorePattern: ['Link']
      }]
    },
  ],
  invalid: [
    {
      name: 'React Router Link',
      code: '<Link to="/something">blah</Link>',
      errors: [makeDomError('Link', 'data-test')]
    },
    {
      name: 'Next Link',
      code: '<Link href="/something">blah</Link>',
      errors: [makeDomError('Link', 'data-test')]
    },
    {
      name: 'Link with custom attribute missing',
      code: '<Link to="/something">blah</Link>',
      options: ['always', {
        domAttribute: 'data-test-id'
      }],
      errors: [makeDomError('Link', 'data-test-id')]
    },
    {
      name: 'Link with custom attribute mismatch',
      code: '<Link to="/something" data-test="foo">blah</Link>',
      options: ['always', {
        domAttribute: 'data-test-id'
      }],
      errors: [makeDomError('Link', 'data-test-id')]
    },
    {
      name: 'ignore as string',
      code: '<Link href="/blah">Link</Link>',
      errors: [makeDomError('Link', 'data-test')],
      options: ['always', {
        ignore: 'button'
      }]
    },
    {
      name: 'ignore as array',
      code: '<Link href="/blah">Link</Link>',
      errors: [makeDomError('Link', 'data-test')],
      options: ['always', {
        ignore: ['button']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<Link href="/blah">Link</Link>',
      errors: [makeDomError('Link', 'data-test')],
      options: ['always', {
        ignorePattern: 'button'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<Link href="/blah">Link</Link>',
      errors: [makeDomError('Link', 'data-test')],
      options: ['always', {
        ignorePattern: ['button']
      }]
    },
  ]
});
