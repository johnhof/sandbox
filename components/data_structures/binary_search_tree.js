
module.exports = function (done) {


  /////////////////////////////////////////////////////////////////////////////////
  //
  // Binary Tree
  //
  /////////////////////////////////////////////////////////////////////////////////


  function BinaryTree () {
    this.root =  null;
  }

  BinaryTree.prototype.add = function (newValue) {
    // add as the root note if none exists
    if (!this.root) {
      this.root = new Node(newValue);

    } else {
      var current = this.root;

      while (current) {
        // determine if this value is right or left
        var placement = current.place(newValue);

        // there is a child there, iterate
        if (current[placement]) {
          current = current[placement];

        // if there's no child there, add this as the child
        } else {
          current[placement] = new Node(newValue, current);
          return;
        }
      }
    }
  }


  /////////////////////////////////////////////////////////////////////////////////
  //
  // Node
  //
  /////////////////////////////////////////////////////////////////////////////////


  function Node (value, parent) {
    this.parent = parent || null;
    this.left   = null;
    this.right  = null;
    this.value  = value;
  }

  Node.prototype.place = function (testVal) {
    if (this.value >= testVal) {
      return 'left';
    } else {
      return 'right';
    }
  }


  /////////////////////////////////////////////////////////////////////////////////
  //
  // Vanity (used for printing only)
  //
  /////////////////////////////////////////////////////////////////////////////////


  BinaryTree.prototype.print = function () {
    recursePrint(this.root, '  ');
    console.log();
    function recursePrint (node, offset) {
      process.stdout.write(offset)
      node.print();
      offset = offset + '  ';

      if (node.right) { recursePrint(node.right, offset); }
      if (node.left) { recursePrint(node.left, offset); }
    }
  }

  Node.prototype.print = function () {
    var parent = ((this.parent ? this.parent.value : 'root') + '').yellow;
    var left   = ((((this.left || {}).value || '-')) + '').yellow
    var right  = ((((this.right || {}).value || '-')) + '').yellow
    console.log('  ' + (this.value + '').green + ' - Parent(' + parent + ') - Children(' + left + ', ' + right + ')')
  }


  /////////////////////////////////////////////////////////////////////////////////
  //
  // Test
  //
  /////////////////////////////////////////////////////////////////////////////////


  var bTree = new BinaryTree();

  var insertSet = ['5', '3', '2', '4', '6', '1', '8', '5'];

  process.stdout.write('Inserting: '.cyan);
  console.log(insertSet);

  for (var i = 0; i < insertSet.length; i++) {
    console.log('  ++' + ' Insert: '.cyan + insertSet[i])
    bTree.add(insertSet[i]);
    console.log('  >> '  + ' Result: '.cyan)
    bTree.print();
  }

  done();
}
