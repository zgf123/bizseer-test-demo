class Node {
  constructor(key, color) {
    this.key = key
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
  rotateRR(node) {
    let temp = node.right
    node.right = temp.left
    if (temp.left) temp.left.parent = node
    temp.parent = node.parent
    if (node === node.parent?.left) {
      node.parent.left = temp
    } else if (node === node.parent?.right) {
      node.parent.right = temp
    } else {
      this.root = temp
    }
    temp.left = node
    node.parent = temp
  }
  // 右旋
  rotateLL(node) {
    const temp = node.left
    node.left = temp.right
    if (temp.right) temp.right.parent = node
    temp.parent = node.parent
    if (node === node.parent?.right) {
      node.parent.right = temp
    } else if (node === node.parent?.left) {
      node.parent.left = temp
    } else {
      this.root = temp
    }
    temp.right = node
    node.parent = temp
  }

  // 插入节点
  insert(key) {
    const newNode = new Node(key, 'red')
    if (!this.root) {
      this.root = newNode
      newNode.color = 'black'
      return
    }
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
        return // 值相同时不插入
      }
    }
    this.fixInsert(newNode)
  }
  // 插入节点后修复红黑树
  fixInsert(node) {
    while (node.parent?.color === 'red') {
      // 隐藏条件: node.color一定是red,grandparent一定有值
      if (node.parent === node.parent.parent.left) {
        // 情形 A：父节点是左侧子节点
        const uncleNode = node.parent.parent.right
        if (uncleNode?.color === 'red') {
          // 情形 1A：叔节点也是红色——只需要重新填色
          node.parent.color = 'black'
          uncleNode.color = 'black'
          node.parent.parent.color = 'red'
          node = node.parent.parent
        } else {
          // 情形 2A：节点是右侧子节点——左旋转
          if (node === node.parent.right) {
            node = node.parent
            this.rotateRR(node)
          }
          // 情形 3A：节点是左侧子节点——右旋转
          node.parent.color = 'black'
          node.parent.parent.color = 'red'
          this.rotateLL(node.parent.parent)
        }
      } else {
        // 情形 B：父节点是右侧子节点
        const uncleNode = node.parent.parent.left
        if (uncleNode?.color === 'red') {
          // 情形 1B：叔节点是红色——只需要重新填色
          node.parent.color = 'black'
          uncleNode.color = 'black'
          node.parent.parent.color = 'red'
          node = node.parent.parent
        } else {
          if (node === node.parent.left) {
            // 情形 2B：节点是左侧子节点——右旋转
            node = node.parent
            this.rotateLL(node)
          }
          // 情形 3B：节点是右侧子节点——左旋转
          node.parent.color = 'black'
          node.parent.parent.color = 'red'
          this.rotateRR(node.parent.parent)
        }
      }
    }
    this.root.color = 'black'
  }

  // 删除节点
  delete(key) {
    let curNode = this.root
    while (curNode) {
      if (key < curNode.key) {
        curNode = curNode.left
      } else if (key > curNode.key) {
        curNode = curNode.right
      } else {
        if (curNode.left && curNode.right) {
          let min = curNode.right
          while (min.left) min = min.left // 找到当前右子节点的最小节点
          curNode.key = min.key // 替换当代节点的key
          curNode = min // 修改当前节点的引用
        }
        const subNode = curNode.left || curNode.right
        if (subNode) {
          // 如果有子节点，建立父节点和子节点的链接
          subNode.parent = curNode.parent
          if (!curNode.parent) {
            this.root = subNode
          } else if (curNode === curNode.parent.left) {
            curNode.parent.left = subNode
          } else {
            curNode.parent.right = subNode
          }
          // 如果当前节点是黑色节点，被删除后失去平衡，需要重新平衡
          if (curNode.color === 'black') this.fixDelete(subNode)
        } else if (!curNode.parent) {
          // 如果没有子节点，并且是跟节点
          this.root = null
        } else {
          // 如果没有子节点
          // 如果当前节点是黑色节点，被删除后失去平衡，需要重新平衡
          if (curNode.color === 'black') this.fixDelete(curNode)
          if (curNode.parent) {
            // 建立父子节点链接
            if (curNode === curNode.parent.left) {
              curNode.parent.left = null
            } else if (curNode === curNode.parent.right) {
              curNode.parent.right = null
            }
            curNode.parent = null
          }
        }
        break
      }
    }
  }
  // 删除节点后修复红黑树
  fixDelete(node) {
    while (node !== this.root && node.color === 'black') {
      if (node === node.parent.left) {
        let siblingNode = node.parent.right
        if (siblingNode.color === 'red') {
          siblingNode.color = 'black'
          node.parent.color = 'red'
          this.rotateRR(node.parent)
          siblingNode = node.parent.right
        }
        if (siblingNode.left.color === 'black' && siblingNode.right.color === 'black') {
          siblingNode.color = 'red'
          node = node.parent
        } else {
          if (siblingNode.right.color === 'black') {
            siblingNode.left.color = 'black'
            siblingNode.color = 'red'
            this.rotateLL(siblingNode)
            siblingNode = node.parent.right
          }
          siblingNode.color = node.parent.color
          node.parent.color = 'black'
          siblingNode.right.color = 'black'
          this.rotateRR(node.parent)
          node = this.root // 结束循环
        }
      } else {
        let siblingNode = node.parent.left
        if (siblingNode.color === 'red') {
          siblingNode.color = 'black'
          node.parent.color = 'red'
          this.rotateLL(node.parent)
          siblingNode = node.parent.left
        }
        if (siblingNode.right.color === 'black' && siblingNode.left.color === 'black') {
          siblingNode.color = 'red'
          node = node.parent
        } else {
          if (siblingNode.left.color === 'black') {
            siblingNode.right.color = 'black'
            siblingNode.color = 'red'
            this.rotateRR(siblingNode)
            siblingNode = node.parent.left
          }
          siblingNode.color = node.parent.color
          node.parent.color = 'black'
          siblingNode.left.color = 'black'
          this.rotateLL(node.parent)
          node = this.root // 结束循环
        }
      }
    }
    node.color = 'black'
  }

  // 查找节点
  find(key) {
    let curNode = this.root
    while (curNode !== null) {
      if (key < curNode.key) {
        curNode = curNode.left
      } else if (key > curNode.key) {
        curNode = curNode.right
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
      stringTree += `${treeNode.key.toString()} `
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
