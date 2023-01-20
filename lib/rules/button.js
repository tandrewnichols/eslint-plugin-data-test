const { hasAnyProp, elementType } = require('jsx-ast-utils');
const defaultRuleSchema = require('../rule-schema');
const { getTestAttribute } = require('../utils');

module.exports = {
  meta: {
    docs: {
      description: 'Requires test attributes on buttons.',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/anichols-ht/eslint-plugin-data-test/tree/master/docs/rules/button.md'
    },
    fixable: false,
    schema: {
      ...defaultRuleSchema,
      properties: {
        ...defaultRuleSchema.properties
      }
    }
  },

  create: function(context) {
    const options = context.options[1] || {};
    const testAttribute = getTestAttribute(options.testAttribute);

    return {
      JSXOpeningElement: (node) => {
        const type = elementType(node);
        const attributes = node.attributes;

        if (type === 'button' && !hasAnyProp(attributes, testAttribute)) {
          context.report({
            node,
            message: `Button elements must have one of the following attributes: ${ testAttribute.join(', ') }.`
          });
        }
      }
    };
  }
};
