function knightMoves(start, end) {
  // Directions the knight can move
  const directions = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ];
  
  // Helper function to check if a position is valid on the chessboard
  function isValid([x, y]) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }

  // BFS to find the shortest path
  function bfs(start, end) {
    const queue = [[start]];
    const visited = new Set();
    visited.add(start.toString()); // Mark the start as visited

    while (queue.length > 0) {
      const path = queue.shift();
      const [x, y] = path[path.length - 1]; // Get the current position

      // If we've reached the end, return the path
      if (x === end[0] && y === end[1]) {
        return path;
      }

      // Generate all valid knight moves
      for (const [dx, dy] of directions) {
        const nextPos = [x + dx, y + dy];
        if (isValid(nextPos) && !visited.has(nextPos.toString())) {
          visited.add(nextPos.toString());
          queue.push([...path, nextPos]);
        }
      }
    }
  }

  // Start the BFS to find the shortest path
  const path = bfs(start, end);

  // If no path found (this should not happen on a standard 8x8 chessboard)
  if (!path) {
    console.log('No path found.');
  } else {
    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach(p => console.log(p));
  }
}

// Example usage:
knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
knightMoves([0, 0], [7, 7]);
