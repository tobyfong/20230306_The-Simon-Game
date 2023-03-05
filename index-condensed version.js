const header = $("#level-title");
const body = $("body");

let gameSequence = [];
let userSequence = [];

$(document).on("keydown", function() {
    if (gameSequence.length === 0) {
        nextSequence(); // Generates a random color, pushes to gameSequence Array & Updates to current Level.
    } else if (header.text() === "Game Over, Press Any Key to Restart") {
        gameSequence = [];
        userSequence = [];
        nextSequence();
    } else {
        console.log("Error");
    };
});

$(".btn").on("click", buttonClick); //pushes selected color to userSequence and checks against corresponding index in gameSequence

function buttonClick() {
    const clickedColor = $(this).attr("id");
    userSequence.push(clickedColor);
    btnAction(clickedColor);
    checkAnswer(userSequence.length - 1);
}

function checkAnswer(userMostRecentAnswer) { // Receives user's most recent answer and checks against the gameSequence array's corresponding value
    if ((userSequence[userMostRecentAnswer] === gameSequence[userMostRecentAnswer]) && (gameSequence.length === userSequence.length)) {
        userSequence = [];
        setTimeout(function() {
            nextSequence();
        }, 1000);
    } else if (userSequence[userMostRecentAnswer] === gameSequence[userMostRecentAnswer]) {
        console.log("Success --- SAME Level");
    } else {
        gameEnd();
    };
};

function gameEnd() {
    const wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    body.addClass("red");
    setTimeout(function() {
        body.removeClass("red");
    }, 100);
    header.text("Game Over, Press Any Key to Restart");
}

function nextSequence() {
    const ranNum = Math.floor(Math.random() * 4) + 1;
    const color = numToColor(ranNum);
    gameSequence.push(color);
    btnAction(color);
    header.text("Level " + gameSequence.length);
}

function numToColor(number) {
    switch (number) {
        case 1:
            return "green";
            break;
        case 2:
            return "red";
            break;
        case 3:
            return "yellow";
            break;
        case 4:
            return "blue";
            break;
        default:
            console.log("Key not recognised...");
    };
};

function btnAction(color) {
    const correctSound = new Audio("sounds/" + color + ".mp3");
    correctSound.play();

    $("#" + color).addClass("pressed");

    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
};