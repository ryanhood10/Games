
const canvas = document.getElementById('gameCanvasD');
const ctx = canvas.getContext('2d');

// Game objects
const player = { x: 10, y: 552, width: 30, height: 30, speed: 10, dy: 0, jumping: false };
const gravity = 1;
const platforms = [
    { x: 0, y: 560, width: 60, height: 20 },
    { x: 60, y: 480, width: 150, height: 20 },
    { x: 210, y: 480, width: 150, height: 20 },
    { x: 120, y: 400, width: 150, height: 20 },
    { x: 270, y: 400, width: 150, height: 20 },
    { x: 60, y: 320, width: 150, height: 20 },
    { x: 210, y: 320, width: 150, height: 20 },
  ];
  
const star = { x: 400, y: 280, width: 30, height: 30 };

// Draw game objects
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  ctx.fillStyle = 'brown';
  platforms.forEach(platform => {
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });

  ctx.fillStyle = 'gold';
  ctx.beginPath();
  ctx.moveTo(star.x + star.width / 2, star.y);
  ctx.lineTo(star.x, star.y + star.height);
  ctx.lineTo(star.x + star.width, star.y + star.height);
  ctx.closePath();
  ctx.fill();
}


// Update game objects
function update() {
    // Always apply gravity
    player.dy = Math.min(player.dy + gravity, 10);
    player.y += player.dy;
  
    // Check for ground collision
    if (player.y > canvas.height - player.height) {
      player.y = canvas.height - player.height;
      player.jumping = false;
    }
  
    // Check for platform collision
    platforms.forEach(platform => {
      if (
        player.y + player.height >= platform.y &&
        player.y + player.height <= platform.y + platform.height &&
        player.x + player.width >= platform.x &&
        player.x <= platform.x + platform.width &&
        player.dy > 0
      ) {
        player.y = platform.y - player.height;
        player.jumping = false;
      }
    });
    if (checkWinCondition()) {
        showWinMessage();
      }
  }
  //check to see if player has reached the star
  function checkWinCondition() {
    if (
      player.x < star.x + star.width &&
      player.x + player.width > star.x &&
      player.y < star.y + star.height &&
      player.y + player.height > star.y
    ) {
      return true;
    }
    return false;
  }
  function showWinMessage() {
    const winMessage = "Good job! You made it to the flag! You have unlocked the next game";
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(winMessage, 50, 50);
  
    const button = document.createElement("button");
    button.innerHTML = "Click me";
    button.style.position = "absolute";
    button.style.left = "50%";
    button.style.top = "100px";
    button.style.transform = "translateX(-50%)";
    button.onclick = function () {
      window.location.href = "game6.html";
    };
    document.body.appendChild(button);
  }
  
  

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
      player.x -= player.speed;
    } else if (e.code === 'ArrowRight') {
      player.x += player.speed;
    } else if (e.code === 'Space' && !player.jumping) {
      player.jumping = true;
      player.dy = -20; // Updated value for jump height
    }
  });
