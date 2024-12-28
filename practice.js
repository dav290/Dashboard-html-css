function testCapitalize() {
  console.assert(capitalize("hello") === "Hello", 'Test 1 Failed');
  console.assert(capitalize("world") === "World", 'Test 2 Failed');
  console.assert(capitalize("HELLO") === "HELLO", 'Test 3 Failed');
  console.assert(capitalize("") === "", 'Test 4 Failed');
  console.log("capitalize tests passed");
}
function testReverseString() {
  console.assert(reverseString("hello") === "olleh", 'Test 1 Failed');
  console.assert(reverseString("world") === "dlrow", 'Test 2 Failed');
  console.assert(reverseString("") === "", 'Test 3 Failed');
  console.assert(reverseString("a") === "a", 'Test 4 Failed');
  console.log("reverseString tests passed");
}
function testCalculator() {
  console.assert(calculator.add(1, 2) === 3, 'Test 1 Failed');
  console.assert(calculator.subtract(5, 3) === 2, 'Test 2 Failed');
  console.assert(calculator.multiply(2, 3) === 6, 'Test 3 Failed');
  console.assert(calculator.divide(6, 2) === 3, 'Test 4 Failed');
  console.assert(calculator.divide(5, 2) === 2.5, 'Test 5 Failed');
  console.assert(calculator.divide(5, 0) === Infinity, 'Test 6 Failed');
  console.log("calculator tests passed");
}
function testCaesarCipher() {
  console.assert(caesarCipher("abc", 3) === "def", 'Test 1 Failed');
  console.assert(caesarCipher("xyz", 3) === "abc", 'Test 2 Failed');
  console.assert(caesarCipher("HeLLo", 3) === "KhOOr", 'Test 3 Failed');
  console.assert(caesarCipher("Hello, World!", 3) === "Khoor, Zruog!", 'Test 4 Failed');
  console.assert(caesarCipher("A", 1) === "B", 'Test 5 Failed');
  console.assert(caesarCipher("Z", 1) === "A", 'Test 6 Failed');
  console.assert(caesarCipher("Hello, World!", -3) === "Ebiiu, Tloia!", 'Test 7 Failed');
  console.log("caesarCipher tests passed");
}
function testAnalyzeArray() {
  const result1 = analyzeArray([1, 2, 3, 4, 5]);
  console.assert(result1.average === 3, 'Test 1 Failed');
  console.assert(result1.min === 1, 'Test 2 Failed');
  console.assert(result1.max === 5, 'Test 3 Failed');
  console.assert(result1.length === 5, 'Test 4 Failed');

  const result2 = analyzeArray([10, 20, 30]);
  console.assert(result2.average === 20, 'Test 5 Failed');
  console.assert(result2.min === 10, 'Test 6 Failed');
  console.assert(result2.max === 30, 'Test 7 Failed');
  console.assert(result2.length === 3, 'Test 8 Failed');

  console.log("analyzeArray tests passed");
}
