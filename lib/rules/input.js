const { hasProp, elementType } = require('jsx-ast-utils');
const { domRule } = require('../schema');
const { getTestAttribute, makeDomError } = require('../utils');

module.exports = {
  meta: {
    docs: {
      description: 'Requires test attributes on inputs.',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/anichols-ht/eslint-plugin-data-test/tree/master/docs/rules/input.md'
    },
    fixable: false,
    schema: [
      domRule[0],
      {
        ...domRule[1],
        properties: {
          ...domRule[1].properties,
          readonly: {
            type: 'boolean'
          }
        }
      }
    ]
  },

  create: function(context) {
    const options = context.options[1] || {};

    return {
      JSXOpeningElement: (node) => {
        const type = elementType(node);
        const testAttribute = getTestAttribute(options, type);
        const attributes = node.attributes;

        const readonlyCondition = !hasProp(attributes, 'readonly') || options.readonly;

        if (type === 'input' && readonlyCondition && !hasProp(attributes, testAttribute)) {
          context.report({
            node,
            message: makeDomError('Input', testAttribute)
          });
        }
      }
    };
  }
};
