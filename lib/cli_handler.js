'use strict';

const program = require('commander');
const version = require('../package.json').version;
const R       = require('ramda');

module.exports = () => {
  program
    .version(version)
    .option('-g, --generate <output_file>', 'Generate all valid CPFs')
    .option('-c, --check <CPF>', 'Validates given CPF')
    .parse(process.argv);

  const selected_operation = {
    name:     null,
    argument: null
  };

  if (!R.isNil(program.generate) && !R.isNil(program.check)) {
    console.error('\n\tERROR!');
    console.error('You may select only one option!');
    process.exit(1);
  }

  if (program.generate) {
    selected_operation.name = 'generate';
    selected_operation.argument = program.generate;
  } else if (program.check) {
    selected_operation.name = 'check';
    selected_operation.argument = program.check;
  }

  return selected_operation;
};
