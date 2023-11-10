class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
    this.parent = null
    this.color = 'red'
  }
}
class RedBlackTree {
  constructor() {
    this.root = null
  }
  insert(key) {
    let newNode = new Node(key)
    if (this.root) {
      let node = this.root
      while (node) {
        if (key < node.key) {
          if (node.left) {
            node = node.left
          } else {
            node.left = newNode
            newNode.parent = node
            break
          }
        } else if (key > node.key) {
          if (node.right) {
            node = node.right
          } else {
            node.right = newNode
            newNode.parent = node
            break
          }
        } else {
          console.log('\x1b[31mkey值相同,无法添加')
          break
        }
      }
      this.insertFix(newNode)
    } else {
      this.root = newNode
      this.root.color = 'black'
    }
  }
  insertFix(node) {
    let currentNode = node
    while (currentNode.color === 'red' && currentNode.parent?.color === 'red') {
      let parent = currentNode.parent
      let grandParent = parent.parent
      if (parent === grandParent.left) {
        let uncle = grandParent.right
        if (uncle?.color === 'red') {
          parent.color = 'black'
          uncle.color = 'black'
          grandParent.color = 'red'
          currentNode = grandParent
        } else {
          if (currentNode === parent.right) {
            this.rotateRR(parent)
            ;[currentNode, parent] = [parent, currentNode]
          }
          parent.color = 'black'
          grandParent.color = 'red'
          this.rotateLL(grandParent)
        }
      } else {
        let uncle = grandParent.left
        if (uncle?.color === 'red') {
          parent.color = 'black'
          uncle.color = 'black'
          grandParent.color = 'red'
          currentNode = grandParent
        } else {
          if (currentNode === parent.left) {
            this.rotateLL(parent)
            ;[currentNode, parent] = [parent, currentNode]
          }
          parent.color = 'black'
          grandParent.color = 'red'
          this.rotateRR(grandParent)
        }
      }
    }
    this.root.color = 'black'
  }
  delete(key) {
    if (!this.root) return null
    let node = this.root
    while (node) {
      if (key < node.key) {
        node = node.left
      } else if (key > node.key) {
        node = node.right
      } else {
        break
      }
    }
    if (!node) return null
    if (node.left && node.right) {
      let temp = node.left
      while (temp.right) temp = temp.right
      node.key = temp.key
      node = temp
    }
    let subNode = node.left || node.right
    if (subNode) {
      subNode.parent = node.parent
      if (node.parent) {
        if (node === node.parent.left) {
          node.parent.left = subNode
        } else {
          node.parent.right = subNode
        }
      } else {
        this.root = subNode
      }
      if (node.color === 'black') this.deleteFix(subNode)
    } else {
      if (node.parent) {
        if (node.color === 'black') this.deleteFix(node)
        if (node === node.parent.left) {
          node.parent.left = null
        } else {
          node.parent.right = null
        }
      } else {
        this.root = null
      }
    }
  }
  deleteFix(node) {
    let currentNode = node
    while (currentNode !== this.root && currentNode.color === 'black') {
      if (currentNode === currentNode.parent.left) {
        let brother = currentNode.parent.right
        if (brother.color === 'red') {
          brother.color = 'black'
          currentNode.parent.color = 'red'
          this.rotateRR(currentNode.parent)
          brother = currentNode.parent.right
        }
        if (this.isBlack(brother.left) && this.isBlack(brother.right)) {
          brother.color = 'red'
          currentNode = currentNode.parent
        } else {
          if (this.isBlack(brother.right)) {
            brother.left.color = 'black'
            brother.color = 'red'
            this.rotateLL(brother)
            brother = currentNode.parent.right
          }
          brother.color = currentNode.parent.color
          currentNode.parent.color = 'black'
          brother.right.color = 'black'
          this.rotateRR(currentNode.parent)
          currentNode = this.root
        }
      } else {
        let brother = currentNode.parent.left
        if (brother.color === 'red') {
          brother.color = 'black'
          currentNode.parent.color = 'red'
          this.rotateLL(currentNode.parent)
          brother = currentNode.parent.left
        }
        if (this.isBlack(brother.left) && this.isBlack(brother.right)) {
          brother.color = 'red'
          currentNode = currentNode.parent
        } else {
          if (this.isBlack(brother.left)) {
            brother.color = 'red'
            brother.right.color = 'black'
            this.rotateRR(brother)
            brother = currentNode.parent.left
          }
          brother.color = currentNode.parent.color
          currentNode.parent.color = 'black'
          brother.left.color = 'black'
          this.rotateLL(currentNode.parent)
          currentNode = this.root
        }
      }
    }
    currentNode.color = 'black'
  }
  isBlack(node) {
    return node ? node.color === 'black' : true
  }
  rotateLL(node) {
    let temp = node.left
    temp.parent = node.parent
    if (node.parent) {
      if (node === node.parent.left) {
        node.parent.left = temp
      } else {
        node.parent.right = temp
      }
    } else {
      this.root = temp
    }
    node.left = temp.right
    if (temp.right) temp.right.parent = node
    temp.right = node
    node.parent = temp
  }
  rotateRR(node) {
    let temp = node.right
    temp.parent = node.parent
    if (node.parent) {
      if (node === node.parent.left) {
        node.parent.left = node
      } else {
        node.parent.right = node
      }
    } else {
      this.root = temp
    }
    node.right = temp.left
    if (temp.left) temp.left.parent = node
    temp.left = node
    node.parent = temp
  }
  print() {
    if (!this.root) return null
    let arr = [this.root, 'br']
    let str = ''
    while (arr.length) {
      let item = arr.shift()
      str += item === 'br' ? '\n' : `${item.color === 'red' ? '\x1b[31m' : ''}${item.key}\x1b[0m `
      if (item.left) arr.push(item.left)
      if (item.right) arr.push(item.right)
      if (item === 'br' && arr.length) arr.push('br')
    }
    console.log(str)
  }
}

let arr = [7, 6, 3, 9, 4, 1, 2, 5]
let tree = new RedBlackTree()
arr.forEach((n) => tree.insert(n))
tree.delete(4)
tree.delete(7)
tree.delete(6)
tree.print()
