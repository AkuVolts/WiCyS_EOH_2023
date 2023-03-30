const game_canvas = document.getElementById("myCanvas");
  const game_context = game_canvas.getContext("2d");
  let scene_pic;
  function start() {
    scene_pic = loadBackground("images/main_page_map.png");

    setInterval(update, 20)  // infinite loop, runs every 2 ms

  }


  /**
   * Initial loading of background (image takes up the entire canvas space).
   * Loads the image into the page. Must be called prior to drawing or will face the problem
   * of the image not always displaying when the page is opened/refreshed.
   * 
   * @param img_url String representing the path to the image
   * @return Object representing the background image
   */
   function loadBackground(img_url) {
    const background_img = new Image();
    background_img.src = img_url;

    // load images first
    // - Note: the following line is needed to fix the problem of the background img not always
    // displaying when the page is refreshed
    // - Source: https://stackoverflow.com/questions/22889641/simple-html5-canvas-image-not-displaying
    background_img.addEventListener("load", drawBackground, false);

    function drawBackground() {}

    return background_img;
  }


  /**
   * Draws the image in the specified location. Is needed for redrawing images in the
   * infinite loop that updates the game visuals.
   * 
   * @param img Object representing the image
   * @param x Integer representing the x-coordinate of where the image should be positioned in the canvas
   * @param y Integer representing the y-coordinate of where the image shoudl be positioned in the canvas
   * @param width Integer representing the width of the image
   * @param height Integer representing the height of the image
   */
   function draw(img, x, y, width, height) {
    game_context.drawImage(img, sx=x, sy=y, swidth=width, sheight=height);
  }


  /**
   * Updates game visuals and stats.
   */
  function update() {
    // step 1 - clear the canvas
    clearCanvas();
    draw(scene_pic, 0, 0, 700, 500);
  }


  function clearCanvas() {
    // clears everything on the canvas
    game_context.clearRect(0, 0, 700, 500);
  }

  

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



