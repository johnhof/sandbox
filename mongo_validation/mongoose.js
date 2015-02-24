var mongoose  = require('mongoose');

module.exports =  function  (done) {
  mongoose.connect('mongodb://localhost/database')

  var fooSchema = new mongoose.Schema({ caps : String })
  var FooModel  = mongoose.model('Foo', fooSchema);

  FooModel.schema.path('caps').validate(function isUppercase(value) {
    return value === value.toUpperCase();
  }, 'Invalid caps');

  var foo = new FooModel({ caps: 'bar' });

  foo.save(function (error) {

    console.log(error);
    // {
    //   message : 'Validation failed',
    //   name    : 'ValidationError',
    //   errors  : {
    //     caps : {
    //         name    : 'ValidatorError',
    //         path    : 'caps',
    //         type    : 'user defined',
    //         value   : 'bar'
    //         message : 'Invalid caps',
    //       }
    //     }
    //   }
    // }

    console.log(foo.errors);
    // {
    //   caps : {
    //     message : 'Invalid caps',
    //     name    : 'ValidatorError',
    //     path    : 'caps',
    //     type    : 'user defined',
    //     value   : 'bar'
    //   }
    // }

    done();
  });
}