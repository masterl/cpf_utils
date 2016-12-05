'use strict';

module.exports = cpf => {
  const cpf_str = normalize_cpf(cpf);
  const digits = cpf_str.split('').map(digit => parseInt(digit, 10));

  return length_ok(digits) && not_all_equal(digits);
};

function normalize_cpf (cpf) {
  const raw_cpf_str = `${cpf}`;

  const not_digits = /[^0-9]/g;

  return raw_cpf_str.replace(not_digits, '');
}

function length_ok (digits) {
  return digits.length === 11;
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
