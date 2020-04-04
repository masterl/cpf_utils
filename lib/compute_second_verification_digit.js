module.exports = (first_ten_digits) => {
  let multiplier = 11;

  const sum = first_ten_digits.reduce((sum, digit) => {
    sum += (digit * multiplier);
    --multiplier;

    return sum;
  }, 0);

  const remainder = (sum * 10) % 11;
  const calculated_digit = remainder === 10 ? 0 : remainder;

  return calculated_digit;
};
