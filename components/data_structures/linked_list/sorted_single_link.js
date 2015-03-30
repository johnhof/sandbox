
module.exports = function (done) {


  /////////////////////////////////////////////////////////////////////////////////
  //
  // Linked List
  //
  /////////////////////////////////////////////////////////////////////////////////


  function LinkedListAscending () {
    this.head = null;
  }

  LinkedListAscending.prototype.insert = function (val) {
    // initial edge case
    if (!this.head) {
      this.head = new Node(val);
      return;
    }

    var currentNode  = this.head;
    var previousNode = null;


    while (currentNode) {
      if (currentNode.val === val) {
        return;
      } else if (currentNode.val > val) {
        // insert at head
        if (!previousNode) {
          this.head = new Node(val, currentNode);
          return;

        // insert in place
        } else {
          previousNode.next = new Node(val, currentNode);
          return;
        }

      } else if (!currentNode.next) {
        currentNode.next = new Node(val);
        return;
      }

      previousNode = currentNode;
      currentNode = currentNode.next;

    }

  }

  LinkedListAscending.prototype.delete = function (val) {
    var currentNode  = this.head;
    var previousNode = null;

    while (currentNode) {
      // foud value
      if (currentNode.val === val) {

        // edge case, first node
        if (!previousNode) {
          this.head = currentNode.next;
        } else {
          previousNode.next = currentNode.next;
        }

        return;


      // iterate
      } else {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
    }

    return false;
  }

  LinkedListAscending.prototype.toString = function () {
    var currentNode = this.head;
    var result      = '';

    while (currentNode) {
      result += currentNode.val;
      currentNode = currentNode.next;

      if (currentNode) {
       result += ' -> '.green;
      }
    }

    return result;
  }



  /////////////////////////////////////////////////////////////////////////////////
  //
  // Node
  //
  /////////////////////////////////////////////////////////////////////////////////


  function Node (val, next) {
    this.next = next || null;
    this.val  = val;
  }


  /////////////////////////////////////////////////////////////////////////////////
  //
  // Test
  //
  /////////////////////////////////////////////////////////////////////////////////


  var fooList = new LinkedListAscending();

  console.log('\n  Insert:'.cyan);
  test('insert', 5);
  test('insert', 4);
  test('insert', 6);
  test('insert', 3);
  test('insert', 1);

  console.log('\n  Delete:'.cyan);
  test('delete', 1);
  test('delete', 4);
  test('delete', 6);

  function test (action, target) {
    fooList[action](target);
    console.log('    (' + (target + '').yellow + ') ' + '='.blue + ' ' + fooList.toString());
  }

  done();
}