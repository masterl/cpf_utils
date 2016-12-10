'use strict';

const cli_handler  = require('./lib/cli_handler');
const cpf_is_valid = require('./lib/validate_cpf');

const operation = cli_handler();

switch (operation.name) {
  case 'check':
    if (cpf_is_valid(operation.argument)) {
      console.log('CPF is valid');
      process.exit(0);
    }

    console.log('CPF is invalid');
    process.exit(1);
    break;
  case 'generate':
    break;
  default:
    console.error('Invalid operation!');
    process.exit(1);
}
