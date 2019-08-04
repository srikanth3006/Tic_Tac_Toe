// Define necessary variables
var squares = $('td');
var start = $('#start');
var restart = $('#restart');
var game_on = false;
var won = "";
var player1 = '';
var player2 = '';
var turn = player1;


// Restart Game button

$('#restart').on('click', function () {
    for (var i=0; i < squares.length;i++) {
        squares[i].textContent = '';
    }
    $(this).attr("disabled", true);
    start.attr("disabled", false);
    start.text("Start the Game!");
    game_on = false;
    disable_table()
})

function disable_table() {
    if (game_on === false) {
        for (var i=0;i<squares.length;i++) {
            squares.eq(i).attr("disabled", "disabled")
        }
    }
    else {
        for (var i=0;i<squares.length;i++) {
            squares.eq(i).attr("disabled", false)
        }
    }
}

// Start the game!

$('#start').on('click', function () {
    game_on = true
    restart.attr("disabled", false);
    $(this).attr("disabled", true);
    $(this).text("Game Started!");
    player1 = prompt("Please enter the name of player1");
    player2 = prompt("Please enter the name of player2");
    $('h3').html("It is " + player1 + " turn")
    turn = player1
})


// Input the X or O values

squares.click(changeMarker)

function changeMarker() {
    if (game_on === false) {
        alert("Please click on Start the Game!")
        return;
    }
    if (this.textContent === 'X' || this.textContent === 'O') {
        alert("This field is already Occupied");
        return;
    }
    if (this.textContent === '') {
        if (turn === player1) {
            this.textContent = 'X';
        }
        else {
            this.textContent = 'O';
        }
    }
    console.log(turn + " selected");

    if (winner() === true) {
        console.log(turn + " is the Winner");
        alert(turn + " is the Winner");
        $('h3').html(turn + " is the Winner. Please restart the game.");
        game_on = false;
        disable_table()
    }

    if (tableFull() === true && game_on === true) {
        $('h3').html("Table is Full. Please restart the game.");
        alert("Table is Full. Please restart your game");
        game_on = false;
    }

    if (turn === player1) {
        turn = player2
    }
    else {
        turn = player1
    }
    $('h3').html("It is " + turn + " turn")
}


// Check for winning
function checkTable(p1, p2, p3) {
    if (squares.eq(p1).text() === squares.eq(p2).text() &&
        squares.eq(p2).text() === squares.eq(p3).text() &&
        squares.eq(p1).text() != '') {
        return true
    }
    return false

}

// Check if table is Full
function tableFull() {
    for (var i=0; i< squares.length;i++) {
        if (squares.eq(i).text() === '') return false;
    }
    return true;
}


function winner() {

    return checkTable(0, 1, 2)
        || checkTable(3, 4, 5)
        || checkTable(6, 7, 8)
        || checkTable(0, 3, 6)
        || checkTable(1, 4, 7)
        || checkTable(2, 5, 8)
        || checkTable(0, 4, 8)
        || checkTable(6, 4, 2)
}