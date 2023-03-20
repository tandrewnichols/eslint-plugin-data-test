const subject = require('./anchor');
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

ruleTester.run('data-test/anchor', subject, {
  valid: [
    {
      name: 'basic',
      code: '<a data-test="foo" href="/blah">Link</a>'
    },
    {
      name: 'no href',
      code: '<a>Link</a>'
    },
    {
      name: 'custom attribute',
      code: '<a data-test-id="foo" href="/blah">Link</a>',
      options: ['always', {
        domAttribute: 'data-test-id'
      }]
    },
    {
      name: 'ignore as string',
      code: '<a href="/blah">Link</a>',
      options: ['always', {
        ignore: 'a'
      }]
    },
    {
      name: 'ignore as array',
      code: '<a href="/blah">Link</a>',
      options: ['always', {
        ignore: ['a']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<a href="/blah">Link</a>',
      options: ['always', {
        ignorePattern: 'a'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<a href="/blah">Link</a>',
      options: ['always', {
        ignorePattern: ['a']
      }]
    },
  ],
  invalid: [
    {
      name: 'missing',
      code: '<a href="/blah">Link</a>',
      errors: [makeDomError('Anchor', 'data-test')]
    },
    {
      name: 'custom attribute missing',
      code: '<a href="/blah">Link</a>',
      errors: [makeDomError('Anchor', 'data-test-id')],
      options: ['always', {
        domAttribute: 'data-test-id'
      }]
    },
    {
      name: 'custom attribute mismatch',
      code: '<a data-test="foo" href="/blah">Link</a>',
      errors: [makeDomError('Anchor', 'data-test-id')],
      options: ['always', {
        domAttribute: 'data-test-id'
      }]
    },
    {
      name: 'ignore as string',
      code: '<a href="/blah">Link</a>',
      errors: [makeDomError('Anchor', 'data-test')],
      options: ['always', {
        ignore: 'Link'
      }]
    },
    {
      name: 'ignore as array',
      code: '<a href="/blah">Link</a>',
      errors: [makeDomError('Anchor', 'data-test')],
      options: ['always', {
        ignore: ['Link']
      }]
    },
    {
      name: 'ignorePattern as string',
      code: '<a href="/blah">Link</a>',
      errors: [makeDomError('Anchor', 'data-test')],
      options: ['always', {
        ignorePattern: 'Link'
      }]
    },
    {
      name: 'ignorePattern as array',
      code: '<a href="/blah">Link</a>',
      errors: [makeDomError('Anchor', 'data-test')],
      options: ['always', {
        ignorePattern: ['Link']
      }]
    },
  ]
});
