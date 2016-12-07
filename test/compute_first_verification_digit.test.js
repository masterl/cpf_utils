'use strict';

const compute_first_verification_digit = require('../lib/compute_first_verification_digit');

describe('compute_first_verification_digit', () => {
  describe('for 529982247', () => {
    it('should compute 2', () => {
      expect(compute_first_verification_digit([5, 2, 9, 9, 8, 2, 2, 4, 7])).to.be.equal(2);
    });
  });

  describe('for 627447866', () => {
    it('should compute 3', () => {
      expect(compute_first_verification_digit([6, 2, 7, 4, 4, 7, 8, 6, 6])).to.be.equal(3);
    });
  });
});
