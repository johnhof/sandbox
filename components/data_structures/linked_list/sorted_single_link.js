
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
      if (!currentNode.next) {
        currentNode.next = new Node(val);
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
        previousNode.next = currentNode.next;

        if (this.tail.val === currentNode.val) {
          this.tail = previousNode;
        }

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
       result += ' -> '.cyan;
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


  // insert two at end
  fooList.insert(5);
  console.log('  ' + fooList.toString());

  fooList.insert(4);
  console.log('  ' + fooList.toString());

  // insert at beginning
  fooList.insert(6);
  console.log('  ' + fooList.toString());

  // insert at middle
  fooList.insert(3);
  console.log('  ' + fooList.toString());

  // insert out of bounds
  fooList.insert(1);
  console.log('  ' + fooList.toString());

  done();
}