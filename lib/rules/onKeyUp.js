const { hasProp, elementType } = require('jsx-ast-utils');
const { handlerRule } = require('../schema');
const { getTestAttribute, makeHandlerError } = require('../utils');

module.exports = {
  meta: {
    docs: {
      description: 'Requires test attribute data-test on elements with the onKeyUp property.',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/anichols-ht/eslint-plugin-data-test/tree/master/docs/rules/onKeyUp.md'
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

        if (hasProp(attributes, 'onKeyUp') && !hasProp(attributes, testAttribute)) {
          context.report({
            node,
            message: makeHandlerError(type, 'onKeyUp', testAttribute)
          });
        }
      }
    };
  }
};
