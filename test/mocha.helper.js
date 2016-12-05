'use strict';

const chai = require('chai');
const chai_as_promised = require('chai-as-promised');
chai.use(chai_as_promised);
chai.config.includeStack = true;
global.expect = chai.expect;
