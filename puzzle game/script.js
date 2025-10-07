var dragged = null;
var piecesDiv = document.getElementById("pieces");
var boardDiv = document.getElementById("board");

var imgs = [
  "puzzle_3x3/piece_0_0.png",
  "puzzle_3x3/piece_0_1.png",
  "puzzle_3x3/piece_0_2.png",
  "puzzle_3x3/piece_1_0.png",
  "puzzle_3x3/piece_1_1.png",
  "puzzle_3x3/piece_1_2.png",
  "puzzle_3x3/piece_2_0.png",
  "puzzle_3x3/piece_2_1.png",
  "puzzle_3x3/piece_2_2.png",
];

imgs.sort(() => Math.random() - 0.5);

for (var i = 0; i < imgs.length; i++) {
  var img = document.createElement("img");
  img.src = imgs[i];
  img.className = "piece";
  img.draggable = true;
  img.ondragstart = drag;
  piecesDiv.appendChild(img);
}

for (var i = 0; i < 9; i++) {
  var cell = document.createElement("div");
  cell.className = "cell";
  cell.id = "cell-" + i;
  cell.ondrop = drop;
  cell.ondragover = allowDrop;
  boardDiv.appendChild(cell);
}

function drag(e) {
  dragged = e.target;
}

function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();

  if (e.target.classList.contains("cell") && e.target.children.length === 0) {
    e.target.appendChild(dragged);
  } else if (e.target.id === "pieces") {
    piecesDiv.appendChild(dragged);
  }
}

function checkPuzzle() {
  var correct = 0;
  for (var i = 0; i < 9; i++) {
    var cell = document.getElementById("cell-" + i);
    if (cell.children.length > 0) {
      var piece = cell.children[0];
      var expectedSrc =
        "puzzle_3x3/piece_" + Math.floor(i / 3) + "_" + (i % 3) + ".png";
      if (piece.src.includes(expectedSrc)) {
        correct++;
      }
    }
  }

  var message = document.getElementById("message");
  if (correct === 9) {
    message.style.color = "green";
    message.innerHTML = "Tabriklaymiz! To‘g‘ri joylashtirdingiz!";
  } else {
    message.style.color = "red";
    message.innerHTML = "Hali xato joylar bor!";
  }
}
