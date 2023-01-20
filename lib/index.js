module.exports = {
  rules: {
    anchor: require('./rules/anchor'),
    button: require('./rules/button'),
    input: require('./rules/input'),
    onChange: require('./rules/onChange'),
    onClick: require('./rules/onClick'),
    onKeyDown: require('./rules/onKeyDown'),
    onKeyUp: require('./rules/onKeyUp'),
    onSubmit: require('./rules/onSubmit'),
  },
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'test-selectors/anchor': 'error',
        'test-selectors/button': 'error',
        'test-selectors/input': 'error',
        'test-selectors/onChange': 'error',
        'test-selectors/onClick': 'error',
        'test-selectors/onKeyDown': 'error',
        'test-selectors/onKeyUp': 'error'
      }
    }
  }
};
