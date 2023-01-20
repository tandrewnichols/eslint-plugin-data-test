const { hasProp, elementType, hasAnyProp } = require('jsx-ast-utils');
const defaultRuleSchema = require('../rule-schema');
const { getTestAttribute } = require('../utils');

module.exports = {
  meta: {
    docs: {
      description: 'Requires test attributes on anchors.',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/anichols-ht/eslint-plugin-data-test/tree/master/docs/rules/anchor.md'
    },
    fixable: false,
    schema: defaultRuleSchema
  },

  create: function(context) {
    const options = context.options[1] || {};
    const testAttribute = getTestAttribute(options.testAttribute);

    return {
      JSXOpeningElement: (node) => {
        const type = elementType(node);
        const attributes = node.attributes;

        if (type === 'a' && hasProp(attributes, 'href') && !hasAnyProp(attributes, testAttribute)) {
          context.report({
            node,
            message: `Anchor elements must have one of the following attributes: ${ testAttribute.join(', ') }.`
          });
        }
      }
    };
  }
};
