class Node {
  constructor(value, color) {
    this.value = value
    this.color = color
    this.left = null
    this.right = null
    this.parent = null
  }
}

class RedBlackTree {
  constructor() {
    this.root = null
  }

  // 左旋
  rotateLeft(node) {
    const rightChild = node.right
    node.right = rightChild.left
    if (rightChild.left !== null) {
      rightChild.left.parent = node
    }
    rightChild.parent = node.parent
    if (node.parent === null) {
      this.root = rightChild
    } else if (node === node.parent.left) {
      node.parent.left = rightChild
    } else {
      node.parent.right = rightChild
    }
    rightChild.left = node
    node.parent = rightChild
  }

  // 右旋
  rotateRight(node) {
    const leftChild = node.left
    node.left = leftChild.right
    if (leftChild.right !== null) {
      leftChild.right.parent = node
    }
    leftChild.parent = node.parent
    if (node.parent === null) {
      this.root = leftChild
    } else if (node === node.parent.right) {
      node.parent.right = leftChild
    } else {
      node.parent.left = leftChild
    }
    leftChild.right = node
    node.parent = leftChild
  }

  // 插入节点
  insert(value) {
    const newNode = new Node(value, 'red')
    if (this.root === null) {
      this.root = newNode
      newNode.color = 'black'
      return
    }
    let currentNode = this.root
    while (currentNode !== null) {
      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = newNode
          newNode.parent = currentNode
          break
        } else {
          currentNode = currentNode.left
        }
      } else if (value > currentNode.value) {
        if (currentNode.right === null) {
          currentNode.right = newNode
          newNode.parent = currentNode
          break
        } else {
          currentNode = currentNode.right
        }
      } else {
        return
      }
    }
    this.fixInsert(newNode)
  }

  // 插入节点后修复红黑树
  fixInsert(node) {
    while (node.parent !== null && node.parent.color === 'red') {
      if (node.parent === node.parent.parent.left) {
        const uncleNode = node.parent.parent.right
        if (uncleNode !== null && uncleNode.color === 'red') {
          node.parent.color = 'black'
          uncleNode.color = 'black'
          node.parent.parent.color = 'red'
          node = node.parent.parent
        } else {
          if (node === node.parent.right) {
            node = node.parent
            this.rotateLeft(node)
          }
          node.parent.color = 'black'
          node.parent.parent.color = 'red'
          this.rotateRight(node.parent.parent)
        }
      } else {
        const uncleNode = node.parent.parent.left
        if (uncleNode !== null && uncleNode.color === 'red') {
          node.parent.color = 'black'
          uncleNode.color = 'black'
          node.parent.parent.color = 'red'
          node = node.parent.parent
        } else {
          if (node === node.parent.left) {
            node = node.parent
            this.rotateRight(node)
          }
          node.parent.color = 'black'
          node.parent.parent.color = 'red'
          this.rotateLeft(node.parent.parent)
        }
      }
    }
    this.root.color = 'black'
  }

  // 删除节点
  delete(value) {
    let currentNode = this.root
    while (currentNode !== null) {
      if (value < currentNode.value) {
        currentNode = currentNode.left
      } else if (value > currentNode.value) {
        currentNode = currentNode.right
      } else {
        if (currentNode.left !== null && currentNode.right !== null) {
          const successorNode = this.getSuccessor(currentNode)
          currentNode.value = successorNode.value
          currentNode = successorNode
        }
        const replacementNode = currentNode.left !== null ? currentNode.left : currentNode.right
        if (replacementNode !== null) {
          replacementNode.parent = currentNode.parent
          if (currentNode.parent === null) {
            this.root = replacementNode
          } else if (currentNode === currentNode.parent.left) {
            currentNode.parent.left = replacementNode
          } else {
            currentNode.parent.right = replacementNode
          }
          if (currentNode.color === 'black') {
            this.fixDelete(replacementNode)
          }
        } else if (currentNode.parent === null) {
          this.root = null
        } else {
          if (currentNode.color === 'black') {
            this.fixDelete(currentNode)
          }
          if (currentNode.parent !== null) {
            if (currentNode === currentNode.parent.left) {
              currentNode.parent.left = null
            } else if (currentNode === currentNode.parent.right) {
              currentNode.parent.right = null
            }
            currentNode.parent = null
          }
        }
        break
      }
    }
  }

  // 获取后继节点
  getSuccessor(node) {
    let successorNode = node.right
    while (successorNode.left !== null) {
      successorNode = successorNode.left
    }
    return successorNode
  }

  // 删除节点后修复红黑树
  fixDelete(node) {
    while (node !== this.root && node.color === 'black') {
      if (node === node.parent.left) {
        let siblingNode = node.parent.right
        if (siblingNode.color === 'red') {
          siblingNode.color = 'black'
          node.parent.color = 'red'
          this.rotateLeft(node.parent)
          siblingNode = node.parent.right
        }
        if (siblingNode.left.color === 'black' && siblingNode.right.color === 'black') {
          siblingNode.color = 'red'
          node = node.parent
        } else {
          if (siblingNode.right.color === 'black') {
            siblingNode.left.color = 'black'
            siblingNode.color = 'red'
            this.rotateRight(siblingNode)
            siblingNode = node.parent.right
          }
          siblingNode.color = node.parent.color
          node.parent.color = 'black'
          siblingNode.right.color = 'black'
          this.rotateLeft(node.parent)
          node = this.root // 结束循环
        }
      } else {
        let siblingNode = node.parent.left
        if (siblingNode.color === 'red') {
          siblingNode.color = 'black'
          node.parent.color = 'red'
          this.rotateRight(node.parent)
          siblingNode = node.parent.left
        }
        if (siblingNode.right.color === 'black' && siblingNode.left.color === 'black') {
          siblingNode.color = 'red'
          node = node.parent
        } else {
          if (siblingNode.left.color === 'black') {
            siblingNode.right.color = 'black'
            siblingNode.color = 'red'
            this.rotateLeft(siblingNode)
            siblingNode = node.parent.left
          }
          siblingNode.color = node.parent.color
          node.parent.color = 'black'
          siblingNode.left.color = 'black'
          this.rotateRight(node.parent)
          node = this.root // 结束循环
        }
      }
    }
    node.color = 'black'
  }

  // 查找节点
  find(value) {
    let currentNode = this.root
    while (currentNode !== null) {
      if (value < currentNode.value) {
        currentNode = currentNode.left
      } else if (value > currentNode.value) {
        currentNode = currentNode.right
      } else {
        return true // 找到了
      }
    }
    return false // 没找到
  }

  // 打印树
  print() {
    if (this.root === null) return console.log('Empty Tree')
    const newline = new Node('\n', 'black')
    const queueArr = [this.root, newline]
    let stringTree = ''
    while (queueArr.length) {
      const treeNode = queueArr.shift()
      stringTree += `${treeNode.value.toString()} `
      if (treeNode === newline && queueArr.length) queueArr.push(newline)
      if (treeNode.left !== null) queueArr.push(treeNode.left)
      if (treeNode.right !== null) queueArr.push(treeNode.right)
    }
    console.log(stringTree.slice(0, -2).trim())
  }
}

let arr = [7, 5, 3, 9, 4, 1, 2]
let tree = new RedBlackTree()
arr.forEach((n) => tree.insert(n))
console.log(tree)
tree.delete(7)
tree.delete(5)
tree.delete(9)
tree.delete(1)
