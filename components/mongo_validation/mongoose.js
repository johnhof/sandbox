var mongoose  = require('mongoose');

module.exports = function (done) {
  mongoose.connect('mongodb://localhost/database');

  //
  // schema declaration
  //
  var fooSchema = new mongoose.Schema({
    caps : {
      type : String,
      validate : [{
        msg       : 'caps must be uppercase',
        validator : function (value) {
          return value === value.toUpperCase();
        }
      }]
    }
  });

  var FooModel = mongoose.model('Foo', fooSchema);

  //
  // SchemaType method
  //
  FooModel.schema.path('caps').validate(function alphanum (value) {
    return /^[a-z0-9]+$/i.test(value);
  }, 'caps must be numbers and letters only');

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
    //       message : 'caps must be uppercase',
    //       name    : 'ValidatorError',
    //       path    : 'caps',
    //       type    : 'user defined',
    //       value   : 'bar!'
    //     }
    //   }
    // }

    console.log(foo.errors);
    // {
    //   caps : {
    //     message : 'caps must be uppercase',
    //     name    : 'ValidatorError',
    //     path    : 'caps',
    //     type    : 'user defined',
    //     value   : 'bar!'
    //   }
    // }

    done();
  });
}