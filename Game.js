class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
class Gameboard {
  constructor() {
    this.board = Array(10).fill().map(() => Array(10).fill(null));  // 10x10 grid
    this.ships = [];
    this.missedShots = [];
  }

  placeShip(ship, x, y, orientation) {
    if (orientation === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][y + i] !== null) {
          return false; // Prevent overlapping
        }
        this.board[x][y + i] = ship;
      }
    } else if (orientation === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x + i][y] !== null) {
          return false; // Prevent overlapping
        }
        this.board[x + i][y] = ship;
      }
    }
    this.ships.push(ship);
    return true;
  }

  receiveAttack(x, y) {
    if (this.board[x][y] !== null) {
      this.board[x][y].hit();
      return true; // Hit
    } else {
      this.missedShots.push([x, y]);
      return false; // Miss
    }
  }

  allShipsSunk() {
    return this.ships.every(ship => ship.isSunk());
  }
}
class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  attack(enemy, x, y) {
    return enemy.gameboard.receiveAttack(x, y);
  }
}
function startGame() {
  const player = new Player('Player');
  const computer = new ComputerPlayer();

  // Example ship placement
  const playerShip = new Ship(3);  // Create a ship with length 3
  player.gameboard.placeShip(playerShip, 0, 0, 'horizontal');  // Place ship on player's board
  
  const computerShip = new Ship(3);  // Create a ship with length 3
  computer.gameboard.placeShip(computerShip, 2, 2, 'vertical');  // Place ship on computer's board

  // Simulate turns
  let turn = 0;
  while (!player.gameboard.allShipsSunk() && !computer.gameboard.allShipsSunk()) {
    if (turn % 2 === 0) {
      // Player's turn
      console.log("Player's turn");
      // Simulate a player attack
      player.attack(computer, 2, 2); // Example attack
    } else {
      // Computer's turn
      console.log("Computer's turn");
      computer.randomAttack(player);
    }
    
    turn++;
  }

  if (player.gameboard.allShipsSunk()) {
    console.log("Computer wins!");
  } else {
    console.log("Player wins!");
  }
}
