module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['lib/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text-summary'],
  reporters: ['default']
};
