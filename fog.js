// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }

window.onload = function() {
    // Register a on click call back for every ingredient.
    document.querySelectorAll("img.ingredient").forEach(ingredient => {
        console.log(ingredient)
        ingredient.addEventListener('click', (event) => {
            ingredient.style.display = "none"
        });
    });
};
