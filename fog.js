const states = createEnum(['START', 'LEVEL_IN_PROGRESS', 'LEVEL_COMPLETE']);
const solved = document.getElementById("solved");
const wrongans = document.getElementById("wrong_answer");
const sizzle = document.getElementById("sizzle");

let level = -1;
let state = states.START;

function loadJSON(callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', 'ingredients.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == "200") {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}

var questions;
var correct_ingredients;
var all_ingredients;
var NUM_LEVELS;

const selected_ingredients = new Set();

// Hack to implement "enums" in JS.
// https://masteringjs.io/tutorials/fundamentals/enum
function createEnum(values) {
    const enumObject = {};
    for (const val of values) {
      enumObject[val] = val;
    }
    return Object.freeze(enumObject);
}

function initGameState() {
    level = 0;
    score = 0;
    NUM_LEVELS = questions.length;
    startLevel();
}

window.onload = function () {
    loadJSON(function(response) {
        const ingredients = JSON.parse(response);
        questions = ingredients.questions;
        correct_ingredients = ingredients.correct_ingredients.map(set => new Set(set));
        all_ingredients = ingredients.all_ingredients.map(map => new Map(Object.entries(map)));
    });
    document.getElementById("startGameDialog").showModal();
}

function gameStart() {
    document.getElementById("startGameDialog").close();
    initGameState();

    // Register a on click call back for every ingredient.
    document.querySelectorAll("div.ingredient_div").forEach(ingredient => {
        ingredient.addEventListener('click', (event) => {
            if (state !== states.LEVEL_IN_PROGRESS) {
                return
            }
            // Looks up the image by thetop tag with the right class nested inside the right id.
            let ingredient_display = document.querySelector("#"+ingredient.id + " img.ingredient_disabled")
            if (!selected_ingredients.has(ingredient.id)) {
                selected_ingredients.add(ingredient.id);
                ingredient_display.style.display = "block";
                document.getElementById("chosen_"+ingredient.id).style.display = "block";
                sizzle.play();
            }
            else {
                selected_ingredients.delete(ingredient.id)
                ingredient_display.style.display = "none"
                document.getElementById("chosen_"+ingredient.id).style.display = "none"
            }
            // console.log(selected_ingredients)
        });
    });

    const dialog = document.getElementById("resultDialog");
    dialog.addEventListener("close", (event) => {
        startLevel();
    });
};

function setAnswerFields() {
    for (const [ing_id, text] of all_ingredients[level]) {
        console.log(ing_id + " " + text)
        document.getElementById(ing_id).querySelector(".ingredient_text").textContent = text;
    }
}

// Just goes through the submitted and correct ingredients. Returns true if they all match.
function checkSubmission(selected_ingredients, correct_ingredients) {
    let submission_correct = true;

    if (correct_ingredients[level].size !== selected_ingredients.size) {
        return false;
    }

    for (const ingredient of selected_ingredients) {
        if (!correct_ingredients[level].has(ingredient)) {
            submission_correct = false;
            break;
        }
    }

    return submission_correct;
}

function submitButtonOnclick() {
    // Check if the user passed the level. Update level and score if so.
    if (level == -1) {
        return;
    }
    let level_passed = checkSubmission(selected_ingredients, correct_ingredients);
    if (level_passed) {
        level++;
    }

    let buttonMsg = level_passed ? "Start Next Level" : "Retry Level"; 
    let msg = level_passed ? "Congratulations, you passed the level! Click the button below to begin the next one." 
        : "That was not quite right. Please click the button below to try again.";
    let sound = level_passed ? solved : wrongans;
    if (level >= NUM_LEVELS) {
        buttonMsg = "Restart Game";
        msg = "Congratulations, you have completed Fields of Green! You are one step closer to protecting yourself in cyberspace!";
        document.getElementById('returnMainPageButton').style.display = 'inline';
        level = 0;
    }
    
    document.getElementById("level").textContent = "Level: " + (level + 1);
    document.getElementById("resultDialogText").textContent = msg;
    document.getElementById("resultDialogButton").textContent = buttonMsg;  
    sound.play();
    document.getElementById("resultDialog").showModal();
    // Display end game indicator if won. Otherwise, toggle buttons.

    state = states.LEVEL_COMPLETE;
}

function startLevelDialogOnClick() {
    const dialog = document.getElementById("resultDialog");
    dialog.close();
}

function returnMainPageOnClick() {
    let event = new CustomEvent("IframeClickEvent");
    window.parent.document.dispatchEvent(event);
}

function startLevel() {
    // Clear the level state (i.e. selected elements, score from this level).
    // Clear the display state of the selected elements.
    for (const ingredient of selected_ingredients) {
        // console.log("#"+ingredient + " img.ingredient_disabled")
        document.querySelector("#"+ingredient + " img.ingredient_disabled").style.display = "none";
        document.getElementById("chosen_"+ingredient).style.display = "none";
    }
    selected_ingredients.clear();
    document.getElementById("level").textContent = "Level: " + (level + 1);
    document.getElementById("questionText").textContent = `Question ${level+1}: ${questions[level]}`;
    setAnswerFields();

    // Start level.
    state = states.LEVEL_IN_PROGRESS;
}

// TODO:
// End level indicator
// End game indicator
// Salad bowl
// Score and level indicators
// Text for ingredients
// Load game config from json?
// Randomize ingredient order?
// Better image assets