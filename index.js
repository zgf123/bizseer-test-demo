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
  insert(key) {
    if (this.root) {
      this._insert(this.root, key)
    } else {
      this.root = new Node(key)
    }
  }
  _insert(node, key) {
    if (key < node.key) {
      if (node.left) {
        this._insert(node.left, key)
      } else {
        node.left = new Node(key)
      }
    } else {
      if (node.right) {
        this._insert(node.right, key)
      } else {
        node.right = new Node(key)
      }
    }
  }
  inOrderTraverse() {
    this._inOrderTraverse(this.root)
  }
  _inOrderTraverse(node) {
    if (!node) return
    this._inOrderTraverse(node.left)
    console.log(node.key)
    this._inOrderTraverse(node.right)
  }
  delete(key) {
    this.root = this._delete(this.root, key)
  }
  _delete(node, key) {
    if (!node) return null
    if (key < node.key) {
      node.left = this._delete(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this._delete(node.right, key)
      return node
    } else {
      if (node.left && node.right) {
        let temp = node.left
        while (temp.right) temp = temp.right
        node.key = temp.key
        node.left = this._delete(node.left, temp.key)
        return node
      }
      if (node.left) {
        return node.left
      } else if (node.right) {
        return node.right
      } else {
        return null
      }
    }
  }
}

const tree = new BinarySearchTree()
let arr = [6, 3, 12, 2, 1, 5, 4, 8, 9, 7, 10, 15, 14, 13, 11]
arr.forEach((n) => tree.insert(n))
tree.delete(6)
tree.delete(5)
tree.delete(7)
tree.inOrderTraverse()
