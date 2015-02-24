var _  = require('lodash');
var fs = require('fs');

exports.findValue = function (obj, namespace, defaultValue) {
  if (!(obj && namespace)) { return defaultValue; }

  var keys = namespace.split('.').reverse();
  while (keys.length && (obj = obj[keys.pop()]) !== undefined) {}

  return (typeof obj !== 'undefined' ? obj : defaultValue);
}


exports.objPrettyPrint = function (printObj, filter) {
  recurse(null, printObj, 0);
  function recurse (path, obj, depth) {
    if (depth > 15) { console.error('maximum component depth exceeded'); process.exit(); }

    _.each(obj, function (value, key) {

      var newPath = path ? path + '.' + key : key;
      if (typeof value === filter) {
        console.log('  - ' + newPath);
      } else if (Object.keys(value || {}).length) {
        recurse(newPath, value, depth + 1);
      }
    })
  }
}


// recurse through the directory and return the tree as an object
exports.treeToObj = function (path) {
  if (!path) { return {}; }

  // use a recursive tree mapper to retrieve the object
  var resultObj = subTreeObj({}, path);

  // recursive tree for requiring js files
  function subTreeObj (currentLeaf, currentPath) {

    // for the current leaf, iterate over its matching directory
    var currentContents = exports.getDirContents(currentPath);
    _.each(currentContents, function (content) {
      if (!currentLeaf[content.name]) {
        currentLeaf[content.name] = {};
      }

      // if this is is a file, require it as a property of this leaf
      if (content.isJs) {
        currentLeaf[content.name] = require(content.path + '/' + content.name + content.extension)


      // if it's a directory, recurse
      } else if (!content.isFile) {
        currentLeaf[content.name] = subTreeObj(_.clone(currentLeaf[content.name], true), content.path + '/' + content.name);
      }

    });

    return currentLeaf;
  }

  return resultObj;
}


// returns the an array of directories and an array of files from an directory
exports.getDirContents = function (path) {
  var results = _.map(fs.readdirSync(path) || [], function (content) {
    if (!content) return;

    var match  = content.match(/(.*?)(\..*)$/) || []
    var result = {
      string    : path + '/' + content,
      name      : match[1] || content,
      path      : path,
      extension : match[2] || null,
      isJs      : /\.js$/.test(content),
      isFile    : !fs.statSync(path + '/' + (match[1] || content) + (match[2] || '')).isDirectory()
    };

    return result;
  });

  return results;
}

