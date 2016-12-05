'use strict';

module.exports = cpf => {
  const cpf_str = normalize_cpf(cpf);
  const digits = cpf_str.split('').map(digit => parseInt(digit, 10));

  return length_ok(digits) && not_all_equal(digits) && verification_digits_are_ok(digits);
};

function verification_digits_are_ok (digits) {
  const second_verification_digit = digits.pop();
  const first_verification_digit = digits.pop();

  return first_verification_digit_ok(first_verification_digit, digits) &&
         second_verification_digit_ok(second_verification_digit, digits.concat([first_verification_digit]));
}

function first_verification_digit_ok (verification_digit, first_digits) {
  let multiplier = 10;

  const sum = first_digits.reduce((sum, digit) => {
    sum += (digit * multiplier);
    --multiplier;

    return sum;
  }, 0);

  const remainder = (sum * 10) % 11;
  const calculated_digit = remainder === 10 ? 0 : remainder;

  return verification_digit === calculated_digit;
}

function second_verification_digit_ok (verification_digit, first_digits) {
  let multiplier = 11;

  const sum = first_digits.reduce((sum, digit) => {
    sum += (digit * multiplier);
    --multiplier;

    return sum;
  }, 0);

  const remainder = (sum * 10) % 11;
  const calculated_digit = remainder === 10 ? 0 : remainder;

  return verification_digit === calculated_digit;
}

function not_all_equal (digits) {
  const first = digits[0];

  const equal_to_first_count = digits.reduce((sum, current_digit) => {
    if (current_digit === first) {
      ++sum;
    }

    return sum;
  }, 0);

  return equal_to_first_count !== 11;
}

function length_ok (digits) {
  return digits.length === 11;
}

function normalize_cpf (cpf) {
  const raw_cpf_str = `${cpf}`;

  const not_digits = /[^0-9]/g;

  return raw_cpf_str.replace(not_digits, '');
}