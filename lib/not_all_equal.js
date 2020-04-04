module.exports = digits => {
  const first = digits[0];

  for (const digit of digits) {
    if (digit !== first) {
      return true;
    }
  }

  return false;
};
