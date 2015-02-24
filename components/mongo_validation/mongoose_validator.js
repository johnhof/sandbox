var mongoose = require('mongoose');
var validate = require('mongoose-validator');

module.exports = function (done) {
  mongoose.connect('mongodb://localhost/database');

  var fooSchema = new mongoose.Schema({
    caps : {
      type     : String,
      validate : [
        validate({
          validator : 'isUppercase',
          message   : 'caps must be uppercase'
        }),
        validate({
          validator : 'isAlphanumeric',
          message   : 'caps must be numbers and letters only'
        })
      ]
    }
  });

  var FooModel = mongoose.model('Foo', fooSchema);

  var foo = new FooModel({
    caps : 'bar!'
  });

  foo.save(function (error) {

    console.log(error);
    // {
    //   message : 'Validation failed',
    //   name    : 'ValidationError',
    //   errors  : {
    //     caps : {
    //       message : 'caps must be numbers and letters only',
    //       name    : 'ValidatorError',
    //       path    : 'caps',
    //       type    : 'user defined',
    //       value   : 'bar!'
    //     }
    //   }
    // }

    console.log(foo.errors);
    // {
    //   caps: {
    //     message : 'caps must be numbers and letters only',
    //     name    : 'ValidatorError',
    //     path    : 'caps',
    //     type    : 'user defined',
    //     value   : 'bar!'
    //   }
    // }


    done();
  });
}