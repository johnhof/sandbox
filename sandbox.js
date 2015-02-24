var mon      = require('mongoman');
var mongoose = require('mongoose');
var colors   = require('colors');
var _        = require('lodash')
var helpers  = require('./lib/helpers');

var components = helpers.treeToObj(__dirname + '/components');

var target    = process.argv[2];
var component = helpers.findValue(components, target);

if (process.argv.length < 3) {
  console.log('\nTarget not specified.'.yellow);
  printcomponents()
} else if (!component) {
  console.log('\nTarget '.yellow + target + ' not supported.'.yellow);
  printcomponents();
} else {
  console.log('\nExecuting target '.green + target + ' >>>\n'.green);
  component(function done () {
    console.log('\n<<< Done'.green + '\n');
    process.exit();
  });
}

function printcomponents () {
  console.log('\nChoose one of the following:'.cyan);
  helpers.objPrettyPrint(components, 'function');
  console.log();
}