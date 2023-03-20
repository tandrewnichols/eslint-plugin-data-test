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
    Link: require('./rules/Link')
  },
  configs: {
    recommended: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'data-test/anchor': 'error',
        'data-test/button': 'error',
        'data-test/input': 'error',
        'data-test/onChange': 'error',
        'data-test/onClick': 'error',
        'data-test/onKeyDown': 'error',
        'data-test/onKeyUp': 'error',
        'data-test/onSubmit': 'error',
        'data-test/Link': 'error'
      }
    }
  }
};
