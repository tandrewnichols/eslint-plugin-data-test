const subject = require('./utils');

describe('utils', () => {
  describe('.getTestAttribute', () => {
    describe('with no test attribute', () => {
      it('should return [data-test]', () => {
        expect(subject.getTestAttribute()).toEqual(['data-test']);
      });
    });

    describe('with a string attribute', () => {
      it('should return that attribute in an array', () => {
        expect(subject.getTestAttribute('foo')).toEqual(['foo']);
      });
    });

    describe('with an array of attributes', () => {
      it('should return that array', () => {
        expect(subject.getTestAttribute(['foo', 'bar'])).toEqual(['foo', 'bar']);
      });
    });
  });
});
