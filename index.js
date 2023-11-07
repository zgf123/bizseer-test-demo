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
        node.parent.left = temp
      } else {
        node.parent.right = temp
      }
    } else {
      this.root = temp
    }
    node.right = temp.left
    if (temp.left) temp.left.parent = node
    temp.left = node
    node.parent = temp
  }
  insert(key) {
    let newNode = new Node(key)
    if (this.root) {
      let curNode = this.root
      while (curNode) {
        if (key < curNode.key) {
          if (curNode.left) {
            curNode = curNode.left
          } else {
            curNode.left = newNode
            newNode.parent = curNode
            break
          }
        } else if (key > curNode.key) {
          if (curNode.right) {
            curNode = curNode.right
          } else {
            curNode.right = newNode
            newNode.parent = curNode
            break
          }
        } else {
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
    let curNode = node
    while (curNode.color === 'red' && curNode.parent?.color === 'red') {
      let parent = curNode.parent
      let grandParent = parent.parent
      if (parent === grandParent.left) {
        let uncle = grandParent.right
        if (uncle?.color === 'red') {
          uncle.color = 'black'
          parent.color = 'black'
          grandParent.color = 'red'
          curNode = grandParent
        } else {
          if (curNode === parent.right) {
            this.rotateRR(parent)
            ;[curNode, parent] = [parent, curNode]
          }
          parent.color = 'black'
          grandParent.color = 'red'
          this.rotateLL(grandParent)
        }
      } else {
        let uncle = grandParent.left
        if (uncle?.color === 'red') {
          uncle.color = 'black'
          parent.color = 'black'
          grandParent.color = 'red'
          curNode = grandParent
        } else {
          if (curNode === parent.left) {
            this.rotateLL(parent)
            ;[curNode, parent] = [parent, curNode]
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
    if (!this.root) return
    let curNode = this.root
    while (curNode) {
      if (key < curNode.key) {
        curNode = curNode.left
      } else if (key > curNode.key) {
        curNode = curNode.right
      } else {
        break
      }
    }
    if (curNode.left && curNode.right) {
      let temp = curNode.left
      while (temp.right) temp = temp.right
      curNode.key = temp.key
      curNode = temp
    }
    let subNode = curNode.left || curNode.right
    if (subNode) {
      subNode.parent = curNode.parent
      if (curNode.parent) {
        if (curNode === curNode.parent.left) {
          curNode.parent.left = subNode
        } else {
          curNode.parent.right = subNode
        }
      } else {
        this.root = subNode
      }
      if (curNode.color === 'black') this.deleteFix(subNode)
    } else {
      if (curNode.parent) {
        if (curNode.color === 'black') this.deleteFix(curNode)
        if (curNode === curNode.parent.left) {
          curNode.parent.left = null
        } else {
          curNode.parent.right = null
        }
        curNode = null
      } else {
        this.root = null
      }
    }
  }
  deleteFix(node) {
    let curNode = node
    while (curNode !== this.root && curNode.color === 'black') {
      if (curNode === curNode.parent.left) {
        let brother = curNode.parent.right
        if (brother.color === 'red') {
          brother.color = 'black'
          curNode.parent.color = 'red'
          this.rotateRR(curNode.parent)
          brother = curNode.parent.right
        }
        if (this.isBlack(brother.left) && this.isBlack(brother.right)) {
          brother.color = 'red'
          curNode = curNode.parent
        } else {
          if (this.isBlack(brother.right)) {
            brother.color = 'red'
            brother.left.color = 'black'
            this.rotateLL(brother)
            brother = curNode.parent.right
          }
          brother.color = curNode.parent.color
          curNode.parent.color = 'black'
          brother.right.color = 'black'
          this.rotateRR(curNode.parent)
          curNode = this.root
        }
      } else {
        let brother = curNode.parent.left
        if (brother.color === 'red') {
          brother.color = 'black'
          curNode.parent.color = 'red'
          this.rotateLL(curNode.parent)
          brother = curNode.parent.left
        }
        if (this.isBlack(brother.right) && this.isBlack(brother.left)) {
          brother.color = 'red'
          curNode = curNode.parent
        } else {
          if (this.isBlack(brother.left)) {
            brother.color = 'red'
            brother.right.color = 'black'
            this.rotateRR(brother)
            brother = curNode.parent.left
          }
          brother.color = curNode.parent.color
          curNode.parent.color = 'black'
          brother.left.color = 'black'
          this.rotateLL(curNode.parent)
          curNode = this.root
        }
      }
    }
    curNode.color = 'black'
  }

  isBlack(node) {
    return node ? node.color === 'black' : true
  }

  print() {
    let arr = [this.root, 'br']
    let str = ''
    while (arr.length) {
      let item = arr.shift()
      str += item === 'br' ? '\n' : `${item.key}${item.color} `
      if (item.left) arr.push(item.left)
      if (item.right) arr.push(item.right)
      if (arr.length && item === 'br') arr.push('br')
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
