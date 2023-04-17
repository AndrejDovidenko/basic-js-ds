const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
// const nodeList = new Node();
class BinarySearchTree {
  constructor() {
    this.rootTree = null;
  }
  root() {
    if (this.rootTree == null) {
      return null;
    }
    console.log(this.rootTree);
    return this.rootTree;
  }

  add(data) {
    const empty = (node, value) => {
      if (node === null) {
        return new Node(value);
      } else if (node.data < data) {
        node.right = empty(node.right, value);
      } else {
        node.left = empty(node.left, value);
      }
      return node;
    };
    this.rootTree = empty(this.rootTree, data);
  }

  has(data) {
    const check = (node, value) => {
      if (!node) {
        return false;
      }

      if (node.data === value) {
        return true;
      }

      if (node.data < value) {
        return check(node.right, value);
      }

      if (node.data > value) {
        return check(node.left, value);
      }
    };

    return check(this.rootTree, data);
  }

  find(data) {
    const empty = (node, value) => {
      console.log(node.data, value);

      if (node.data === value) {
        return node;
      }

      if (node.data < value) {
        if (node.right !== null) {
          return empty(node.right, value);
        }
      }

      if (node.data > value) {
        if (node.left !== null) {
          return empty(node.left, value);
        }
      }

      return null;
    };

    return empty(this.rootTree, data);
  }

  remove(data) {
    const removeNode = (node, value) => {
      if (!node) {
        return null;
      }

      if (node.data < value) {
        node.right = removeNode(node.right, value);
        return node;
      }

      if (node.data > value) {
        node.left = removeNode(node.left, value);
        return node;
      }

      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        node = node.right;
        return node;
      }
      if (!node.right) {
        node = node.left;
        return node;
      }

      let minFormRight = node.right;
      while (minFormRight.left) {
        minFormRight = minFormRight.left;
      }

      node.data = minFormRight.data;
      node.right = removeNode(node.right, minFormRight.data);
      return node;
    };

    return removeNode(this.rootTree, data);
  }

  min() {
    if (!this.rootTree) {
      return;
    }

    let node = this.rootTree;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.rootTree) {
      return;
    }

    let node = this.rootTree;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
