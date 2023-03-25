// CONSTANTS
NETID = "squirrel7";

// FLAGS
laptop_interacted_flag = false;
valid_credits_flag = false;
const valid_number_credits = 10;
var netid_credits = {};
var current_netid = '';


function exitIke() {
    // TODO : Not exactly sure how they want to have the pages connected.
    //alert("This will return to main screen.");
    if (confirm("Would you like to leave Ikenberry Dining Hall?")) {
        // leave
        window.location.href = "./main_page_html";
    } else {
        // stay
    }
}

// function laptop() {
//     //alert("This will control the laptop.")
//     //laptop_interacted_flag = confirm("Interact with laptop?");
//     //laptop_interacted_flag = true;
//     // Do laptop stuff, start sniffer script, change netid, start capture & replace script.
//     createLaptop();
//     //user_entry = prompt("Enter your netid"); // JUST TESTING constants and user entry, we probably shouldn't use prompt, or alert, or confirm. We need to create our own popups.
//     // add eventListener for submit button and intercept button
// }

function swipeIn() {
    //alert("This will trigger the swipe in event.")
    alert(current_netid);
    if (valid_credits_flag) {
        alert("Awesome, now you have some meal credits on your account. Have a great meal!");
    } else {
        alert("Sorry, you do not have enough meal credits left on your account. You cannot enter the dining hall unless you pay for more credits.")
    }
}

function interceptPacket() {
    // create the overlay div element
    var overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "9999";

    // create the image element
    var img = document.createElement("img");
    img.src = "./ike_images/intercept.png";
    img.style.position = "absolute";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";
    img.style.width = "80%";
    img.style.height = "auto";

    // add text on image
    var text = document.createElement("p");
    text.innerHTML = "Intercepting...";
    text.style.position = "absolute";
    text.style.top = "50%";
    text.style.left = "50%";
    text.style.transform = "translate(-50%, -50%)";
    text.style.zIndex = "10000";
    text.style.color = "white";
    text.style.fontSize = "30px";
    text.style.fontWeight = "bold";
    text.style.textAlign = "center";
    text.style.width = "100%";
    text.style.marginTop = "10px";

    // button at bottom of page to return to laptop
    var button = document.createElement("button");
    button.innerHTML = "Exit";
    button.style.position = "absolute";
    button.style.bottom = "0";
    button.style.left = "0";
    button.style.width = "100%";
    button.style.height = "50px";
    button.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    button.style.color = "white";
    button.style.fontSize = "20px";
    button.style.fontWeight = "bold";
    button.style.border = "none";
    button.style.zIndex = "10000";
   
    button.onclick = function () {
        document.body.removeChild(overlay);
    };

    // add the text element to the overlay div
    overlay.appendChild(text);
    overlay.appendChild(button);

    // add the image element to the overlay div
    overlay.appendChild(img);

    // add the overlay div to the document body
    document.body.appendChild(overlay);

    // wait 5 seconds and capture netids
    setInterval(function() {
        // Define arrays of possible first and last names
        const firstNames = ["Emma", "Noah", "Olivia", "Liam", "Ava", "William", "Sophia", "Mason", "Isabella", "James"];
        const lastNames = ["Smith", "Johnson", "Brown", "Taylor", "Miller", "Wilson", "Moore", "Davis", "Garcia", "Jackson"];

        // Define a function to generate a random integer between min and max (inclusive)
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let firstNameIndex = getRandomInt(0, firstNames.length - 1);
        let lastNameIndex = getRandomInt(0, lastNames.length - 1);
        let fullName = `${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`;
        let netid = firstNames[firstNameIndex][0].toLowerCase() + lastNames[lastNameIndex].toLowerCase() + getRandomInt(1, 10);
        // create random number of credits
        var random_credits = Math.floor(Math.random() * 15);
        // add netid and credits to dictionary
        netid_credits[netid] = random_credits;
        // print name, netid, credits to page
        text.innerHTML = "Intercepting...<br>Intercepted!<br><br>Name: " + fullName + "<br>NetID: " + netid + "<br>Credits: " + random_credits;
        text.style.marginTop = "0px";
    }, 5000);
    
}

function laptop() {
    // create the overlay div element
    var overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.zIndex = "9999";

    // create the image element
    var img = document.createElement("img");
    img.src = "./ike_images/laptop_screen.png";
    img.style.position = "absolute";
    img.style.top = "50%";
    img.style.left = "50%";
    img.style.transform = "translate(-50%, -50%)";
    img.style.width = "80%";
    img.style.height = "auto";

    // create the form element
    var form = document.createElement("form");
    form.style.position = "absolute";
    form.style.top = "50%";
    form.style.left = "50%";
    form.style.transform = "translate(-50%, -50%)";
    form.style.zIndex = "10000";

    // create the text input element
    var input = document.createElement("input");
    input.type = "text";
    input.name = "NetID";
    input.placeholder = "Enter netid...";
    input.style.display = "block";
    input.style.width = "100%";
    input.style.marginBottom = "10px";

    // create the submit button element
    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = "Submit";
    submit.style.display = "block";
    submit.style.width = "100%";

    // Create packet intercept button element
    var intercept = document.createElement("input");
    intercept.type = "button";
    intercept.value = "Intercept";
    intercept.style.display = "block";
    intercept.style.width = "100%";

    // Create exit latop button element
    var exit = document.createElement("input");
    exit.type = "button";
    exit.value = "Exit";
    exit.style.display = "block";
    exit.style.width = "100%";

    // add the text input and submit button elements to the form
    form.appendChild(input);
    form.appendChild(submit);
    form.appendChild(intercept);
    form.appendChild(exit);

    // add the image and form elements to the overlay div
    overlay.appendChild(img);
    overlay.appendChild(form);

    // add the overlay div to the document body
    document.body.appendChild(overlay);

    // add event listener to intercept and submit button
    overlay.addEventListener("click", function (e) {
        if (e.target.value == "Intercept") {
            interceptPacket();
        } else if (e.target.value == "Submit") {
            // check value of credits using netid
            if (netid_credits[input.value] != undefined) {
                if (netid_credits[input.value] >= 10) {
                    valid_credits_flag = true;
                    current_netid = input.value;
                }
            } else {
                alert("NetID not found.");
            }
        } else if (e.target.value == "Exit") {
            document.body.removeChild(overlay);
        }
    })
}