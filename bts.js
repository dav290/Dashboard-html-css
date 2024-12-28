class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // Helper method to build a balanced BST
  buildTree(array) {
    // Remove duplicates and sort the array
    const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);
    return this.buildBalancedTreeFromArray(uniqueSortedArray);
  }

  buildBalancedTreeFromArray(array) {
    if (array.length === 0) return null;

    const midIndex = Math.floor(array.length / 2);
    const rootNode = new Node(array[midIndex]);

    rootNode.left = this.buildBalancedTreeFromArray(array.slice(0, midIndex));
    rootNode.right = this.buildBalancedTreeFromArray(array.slice(midIndex + 1));

    return rootNode;
  }

  // Insert a new value in the BST
  insert(value) {
    const insertNode = (node, value) => {
      if (value < node.data) {
        if (node.left) {
          insertNode(node.left, value);
        } else {
          node.left = new Node(value);
        }
      } else {
        if (node.right) {
          insertNode(node.right, value);
        } else {
          node.right = new Node(value);
        }
      }
    };

    insertNode(this.root, value);
  }

  // Delete a value from the BST
  deleteItem(value) {
    const deleteNode = (node, value) => {
      if (!node) return null;

      if (value < node.data) {
        node.left = deleteNode(node.left, value);
      } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
      } else {
        // Node to delete found
        if (!node.left && !node.right) {
          return null; // Leaf node
        } else if (!node.left) {
          return node.right; // Only right child
        } else if (!node.right) {
          return node.left; // Only left child
        } else {
          // Both children exist
          let minNode = this._findMin(node.right);
          node.data = minNode.data;
          node.right = deleteNode(node.right, minNode.data);
        }
      }
      return node;
    };

    this.root = deleteNode(this.root, value);
  }

  // Find the minimum node in a subtree
  _findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  // Find a value in the BST
  find(value) {
    const findNode = (node, value) => {
      if (!node || node.data === value) {
        return node;
      }

      if (value < node.data) {
        return findNode(node.left, value);
      } else {
        return findNode(node.right, value);
      }
    };

    return findNode(this.root, value);
  }

  // Level order traversal (breadth-first)
  levelOrder(callback) {
    if (!callback) throw new Error("Callback function is required");

    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      callback(currentNode);

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
  }

  // In-order traversal (left, root, right)
  inOrder(callback) {
    if (!callback) throw new Error("Callback function is required");

    const inOrderTraversal = (node) => {
      if (!node) return;

      inOrderTraversal(node.left);
      callback(node);
      inOrderTraversal(node.right);
    };

    inOrderTraversal(this.root);
  }

  // Pre-order traversal (root, left, right)
  preOrder(callback) {
    if (!callback) throw new Error("Callback function is required");

    const preOrderTraversal = (node) => {
      if (!node) return;

      callback(node);
      preOrderTraversal(node.left);
      preOrderTraversal(node.right);
    };

    preOrderTraversal(this.root);
  }

  // Post-order traversal (left, right, root)
  postOrder(callback) {
    if (!callback) throw new Error("Callback function is required");

    const postOrderTraversal = (node) => {
      if (!node) return;

      postOrderTraversal(node.left);
      postOrderTraversal(node.right);
      callback(node);
    };

    postOrderTraversal(this.root);
  }

  // Calculate the height of a node
  height(node) {
    if (!node) return -1;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  // Calculate the depth of a node
  depth(node) {
    let depth = 0;
    let currentNode = this.root;

    while (currentNode !== node) {
      if (node.data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      depth++;
    }

    return depth;
  }

  // Check if the tree is balanced
  isBalanced() {
    const checkBalance = (node) => {
      if (!node) return true;

      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);

      return Math.abs(leftHeight - rightHeight) <= 1 && checkBalance(node.left) && checkBalance(node.right);
    };

    return checkBalance(this.root);
  }

  // Rebalance the tree
  rebalance() {
    const inOrderArray = [];
    this.inOrder((node) => inOrderArray.push(node.data));

    this.root = this.buildTree(inOrderArray);
  }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
// Driver script
const randomArray = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
console.log("Initial Random Array:", randomArray);

const tree = new Tree(randomArray);
console.log("Is Tree Balanced?", tree.isBalanced());
console.log("Level Order Traversal:");
tree.levelOrder(node => console.log(node.data));

console.log("In-Order Traversal:");
tree.inOrder(node => console.log(node.data));

console.log("Pre-Order Traversal:");
tree.preOrder(node => console.log(node.data));

console.log("Post-Order Traversal:");
tree.postOrder(node => console.log(node.data));

console.log("Adding values > 100 to unbalance the tree:");
tree.insert(150);
tree.insert(200);
tree.insert(250);
console.log("Is Tree Balanced?", tree.isBalanced());

console.log("Rebalancing the Tree:");
tree.rebalance();
console.log("Is Tree Balanced?", tree.isBalanced());

console.log("Level Order Traversal After Rebalancing:");
tree.levelOrder(node => console.log(node.data));
