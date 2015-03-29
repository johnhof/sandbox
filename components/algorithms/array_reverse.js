
module.exports = function (done) {

  /////////////////////////////////////////////////////////////////////////////////
  //
  // Algorithm
  //
  /////////////////////////////////////////////////////////////////////////////////

  function rotate (nums) {
    for (var leftOffset = 0; leftOffset < (nums.length / 2); leftOffset++) {
      (function () {
        var rightOffset = nums.length - leftOffset - 1;
        var tmp         = nums[leftOffset];

        nums[leftOffset] = nums[rightOffset];
        nums[rightOffset] = tmp;
      }());
    }
  }



  /////////////////////////////////////////////////////////////////////////////////
  //
  // Tests
  //
  /////////////////////////////////////////////////////////////////////////////////

  test([-1]);
  test([-1, 2]);
  test([1, 2, 3, 4]);

  done();

  function test (set, param) {
    console.log('in: '.cyan + JSON.stringify(set, null, ''));
    rotate(set)
    console.log('out: '.cyan + JSON.stringify(set, null, '') + '\n');
  }
}