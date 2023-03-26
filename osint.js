function start(){
    // squirrel enters
    displayText("Wow, it's my lucky day! Is that an i-card I see?");
    // Click on the icard
    grab_icard();
    displayCutAhead();
    lunchLadyStart();

}

function displayText(input) {

}

function displayThoughtBubble(input) {

}

function displayInput(input) {

}

function typeAnswer(input) {

}


function grab_icard() {
    // the card attaches to the squirrel
}

function displayCutAhead() {
    // frog says 
    displayText("Oh hey Squirrel! You can go ahead of me.");
    
}

function lunchLadyStart() {
    // lunchlady repsonds,
    displayText("Good Morning! Do you have your i-card with you?");
    // squirrel repsonds, 
    displayText("Yeah, here you go!");
    giveToLunchLady();
    // she responds,
    displayText("Hmm, this i-card is ripped up! You can only enter if yu get these, questions correct 'Daphne Dog'. I can see if you're lying or not!");
    // Squirrel responds, 
    displayText("Okay!");
    // Lunch lady says:
    displayText("What's your major?");
    displayThoughtBubble("Let me use my phone to see if I can find some information about this person");
    firstQuestion();

}

function giveToLunchLady() {
    // gives icard to lunch lady
    // swipes card
}


function firstQuestion() {
    // clicks phone to open
    // opens up linkedin app

        displayInput("Try to find the major from this page!")
        optionOnPhone();
        // repsonse to lunch lady: 
        typedFirstResponse();

}



function optionOnPhone() {
    // Click this if you know the answer.
}

function typedFirstResponse() {
    displayInput("My major is ____.")
    // not case sensitive type:
    typeAnswer();
    // math
    // if correct {
    nextQuestion();
    // } else {
        // Try Again!
        firstQuestion();
    // }

}

function nextQuestion() {
    // lunch lady says
    displayText("What's your id number?")
    displayThoughtBubble("Oh no, I only have the first 8 numbers to my id. Let me find the last two");
    // clicks phone to open
    // opens up email app
    // if something else is clicked: 
    oopsTryAgain();
    // } else {
        displayInput("Try to find the id number from this page!")
        optionOnPhone();
        // clicks phone
        // repsonse to lunch lady: 
        typedSecondResponse();
    // }

}

function typedSecondResponse() {
    displayInput("My id number is 97820234__.")
    typeAnswer();
    // 12
    // if correct {
    answerToLunchLady();
    // } else {
        // Try Again!
        nextQuestion();
    // }

}

function worryBubble() {
    // squirrel finds out he only has first 8 numbers. looks on phone again
}

function answerToLunchLady() {
    // lucnh lady says
    displayText("looks like you are Daphne Dog! You may enter.")
    walkIn()
}

function walkIn() {
    // squirrel walks in!
}



