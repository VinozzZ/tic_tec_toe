// Set the board
// User should be able to click on a box and mark the sqaure: put an onclick, addeventlistener

var whosTurn = 1;
var player1Squares = [];
var player2Squares = [];
var overGame = false;
var onePlayerGame = true;
var score = 0;
var winningCombos = [
    ['A1', 'B1', 'C1'],
    ['A2', 'B2', 'C2'],
    ['A3', 'B3', 'C3'],
    ['A1', 'A2', 'A3'],
    ['B1', 'B2', 'B3'],
    ['C1', 'C2', 'C3'],
    ['A1', 'B2', 'C3'],
    ['A3', 'B2', 'C1'],
];
var innerListLength = winningCombos[0].length;
var squares = document.querySelectorAll(".square");
var messageElement = document.getElementById('message');
var resetBtn = document.getElementById('reset');
for (let i = 0; i < squares.length; i++){
    // console.log(squares[i]);
    squares[i].addEventListener('click', function(e){
        markSquare(this);
        // <!-- this is gna be the button tag -->
        // console.log("User clicked on a square");
    })
}

function resetButton(){
    resetBtn.addEventListener('click', function(e){
        for (let i = 0; i < squares.length; i++){
            squares[i].innerHTML = squares[i].id;
            squares[i].classList.remove("winning-sqaure");
        }
        whosTurn = 1;
        player1Squares = [];
        player2Squares = [];
        overGame = false;
        score = 0;
        messageElement.innerHTML = "";
        computerMove();
    });
}

function markSquare(currentSquare){
    var squareResult = "";
    if ((currentSquare.innerHTML == "X") || (currentSquare.innerHTML == "O")){
        squareResult = "Sorry, this square is taken.";
    }
    else if (overGame){
        squareResult = "Someone has won the game!";
    }
    else if (whosTurn == 1){
        currentSquare.innerHTML = "X";
        currentSquare.classList.add("clicked");
        whosTurn = 2;
        squareResult = "";
        player1Squares.push(currentSquare.id);
        checkWin(player1Squares, 1);
    if ((onePlayerGame) && (!overGame)){
        computerMove();
        whosTurn = 1;
    }
    }else{
        if (!onePlayerGame){
            currentSquare.innerHTML = "O";
            whosTurn = 1;
            squareResult = "";
            player2Squares.push(currentSquare.id);
            checkWin(player2Squares, 2);
        }
    }
    messageElement.innerHTML = squareResult;
}

function checkWin(currentPlayerSquares, whoJustWent){
    // Outter Loop(winning combo)
    for (let i = 0; i < winningCombos.length; i++){
        // Inner Loop (Squares inside a winning Combo)
        var squareCount = 0;
        for (let j = 0; j < innerListLength; j++){
            var winningSquare = winningCombos[i][j];
            // indexOf will return -1 if the argument is not inside of the array
            if (currentPlayerSquares.indexOf(winningSquare) > -1){
                squareCount++;
            }
        }
        if (squareCount === 3){
            gameOver(whoJustWent, winningCombos[i]);
            break;
        }
    }
}
function computerMove(){
    // find a random square
    // see if it's empty
    // if it is, send it to Marksqaure
    // if it's not, keep looking
    var tempCombos = [];
    var chosenSquare = 0;
    var max = 0;
    var bestCombo = 0;

    for (let j = 0; j < winningCombos.length; j++){
        var temp = true;
        for (let i = 0; i < player1Squares.length; i++){
            if (winningCombos[j].indexOf(player1Squares[i]) > -1){
                temp = false;
            }
        }
        if (temp){
            tempCombos.push(winningCombos[j]);
        }
    }

    if (tempCombos.length !== 0){
        for (let n = 0; n < tempCombos.length; n++){
            var temp = 0;
            for(let k = 0; k < tempCombos[n].length; k++){
                if(player2Squares.indexOf(tempCombos[n][k]) > -1){
                    temp++;
                }
            }
            if (temp >= max){
                max = temp;
                bestCombo = tempCombos[n];
            }
        }
    }

    if (bestCombo.length !== 0) {
        for (let i = 0; i < bestCombo.length; i++){
            if (player2Squares.indexOf(bestCombo[i]) === -1){
                chosenSquare = document.getElementById(bestCombo[i]);
                break;
            }
        }
    }

    if ((tempCombos.length === 0) || (player2Squares.length === 0)){
        var tempList = [];
        for (let i = 0; i < squares.length; i++){
            if ((squares[i].innerHTML !== 'X') && (squares[i].innerHTML !== 'O')){
                tempList.push(squares[i].id);
            }
        }
        var randomSqaure = Math.floor(Math.random()*(tempList.length - 1));
        chosenSquare = document.getElementById(tempList[randomSqaure]);
    }
    chosenSquare.innerHTML = "O";
    chosenSquare.classList.add("clicked");
    player2Squares.push(chosenSquare.id);
    checkWin(player2Squares, "computer");
}

function gameOver(whoJustWent, winningCombo){
    var message = "Congrats to player " + whoJustWent + ". You won";
    messageElement.innerHTML = message;
    for (let i = 0; i < winningCombo.length; i++){
        document.getElementById(winningCombo[i]).className += " winning-sqaure";
    }
    overGame = true;
}

//remove tranform function
