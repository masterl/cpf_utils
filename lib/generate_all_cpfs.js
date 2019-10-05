'use strict';

const R            = require('ramda');
const Bluebird     = require('bluebird');
const fs           = require('fs');
const path         = require('path');

const compute_first_verification_digit = require('./compute_first_verification_digit');
const compute_second_verification_digit = require('./compute_second_verification_digit');
const not_all_equal = require('./not_all_equal');

module.exports = output_file_path => {
  const five_digits_combinations = generate_all_digits_combinations(5);
  const four_digits_combinations = generate_all_digits_combinations(4);

  const file_path = path.resolve(output_file_path);
  const cpfs_file = fs.openSync(file_path, 'w');

  return Bluebird.map(five_digits_combinations, (five_digits_combination, first_index) => {
    return Bluebird.map(four_digits_combinations, (four_digits_combination, second_index) => {
      const nine_digits_combination = `${five_digits_combination}${four_digits_combination}`;
      const cpf_digits = nine_digits_combination.split('').map(digit => parseInt(digit, 10));

      cpf_digits.push(compute_first_verification_digit(cpf_digits));
      cpf_digits.push(compute_second_verification_digit(cpf_digits));

      if (not_all_equal(cpf_digits)) {
        const cpf = cpf_digits.join('');

        fs.writeSync(cpfs_file, `${cpf}\n`);
      }
    }, { concurrency: 15 });
  }, { concurrency: 15 });
};

function generate_all_digits_combinations (length) {
  const digits_matrix = [];
  const indexes = [];
  const digits_combination = [];
  const all_combinations = [];

  for (let i = 0; i < length; ++i) {
    digits_matrix.push(R.range(0, 10));
    indexes.push(0);
    digits_combination.push(0);
  }

  while (indexes[0] < 10) {
    increment_indexes();
    update_combination();
    all_combinations.push(digits_combination.join(''));
  }

  return all_combinations;

  function increment_indexes () {
    for (let i = indexes.length - 1; i >= 0; --i) {
      ++indexes[i];

      if ((indexes[i] === 10) && (i > 0)) {
        indexes[i] = 0;
      } else {
        return;
      }
    }
  }

  function update_combination () {
    for (let i = 0; i < digits_combination.length; ++i) {
      digits_combination[i] = digits_matrix[i][indexes[i]];
    }
  }
}
