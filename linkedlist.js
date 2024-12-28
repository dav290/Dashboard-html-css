// Node class
class Node {
  constructor(value) {
    this.value = value || null;
    this.nextNode = null;
  }
}

// LinkedList class
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Append a new node to the end of the list
  append(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // Prepend a new node to the start of the list
  prepend(value) {
    const newNode = new Node(value);
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  // Return the total number of nodes
  size() {
    return this.size;
  }

  // Return the first node
  head() {
    return this.head;
  }

  // Return the last node
  tail() {
    return this.tail;
  }

  // Return the node at the given index
  at(index) {
    if (index < 0 || index >= this.size) return null;
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.nextNode;
    }
    return currentNode;
  }

  // Pop the last element
  pop() {
    if (this.size === 0) return null;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let currentNode = this.head;
      while (currentNode.nextNode !== this.tail) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = null;
      this.tail = currentNode;
    }
    this.size--;
  }

  // Check if a value exists in the list
  contains(value) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) return true;
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  // Find the index of a node by its value
  find(value) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (currentNode.value === value) return index;
      currentNode = currentNode.nextNode;
      index++;
    }
    return null;
  }

  // Represent the linked list as a string
  toString() {
    let currentNode = this.head;
    let result = '';
    while (currentNode) {
      result += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }
    result += 'null';
    return result;
  }

  // Insert a node at a specific index
  insertAt(value, index) {
    if (index < 0 || index > this.size) return;
    if (index === 0) {
      this.prepend(value);
      return;
    }
    if (index === this.size) {
      this.append(value);
      return;
    }
    const newNode = new Node(value);
    let currentNode = this.head;
    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode.nextNode;
    }
    newNode.nextNode = currentNode.nextNode;
    currentNode.nextNode = newNode;
    this.size++;
  }

  // Remove a node at a specific index
  removeAt(index) {
    if (index < 0 || index >= this.size) return;
    if (index === 0) {
      this.head = this.head.nextNode;
      if (this.size === 1) this.tail = null;
    } else {
      let currentNode = this.head;
      for (let i = 0; i < index - 1; i++) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = currentNode.nextNode.nextNode;
      if (index === this.size - 1) this.tail = currentNode;
    }
    this.size--;
  }
}

// Create and test the LinkedList
const list = new LinkedList();
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());
