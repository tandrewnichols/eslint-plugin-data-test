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

module.exports = { getTestAttribute, makeDomError, makeHandlerError, DEFAULT_DOM_ATTR, DEFAULT_COMPONENT_ATTR };
