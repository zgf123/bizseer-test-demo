class Node {
  constructor(key) {
    this.key = key
    this.color = 'red'
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
    const newNode = new Node(key)
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
        return // key值相同时不插入
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
          // 如果没有子节点，并且是根节点
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
    // 补上来的节点是黑色
    while (node !== this.root && node.color === 'black') {
      // 情形A：删除的黑色节点在左边
      if (node === node.parent.left) {
        // 从右边兄弟那里借调黑色节点
        let brother = node.parent.right
        // 情形A1：兄弟是红色节点，需要把兄弟变色然后旋转
        if (brother.color === 'red') {
          brother.color = 'black'
          node.parent.color = 'red'
          this.rotateRR(node.parent)
          brother = node.parent.right
        }
        // 情形A2：兄弟节点是黑色节点
        // 1.兄弟的左右孩子都是黑色，只需要把兄弟节点变成红色
        if (this.isBlack(brother.left) && this.isBlack(brother.right)) {
          brother.color = 'red'
          node = node.parent
        } else {
          // 2.兄弟的右孩子是黑色
          if (this.isBlack(brother.right)) {
            brother.left.color = 'black'
            brother.color = 'red'
            this.rotateLL(brother)
            brother = node.parent.right
          }
          // 3.兄弟的右孩子是红色
          brother.color = node.parent.color
          node.parent.color = 'black'
          brother.right.color = 'black'
          this.rotateRR(node.parent)
          node = this.root // 结束循环
        }
      } else {
        // 情形B：删除的黑色节点在右边
        // 从左边兄弟那里借调黑色节点
        let brother = node.parent.left
        // 情形B1：兄弟是红色节点，需要把兄弟变色然后旋转
        if (brother.color === 'red') {
          brother.color = 'black'
          node.parent.color = 'red'
          this.rotateLL(node.parent)
          brother = node.parent.left
        }
        // 情形B2：兄弟节点是黑色节点
        // 1.兄弟的左右孩子都是黑色，只需要把兄弟节点变成红色
        if (this.isBlack(brother.left) && this.isBlack(brother.right)) {
          brother.color = 'red'
          node = node.parent
        } else {
          // 2.兄弟的左孩子是黑色
          if (this.isBlack(brother.left)) {
            brother.right.color = 'black'
            brother.color = 'red'
            this.rotateRR(brother)
            brother = node.parent.left
          }
          // 2.兄弟的左孩子是红色
          brother.color = node.parent.color
          node.parent.color = 'black'
          brother.left.color = 'black'
          this.rotateLL(node.parent)
          node = this.root // 结束循环
        }
      }
    }
    // 节点是红色，直接变黑色
    node.color = 'black'
  }
  isBlack(node) {
    return node ? node.color === 'black' : true
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
    const arr = [this.root, '']
    let str = ''
    while (arr.length) {
      const curNode = arr.shift()
      str += curNode.key ? `${curNode.key}${curNode.color} ` : '\n'
      if (curNode?.left) arr.push(curNode.left)
      if (curNode?.right) arr.push(curNode.right)
      if (curNode === '' && arr.length) arr.push('')
    }
    console.log(str)
  }
}

let arr = [7, 5, 3, 9, 4, 1, 2]
let tree = new RedBlackTree()
arr.forEach((n) => tree.insert(n))
tree.print()
// tree.delete(7)
// tree.print()
// tree.delete(5)
// tree.print()
// tree.delete(9)
// tree.print()
