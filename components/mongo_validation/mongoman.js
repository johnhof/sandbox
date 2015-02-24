var mon = require('mongoman');

module.exports = function (done) {
  mon.connect();

  mon.register('Foo', {
    caps : mon('caps').string().uppercase().alphanum().fin()
  });

  var foo = mon.new('Foo', {
    caps : 'bar!'
  });

  foo.save(function (error) {

    console.log(error);
    // {
    //   message : 'Validation failed',
    //   name    : 'ValidationError',
    //   errors  : {
    //     caps : {
    //       message : 'caps should contain alpha-numeric characters only',
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
    //     message : 'caps should contain alpha-numeric characters only',
    //     name    : 'ValidatorError',
    //     path    : 'caps',
    //     type    : 'user defined',
    //     value   : 'bar!'
    //   }
    // }

    done();
  });
}