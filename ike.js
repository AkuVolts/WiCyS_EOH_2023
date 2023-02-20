// CONSTANTS
NETID = "squirrel7";

// FLAGS
laptop_interacted_flag = false;

function exitIke() {
    // TODO : Not exactly sure how they want to have the pages connected.
    //alert("This will return to main screen.");
    if (confirm("Would you like to return to leave Ikenberry Dining Hall?")) {
        // leave
    } else {
        // stay
    }
}

function laptop() {
    //alert("This will control the laptop.")
    laptop_interacted_flag = confirm("Interact with laptop?");
    //laptop_interacted_flag = true;
    // Do laptop stuff, start sniffer script, change netid, start capture & replace script.
    user_entry = prompt("Enter your netid"); // JUST TESTING constants and user entry, we probably shouldn't use prompt, or alert, or confirm. We need to create our own popups.
    if (user_entry == NETID) { 
        alert("They are the same.")
    } else {
        alert("They differ.")
    }
}

function swipeIn() {
    //alert("This will trigger the swipe in event.")
    if (laptop_interacted_flag) {
        alert("Awesome, now you have some meal credits on your account. Have a great meal!");
    } else {
        alert("Sorry, you have no more meal credits left on your account. You cannot enter the dining hall unless you pay for more credits.")
    }
}