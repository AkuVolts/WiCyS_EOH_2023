function exitIke() {
    // TODO
    //alert("This will return to main screen.");
    if (confirm("Would you like to return to leave Ikenberry Dining Hall?")) {
        // leave
    } else {
        // stay
    }
}

laptop_interacted_flag = false;

function laptop() {
    //alert("This will control the laptop.")
    laptop_interacted_flag = confirm("Interact with laptop?");
    //laptop_interacted_flag = true;
}

function swipeIn() {
    //alert("This will trigger the swipe in event.")
    if (laptop_interacted_flag) {
        alert("Awesome, you have some meals left on your account. Have a good lunch!");
    } else {
        alert("Sorry, you have no more meals left on your account. You cannot enter the dining hall unless you pay for more meals.")
    }
}