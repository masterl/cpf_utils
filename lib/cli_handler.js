const { Command } = require('commander');
const version     = require('../package.json').version;
const R           = require('ramda');

const program = new Command();

module.exports = () => {
  program
    .version(version)
    .option('-g, --generate <output_file>', 'Generate all valid CPFs')
    .option('-c, --check <CPF>', 'Validates given CPF')
    .parse(process.argv);

  const options = program.opts();

  const selected_operation = {
    name:     null,
    argument: null
  };

  if (!R.isNil(options.generate) && !R.isNil(options.check)) {
    console.error('\n\tERROR!');
    console.error('You may select only one option!');
    process.exit(1);
  }

  if (options.generate) {
    selected_operation.name = 'generate';
    selected_operation.argument = options.generate;
  } else if (options.check) {
    selected_operation.name = 'check';
    selected_operation.argument = options.check;
  }

  return selected_operation;
};
