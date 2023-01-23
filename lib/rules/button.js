const { hasProp, elementType } = require('jsx-ast-utils');
const { domRule } = require('../schema');
const { getTestAttribute, makeDomError } = require('../utils');

module.exports = {
  meta: {
    docs: {
      description: 'Requires test attributes on buttons.',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/tandrewnichols/eslint-plugin-data-test/tree/master/docs/rules/button.md'
    },
    fixable: false,
    schema: domRule
  },

  create: function(context) {
    const options = context.options[1] || {};

    return {
      JSXOpeningElement: (node) => {
        const type = elementType(node);
        const testAttribute = getTestAttribute(options, type);
        const attributes = node.attributes;

        if (type === 'button' && !hasProp(attributes, testAttribute)) {
          context.report({
            node,
            message: makeDomError('Button', testAttribute)
          });
        }
      }
    };
  }
};
