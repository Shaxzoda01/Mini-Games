var circles = document.querySelectorAll('.circle');
var scoreDisplay = document.getElementById('score');
var input = document.getElementById('input')
var resultTable = document.getElementById('results')
var hammer = document.getElementById("hammer");
var highScoreContainer = document.getElementById("highScore")
console.log(circles)

var score = 0;
var gameActive = false;

function startGame() {

    if (input.value.trim() === "") {
        alert("Enter your name");
        return;
    }

    hammer.style.display = "block";
    document.body.style.cursor = "none";

    score = 0;
    updateScore();
    gameActive = true;
    nextCircle();

    document.addEventListener("mousemove", (e) => {
        hammer.style.left = e.pageX + "px";
        hammer.style.top = e.pageY + "px";
    });
    document.addEventListener("mousedown", () => {
        hammer.style.transform = "translate(-50%, -50%) rotate(20deg)";
    });
    document.addEventListener("mouseup", () => {
        hammer.style.transform = "translate(-50%, -50%) rotate(0deg)";
    });

    setTimeout(stopGame, 20000);
}

function stopGame() {
    gameActive = false;

    circles.forEach(circle => {
        circle.classList.remove('active');
        circle.onclick = null;
    });

    resultTable.insertAdjacentHTML(
        'beforeend',
        `<tr><td>${input.value}</td><td>${score}</td></tr>`
    );

    document.body.style.cursor = "default";
    hammer.style.display = "none";
    updateScore();
}
function nextCircle() {

    if (gameActive === false) {
        return;
    }

    circles.forEach(function (circle) {
        circle.classList.remove('active');
        circle.onclick = null;
    });


    for (let i = 0; i < 2; i++) {
        let randomIndex = Math.floor(Math.random() * circles.length);
        let activeCircle = circles[randomIndex];

        activeCircle.classList.add('active');

        activeCircle.onclick = () => {
            console.log("Hit!");
            activeCircle.onclick = null;
            activeCircle.classList.remove('active');
            score++;
            updateScore();
        };

        setTimeout(() => {
            activeCircle.classList.remove('active');
        }, 1000);
    }
    setTimeout(nextCircle, 1000);
}
function updateScore() {
    scoreDisplay.textContent = score;
}