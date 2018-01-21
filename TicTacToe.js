/*
TicTacToe.js version 1.0 beta
Corey Bowes
12/09/2017

Summary: Allows the user to play Tic Tac Toe against a computer opponent.
Code layout:

makeBoard object methods (these have to go at the start so that an object using the makeBoard() constructor can be declared)
global variables
function declarations
page initialization code
function initializations
more page initialization code

 */

/*
These functions are properties of a makeBoard object, which represents a Tic Tac 
Toe board. The board is represented by a 2-dimensional array of strings. The 
board object also contains lists of the positions of Xs, Os, and blank spaces 
to make the work of the AI easier.
*/

var isArrayEqual = new Function("arrayToCompare"); // Compares the elements of two arrays. Helper function for addX and addO.
var addX = new Function("row", "column"); // Adds an X to the board at the specified place and adds it to the list of Xs, then checks for game end.
var addO = new Function("row", "column"); // Adds an O to the board at the specified place and adds it to the list of Os, then checks for game end.
var isBoardFull = new Function(); // Checks whether the board is full.
var isSquareEmpty = new Function("row", "column"); // Checks whether the given square is empty (equal to " ").
var makeBoard = new Function(); // Initializes object properties, used as a constructor.

isArrayEqual = function(arrayToCompare)
{ /* Tests whether the array given as an argument is equal to the array given by 
  the this object. Assumes that both arrays contain only non-array elements, and 
  the same number of elements as each other. */
    for(i=0; i<this.length; i++)
    {
        if(arrayToCompare[i]!=this[i])
        {
            return false;
        }
    }
    return true;
}

// makeBoard methods

addX = function(row, column)
{
    if(this.board[row][column]!=" ")
    {
        return false;
    }
    else
    {
        this.board[row][column]="X";
        this.XPositions.push([row, column]);
        this.BlankSpacePositions.splice(this.BlankSpacePositions.findIndex(isArrayEqual, [row, column]), 1);
        // ^ Removes the newly placed piece from the array of blank space positions, using the Array object's splice() function.
        if((this.board[row][0]=="X")&&(this.board[row][1]=="X")&&(this.board[row][2]=="X"))
        {
            this.haveXsWon=true;
            this.gameOver=true;
        }
        else if((this.board[0][column]=="X")&&(this.board[1][column]=="X")&&
        (this.board[2][column]=="X"))
        {
            this.haveXsWon=true;
            this.gameOver=true;
        }
        else if((this.board[0][0]=="X")&&(this.board[1][1]=="X")&&(this.board[2][2]=="X"))
        {
            this.haveXsWon=true;
            this.gameOver=true;
        }
        else if((this.board[0][2]=="X")&&(this.board[1][1]=="X")&&(this.board[2][0]=="X"))
        {
            this.haveXsWon=true;
            this.gameOver=true;
        }
        else if(this.isBoardFull())
        {
            this.gameOver=true;
        }
        return true;
    }
}

addO = function(row, column)
{
    if(this.board[row][column]!=" ")
    {
        return false;
    }
    else
    {
        this.board[row][column]="O";
        this.OPositions.push([row, column]);
        this.BlankSpacePositions.splice(this.BlankSpacePositions.findIndex(isArrayEqual, [row, column]), 1);
        // ^ Removes the newly placed piece from the array of blank space positions, using the Array object's splice() function.
        if((this.board[row][0]=="O")&&(this.board[row][1]=="O")&&(this.board[row][2]=="O"))
        {
            this.haveOsWon=true;
            this.gameOver=true;
        }
        else if((this.board[0][column]=="O")&&(this.board[1][column]=="O")&&
        (this.board[2][column]=="O"))
        {
            this.haveOsWon=true;
            this.gameOver=true;
        }
        else if((this.board[0][0]=="O")&&(this.board[1][1]=="O")&&(this.board[2][2]=="O"))
        {
            this.haveOsWon=true;
            this.gameOver=true;
        }
        else if((this.board[0][2]=="O")&&(this.board[1][1]=="O")&&(this.board[2][0]=="O"))
        {
            this.haveOsWon=true;
            this.gameOver=true;
        }
        else if(this.isBoardFull())
        {
            this.gameOver=true;
        }
        return true;
    }
}

isBoardFull = function()
{
    for(i=0; i<=2; i++)
    {
        for(j=0; j<=2; j++)
        {
            if(this.board[i][j]==" ")
            {
                return false;
            }
        }
    }    
    return true;
}

isSquareEmpty = function(row, column)
{
    return (this.board[row][column]==" ");
}

// Constructor
makeBoard = function()
{
    this.board=[[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
    // In board[f][s], f represents row and s represents column, measured from top left.
    this.BlankSpacePositions=[];
    this.XPositions=[];
    this.OPositions=[];
    this.haveXsWon=false;
    this.haveOsWon=false;
    this.gameOver=false;
    this.addX=addX;
    this.addO=addO;
    this.isSquareEmpty=isSquareEmpty;
    this.isBoardFull=isBoardFull;
    this.makeBoard=makeBoard;
    for(i=0; i<3; i++)
    {
        for(j=0; j<3; j++)
        {
            this.BlankSpacePositions.push([i, j]);
        }
    }
}

// Lists of variables and functions. In Netbeans I put a bookmark here for easy navigation.

// Global variables
var canvas = document.getElementById("myCanvas");
var menuButtons=[document.getElementById("practice"), 
    document.getElementById("levelSelect"), document.getElementById("watchCvC"), 
    document.getElementById("nextLevel"), document.getElementById("difficultySelect"), 
    document.getElementById("difficultySelect"), document.getElementById("difficultySelect2"), 
    document.getElementById("intervalSelect"), document.getElementById("numberOfGamesSelect"), 
    document.getElementById("start"), document.getElementById("reset"),
    document.getElementById("difficultySelectText"), document.getElementById("difficultySelectText2")];
var ctx = canvas.getContext("2d");
var aiDifficulty=0;
var aiDifficulty2=0;
var canPlayerMove=false;
var isPlayerX=true;
var isCurrentPlayerX=isPlayerX;
var currentScreen="Main Menu";
var currentLevel=-1;
var ticTacToeBoard=new makeBoard();
// The text area has a limited width, hence the newlines. The width is that of the text below, assuming 30px Courier font.
var maxLineWidthText="The end of this line is here.";
var mainMenuText=    "Welcome to Tic Tac Toe! \nPress any button to begin.";
var practiceText=    "Here you can practice against \n"+
                     "an AI opponent. To start, \n"+
                     "simply select a difficulty \n"+
                     "level for the AI and place a \n"+
                     "piece.";
var levelSelectText= "Please select a level.";
var playCvCText=     "Here you can watch two AIs \n"+
                     "play against each other. To \n"+
                     "begin, select a difficulty \n"+
                     "for the X player, a \n"+
                     "difficulty for the O player, \n"+
                     "and a speed to play at, and \n"+
                     "press Start.";
var levelOneText=    "This opponent only plays \n"+
                     "sequentially. Should be easy.";

var levelTwoText=    "This opponent plays randomly. \n"
                     "Should be easy, but beware of \n"+
                     "lucky plays. Good luck.";
var levelThreeText=  "This opponent will always \n"+
                     "make the winning move when \n"+
                     "possible.";
var levelFourText=   "This opponent is a good \n"+
                     "strategist. You must think \n"+
                     "ahead to win.";
var levelFiveText=   "This opponent is literally \n"+
                     "impossible to beat. Quit \n"+
                     "whenever you get bored.";
var levelSixText=    "You're playing as O now, \n"+
                     "starting over from the \n"+
                     "beginning. This opponent \n"+
                     "should be just as easy \n"+
                     "though.";
var levelSevenText=  "Again, this opponent plays \n"+
                     "randomly.";
var levelEightText=  "This opponent, once again, \n"+
                     "will make the winning move if \n"+
                     "possible.";
var levelNineText=   "Going first hasn't made this \n"+
                     "opponent any easier to beat. \n"+
                     "This will take luck. Get \n"+
                     "friendly with that reset \n"
                     "button if you want to win.";
var levelTenText=    "Still impossible.";
var currentText=mainMenuText;
var aiPlayInterval=1000;
var aiPlayIntervalId=0;
var numberOfGames=0;
var gamesPlayed=0;
var XWins=0;
var OWins=0;
// The following variables are all constants, never meant to be changed from code.
var canvasXPosition=8;
var canvasYPosition=8;
var boardXPosition=30-canvasXPosition;
var boardYPosition=30-canvasYPosition;
var squareSideLength=140;
var constCornerSquares=[[0, 0], [0, 2], [2, 0], [2, 2]];
var constEdgeSquares=[[0, 1], [1, 0], [1, 2], [2, 1]];
// Debugging variables (none currently)

// Function declarations
/*
This code declares all my functions as Function objects with an empty body, to 
be reassigned their final value later using a function expression. Doing it this 
way isn't necessary, I could just declare all my functions with the function 
keyword and function hoisting would make sure they're all declared when they 
appear in the code. However, I find the code more readable this way, and it 
helps me find the declarations easily in Netbeans.
*/

// Level setup functions
var makeLevel = new Function("difficulty", "levelSetup", "levelText");
var standardLevelSetup = new Function("playBoard", "levelDifficulty", "levelText");
var levelOneSetup = new Function("playBoard");
var levelTwoSetup = new Function("playBoard");
var levelThreeSetup = new Function("playBoard");
var levelFourSetup = new Function("playBoard");
var levelFiveSetup = new Function("playBoard");
var levelSixSetup = new Function("playBoard");
var levelSevenSetup = new Function("playBoard");
var levelEightSetup = new Function("playBoard");
var levelNineSetup = new Function("playBoard");
var levelTenSetup = new Function("playBoard");

// Player and computer moves
var computerMove = new Function("playBoard", "difficulty"); // Places a computer piece using AI of the given difficulty.
var computerMoveCvC = new Function(); // Plays according to AI difficulty and changes the current player. Meant to run on an interval.
var playCvCInstant = new Function(); // Plays Computer vs Computer at instant speed, using the computerMoveCvC function.

// computerMove helper functions
var addCurrentPlayersPiece = new Function("playBoard", "row", "column");
var declareVictory = new Function("playBoard"); // Checks game over conditions and displays an appropriate alert if game is over.
var findSquareInLine = new Function("firstSquare", "secondSquare"); // Finds the square in line with the two squares given as arguments. Both the arguments and the return value are 2-element arrays of the form [row, column].
var findEmptySquareInLine = new Function("playBoard", "firstSquare", "secondSquare"); // Same as findSquareInLine, but returns [-1, -1] if the square is not empty.
var findWinningPiece = new Function("playBoard", "listToCheck"); // For a list of pieces finds the square that would make 3 in a row, if any.

// Button click functions and helper functions
var clearButtons = new Function(); // Helper function that sets all buttons not to display.
var levelSelect = new Function();
var mainMenu = new Function();
var nextLevel = new Function();
var playLevel = new Function("levelToPlay");
var practice = new Function();
var reset = new Function();
var start = new Function();
var watchCvC = new Function();

// Variable setting functions, called when the player clicks on a selection element
var changeDifficulty = new Function("newDifficulty");
var changeDifficulty2 = new Function("newDifficulty");
var changeInterval = new Function("newInterval");
var updateNumberOfGames = new Function();

// I/O
var userClicks = new Function("e", ""); // User click event handler. Places a player piece when the user clicks on an empty space.

// Drawing functions
var drawCanvas = new Function("printBoard", ""); // Main drawing function.
var drawBoard = new Function("printBoard", "squareWidth", "squareHeight", ""); // Draws the Tic Tac Toe board. Helper function to drawCanvas.
var drawO = new Function("squareX", "squareY", "squareWidth", "squareHeight", ""); // Draws an O. Helper function to drawBoard.
var drawX = new Function("squareX", "squareY", "squareWidth", "squareHeight", ""); // Draws an X. Helper function to drawBoard.

makeLevel = function(difficulty, levelSetup, levelText)
{
    this.difficulty=difficulty;
    this.levelSetup=levelSetup;
    this.levelText=levelText;
}

standardLevelSetup = function(playBoard, levelDifficulty, levelText)
{
    playBoard.makeBoard();
    aiDifficulty=levelDifficulty;
    currentText=levelText;
    isPlayerX=true;
    isCurrentPlayerX=isPlayerX;
}

levelOneSetup = function(playBoard)
{
    standardLevelSetup(playBoard, this.difficulty, this.levelText);
}

levelTwoSetup = function(playBoard)
{
    standardLevelSetup(playBoard, this.difficulty, this.levelText);
}

levelThreeSetup = function(playBoard)
{
    standardLevelSetup(playBoard, this.difficulty, this.levelText);
}

levelFourSetup = function(playBoard)
{
    standardLevelSetup(playBoard, this.difficulty, this.levelText);
}

levelFiveSetup = function(playBoard)
{
    standardLevelSetup(playBoard, this.difficulty, this.levelText);
}

levelSixSetup = function(playBoard)
{
    standardLevelSetup(playBoard, this.difficulty, this.levelText);
    isPlayerX=false;
    isCurrentPlayerX=true;
    computerMove(ticTacToeBoard, this.difficulty);
    isCurrentPlayerX=!isCurrentPlayerX;
}

levelSevenSetup = function(playBoard)
{
    standardLevelSetup(playBoard, this.difficulty, this.levelText);
    isPlayerX=false;
    isCurrentPlayerX=true;
    computerMove(ticTacToeBoard, this.difficulty);
    isCurrentPlayerX=!isCurrentPlayerX;
}

levelEightSetup = function(playBoard)
{
    standardLevelSetup(playBoard, this.difficulty, this.levelText);
    isPlayerX=false;
    isCurrentPlayerX=true;
    computerMove(ticTacToeBoard, this.difficulty);
    isCurrentPlayerX=!isCurrentPlayerX;
}

levelNineSetup = function(playBoard)
{
    standardLevelSetup(playBoard, this.difficulty, this.levelText);
    isPlayerX=false;
    isCurrentPlayerX=true;
    computerMove(ticTacToeBoard, this.difficulty);
    isCurrentPlayerX=!isCurrentPlayerX;
}

levelTenSetup = function(playBoard)
{
    standardLevelSetup(playBoard, this.difficulty, this.levelText);
    isPlayerX=false;
    isCurrentPlayerX=true;
    computerMove(ticTacToeBoard, this.difficulty);
    isCurrentPlayerX=!isCurrentPlayerX;
}

computerMove = function(playBoard, difficulty)
{
    /*
    Makes a move for the computer corresponding to the AI difficulty given. The difficulty 
    values are as follows:
    0: Places in the first open square sequentially starting from the top left.
    1: Places randomly.
    2: Wins if possible, otherwise plays randomly.
    3: First wins if possible. If not, checks for opponents' lines to block. If there are 
    none, plays randomly.
    4: Plays perfectly.
    */
    var hasMoved=false;
    var currentPlayersPieces = (isCurrentPlayerX) ? playBoard.XPositions : playBoard.OPositions;
    var currentOpponentsPieces = (isCurrentPlayerX) ? playBoard.OPositions : playBoard.XPositions;
    if(isCurrentPlayerX)
    {
        currentPlayersPieces=playBoard.XPositions;
        currentOpponentsPieces=playBoard.OPositions;
    }
    if(difficulty==0)
    {
        for(i=0; i<3; i++)
        {
            for(j=0; j<3; j++)
            {
                if((playBoard.board[i][j]==" ") && (!hasMoved))
                {
                    hasMoved=addCurrentPlayersPiece(playBoard, i, j); // Should always evaluate as true.
                }
            }
        }
    }
    else if(difficulty==1)
    {
        var squaresFromPlacement=Math.floor(Math.random() * playBoard.BlankSpacePositions.length);
        for(i=0; i<3; i++)
        {
            for(j=0; j<3; j++)
            {
                if((playBoard.isSquareEmpty(i, j)) && (!hasMoved))
                {
                    if(squaresFromPlacement==0)
                    {
                        hasMoved=addCurrentPlayersPiece(playBoard, i, j); // Should always evaluate as true.
                    }
                    else
                    {
                        squaresFromPlacement--;
                    }
                }
            }
        }
    }
    else if(difficulty==2)
    {
        var winningPiece=findWinningPiece(playBoard, currentPlayersPieces);
        if(winningPiece[0]!=-1)
        {
            hasMoved=addCurrentPlayersPiece(playBoard, winningPiece[0], winningPiece[1]); // Should always evaluate to true.
        }
        if(!hasMoved)
        {
            computerMove(playBoard, 1);
        }
    }
    else if(difficulty==3)
    {
        // First win if possible.
        var winningPiece=findWinningPiece(playBoard, currentPlayersPieces);
        if(winningPiece[0]!=-1)
        {
            hasMoved=addCurrentPlayersPiece(playBoard, winningPiece[0], winningPiece[1]); // Should always evaluate to true.
        }
        // Next check for squares to block.
        winningPiece=findWinningPiece(playBoard, currentOpponentsPieces);
        if((winningPiece[0]!=-1)&&(!hasMoved))
        {
            hasMoved=addCurrentPlayersPiece(playBoard, winningPiece[0], winningPiece[1]); // Should always evaluate to true.
        }
        if(!hasMoved)
        {
            computerMove(playBoard, 1);
        }
    }
    else if(difficulty==4)
    {
        /*
         * Psuedocode:
         * 
         * Check for wins and blocks, same as before.
         * Check for possible forks:
         *   For each pair of our pieces:
         *     For each blank space:
         *       For each piece in pair, check whether it makes an unblocked row with blank space
         *       Keep track of result
         *       If true for both pieces, place piece in space and set hasMoved=true.
         */
        // First win if possible.
        var winningPiece=findWinningPiece(playBoard, currentPlayersPieces);
        if(winningPiece[0]!=-1)
        {
            hasMoved=addCurrentPlayersPiece(playBoard, winningPiece[0], winningPiece[1]); // Should always evaluate to true.
        }
        // Next check for squares to block.
        winningPiece=findWinningPiece(playBoard, currentOpponentsPieces);
        if((winningPiece[0]!=-1)&&(!hasMoved))
        {
            hasMoved=addCurrentPlayersPiece(playBoard, winningPiece[0], winningPiece[1]); // Should always evaluate to true.
        }
        var listToCheck=currentPlayersPieces;
        // Next check for squares to fork.
        for(firstIndex=0; firstIndex<listToCheck.length; firstIndex++)
        {
            for(secondIndex=firstIndex+1; (secondIndex<listToCheck.length); secondIndex++)
            {
                for(blankSpaceIndex=0; (blankSpaceIndex<(playBoard.BlankSpacePositions).length)&&(!hasMoved); blankSpaceIndex++)
                {
                    var firstLineClear=(findEmptySquareInLine(playBoard, listToCheck[firstIndex], playBoard.BlankSpacePositions[blankSpaceIndex])[0]!=-1);
                    var secondLineClear=(findEmptySquareInLine(playBoard, listToCheck[secondIndex], playBoard.BlankSpacePositions[blankSpaceIndex])[0]!=-1);
                    if(firstLineClear&&secondLineClear)
                    {
                        hasMoved=addCurrentPlayersPiece(playBoard, playBoard.BlankSpacePositions[blankSpaceIndex][0], playBoard.BlankSpacePositions[blankSpaceIndex][1]);
                    }
                }
            }
        }
        listToCheck=currentOpponentsPieces;
        // Next check for squares to block a fork.
        var opponentForkSpaces=[];
        for(firstIndex=0; firstIndex<listToCheck.length; firstIndex++)
        {
            for(secondIndex=firstIndex+1; (secondIndex<listToCheck.length)&&(!hasMoved); secondIndex++)
            {
                for(blankSpaceIndex=0; blankSpaceIndex<(playBoard.BlankSpacePositions).length; blankSpaceIndex++)
                {
                    var firstLineClear=((findEmptySquareInLine(playBoard, listToCheck[firstIndex], playBoard.BlankSpacePositions[blankSpaceIndex])[0]!=-1));
                    var secondLineClear=((findEmptySquareInLine(playBoard, listToCheck[secondIndex], playBoard.BlankSpacePositions[blankSpaceIndex])[0]!=-1));
                    if(firstLineClear&&secondLineClear)
                    {
                        opponentForkSpaces.push(playBoard.BlankSpacePositions[blankSpaceIndex]);
                    }
                }
            }
        }
        if((opponentForkSpaces.length==1)&&(!hasMoved))
        {
            hasMoved=addCurrentPlayersPiece(playBoard, opponentForkSpaces[0][0], opponentForkSpaces[0][1]);
        }
        else if(opponentForkSpaces.length>1)
        {
            listToCheck=currentPlayersPieces;
            secondListToCheck=playBoard.BlankSpacePositions;
            for(firstIndex=0; firstIndex<listToCheck.length; firstIndex++)
            {
                for(secondListPosition=0; (secondListPosition<secondListToCheck.length)&&(!hasMoved); secondListPosition++)
                {
                    var squareInLine=findEmptySquareInLine(playBoard, listToCheck[firstIndex], secondListToCheck[secondListPosition]);
                    if((squareInLine[0]!=-1)&&(opponentForkSpaces.findIndex(isArrayEqual, squareInLine)==-1))
                    {
                        hasMoved=addCurrentPlayersPiece(playBoard, secondListToCheck[secondListPosition][0], secondListToCheck[secondListPosition][1]);
                    }
                }
            }
        }
        if(!hasMoved)
        {
            hasMoved=addCurrentPlayersPiece(playBoard, 1, 1);
        }
        var opponentsChar = (isCurrentPlayerX) ? "O" : "X";
        for(i=0; (i<constCornerSquares.length)&&(!hasMoved); i++)
        {
            if(playBoard.board[constCornerSquares[i][0]][constCornerSquares[i][1]]==opponentsChar)
            {
                hasMoved=addCurrentPlayersPiece(playBoard, 2-constCornerSquares[i][0], 2-constCornerSquares[i][1]);
            }
        }
        for(i=0; (i<constCornerSquares.length)&&(!hasMoved); i++)
        {
            hasMoved=addCurrentPlayersPiece(playBoard, constCornerSquares[i][0], constCornerSquares[i][1]);
        }
        if(!hasMoved)
        {
            computerMove(playBoard, 1);
        }
    }
    else
    {
        computerMove(playBoard, 0);
    }
    drawCanvas(); // Make sure board is properly drawn when we declare victory.
}

computerMoveCvC = function()
{
    var isGameStillGoing=true;
    if(isCurrentPlayerX)
    {
        computerMove(ticTacToeBoard, aiDifficulty);
    }
    else
    {
        computerMove(ticTacToeBoard, aiDifficulty2);
    }
    isCurrentPlayerX=!isCurrentPlayerX;
    if(ticTacToeBoard.gameOver)
    {
        gamesPlayed++;
        if(ticTacToeBoard.haveXsWon)
        {
            XWins++;
        }
        else if(ticTacToeBoard.haveOsWon)
        {
            OWins++;
        }
        if(gamesPlayed>=numberOfGames)
        {
            isGameStillGoing=false;
            if(aiPlayIntervalId!=0)
            {
                clearInterval(aiPlayIntervalId);
                aiPlayIntervalId=0;
            }
            declareVictory(ticTacToeBoard);
        }
        else
        {
            ticTacToeBoard=new makeBoard();
            isCurrentPlayerX=isPlayerX;
        }
        currentText="X wins: "+XWins+"\nO wins: "+OWins+"\nTie games:"+(gamesPlayed-XWins-OWins);
    }
    return isGameStillGoing;
}

var playCvCInstant = function()
{
    while(computerMoveCvC())
    { // Do nothing, computerMoveCvC() does it all.
    }
}

addCurrentPlayersPiece = function(playBoard, row, column)
{
    if(isCurrentPlayerX)
    {
        return playBoard.addX(row, column);
    }
    else
    {
        return playBoard.addO(row, column);
    }
}

declareVictory = function(playBoard)
{
    if(ticTacToeBoard.haveXsWon)
    {
        alert("Xs win!");
    }
    else if(ticTacToeBoard.haveOsWon)
    {
        alert("Os win!");
    }
    else if(ticTacToeBoard.isBoardFull())
    {
        alert("Tie game!");
    }
    else
    {
        return false
    }
    return true;
}

findSquareInLine = function(firstSquare, secondSquare)
{
    var returnArray = [-1, -1];
    if(firstSquare[0]==secondSquare[0])
    {
        for(i=0; i<3; i++)
        {
            if((firstSquare[1]!=i)&&(secondSquare[1]!=i))
            {
                returnArray = [firstSquare[0], i];
            }
        }
    }
    else if(firstSquare[1]==secondSquare[1])
    {
        for(i=0; i<3; i++)
        {
            if((firstSquare[0]!=i)&&(secondSquare[0]!=i))
            {
                returnArray = [i, firstSquare[1]];
            }
        }
    }
    else if((firstSquare[0]==firstSquare[1])&&(secondSquare[0]==secondSquare[1]))
    {
        for(i=0; i<3; i++)
        {
            if((firstSquare[0]!=i)&&(secondSquare[0]!=i))
            {
                returnArray = [i, i];
            }
        }
    }
    else if((firstSquare[0]==(2-firstSquare[1]))&&(secondSquare[0]==(2-secondSquare[1])))
    {
        for(i=0; i<3; i++)
        {
            if((firstSquare[0]!=i)&&(secondSquare[0]!=i))
            {
                returnArray = [i, (2-i)];
            }
        }
    }
    return returnArray;
}

findEmptySquareInLine = function(playBoard, firstSquare, secondSquare)
{
    var returnArray = [-1, -1];
    var squareInLine = findSquareInLine(firstSquare, secondSquare);
    if(squareInLine[0]!=-1)
    {
        if(playBoard.isSquareEmpty(squareInLine[0], squareInLine[1]))
        {
            returnArray=squareInLine;
        }
    }
    return returnArray;
}

findWinningPiece = function(playBoard, listToCheck)
{ /* Given a list of one player's Tic Tac Toe pieces, finds the one that will 
  make 3 in a row. Used by the AI to find spaces to place in to win or block. */
    var returnArray = [-1, -1];
    for(firstIndex=0; firstIndex<listToCheck.length; firstIndex++)
    {
        for(secondIndex=firstIndex+1; (secondIndex<listToCheck.length)&&(returnArray[0]==-1); secondIndex++)
        {
            var squareInLine = findEmptySquareInLine(playBoard, listToCheck[firstIndex], listToCheck[secondIndex]);
            if(squareInLine[0]!=-1)
            {
                returnArray=[squareInLine[0], squareInLine[1]];
            }
        }
    }
    return returnArray;
}

changeDifficulty = function(newDifficulty)
{
    aiDifficulty=newDifficulty;
}

changeDifficulty2 = function(newDifficulty)
{
    aiDifficulty2=newDifficulty;
}

changeInterval = function(newInterval)
{
    aiPlayInterval=newInterval;
}

updateNumberOfGames = function()
{
    numberOfGames=document.getElementById("numberOfGamesSelect").value;
    if(numberOfGames<=0)
    {
        numberOfGames=1;
        document.getElementById("numberOfGamesSelect").value=numberOfGames;
        alert("Error. Number of games cannot be less that one. Number of games set to one.");
    }
}

/*
The following functions each correspond to a certain button and are called when 
that button is pressed. All of these buttons correspond to a menu screen except 
for Reset and Start/Stop. These menu button functions show and hide buttons to 
create the new screen. The screens each menu screen can be reached from, as well 
as the screens that can be reached from it, are as follows.

Main menu: Shown by levelSelect(), playLevel(), practice(), and watchCvC(). Displays the buttons corresponding to levelSelect(), practice(), and watchCvC().
Practice: Shown by mainMenu(). Displays the buttons corresponding to mainMenu() and reset().
Level select: Shown by mainMenu() and playLevel(). Displays the buttons corresponding to mainMenu() and playLevel().
Play level: Shown by levelSelect() and playLevel(). Displays the buttons corresponding to mainMenu(), levelSelect(), playLevel(), and reset().
Watch CvC: Shown by mainMenu(). Displays the buttons corresponding to mainMenu(), reset(), and start().
Start: Shown by watchCvC().
Reset: Shown by playLevel(), practice(), and watchCvC().
*/

clearButtons = function()
{
    for(i=0; i<menuButtons.length; i++)
    {
        menuButtons[i].style.display="none";
    }
}

levelSelect = function()
{
    currentScreen="Level Select";
    currentText=levelSelectText;
    canPlayerMove=false;
    reset();
    clearButtons();
    for(i=0; i<levelButtons.length; i++)
    {
        levelButtons[i].style.display="inline";
    }
}

mainMenu = function()
{
    if(aiPlayIntervalId!=0)
    {
        clearInterval(aiPlayIntervalId);
        aiPlayIntervalId=0;
    }
    currentScreen="Main Menu";
    currentText=mainMenuText;
    canPlayerMove=false;
    reset();
    clearButtons();
    (document.getElementById("practice")).style.display="inline";
    (document.getElementById("levelSelect")).style.display="inline";
    (document.getElementById("watchCvC")).style.display="inline";
    for(i=0; i<levelButtons.length; i++)
    {
        levelButtons[i].style.display="none";
    }
}

nextLevel = function()
{
    reset();
    if(currentLevel+1<levelButtons.length)
    {
        playLevel(currentLevel+1);
    }
}

playLevel = function(levelToPlay)
{
    isCurrentPlayerX=isPlayerX;
    currentScreen="Level";
    currentLevel=levelToPlay;
    canPlayerMove=true;
    (document.getElementById("levelSelect")).style.display="inline";
    if(currentLevel+1<levelButtons.length)
    {
        (document.getElementById("nextLevel")).style.display="inline";
    }
    else
    {
        (document.getElementById("nextLevel")).style.display="none";
    }
    for(i=0; i<levelButtons.length; i++)
    {
        levelButtons[i].style.display="none";
    }
    if(levelToPlay<levels.length)
    {
        levels[levelToPlay].levelSetup(ticTacToeBoard);
    }
    else
    {
        levels[0].levelSetup(ticTacToeBoard);
        alert("Error, level not found. Playing level one.");
    }
}

practice = function()
{
    isCurrentPlayerX=isPlayerX;
    currentScreen="Practice";
    currentText=practiceText;
    canPlayerMove=true;
    isPlayerX=true;
    isCurrentPlayerX=isPlayerX;
    document.getElementById("difficultySelect").selectedIndex = aiDifficulty;
    clearButtons();
    document.getElementById("mainMenu").style.display="inline";
    document.getElementById("difficultySelect").style.display="inline";
}

reset = function()
{
    if(aiPlayIntervalId!=0)
    {
        clearInterval(aiPlayIntervalId);
        aiPlayIntervalId=0;
    }
    gamesPlayed=0;
    XWins=0;
    OWins=0;
    isCurrentPlayerX=isPlayerX;
    ticTacToeBoard=new makeBoard();
    if(currentScreen=="Level")
    {
        playLevel(currentLevel);
    }
}

start = function()
{
    if(aiPlayIntervalId==0)
    {
        if(ticTacToeBoard.gameOver)
        {
            reset();
        }
        if(aiPlayInterval==0)
        {
            playCvCInstant();
        }
        else
        {
            aiPlayIntervalId=setInterval(computerMoveCvC, aiPlayInterval);
        }
    }
    else
    {
        clearInterval(aiPlayIntervalId);
        aiPlayIntervalId=0;
    }
}

watchCvC = function()
{
    currentScreen="Watch CvC";
    currentText=playCvCText;
    document.getElementById("difficultySelect").selectedIndex = aiDifficulty;
    document.getElementById("difficultySelect2").selectedIndex = aiDifficulty2;
    aiPlayInterval=1000;
    document.getElementById("intervalSelect").selectedIndex = 1;
    gamesPlayed=0;
    XWins=0;
    OWins=0;
    clearButtons();
    document.getElementById("mainMenu").style.display="inline";
    (document.getElementById("reset")).style.display="inline";
    (document.getElementById("start")).style.display="inline";
    (document.getElementById("intervalSelect")).style.display="inline";
    (document.getElementById("difficultySelect")).style.display="inline";
    (document.getElementById("difficultySelect2")).style.display="inline";
    (document.getElementById("difficultySelectText")).style.display="inline";
    (document.getElementById("difficultySelectText2")).style.display="inline";
    (document.getElementById("numberOfGamesSelect")).style.display="inline";
}

userClicks = function(e)
{
    if((canPlayerMove==true)&&(!(ticTacToeBoard.gameOver)))
    {
        canPlayerMove=false;
        if((e.clientX>(boardXPosition)+canvasXPosition) && 
        (e.clientX<boardXPosition+canvasXPosition+(squareSideLength*3))
        && (e.clientY>boardYPosition+canvasYPosition) && 
        (e.clientY<boardYPosition+canvasYPosition+(squareSideLength*3)))
        {
            var userRowPlacement=Math.floor((e.clientY-boardYPosition-canvasYPosition)
            /squareSideLength);
            var userColumnPlacement=Math.floor((e.clientX-boardXPosition-canvasXPosition)
            /squareSideLength);
            var placementValid=false;
            placementValid=addCurrentPlayersPiece(ticTacToeBoard, userRowPlacement, userColumnPlacement);
            if(!placementValid)
            {
                return;
            }
            isCurrentPlayerX=!isCurrentPlayerX;
            declareVictory(ticTacToeBoard);
            if(!ticTacToeBoard.gameOver)
            {
                computerMove(ticTacToeBoard, aiDifficulty);
                isCurrentPlayerX=!isCurrentPlayerX;
                declareVictory(ticTacToeBoard);
            }
            else
            {
                // alert("Game over.");
            }
        }
        canPlayerMove=true;
    }
}

drawCanvas = function(printBoard)
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if((currentScreen=="Practice")||(currentScreen=="Level")||(currentScreen=="Watch CvC"))
    {
        drawBoard(printBoard, squareSideLength, squareSideLength);
    }
    ctx.font="30px Courier";
    var printText=currentText;
    var textHeight=30;
    var linesWritten=0;
    while(printText.indexOf("\n")!=-1)
    {
        ctx.fillText(printText.substr(0, printText.indexOf("\n")), (canvas.width)/2+canvasXPosition+boardXPosition, canvasYPosition+boardYPosition+(linesWritten*textHeight));
        printText=printText.substr(printText.indexOf("\n")+1);
        linesWritten++;
    }
    ctx.fillText(printText, (canvas.width)/2+canvasXPosition+boardXPosition, canvasYPosition+boardYPosition+(linesWritten*textHeight));
}

drawBoard = function(printBoard, squareWidth, squareHeight)
{
    ctx.beginPath();
    for(i=0; i<4; i++)
    {
        ctx.moveTo(boardXPosition, boardYPosition+(i*squareHeight));
        ctx.lineTo(boardXPosition+(squareWidth*3), boardYPosition+(i*squareHeight));
        ctx.stroke();
    }
    for(i=0; i<4; i++)
    {
        ctx.moveTo(boardXPosition+(i*squareWidth), boardYPosition);
        ctx.lineTo(boardXPosition+(i*squareWidth), boardYPosition+(squareHeight*3));
        ctx.stroke();
    }
    ctx.stroke();
    ctx.closePath();
    for(i=0; i<3; i++)
    {
        for(j=0; j<3; j++)
        {
            if(ticTacToeBoard.board[i][j]=="X")
            {
                drawX(boardXPosition+(j*squareWidth), boardYPosition+(i*squareHeight), 
                squareWidth, squareHeight);
            }
            else if(ticTacToeBoard.board[i][j]=="O")
            {
                drawO(boardXPosition+(j*squareWidth), boardYPosition+(i*squareHeight), 
                squareWidth, squareHeight);
            }
        }
    }
}

drawO = function(squareX, squareY, squareWidth, squareHeight)
{
    ctx.beginPath();
    ctx.arc(squareX+(squareWidth/2), squareY+(squareHeight/2), 
    (squareWidth*3/10), 0, Math.PI*2, true);
    ctx.stroke();
    ctx.closePath();
}

drawX = function(squareX, squareY, squareWidth, squareHeight)
{
    ctx.beginPath();
    ctx.moveTo(squareX+(squareWidth/5), squareY+(squareHeight/5));
    ctx.lineTo(squareX+(squareWidth*4/5), squareY+(squareHeight*4/5));
    ctx.stroke();
    ctx.moveTo(squareX+(squareWidth/5), squareY+(squareHeight*4/5));
    ctx.lineTo(squareX+(squareWidth*4/5), squareY+(squareHeight/5));
    ctx.stroke();
    ctx.closePath();
}

var levelOne=new makeLevel(0, levelOneSetup, levelOneText);
var levelTwo=new makeLevel(1, levelTwoSetup, levelTwoText);
var levelThree=new makeLevel(2, levelThreeSetup, levelThreeText);
var levelFour=new makeLevel(3, levelFourSetup, levelFourText);
var levelFive=new makeLevel(4, levelFiveSetup, levelFiveText);
var levelSix=new makeLevel(0, levelSixSetup, levelSixText);
var levelSeven=new makeLevel(1, levelSevenSetup, levelSevenText);
var levelEight=new makeLevel(2, levelEightSetup, levelEightText);
var levelNine=new makeLevel(3, levelNineSetup, levelNineText);
var levelTen=new makeLevel(4, levelTenSetup, levelTenText);
var levels=[levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix, levelSeven, levelEight, levelNine, levelTen];
document.getElementById("numberOfGamesSelect").value = 1;
updateNumberOfGames();
document.getElementById("myCanvas").addEventListener("click", userClicks);
document.getElementById("myCanvas").style.backgroundColor = 'rgb(158, 167, 184)';
setInterval(function() {
  drawCanvas(ticTacToeBoard);
}, 10);