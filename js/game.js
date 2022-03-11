//create settings 'gear' graphic
document.getElementById('SettingsBtn').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" data-name="Livello 1" viewBox="0 0 128 128">' +
    '<path d="M64 39a25 25 0 1025 25 25 25 0 00-25-25zm0 44a19 19 0 1119-19 19 19 0 01-19 19z"></path>' +
    '<path d="M121 48h-8.93a1 1 0 01-.94-.68 49.9 49.9 0 00-2-4.85 1 1 0 01.18-1.15l6.31-6.32a7 7 0 000-9.9l-12.73-12.72a7 7 0 00-9.9 0l-6.31 6.31a1 1 0 01-1.15.18 49.76 49.76 0 00-4.85-2 1 1 0 01-.68-.94V7a7 7 0 00-7-7H55a7 7 0 00-7 7v8.93a1 1 0 01-.68.94 49.9 49.9 0 00-4.85 2 1 1 0 01-1.15-.18L35 12.38a7 7 0 00-9.9 0L12.38 25.11a7 7 0 000 9.9l6.31 6.31a1 1 0 01.18 1.15 49.76 49.76 0 00-2 4.85 1 1 0 01-.94.68H7a7 7 0 00-7 7v18a7 7 0 007 7h8.93a1 1 0 01.94.68 49.9 49.9 0 002 4.85 1 1 0 01-.18 1.15L12.38 93a7 7 0 000 9.9l12.73 12.73a7 7 0 009.9 0l6.31-6.31a1 1 0 011.15-.18 49.76 49.76 0 004.85 2 1 1 0 01.68.94V121a7 7 0 007 7h18a7 7 0 007-7v-8.93a1 1 0 01.68-.94 49.9 49.9 0 004.85-2 1 1 0 011.15.18l6.32 6.31a7 7 0 009.9 0l12.73-12.73a7 7 0 000-9.9l-6.31-6.31a1 1 0 01-.18-1.15 49.76 49.76 0 002-4.85 1 1 0 01.94-.68H121a7 7 0 007-7V55a7 7 0 00-7-7zm1 25a1 1 0 01-1 1h-8.93a7 7 0 00-6.6 4.69 43.9 43.9 0 01-1.76 4.26 7 7 0 001.35 8l6.31 6.31a1 1 0 010 1.41l-12.72 12.71a1 1 0 01-1.41 0l-6.31-6.31a7 7 0 00-8-1.35 43.88 43.88 0 01-4.27 1.76 7 7 0 00-4.68 6.6V121a1 1 0 01-1 1H55a1 1 0 01-1-1v-8.93a7 7 0 00-4.69-6.6 43.9 43.9 0 01-4.26-1.76 7 7 0 00-8 1.35l-6.31 6.31a1 1 0 01-1.41 0L16.62 98.65a1 1 0 010-1.41l6.31-6.31a7 7 0 001.35-8 43.88 43.88 0 01-1.76-4.27A7 7 0 0015.93 74H7a1 1 0 01-1-1V55a1 1 0 011-1h8.93a7 7 0 006.6-4.69 43.9 43.9 0 011.76-4.26 7 7 0 00-1.35-8l-6.31-6.31a1 1 0 010-1.41l12.72-12.71a1 1 0 011.41 0l6.31 6.31a7 7 0 008 1.35 43.88 43.88 0 014.27-1.76A7 7 0 0054 15.93V7a1 1 0 011-1h18a1 1 0 011 1v8.93a7 7 0 004.69 6.6 43.9 43.9 0 014.26 1.76 7 7 0 008-1.35l6.31-6.31a1 1 0 011.41 0l12.73 12.73a1 1 0 010 1.41l-6.31 6.31a7 7 0 00-1.35 8 43.88 43.88 0 011.76 4.27 7 7 0 006.6 4.68h8.9a1 1 0 011 1z"></path>' +
    '</svg>';

//------------------------------------------------------------------------
//variables
let crossTurn = Math.random() >= 0.5,
    winConditions = [
        //horizontal
        ['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'],
        //vertical
        ['1', '4', '7'], ['2', '5', '8'], ['3', '6', '9'],
        //diagonal
        ['1', '5', '9'], ['3', '5', '7']
    ],
    playerXFields = [],
    playerOFields = [],
    turnCounter = 0;
//------------------------------------------------------------------------   

document.getElementById('PlayGameBtn').addEventListener('click', displayGameScreen);

function displayGameScreen() {
    document.getElementById('menu').innerHTML = "";
    playGame();
}

function playGame() {
    /*  
    1. Draw a board
    2. Random player turn
    3. Draw a circle or cross in the place (depends on with player has turn), where player has clicked
    4. Check if the active player won
    5. Display win alert or go to point 3. 
    */
    console.log(crossTurn);
    drawBoard();
    drawFig();
}

function drawBoard() {
    const gameScreen = document.getElementById('menu'),
        boardGrid = document.createElement('div'),
        gridCell = [];

    boardGrid.classList.add('drawGrid');
    
    //create an id in elements
    boardGrid.setAttribute('id', 'drawGrid');

    //appendChild()- create a div ladder in DOM
    gameScreen.appendChild(boardGrid);
    
    //create 9 cells which will match the characters
    for (let i = 1; i <= 9; i++){
        gridCell[i] = document.createElement('div');
        gridCell[i].classList.add('gridCell');
        gridCell[i].setAttribute('id', 'gridId' + i);
        boardGrid.appendChild(gridCell[i]);
    }
}

function drawFig(){
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`gridId${i}`).addEventListener('click', charInsert);
    }
}

function charInsert() {
    this.classList.add('char');
    if (crossTurn == true) {
        this.innerHTML = "X";
        playerXFields.push(this.id.substring(6));
        console.log("player X arr:" + playerXFields);
    } else {
        this.innerHTML = "O";
        playerOFields.push(this.id.substring(6));
        console.log("player O arr:" + playerOFields);
    }
    checkIfPlayerWon();
    if (turnCounter == 8) {
            console.log("Draw");
            removeFieldClick();
            return;
        }
    console.log(turnCounter);
    this.classList.add('disabled');
    this.removeEventListener('click', charInsert);
    crossTurn = !crossTurn;
    turnCounter++;
}

function checkIfPlayerWon() {
    //check each player if any has won
    winConditions.forEach(winCondition => {
        let winOPlayer = winCondition.every(element => playerOFields.includes(element));
        let winXPlayer = winCondition.every(element => playerXFields.includes(element));

        if (winOPlayer == true) {
            console.log("Player with O have won!");
            removeFieldClick();
            return;
        }
        if (winXPlayer == true) {
            console.log("Player with X have won!");
            removeFieldClick();
            return;
        }
        return true;
    });
}

function removeFieldClick() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`gridId${i}`).classList.add('disabled');
        document.getElementById(`gridId${i}`).removeEventListener('click', charInsert);
    }
}