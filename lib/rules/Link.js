const { hasProp, hasAnyProp, elementType } = require('jsx-ast-utils');
const { domRule } = require('../schema');
const { DEFAULT_DOM_ATTR, makeDomError, notIgnored } = require('../utils');

module.exports = {
  meta: {
    docs: {
      description: 'Requires test attribute data-test on React Router Link and Next Link elements.',
      category: 'Possible Errors',
      recommended: true,
      url: 'https://github.com/tandrewnichols/eslint-plugin-data-test/tree/master/docs/rules/onChange.md'
    },
    fixable: false,
    schema: domRule
  },

  create: function(context) {
    const options = context.options[1] || {};

    return {
      JSXOpeningElement: (node) => {
        const type = elementType(node);

        if (notIgnored(type, options) && type === 'Link') {
          const testAttribute = options.domAttribute || DEFAULT_DOM_ATTR;
          const attributes = node.attributes;

          if (hasAnyProp(attributes, ['href', 'to']) && !hasProp(attributes, testAttribute)) {
            context.report({
              node,
              message: makeDomError('Link', testAttribute)
            });
          }
        }
      }
    };
  }
};

