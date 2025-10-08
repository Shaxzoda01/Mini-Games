const board = document.getElementById("board");
const scoreDisplay = document.getElementById("score");

// 2. Kataklarni yaratish
let cells = [];
for (let i = 0; i < 400; i++) {
  const div = document.createElement("div");
  div.classList.add("cell");
  board.appendChild(div);
  cells.push(div);
}

// 3. Boshlang‘ich qiymatlar
let snake = [42, 41, 40];
let food = 60;
let direction = "right";
let score = 0;

// 4. Ekranga chiqarish funksiyasi
function draw() {
  for (let i = 0; i < 400; i++) {
    cells[i].className = "cell";
  }

  for (let i = 0; i < snake.length; i++) {
    cells[snake[i]].classList.add("snake");
  }

  cells[food].classList.add("food");
  scoreDisplay.textContent = "Score: " + score;
}

// 5. Ilonni harakatlantirish
function move() {
  let head = snake[0];

  if (direction === "right") head = head + 1;
  if (direction === "left") head = head - 1;
  if (direction === "up") head = head - 20;
  if (direction === "down") head = head + 20;

  // devorga urilsa
  if (head < 0 || head >= 400 || snake.includes(head)) {
    alert("Game Over!");
    clearInterval(game); // o‘yinni to‘xtatadi
    return;
  }

  snake.unshift(head);

  if (head === food) {
    score++;
    food = Math.floor(Math.random() * 400);
  } else {
    snake.pop();
  }

  draw();
}

document.addEventListener("keydown", (e) => {
  const keys = {
    w: "up",
    s: "down",
    a: "left",
    d: "right",
  };

  const newDir = keys[e.key];
  if (!newDir) return; // boshqa tugma bosilsa e'tibor berma

  // teskari tomonga burilishni oldini olish
  const opposite = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  };

  if (newDir !== opposite[direction]) {
    direction = newDir;
  }
});

// 7. Har 200ms da ilonni yurdirish (avtomatik)
let game = setInterval(move, 200);

// Boshlanishda chizish
draw();
