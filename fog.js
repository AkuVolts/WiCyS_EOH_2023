// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }
window.onload = function() {
    let el = document.getElementsByClassName('ingredient_1')[0];

    el.addEventListener('click', (event) => {
        el.style.display = "none"
    });

};
