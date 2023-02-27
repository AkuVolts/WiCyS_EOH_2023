// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }

const NUM_LEVELS = 3

const states = createEnum(['START', 'LEVEL_IN_PROGRESS', 'LEVEL_COMPLETE']);

let level = 0;
let score = 0;
let state = states.START;

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
    state = states.START

    document.getElementById("start_level").disabled = false;
    document.getElementById("submit").disabled = true;
}

window.onload = function() {
    initGameState();

    // Register a on click call back for every ingredient.
    document.querySelectorAll("img.ingredient").forEach(ingredient => {
        ingredient.addEventListener('click', (event) => {
            ingredient.style.display = "none"
        });
    });
};

function submit_button_onclick() {
    // Check if the user passed the level. Update level and score if so.
    
    // Enable next and disable submit buttons.
    document.getElementById("start_level").disabled = false;
    document.getElementById("submit").disabled = true;
    state = states.LEVEL_COMPLETE;

}

function start_level_button_onclick() {
    // Clear the level state (i.e. selected elements, score from this level).

    // Disable next and enable submit buttons.
    document.getElementById("start_level").disabled = true;
    document.getElementById("submit").disabled = false;

    // Start level.
    state = states.LEVEL_IN_PROGRESS;
}