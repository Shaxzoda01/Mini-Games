
var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var scissors = document.getElementById("scissors");
var resultText = document.getElementById("resultText");


var options = ["rock", "paper", "scissors"];


function decideWinner(player, computer) {
  if (player === computer) {
    return "Durrang!";
  }
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "scissors" && computer === "paper") ||
    (player === "paper" && computer === "rock")
  ) {
    return "Siz yutdingiz!";
  } else {
    return "Siz yutqazdingiz.";
  }
}


function play(playerChoice) {
  
  var computerChoice = options[Math.floor(Math.random() * options.length)];

  
  var result = decideWinner(playerChoice, computerChoice);

  
  resultText.textContent =
    "Siz: " + playerChoice + "\n" +
    "Kompyuter: " + computerChoice + "\n" +
    result;
}


rock.addEventListener("click", function() { play("rock"); });
paper.addEventListener("click", function() { play("paper"); });
scissors.addEventListener("click", function() { play("scissors"); });
