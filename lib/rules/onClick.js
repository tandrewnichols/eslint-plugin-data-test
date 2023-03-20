const { hasProp, elementType } = require('jsx-ast-utils');
const { handlerRule } = require('../schema');
const { getTestAttribute, makeHandlerError, notIgnored } = require('../utils');

module.exports = {
  meta: {
    docs: {
      description: 'Requires test attribute data-test on elements with the onClick property.',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/tandrewnichols/eslint-plugin-data-test/tree/master/docs/rules/onClick.md'
    },
    fixable: false,
    schema: handlerRule
  },

  create: function(context) {
    const options = context.options[1] || {};

    return {
      JSXOpeningElement: (node) => {
        const type = elementType(node);
        const testAttribute = getTestAttribute(options, type);
        const attributes = node.attributes;

        if (notIgnored(type, options) && hasProp(attributes, 'onClick') && !hasProp(attributes, testAttribute)) {
          context.report({
            node,
            message: makeHandlerError(type, 'onClick', testAttribute)
          });
        }
      }
    };
  }
};
