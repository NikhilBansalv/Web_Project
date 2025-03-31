// ---------------- Navigation ----------------
document.querySelectorAll('#menu button').forEach(btn => {
    btn.addEventListener('click', () => {
      const gameId = btn.getAttribute('data-game');
      document.getElementById('menu').classList.add('hidden');
      document.getElementById(gameId).classList.remove('hidden');
      if(gameId === 'snakeGame') {
        startSnake();
      }
    });
  });
  
  document.querySelectorAll('.back').forEach(btn => {
    btn.addEventListener('click', () => {
      // For Snake, clear the game loop interval if running
      if (snakeInterval) {
        clearInterval(snakeInterval);
      }
      document.querySelectorAll('.game-section').forEach(section => {
        section.classList.add('hidden');
      });
      document.getElementById('menu').classList.remove('hidden');
    });
  });
  
  // ---------------- Rock Paper Scissors ----------------
  const rpsResult = document.getElementById('rpsResult');
  document.querySelectorAll('#rpsGame .rps-buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
      const userChoice = btn.getAttribute('data-choice');
      const choices = ['rock', 'paper', 'scissors'];
      const computerChoice = choices[Math.floor(Math.random() * 3)];
      let result = '';
      if(userChoice === computerChoice) {
        result = "It's a tie!";
      } else if(
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
      ) {
        result = "You win!";
      } else {
        result = "You lose!";
      }
      rpsResult.innerHTML = `You chose <strong>${userChoice}</strong>, computer chose <strong>${computerChoice}</strong>.<br>${result}`;
    });
  });
  
  // ---------------- Tic Tac Toe ----------------
  const ticTacToeBoard = document.getElementById('ticTacToeBoard');
  const ticTacToeResult = document.getElementById('ticTacToeResult');
  const ticTacToeReset = document.getElementById('ticTacToeReset');
  let ticTacToeState = Array(9).fill('');
  let currentPlayer = 'X';
  let gameActive = true;
  
  function checkWin() {
    const winConditions = [
      [0,1,2], [3,4,5], [6,7,8],  // rows
      [0,3,6], [1,4,7], [2,5,8],  // columns
      [0,4,8], [2,4,6]            // diagonals
    ];
    for(const condition of winConditions) {
      const [a, b, c] = condition;
      if(ticTacToeState[a] && ticTacToeState[a] === ticTacToeState[b] && ticTacToeState[a] === ticTacToeState[c]) {
        return ticTacToeState[a];
      }
    }
    return ticTacToeState.includes('') ? null : 'draw';
  }
  
  function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    if(ticTacToeState[index] !== '' || !gameActive) return;
    ticTacToeState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    const winner = checkWin();
    if(winner) {
      gameActive = false;
      ticTacToeResult.textContent = winner === 'draw' ? "It's a draw!" : `${winner} wins!`;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      ticTacToeResult.textContent = `It's ${currentPlayer}'s turn`;
    }
  }
  
  ticTacToeBoard.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });
  
  ticTacToeReset.addEventListener('click', () => {
    ticTacToeState = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    ticTacToeResult.textContent = `It's ${currentPlayer}'s turn`;
    ticTacToeBoard.querySelectorAll('.cell').forEach(cell => {
      cell.textContent = '';
    });
  });
  
  // ---------------- Snake ----------------
  const snakeCanvas = document.getElementById('snakeCanvas');
  const snakeCtx = snakeCanvas.getContext('2d');
  const snakeScoreEl = document.getElementById('snakeScore');
  const snakeRestart = document.getElementById('snakeRestart');
  
  let snakeInterval;
  let snake;
  let snakeDirection;
  let snakeFood;
  let snakeScore;
  const snakeGridSize = 20;
  const snakeCanvasSize = snakeCanvas.width; // assuming square canvas
  
  function startSnake() {
    snake = [{x: 5, y: 5}];
    snakeDirection = {x: 1, y: 0};
    snakeScore = 0;
    generateSnakeFood();
    if (snakeInterval) clearInterval(snakeInterval);
    snakeInterval = setInterval(updateSnake, 100);
    snakeScoreEl.textContent = `Score: ${snakeScore}`;
  }
  
  function updateSnake() {
    // Compute new head
    const newHead = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };
    
    // Collision with walls or self
    if(newHead.x < 0 || newHead.x >= snakeCanvasSize/snakeGridSize ||
       newHead.y < 0 || newHead.y >= snakeCanvasSize/snakeGridSize ||
       snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
      clearInterval(snakeInterval);
      alert('Game Over!');
      return;
    }
    snake.unshift(newHead);
    
    // Check for food
    if(newHead.x === snakeFood.x && newHead.y === snakeFood.y) {
      snakeScore++;
      snakeScoreEl.textContent = `Score: ${snakeScore}`;
      generateSnakeFood();
    } else {
      snake.pop();
    }
    drawSnake();
  }
  
  function drawSnake() {
    // Clear canvas
    snakeCtx.fillStyle = '#000';
    snakeCtx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    
    // Draw snake
    snake.forEach(segment => {
      snakeCtx.fillStyle = '#2ecc71';
      snakeCtx.fillRect(segment.x * snakeGridSize, segment.y * snakeGridSize, snakeGridSize - 2, snakeGridSize - 2);
    });
    
    // Draw food
    snakeCtx.fillStyle = '#e74c3c';
    snakeCtx.fillRect(snakeFood.x * snakeGridSize, snakeFood.y * snakeGridSize, snakeGridSize - 2, snakeGridSize - 2);
  }
  
  function generateSnakeFood() {
    const cols = snakeCanvasSize / snakeGridSize;
    const rows = snakeCanvasSize / snakeGridSize;
    snakeFood = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows)
    };
    // Ensure food is not on the snake
    if(snake.some(segment => segment.x === snakeFood.x && segment.y === snakeFood.y)) {
      generateSnakeFood();
    }
  }
  
  function changeSnakeDirection(e) {
    switch(e.key) {
      case 'ArrowUp':
        if(snakeDirection.y !== 1) snakeDirection = {x: 0, y: -1};
        break;
      case 'ArrowDown':
        if(snakeDirection.y !== -1) snakeDirection = {x: 0, y: 1};
        break;
      case 'ArrowLeft':
        if(snakeDirection.x !== 1) snakeDirection = {x: -1, y: 0};
        break;
      case 'ArrowRight':
        if(snakeDirection.x !== -1) snakeDirection = {x: 1, y: 0};
        break;
    }
  }
  
  document.addEventListener('keydown', changeSnakeDirection);
  
  snakeRestart.addEventListener('click', () => {
    if(snakeInterval) clearInterval(snakeInterval);
    startSnake();
  });
  