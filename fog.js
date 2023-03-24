const NUM_LEVELS = 3

const states = createEnum(['START', 'LEVEL_IN_PROGRESS', 'LEVEL_COMPLETE']);

let level = 0;
let state = states.START;

// TODO: Convert next two lines into JSON file.
const all_ingredients = [new Map([['ingredient_1', 'a'], ['ingredient_2', 'b']])];
const correct_ingredients = [new Set(['ingredient_1', 'ingredient_4']), new Set(['ingredient_3', 'ingredient_2']), new Set(['ingredient_5'])];
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
    state = states.LEVEL_IN_PROGRESS
}

window.onload = function() {
    initGameState();

    // Register a on click call back for every ingredient.
    document.querySelectorAll("div.ingredient_div").forEach(ingredient => {
        ingredient.addEventListener('click', (event) => {
            if (state !== states.LEVEL_IN_PROGRESS) {
                return
            }
            // Looks up the image by the tag with the right class nested inside the right id.
            let ingredient_display = document.querySelector("#"+ingredient.id + " img.ingredient_disabled")
            if (!selected_ingredients.has(ingredient.id)) {
                selected_ingredients.add(ingredient.id)
                ingredient_display.style.display = "block"
                document.getElementById("chosen_"+ingredient.id).style.display = "block"
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
    let level_passed = checkSubmission(selected_ingredients, correct_ingredients);
    if (level_passed) {
        level++;
    }

    let buttonMsg = level_passed ? "Start Next Level" : "Retry Level"; 
    let msg = level_passed ? "Congratulations, you passed the level! Click the button below to begin the next one." 
        : "That was not quite right. Please click the button below to try again.";
    if (level >= NUM_LEVELS) {
        buttonMsg = "Restart Game";
        msg = "Congratulations, you have completed Fields of Green! You are one step closer to protecting yourself in cyberspace!";
        level = 0;
    }
    
    document.getElementById("level").textContent = "Level: " + level;
    document.getElementById("resultDialogText").textContent = msg;
    document.getElementById("resultDialogButton").textContent = buttonMsg;     
    document.getElementById("resultDialog").showModal();
    // Display end game indicator if won. Otherwise, toggle buttons.

    state = states.LEVEL_COMPLETE;
}

function startLevelDialogOnClick() {
    const dialog = document.getElementById("resultDialog");
    dialog.close();
}

function startLevel() {
    // Clear the level state (i.e. selected elements, score from this level).
    // Clear the display state of the selected elements.
    for (const ingredient of selected_ingredients) {
        // console.log("#"+ingredient + " img.ingredient_disabled")
        document.querySelector("#"+ingredient + " img.ingredient_disabled").style.display = "none";
        document.getElementById("chosen_"+ingredient).style.display = "none"
    }
    selected_ingredients.clear();

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