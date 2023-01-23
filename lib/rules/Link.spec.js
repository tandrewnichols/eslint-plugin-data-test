const subject = require('./Link');
const { RuleTester } = require('eslint');

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
    }
  ],
  invalid: [
    {
      name: 'React Router Link',
      code: '<Link to="/something">blah</Link>',
      errors: ['Link elements must have a data-test attribute.']
    },
    {
      name: 'Next Link',
      code: '<Link href="/something">blah</Link>',
      errors: ['Link elements must have a data-test attribute.']
    },
    {
      name: 'Link with custom attribute missing',
      code: '<Link to="/something">blah</Link>',
      options: ['always', {
        domAttribute: 'data-test-id'
      }],
      errors: ['Link elements must have a data-test-id attribute.']
    },
    {
      name: 'Link with custom attribute mismatch',
      code: '<Link to="/something" data-test="foo">blah</Link>',
      options: ['always', {
        domAttribute: 'data-test-id'
      }],
      errors: ['Link elements must have a data-test-id attribute.']
    }
  ]
});
