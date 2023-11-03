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
    let parent = node.parent
    temp.parent = parent
    if (!parent) {
      this.root = temp
    } else if ((node = parent.left)) {
      parent.left = temp
    } else {
      parent.right = temp
    }
    node.left = temp.right
    if (temp.right) temp.right.parent = node
    temp.right = node
    node.parent = temp
  }
  rotateRR(node) {
    let temp = node.right
    let parent = node.parent
    temp.parent = node.parent
    if (!parent) {
      this.root = temp
    } else if ((node = parent.left)) {
      parent.left = temp
    } else {
      parent.right = temp
    }
    node.right = temp.left
    if (temp.left) temp.left.parent = node
    temp.left = node
    node.parent = temp
  }
  insert(key) {
    let newNode = new Node(key)
    if (!this.root) {
      newNode.color = 'black'
      this.root = newNode
    } else {
      let curNode = this.root
      while (curNode) {
        if (key === curNode.key) {
          console.log('key值相同')
          return
        } else if (key > curNode.key) {
          if (curNode.right) {
            curNode = curNode.right
          } else {
            newNode.parent = curNode
            curNode.right = newNode
            break
          }
        } else if (key < curNode.key) {
          if (curNode.left) {
            curNode = curNode.left
          } else {
            newNode.parent = curNode
            curNode.left = newNode
            break
          }
        }
      }
      this.insertFix(newNode)
    }
  }
  insertFix(node) {
    let curNode = node
    while (curNode.color === 'red' && curNode.parent?.color === 'red') {
      let parent = curNode.parent
      let grandparent = parent.parent
      if (parent === grandparent.left) {
        let uncle = grandparent.right
        if (uncle?.color === 'red') {
          parent.color = 'black'
          uncle.color = 'black'
          grandparent.color = 'red'
          curNode = grandparent
        } else {
          if (curNode === parent.right) {
            this.rotateRR(parent)
            ;[curNode, parent] = [parent, curNode]
          }
          parent.color = 'black'
          grandparent.color = 'red'
          this.rotateLL(grandparent)
        }
      } else {
        let uncle = grandparent.left
        if (uncle?.color === 'red') {
          parent.color = 'black'
          uncle.color = 'black'
          grandparent.color = 'red'
          curNode = grandparent
        } else {
          if (curNode === parent.left) {
            this.rotateLL(parent)
            ;[curNode, parent] = [parent, curNode]
          }
          parent.color = 'black'
          grandparent.color = 'red'
          this.rotateRR(grandparent)
        }
      }
    }
    this.root.color = 'black'
  }

  delete(key) {
    let curNode = this.root
    while (curNode) {
      if (key < curNode.key) {
        curNode = curNode.left
      } else if (key > curNode.key) {
        curNode = curNode.right
      } else {
        if (curNode.left && curNode.right) {
          let tempNode = curNode.left
          while (tempNode.right) tempNode = tempNode.right
          curNode.key = tempNode.key
          curNode = tempNode
        }
        let subNode = curNode.left || curNode.right
        if (subNode) {
          subNode.parent = curNode.parent
          if (!curNode.parent) {
            this.root = subNode
          } else if (curNode === curNode.parent.left) {
            curNode.parent.left = subNode
          } else {
            curNode.parent.right = subNode
          }
          if (curNode.color === 'black') this.deleteFix(subNode)
        } else {
          if (!curNode.parent) {
            this.root = null
          } else {
            if (curNode.color === 'black') this.deleteFix(curNode)
            if (curNode.parent) {
              if (curNode === curNode.parent.left) {
                curNode.parent.left = null
              } else {
                curNode.parent.right = null
              }
              curNode.parent = null
            }
          }
        }
        break
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
        if (this.isBlack(brother.left) && this.isBlack(brother.right)) {
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
    if (!this.root) return
    let arr = [this.root, 'br']
    let str = ''
    while (arr.length) {
      let item = arr.shift()
      str += item === 'br' ? '\n' : `${item.key}${item.color} `
      if (item.left) arr.push(item.left)
      if (item.right) arr.push(item.right)
      if (item === 'br' && arr.length) {
        arr.push('br')
      }
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
