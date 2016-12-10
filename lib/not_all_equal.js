'use strict';

module.exports = digits => {
  const first = digits[0];

  for (let i = 1; i < digits.length; ++i) {
    if (digits[i] !== first) {
      return true;
    }
  }

  return false;
};
