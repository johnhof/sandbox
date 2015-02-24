var mon      = require('mongoman');
var mongoose = require('mongoose');
var colors   = require('colors');
var _        = require('lodash')

var targets = {
  mongoman           : run('mongo_validation.mongoman'),
  mongoose_validator : run('mongo_validation.mongoose-validator'),
  mongoose           : run('mongo_validation.mongoose')
}

function run (chain) {
  return function () {
    chain = (chain || '').replace('.', '/');
    return require('./' + chain)(function done () {
      console.log('\nDone'.green + '\n');
      process.exit();
    });
  }
}

function printTargets () {
  console.log('\nChoose one of the following:');
  _.each(targets, function (val, key) {
    console.log('  ' + key);
  });
  console.log();
}

var target = process.argv[2];

if (process.argv.length < 3) {
  console.log('\nTarget not specified.'.yellow);
  printTargets()
} else if (!targets[target]) {
  console.log('\nTarget '.yellow + target + ' not supported.'.yellow);
  printTargets();
} else {
  console.log('\nExecuting target '.green + target + '...\n');
  targets[target]();
}

