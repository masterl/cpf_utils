const compute_first_verification_digit = require('./compute_first_verification_digit');
const compute_second_verification_digit = require('./compute_second_verification_digit');
const not_all_equal = require('./not_all_equal');

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

function first_verification_digit_ok (verification_digit, first_nine_digits) {
  const calculated_digit = compute_first_verification_digit(first_nine_digits);

  return verification_digit === calculated_digit;
}

function second_verification_digit_ok (verification_digit, first_ten_digits) {
  const calculated_digit = compute_second_verification_digit(first_ten_digits);

  return verification_digit === calculated_digit;
}

function length_ok (digits) {
  return digits.length === 11;
}

function normalize_cpf (cpf) {
  const raw_cpf_str = `${cpf}`;

  const not_digits = /[^0-9]/g;

  return raw_cpf_str.replace(not_digits, '');
}
