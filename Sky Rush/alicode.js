var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var planeWidth = 200;
var planeHeight = 200;

var planeX = canvas.width / 2 - planeWidth / 2;
var planeY = canvas.height - planeHeight - 20;

var stones = [];
var stoneSize = 100;

var planeImg = new Image();
planeImg.src = './ae5eb052-443c-41ee-9025-cbd03f71e71e.png'; 

var stoneImg = new Image();
stoneImg.src = './Generated Image October 07, 2025 - 4_18PM.png'; 
canvas.addEventListener('mousemove', function(e) {
  planeX = e.clientX - planeWidth / 2;

  if (planeX < 0) planeX = 0;
  if (planeX + planeWidth > canvas.width) planeX = canvas.width - planeWidth;
});

function createStone() {
  var x = Math.random() * (canvas.width - stoneSize);
  stones.push({x: x, y: -stoneSize});
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (planeImg.complete && planeImg.naturalWidth > 0) {
    ctx.drawImage(planeImg, planeX, planeY, planeWidth, planeHeight);
  } else {
    ctx.fillStyle = 'green';
    ctx.fillRect(planeX, planeY, planeWidth, planeHeight);
  }

  for (var i = 0; i < stones.length; i++) {
    stones[i].y += 5;

    if (stoneImg.complete && stoneImg.naturalWidth > 0) {
      ctx.drawImage(stoneImg, stones[i].x, stones[i].y, stoneSize, stoneSize);
    } else {
      ctx.fillStyle = 'brown';
      ctx.beginPath();
      ctx.arc(stones[i].x + stoneSize / 2, stones[i].y + stoneSize / 2, stoneSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    if (
      stones[i].x < planeX + planeWidth &&
      stones[i].x + stoneSize > planeX &&
      stones[i].y < planeY + planeHeight &&
      stones[i].y + stoneSize > planeY
    ) {
      alert("Loser xaxaxa");
      stones.splice(i, 1);
      i--;
    }

    if (stones[i] && stones[i].y > canvas.height) {
      stones.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(update);
}

setInterval(createStone, 1000);

update();
