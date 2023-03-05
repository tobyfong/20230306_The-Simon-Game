// Defining DOM Elements

const header = $("#level-title");
const body = $("body");

// Variables

let gameSequence = [];
let userSequence = [];

// -----------------------------------------------------------------

$(document).on("keydown", function() {

    //console.log("Check function initGame()");

    if (gameSequence.length === 0) {

        // Initialising Game

        nextSequence(); // Generates a random color, pushes to gameSequence Array & Updates to Current Level

        console.log("Check gameSequence Array:");
        console.log(gameSequence);

    } else if (header.text() === "Game Over, Press Any Key to Restart") {

        // Restarting Game

        gameSequence = [];
        userSequence = [];
        nextSequence();

    } else {

        console.log("Error");

    };

});

// Button Click Behaviour

$(".btn").on("click", buttonClick); //pushes selected color to userSequence and checks against corresponding index in gameSequence

// -----------------------------------------------------------------

// Function Declarations

function buttonClick() {

    const clickedColor = $(this).attr("id");

    console.log("Check Event id:" + clickedColor);

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

        console.log("Success --- NEXT Level");
        console.log("Check gameSequence Array:");
        console.log(gameSequence);
        console.log("Check userSequence Array:");
        console.log(userSequence);

    } else if (userSequence[userMostRecentAnswer] === gameSequence[userMostRecentAnswer]) {

        console.log("Success --- SAME Level");
        console.log("Check gameSequence Array:");
        console.log(gameSequence);
        console.log("Check userSequence Array:");
        console.log(userSequence);

    } else {

        gameEnd();

        console.log("Fail");
        console.log("Check gameSequence Array:");
        console.log(gameSequence);
        console.log("Check userSequence Array:");
        console.log(userSequence);

    };

};

function gameEnd() {

    // Play Wrong Sound
    const wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    // Animate Background Color
    body.addClass("red");

    // Remove Background Color
    setTimeout(function() {
        body.removeClass("red");
    }, 100);

    // Change Header Text
    header.text("Game Over, Press Any Key to Restart");

}

function nextSequence() {

    const ranNum = Math.floor(Math.random() * 4) + 1;

    // console.log("Check function NEW ranNumGen() : " + ranNum);

    const color = numToColor(ranNum);

    // console.log("Check NEW color: " + color);

    gameSequence.push(color);
    btnAction(color);

    header.text("Level " + gameSequence.length);

    console.log("Check gameSequence Array:");
    console.log(gameSequence);

}

function numToColor(number) {

    switch (number) {
        case 1:
            // console.log("Check Function numToColor - green");
            return "green";
            break;
        case 2:
            // console.log("Check Function numToColor - red");
            return "red";
            break;
        case 3:
            // console.log("Check Function numToColor - yellow");
            return "yellow";
            break;
        case 4:
            // console.log("Check Function numToColor - blue");
            return "blue";
            break;
        default:
            console.log("Key not recognised...");
    };

};

function btnAction(color) {

    // Play Correct Sound
    const correctSound = new Audio("sounds/" + color + ".mp3");
    correctSound.play();

    // Animate
    $("#" + color).addClass("pressed");

    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);

};