let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newgamebtn = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;
let gameOver = false;
let timerId = null;

const winPatterns = [
     [0, 1, 2],
     [0, 3, 6],
     [0, 4, 8],
     [1, 4, 7],
     [2, 4, 6],
     [2, 5, 8],
     [6, 7, 8]
]

const resetGame = () => {
     turnO = true;
     count = 0;
     gameOver = false;
     clearTimeout(timerId);
     enableBoxes();
     msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
     box.addEventListener("click", () => {
          if (!turnO || box.innerText !== "" || gameOver) return;
          box.innerText = "O";
          box.disabled = true;
          turnO = false;
          count++;
          let isWinner = checkWinner();
          if (isWinner) {
               gameOver = true;
               clearTimeout(timerId);
               return;
          }
          if (count == 9) {
               showDraw();
               gameOver = true;
               clearTimeout(timerId);
               return;
          }
          timerId = setTimeout(computerMove, 500);
     });
});
const computerMove = () => {
     if (gameOver) return;
     let emptyBoxes = [];
     boxes.forEach((box, index) => {
          if (box.innerText === "") {
               emptyBoxes.push(index);
          }
     });
     if (emptyBoxes.length === 0) return;
     let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
     boxes[randomIndex].innerText = "X";
     boxes[randomIndex].disabled = true;
     count++;
     let isWinner = checkWinner();
     if (isWinner) {
          gameOver = true;
          clearTimeout(timerId);
          return;
     }
     if (count == 9) {
          showDraw();
          gameOver = true;
          clearTimeout(timerId);
          return;
     }
     turnO = true;
};

const showDraw = () => {
     msg.innerText = "It's a Draw!";
     msgContainer.classList.remove("hide");
     disableBoxes();
};

const enableBoxes = () => {
     for (let box of boxes) {
          box.disabled = false;
          box.innerText = '';
     }
}

const disableBoxes = () => {
     for (let box of boxes) {
          box.disabled = true;
     }
}

const showWinner = (winner) => {
     msg.innerText = `Winner is ${winner}`;
     msgContainer.classList.remove("hide");
     disableBoxes();
}

const checkWinner = () => {
     for (let pattern of winPatterns) {
          let pos1Val = boxes[pattern[0]].innerText.trim();
          let pos2Val = boxes[pattern[1]].innerText.trim();
          let pos3Val = boxes[pattern[2]].innerText.trim();

          if (
               pos1Val !== "" &&
               pos2Val !== "" &&
               pos3Val !== "" &&
               pos1Val === pos2Val &&
               pos2Val === pos3Val
          ) {
               showWinner(pos1Val);
               return true;
          }
     }
     return false;
};

newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);