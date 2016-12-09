'use strict';

const compute_second_verification_digit = require('../lib/compute_second_verification_digit');

describe('compute_second_verification_digit', () => {
  describe('for 5299822472', () => {
    it('should return 5', () => {
      expect(compute_second_verification_digit([5, 2, 9, 9, 8, 2, 2, 4, 7, 2])).to.be.equal(5);
    });
  });

  describe('for 1776783816', () => {
    it('should return 1', () => {
      expect(compute_second_verification_digit([1, 7, 7, 6, 7, 8, 3, 8, 1, 6])).to.be.equal(1);
    });
  });
});
