'use strict';

const R            = require('ramda');
const Bluebird     = require('bluebird');
const fs           = require('fs');
const path         = require('path');
const validate_cpf = require('./validate_cpf');

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
    if (all_combinations.length % 100 === 0) {
      console.log(all_combinations.length);
    }
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

const file_path = path.resolve(path.join('.', 'all_cpfs.txt'));

const five_digits_combinations = generate_all_digits_combinations(5);
const zero_to_nine = R.range(0, 10);
const cpfs_file = fs.openSync(file_path, 'w');

five_digits_combinations.map((first_five_digits_combination, first_index) => {
  const remaining_combinations = five_digits_combinations.slice(first_index);

  remaining_combinations.map((second_five_digits_combination, second_index) => {
    const ten_digits_combination = `${first_five_digits_combination}${second_five_digits_combination}`;

    const cpfs = zero_to_nine
      .map(digit => `${ten_digits_combination}${digit}`)
      .filter(validate_cpf);

    cpfs.map(cpf => fs.writeSync(cpfs_file, `${cpf}\n`));
  });
});
