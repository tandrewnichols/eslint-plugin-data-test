const subject = require('./utils');

describe('utils', () => {
  describe('.getTestAttribute', () => {
    describe('with no test attribute', () => {
      describe('on a dom node', () => {
        it('should return data-test', () => {
          expect(subject.getTestAttribute({}, 'div')).toEqual('data-test');
        });
      });

      describe('on a component', () => {
        it('should return dataTest', () => {
          expect(subject.getTestAttribute({}, 'Button')).toEqual('dataTest');
        });
      });
    });

    describe('with a test attribute', () => {
      describe('on a dom node', () => {
        it('should return data-test-id', () => {
          expect(subject.getTestAttribute({ domAttribute: 'data-test-id' }, 'div')).toEqual('data-test-id');
        });
      });

      describe('on a component', () => {
        it('should return dataTest', () => {
          expect(subject.getTestAttribute({ componentAttribute: 'dataTestId' }, 'Button')).toEqual('dataTestId');
        });
      });
    });
  });

  describe('.makeDomError', () => {
    it('should return an error message', () => {
      expect(subject.makeDomError('Div', 'blah')).toEqual(
        'Div elements must have a blah attribute.'
      );
    });
  });

  describe('.makeHandlerError', () => {
    describe('for a component', () => {
      it('should return a component-based error message', () => {
        expect(subject.makeHandlerError('Button', 'onFoo', 'blah')).toEqual(
          'Components with an onFoo handler must have a blah attribute.'
        );
      });
    });

    describe('for a dom node', () => {
      it('should return an element-based error message', () => {
        expect(subject.makeHandlerError('div', 'onFoo', 'blah')).toEqual(
          'DOM elements with an onFoo handler must have a blah attribute.'
        );
      });
    });
  });
});
