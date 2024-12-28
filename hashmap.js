class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
  }

  // Hash function to calculate the index
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  // Resize the hash map when load factor is exceeded
  resize() {
    const newCapacity = this.capacity * 2;
    const newBuckets = new Array(newCapacity).fill(null).map(() => []);
    
    for (const bucket of this.buckets) {
      for (const [key, value] of bucket) {
        const index = this.hash(key) % newCapacity;
        newBuckets[index].push([key, value]);
      }
    }
    
    this.capacity = newCapacity;
    this.buckets = newBuckets;
  }

  // Add or update a key-value pair
  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Overwrite if key exists
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    // Resize if load factor exceeds
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  // Retrieve value by key
  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const [storedKey, value] of bucket) {
      if (storedKey === key) {
        return value;
      }
    }

    return null;
  }

  // Check if key exists
  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const [storedKey] of bucket) {
      if (storedKey === key) {
        return true;
      }
    }

    return false;
  }

  // Remove key-value pair
  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1); // Remove the key-value pair
        this.size--;
        return true;
      }
    }

    return false;
  }

  // Get the number of entries
  length() {
    return this.size;
  }

  // Clear all entries
  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  // Get all keys
  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      for (const [key] of bucket) {
        keys.push(key);
      }
    }
    return keys;
  }

  // Get all values
  values() {
    const values = [];
    for (const bucket of this.buckets) {
      for (const [, value] of bucket) {
        values.push(value);
      }
    }
    return values;
  }

  // Get all key-value pairs
  entries() {
    const entries = [];
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entries.push(entry);
      }
    }
    return entries;
  }
}

// Test the HashMap class
const test = new HashMap();

// Set key-value pairs
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Check size and get all keys/values
console.log('Size:', test.length()); // Should return 12
console.log('Keys:', test.keys()); // Array of all keys
console.log('Values:', test.values()); // Array of all values

// Overwrite a few nodes
test.set('apple', 'green');
test.set('banana', 'green');

console.log('Size after overwrite:', test.length()); // Should still return 12

// Add a new entry to trigger resizing
test.set('moon', 'silver'); // Resizing should happen

console.log('Size after resize:', test.length()); // Should now be 13
console.log('Capacity after resize:', test.capacity); // Should now be double

// Get a value
console.log('Apple:', test.get('apple')); // Should return 'green'

// Remove a key-value pair
console.log('Remove moon:', test.remove('moon')); // Should return true
console.log('Size after removal:', test.length()); // Should now be 12

// Clear all entries
test.clear();
console.log('Size after clear:', test.length()); // Should return 0
