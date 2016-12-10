'use strict';

const not_all_equal = require('../lib/not_all_equal');

describe('not_all_equal', () => {
  describe('when passing different', () => {
    it('should return true', () => {
      expect(not_all_equal([1, 2, 3])).to.be.true;
    });
  });

  describe('when passing all equal', () => {
    it('should return false', () => {
      expect(not_all_equal([1, 1, 1])).to.be.false;
    });
  });
});
