const DEFAULT_DOM_ATTR = 'data-test';
const DEFAULT_COMPONENT_ATTR = 'dataTest';

const isComponent = (type) => /^[A-Z]/.test(type);

const getTestAttribute = (options, nodeType) =>
  isComponent(nodeType)
    ? (options.componentAttribute || DEFAULT_COMPONENT_ATTR)
    : (options.domAttribute || DEFAULT_DOM_ATTR);

const makeDomError = (type, attribute) =>
  `${ type } elements must have a ${ attribute } attribute.`;

const makeHandlerError = (type, handler, attribute) =>
  `${ isComponent(type) ? 'Components' : 'DOM elements' } with an ${ handler } handler must have a ${ attribute } attribute.`;

const notIgnored = (type, { ignore, ignorePattern }) => {
  ignore = Array.isArray(ignore) ? ignore : [ignore];
  ignorePattern = Array.isArray(ignorePattern) ? ignorePattern : [ignorePattern];

  let ignoreCheck = !ignore.includes(type);
  let patternCheck = !ignorePattern.some((pattern) => new RegExp(pattern).test(type));

  if (ignore[0] && !ignorePattern[0]) {
    return ignoreCheck;
  }

  if (ignorePattern[0] && !ignore[0]) {
    return patternCheck;
  }

  if (ignore[0] && ignorePattern[0]) {
    return ignoreCheck && patternCheck;
  }

  return true;
};

module.exports = { getTestAttribute, makeDomError, makeHandlerError, notIgnored, DEFAULT_DOM_ATTR, DEFAULT_COMPONENT_ATTR };
