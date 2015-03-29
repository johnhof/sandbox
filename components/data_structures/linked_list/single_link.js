
module.exports = function (done) {


  /////////////////////////////////////////////////////////////////////////////////
  //
  // Linked List
  //
  /////////////////////////////////////////////////////////////////////////////////


  function LinkedList () {
    this.head = null;
    this.tail = null;
  }

  LinkedList.prototype.insert = function (val, index) {
    var newNode = new Node(val);


    // insert at end
    if (index === undefined) {
      // empty list (edge case)
      if (!this.head) {
        this.tail = this.head = newNode;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
      }

    // insert at index
    } else if (index >= 0) {
      // 0 indexed
      if (!index) {
        var newNode = new Node(val, this.head);
        this.head = newNode;

      } else {
      var preNode = this.head;

      for (var i = 1; i < index; i++) {

        // out of bounds insert at end
        if (!preNode.next && i <= index) {
          preNode.next = new Node(val);
          return;
        }

        preNode = preNode.next;
      }

      var postNode = preNode.next;
      preNode.next = new Node(val, postNode);

      }

    }

  }

  LinkedList.prototype.delete = function (val) {
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

  LinkedList.prototype.toString = function () {
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


  var fooList = new LinkedList();


  // insert two at end
  fooList.insert('foo');
  fooList.insert('bar');
  console.log('  ' + fooList.toString());

  // insert at beginning
  fooList.insert('biz', 0);
  console.log('  ' + fooList.toString());

  // insert at middle
  fooList.insert('baz', 1);
  console.log('  ' + fooList.toString());

  // insert out of bounds
  fooList.insert('buz', 10);
  console.log('  ' + fooList.toString());

  done();
}