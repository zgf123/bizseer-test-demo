class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
  }
  insert() {}
  _insert() {}
  delete() {}
  _delete() {}
  inOrderTraverse() {}
}

const tree = new BinarySearchTree()
let arr = [6, 3, 12, 2, 1, 5, 4, 8, 9, 7, 10, 15, 14, 13, 11]
arr.forEach((n) => tree.insert(n))
tree.delete(6)
tree.delete(5)
tree.delete(7)
tree.inOrderTraverse()
