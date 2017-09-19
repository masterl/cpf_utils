'use strict';

const cli_handler       = require('./lib/cli_handler');
const cpf_is_valid      = require('./lib/validate_cpf');
const generate_all_cpfs = require('./lib/generate_all_cpfs');

const operation = cli_handler();

switch (operation.name) {
  case 'check':
    if (cpf_is_valid(operation.argument)) {
      console.log('CPF is valid');
      process.exit(0);
    }

    console.log('CPF is invalid');
    process.exit(1);
  case 'generate':
    generate_all_cpfs(operation.argument)
      .then(() => process.exit(0))
      .catch(error => {
        console.error('\n\tERROR!');
        console.error(error);
        process.exit(1);
      });
    break;
  default:
    console.error('Invalid operation!');
    process.exit(1);
}
