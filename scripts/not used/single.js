// DOM queries

//Button queries
let start = document.querySelector(".start");
let reset = document.querySelector(".reset");
let playerBtn = document.querySelector(".player")
let computerBtn = document.querySelector(".computer")

let cells = document.querySelectorAll(".box");
let display = document.querySelector(".game-status");

//Form query
let playerOneForm = document.getElementById("player1-form");
let playerTwoForm = document.getElementById("player2-form");
let playerOneName = document.getElementById("player-one-name");
let playerTwoName = document.getElementById("player-two-name");

// timer query
let timer = document.querySelector('.timer')

//Querying my win conditions (there are 8)
let rowOne = document.querySelectorAll(".row-1");
let rowTwo = document.querySelectorAll(".row-2");
let rowThree = document.querySelectorAll(".row-3");
let columnOne = document.querySelectorAll(".column-1");
let columnTwo = document.querySelectorAll(".column-2");
let columnThree = document.querySelectorAll(".column-3");
let diagOne = document.querySelectorAll(".diag-1");
let diagTwo = document.querySelectorAll(".diag-2");

//querys for hiding divs 
let gameSelect = document.querySelector('.game-select')
let gameBoard = document.querySelector('.board')
console.log(gameSelect)


// console.log(rowOne[1].textContent = 'X')

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

let game;
//Button eventlistener (onclick disabled and starts gamePlay loop)
start.addEventListener("click", () => {
  playerOneName = playerOneName.value;
  playerTwoName = playerTwoName.value;

  display.textContent = `${playerOneName}'s TURN`;
  start.disabled = true;
  gamePlayState = true;

  setInterval(()=>{
      if(gamePlayState === true){
        count++;
      timer.textContent = count + 's'
      }
      
  }, 1000)
});

playerBtn.addEventListener("click", ()=>{
  game = 'player'
  gameSelect.style.display = "none"
  gameBoard.style.display = "grid"
  
})
computerBtn.addEventListener("click", ()=>{
  game = 'computer'
  gameSelect.style.display = "none"
  gameBoard.style.display = "grid"
  
})

//event listiner for reset button

reset.addEventListener("click", resetBoard);

//submit event on form
playerOneForm.addEventListener("submit", () => preventDefault());
playerTwoForm.addEventListener("submit", () => preventDefault());

function resetBoard() {
  console.log(playerOneName);
  playerOneName = document.getElementById("player-one-name");
  playerTwoName = document.getElementById("player-two-name");
  count = 0;
  start.disabled = false;
  reset.disabled = true;
  playerState = "X";

  for (let node of winConArr) {
    // iterate over the nodelists of the winCon array
    for (let element of node) {
      //For each element makes it textContent nothing
      element.textContent = "";
      //Change back to orginal color
      gameSelect.style.display = "block"
      gameBoard.style.display = "none"
      element.style.backgroundColor = "coral";
    }
  }
}

//For each .box element in my html
cells.forEach((cell) => {
  //Add a click event
  cell.addEventListener("click", (event) => {
    //Need to check if start button was clicked
  if(game === 'player'){
    if (gamePlayState === true) {
      //Logic block to check if theres already an X or O for textContent if so tell the user they can't change the content
      if (
        event.target.textContent === "X" ||
        event.target.textContent === "O"
      ) {
        display.textContent = "CELL FULL!";
        //If its an empty cell
      } else {
        // if empty cell and player X's turn
        if (playerState === "X") {
          //Place an X
          event.target.textContent = "X";
          // Change status text

          //  Check if any win combinations are fulfilled
          checkWinCon();
          // Change turns
          playerState = "O";
          //Need conditional to make it if player wins the text content doesn't change to players turn
          if (gamePlayState === true) {
            display.textContent = `PLAYER ${playerTwoName}'S TURN`;
          }
        } // Same as above but for player O
        else {
          event.target.textContent = "O";

          checkWinCon();
          //Player state needs to be under winCon function so win msg doesn't say opposite player winning

          playerState = "X";
          if (gamePlayState === true) {
            display.textContent = `PLAYER ${playerOneName}'S TURN`;
          }
        }
      }
    } else {
      console.log("game not started");
    }
  } else {
    
    if (gamePlayState === true) {
      //Logic block to check if theres already an X or O for textContent if so tell the user they can't change the content
      if (
        event.target.textContent === "X" ||
        event.target.textContent === "O"
      ) {
        display.textContent = "CELL FULL!";
        //If its an empty cell
      } else {
        // if empty cell and player X's turn
       
          //Place an X
          event.target.textContent = "X";
          randomSquare()
          // Change status text

          //  Check if any win combinations are fulfilled
          checkWinCon();
          // Change turns
          
          //Need conditional to make it if player wins the text content doesn't change to players turn
          if (gamePlayState === true) {
            display.textContent = `PLAYER ${playerTwoName}'S TURN`;
          }

         
         // Same as above but for player O
        
          

          
          //Player state needs to be under winCon function so win msg doesn't say opposite player winning

          
          if (gamePlayState === true) {
            display.textContent = `PLAYER ${playerOneName}'S TURN`;
          
        }
      }
    } else {
      console.log("game not started");
    }
  }
    
  });
});

function checkWinCon() {
  // Defining empty array varibles
  let arr = [];
  let boardArr = [];

  //Point of this logic block is to get inside of each element and push its text.content to an empty array
  for (let node of winConArr) {
    // iterate over the nodelists of the winCon array
    for (let element of node) {
      //For each element of each nodelist push its text content into an array
      arr.push(element.textContent);
    }
  }

  console.log(arr);
  //Iterate over our array of 24
  while (arr.length > 0) {
    //splice array from index0-3 and add that to new board array until everything in orginal array is gone, leaving an array of arrays
    // Each array in boardArr = row/column/diag
    boardArr.push(arr.splice(0, 3));
  }
  console.log(boardArr);

  //iterate over gameboard array
  for (let xoArray of boardArr) {
    console.log(xoArray);
    //Defining where in winCon array (which row/column/diag (can do this because xoArray = a row/column/diag)) we are so we can manipulate styles
    let winLoc = boardArr.indexOf(xoArray);
    //if xoArray (row/column/diag) contains three X's or O's in a row a player wins
    if (xoArray.join("") === "XXX" || xoArray.join("") === "OOO") {
      alert("Winner");
      if (playerState === "X") {
        display.textContent = `${playerOneName} wins!`;
      } else {
        display.textContent = `${playerTwoName} wins!`;
      }

      //Disable Game
      gamePlayState = false;

      //Want reset button to be enabled
      reset.disabled = false;

      //Using earlier defined winLoc to locate the row/column/diag the three X's or O's are in
      winConArr[winLoc].forEach((element) => {
        //Make each box green
        element.style.backgroundColor = "green";
      });

      console.log(winConArr[winLoc]);
    }
  }
}


// I think we just dont use a while loop

//GamePlay loop function
// async function gamePlay() {
//   start.disabled = true;
// }

//Current task is for playerWins to be accurate

function randomSquare(){
  let randCell = Math.floor(Math.random()*9)
 
  if(cells[randCell].textContent === "X" || cells[randCell].textContent === "O"){
    randomSquare()
  }
   else{
    return cells[randCell].textContent = "O"
  }
   
  
  console.log(cells[randCell].textContent)
  // while(cells[randCell].textContent !== ''){

  // }
}