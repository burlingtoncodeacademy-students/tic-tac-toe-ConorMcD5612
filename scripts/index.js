// DOM queries

//Button queries
let start = document.querySelector(".start");
let reset = document.querySelector(".reset");
let playerBtn = document.querySelector(".player");
let computerBtn = document.querySelector(".computer");

//input query
let playerOneInput = document.getElementById("player-one-name");
let playerTwoInput = document.getElementById("player-two-name");

//Querying my win conditions (there are 8)
let rowOne = document.querySelectorAll(".row-1");
let rowTwo = document.querySelectorAll(".row-2");
let rowThree = document.querySelectorAll(".row-3");
let columnOne = document.querySelectorAll(".column-1");
let columnTwo = document.querySelectorAll(".column-2");
let columnThree = document.querySelectorAll(".column-3");
let diagOne = document.querySelectorAll(".diag-1");
let diagTwo = document.querySelectorAll(".diag-2");

//misc querys
let gameSelect = document.querySelector(".game-select");
let gameBoard = document.querySelector(".board");
let cells = document.querySelectorAll(".box");
let display = document.querySelector(".game-status");
let timerDisplay = document.querySelector(".timer");

//Global vars 

//Making an array of the queryed nodes to iterate over
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

let count = 0;
// Whos turn
let playerState = "X";
// Boolean to be used in gamePlay loop
let gamePlayState = false;
// Making some vars global so I can use them across multiple functions 
let game;
let timer;
let playerOneName;
let playerTwoName;



start.addEventListener("click", () => {
  //On click get text values for names to use in status
  getNames();
  // have displaystatus start as X's turn
  displayStatus(`${playerOneName}'s TURN`);
  // Disable button and have gameplay be true on start btn click
  start.disabled = true;
  gamePlayState = true;

// Clear interval before setting interval to avoid having multiple instances of timer
  clearInterval(timer);
  timer = setInterval(() => {
    //Making sure timer stops after game ends
    if (gamePlayState === true) {
      //Every second add one to count and have count equal to displays text content 
      count++;
      timerDisplay.textContent = count + "s";
    }
  }, 1000);
});

//On user clicking/choosing 2player mode
playerBtn.addEventListener("click", () => {
   //Set game mode to player
  game = "player";
  // hide choose mode menu, and unhide tic tac toe board
  gameSelect.style.display = "none";
  gameBoard.style.display = "grid";
  //enable start button
  start.disabled = false;
  //prompt user to press start button
  displayStatus("PRESS PLAY");
});

// On userclicking/choosing vs Ai
computerBtn.addEventListener("click", () => {
  // change game mode
  game = "computer";
  // hide player two text and input because player 2 = robot
  document.querySelector(".p2-text").style.display = "none";
  playerTwoInput.style.display = "none";
  //hide menu, unhide board
  gameSelect.style.display = "none";
  gameBoard.style.display = "grid";
  //enable start 
  start.disabled = false;
  //prompt user
  displayStatus("PRESS PLAY");
});

//event listiner for reset button
reset.addEventListener("click", resetBoard);

// Adding an event listener to each tic tac toe box
cells.forEach((cell) => {
  cell.addEventListener("click", (event) => {
// This should probably be two seperate functions computerGame() and playerGame()
// If player is playing 2player
    if (game === "player") {
      // and the game is in play
      if (gamePlayState === true) {
        // if the clicked cell isn't already filled 
        if (
          event.target.textContent === "X" ||
          event.target.textContent === "O"
        ) {
          //If it is tell user cell is fulll
          displayStatus("CELL FULL!");

          //if cell is not full
        } else {
          // and its X's turn 
          if (playerState === "X") {
            //Change the clicked cell text content to X
            event.target.textContent = "X";
            //Check wether or not any win conditions have been fulfilled
            checkWinCon();
            //Change turns
            playerState = "O";
            //If X hasn't won the game display next players turn (need if so that if winCondition is met text display != next players turn)
            if (gamePlayState === true) {
              displayStatus(`PLAYER ${playerTwoName}'S TURN`);
            }
            // If its player two (O) turn
          } else {
            //change clicked on empty cell into an O
            event.target.textContent = "O";

            checkWinCon();

            //change turns
            playerState = "X";
            //if game is still in play display next players turn
            if (gamePlayState === true) {
              displayStatus(`PLAYER ${playerOneName}'S TURN`);
            }
          }
        }
        //If start has not been clicked yet (gameplayState = false)
      } else {
        console.log("game not started");
      }
      //If game is computer (not two player)
    } else {
      //if game is still and play 
      if (gamePlayState === true) {
        if (
          event.target.textContent === "X" ||
          event.target.textContent === "O"
        ) {
          //If cell does have an X or O display cell full
          displayStatus(`CELL FULL`);
          //game in and cell isnt full
        } else {
          //change clicked cell into an X
          event.target.textContent = "X";
          //CheckwinCon depends on playerState so its neccessary to still have it in computer game
          playerState = "X";
          //Display its player ones turn 
          displayStatus(`PLAYER ${playerOneName}'S TURN`);
          // check if player X won
          checkWinCon();
          // Change "turns"
          playerState = "O";
          //Have computer (O) fill a random empty cell
          randomSquare();
        }
      } else {
        //If start hasn't been clicked 
        console.log("game not started");
      }
    }
  });
});


//Adding a little more readiblity to a really messy function
function displayStatus(string) {
  //Set display msg to paramater
  display.textContent = string;
}

//Use current value of input as players names
function getNames() {
  playerOneName = playerOneInput.value;
  playerTwoName = playerTwoInput.value;
}


//Need to check each win combination and if the board is completly full make status a draw
function checkWinCon() {
  let arr = [];
  let boardArr = [];
  let winLoc;

  //Point of this logic block is to get inside of each element and push its text.content to an empty array
  for (let node of winConArr) {
     // iterate over the nodelists of the winCon array
    for (let element of node) {
      //For each element of each nodelist push its text content into an empty array
      arr.push(element.textContent);
    }
  }

  //Iterate over array of 24
  while (arr.length > 0) {
     //splice array from index0-3 and add that to new board array until everything in orginal array is gone, leaving an array of arrays
    // Each array in boardArr = a row/column/diag
    boardArr.push(arr.splice(0, 3));
  }

  //iterate over gameboard array (array just created in while loop)
  for (let xoArray of boardArr) {
     //Defining where in winCon array (which row/column/diag (can do this because xoArray = a row/column/diag)) we are so we can eventually manipulate styles
    winLoc = boardArr.indexOf(xoArray);
//if xoArray (row/column/diag) contains three X's or O's in a row a player wins
    if (xoArray.join("") === "XXX" || xoArray.join("") === "OOO") {
      // If its X's turn in checkWinCon is called X wins
      if (playerState === "X") {
        displayStatus(`${playerOneName} wins!`);
      // if O's turn
      } else {
        displayStatus(`${playerTwoName} wins!`);
      }
      // The game is no longer in play, enable reset button
      gamePlayState = false;
      reset.disabled = false;

      //Using earlier defined winLoc to locate the row/column/diag the three X's or O's are in
      winConArr[winLoc].forEach((element) => {
        //for each winning cell change the background color to green
        element.style.backgroundColor = "green";
      });
    }
  }

  //Need to check if there is a tie (board full)

  
  //Filter board arr to get an array of arrays
  //Every move tieArr.join.length grows when the board is full the length of tieArr=40
  let tieArr = boardArr.filter(
    //This isn't doing what I think it does, but it works most of the time
    //Checks if row/column/diag has both an X and an O
    (letterArr) => letterArr.includes("X") && letterArr.includes("O")
    
  );
  //When tieARr.join.length = 40, the board is full thus the game is a tie
  //40 because there are 8 arrays each with 5 characters (.join includes the commas)
  if (tieArr.join("").length === 40) {
    //When the game is the tie stop the game, enable reset button, and display tie game status
    gamePlayState = false;
    reset.disabled = false;
    displayStatus("TIE GAME");
  }
  //This is a bad solution
}


function randomSquare() {
  //define randcell as a random number between 0-9
  let randCell = Math.floor(Math.random() * 9);
  //If game is in play
  if (gamePlayState) {
    if (
      cells[randCell].textContent === "X" ||
      cells[randCell].textContent === "O"
    ) {
      //If the randomsquare chosen is already full call the function again for a new randCell
      randomSquare();
    } else {
      //otherwise change the textContent of the random cell to O
      cells[randCell].textContent = "O";
      //need to check if computer won before letting X go
      checkWinCon();
    }
  }
}

function resetBoard() {
  
  //Reset count
  count = 0;
  //Unhide player2 text
  document.querySelector(".p2-text").style.display = "block";
  
  //disable reset button
  reset.disabled = true;
  //making elements go back to defualt value
  playerState = "X";
  displayStatus("CHOOSE GAME");
  gameSelect.style.display = "block";
  gameBoard.style.display = "none";
  timerDisplay.textContent = "0";
  playerTwoInput.style.display = "block";

  //Undoing the green background style and resetting text content
  for (let node of winConArr) {
    for (let element of node) {
      element.textContent = "";
      element.style.backgroundColor = "coral";
    }
  }
}