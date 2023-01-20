const { hasProp, hasAnyProp } = require('jsx-ast-utils');
const defaultRuleSchema = require('../rule-schema');
const { getTestAttribute } = require('../utils');

module.exports = {
  meta: {
    docs: {
      description: 'Requires test attribute data-test on elements with the onClick property.',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/anichols-ht/eslint-plugin-data-test/tree/master/docs/rules/onClick.md'
    },
    fixable: false,
    schema: defaultRuleSchema
  },

  create: function(context) {
    const options = context.options[1] || {};
    const testAttribute = getTestAttribute(options.testAttribute);

    return {
      JSXOpeningElement: (node) => {
        const attributes = node.attributes;
        if (hasProp(attributes, 'onClick') && !hasAnyProp(attributes, testAttribute)) {
          context.report({
            node,
            message: `Elements with an onClick handler must have one of the following attributes: ${ testAttribute.join(', ') }.`
          });
        }
      }
    };
  }
};
