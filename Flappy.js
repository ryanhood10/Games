const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let bird = new Image();
let bg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = "C:\\RockPaperS\\bird.png";
bg.src = "C:\\RockPaperS\\bg.png";
pipeNorth.src = "C:\\RockPaperS\\pipeNorth.jpg";
pipeSouth.src = "C:\\RockPaperS\\pipeSouth.webp";

let gap = 85;
let constant = pipeNorth.height + gap;

let birdX = 10;
let birdY = 150;
let gravity = 1.5;

let score = 0;

document.addEventListener("keydown", moveUp);

function moveUp() {
    birdY -= 25;
}

let pipe = [];
pipe[0] = {
    x: canvas.width,
    y: 0
};

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        if (birdX + bird.width / 2 >= pipe[i].x && birdX <= pipe[i].x + pipeNorth.width && (birdY <= pipe[i].y + pipeNorth.height || birdY + bird.height / 2 >= pipe[i].y + constant) || birdY + bird.height / 2 >= canvas.height) {
            location.reload();
        }

        if (pipe[i].x == 5) {
            score++;
        }
    }

    ctx.drawImage(bird, birdX, birdY, bird.width / 2, bird.height / 2);

    birdY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + score, 10, canvas.height - 20);

    requestAnimationFrame(draw);
}

draw();
