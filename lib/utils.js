const DEFAULT_ATTR = 'data-test';

const getTestAttribute = (testAttribute = DEFAULT_ATTR) =>
  Array.isArray(testAttribute) ? testAttribute : [testAttribute];

module.exports = { getTestAttribute };
