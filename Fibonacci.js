// Fibonacci Sequence Functions

// Iterative Fibonacci
function fibs(n) {
    const result = [0, 1];
    for (let i = 2; i < n; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }
    return n === 1 ? [0] : result;
}

// Recursive Fibonacci
function fibsRec(n) {
    console.log("This was printed recursively");
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    const prev = fibsRec(n - 1);
    return [...prev, prev[prev.length - 1] + prev[prev.length - 2]];
}

// Merge Sort Function
function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return [...result, ...left.slice(i), ...right.slice(j)];
}

// Testing the Functions
console.log("Iterative Fibonacci:", fibs(8));
console.log("Recursive Fibonacci:", fibsRec(8));
console.log("Merge Sort:", mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
