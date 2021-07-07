// DOM queries
let start = document.querySelector(".start");
let reset = document.querySelector(".reset");
let cells = document.querySelectorAll(".box");
let display = document.querySelector(".game-status");

//Form query
let form = document.getElementById("name-form");
let name = document.getElementById("text").value;

//Querying my win conditions (there are 8)
let rowOne = document.querySelectorAll(".row-1");
let rowTwo = document.querySelectorAll(".row-2");
let rowThree = document.querySelectorAll(".row-3");
let columnOne = document.querySelectorAll(".column-1");
let columnTwo = document.querySelectorAll(".column-2");
let columnThree = document.querySelectorAll(".column-3");
let diagOne = document.querySelectorAll(".diag-1");
let diagTwo = document.querySelectorAll(".diag-2");

let winConArr = [
  rowOne,
  rowTwo,
  rowThree,
  columnOne,
  columnTwo,
  columnThree,
  diagOne,
  diagTwo,
];
let playerOneName;

let playerState = "X";

let gamePlayState = false;

start.addEventListener("click", () => {
  display.textContent = `${playerState}'s TURN`;
  start.disabled = true;
  gamePlayState = true;
});

//event listiner for reset button

reset.addEventListener("click", resetBoard);

//submit event on form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (gamePlayState === true) {
    let playerOneName = text.value;
    console.log(playerOneName);
  }
});

function resetBoard() {
  start.disabled = false;
  reset.disabled = true;
  playerState = "X";
  for (let node of winConArr) {
    for (let element of node) {
      element.textContent = "";

      element.style.backgroundColor = "coral";
    }
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", (event) => {
    console.log(start.disabled);
    if (gamePlayState === true) {
      if (
        event.target.textContent === "X" ||
        event.target.textContent === "O"
      ) {
        display.textContent = "CELL FULL!";
      } else {
        if (playerState === "X") {
          event.target.textContent = "X";

          checkWinCon();

          playerState = "O";

          if (gamePlayState === true) {
            display.textContent = `PLAYER ${playerState}'S TURN`;
          }
        } else {
          event.target.textContent = "O";

          checkWinCon();

          playerState = "X";
          if (gamePlayState === true) {
            display.textContent = `PLAYER ${playerState}'S TURN`;
          }
        }
      }
    } else {
      console.log("game not started");
    }
  });
});

function checkWinCon() {
  let arr = [];
  let boardArr = [];

  for (let node of winConArr) {
    for (let element of node) {
      arr.push(element.textContent);
    }
  }

  console.log(arr);

  while (arr.length > 0) {
    boardArr.push(arr.splice(0, 3));
  }
  console.log(boardArr);

  for (let xoArray of boardArr) {
    console.log(xoArray);
    let winLoc = boardArr.indexOf(xoArray);
    if (xoArray.join("") === "XXX" || xoArray.join("") === "OOO") {
      alert("Winner");
      display.textContent = `${playerState} wins!`;
      gamePlayState = false;
      reset.disabled = false;
      
      winConArr[winLoc].forEach((element) => {
        element.style.backgroundColor = "green";
      });

      console.log(winConArr[winLoc]);
    }
  }
}
