// CONSTANTS
NETID = "squirrel7";
const valid_number_credits = 10;

// FLAGS
laptop_interacted_flag = false;
valid_credits_flag = false;
failed_swipe = false;
default_text_up = true;
player_bubble_up = true;

// GLOBAL VARS
hints_available = 2;
current_hint = 0;
var netid_credits = {};

function exitIke() {
    // TODO : Not exactly sure how they want to have the pages connected.
    //alert("This will return to main screen.");
    if (confirm("Would you like to leave Ikenberry Dining Hall?")) {
        // leave
        let event = new CustomEvent("IframeClickEvent");
        window.parent.document.dispatchEvent(event);
    } else {
        // stay
    }
}

function swipeIn() {
    //alert("This will trigger the swipe in event.")
    var b_text = "";
    if (valid_credits_flag) {
        b_text = "Awesome, now you have some meal credits on your account. Have a great meal!"
        s_text = "Nice work! We made it inside! Let's go eat!"
    } else {
        let mySound = new Audio('sounds/ike_denied.wav')
        mySound.play()
        //alert("Sorry, you do not have enough meal credits left on your account. You need at least 10 credits to enter. You cannot enter the dining hall unless you pay for more credits.")
        if (!failed_swipe) {
            failed_swipe = true;
            hints_available += 1;
        }
        b_text = "Sorry, the system says you do not have enough meal credits left on your account. You need at least 10 credits to enter. You cannot enter the dining hall unless you pay for more credits."
        s_text = "We don't have enough credits left on our account to get a meal. But maybe we can trick the system into letting us inside?"
    }
    var b = document.getElementById("bubbleDIV");
    var b2 = document.getElementById("bubbleDIV2");
    b.style.display = "block";
    b2.style.display = "block";
    var O_s_text = document.getElementById("OsquirrelText");
    O_s_text.innerHTML = b_text;
    var text = document.getElementById("squirrelText");
    text.innerHTML = s_text;
    setTimeout(function() {
        // WAIT and then hide attendant speech bubble.
        b2.style.display = "none";
        setTimeout(function() {
            // Wait and then hide player speech bubble.
            b.style.display = "none";
        }, 4000);
    }, 6500);
    
    
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
    button.value = "Exit";
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
   

    // add the text element to the overlay div
    overlay.appendChild(text);
    overlay.appendChild(button);

    // add the image element to the overlay div
    overlay.appendChild(img);

    // add the overlay div to the document body
    document.body.appendChild(overlay);

    // wait 5 seconds and capture netids
    var interval = setInterval(function() {
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
        let netid = firstNames[firstNameIndex][0].toLowerCase() + lastNames[lastNameIndex].toLowerCase() + getRandomInt(1, 100);
        // create random number of credits
        var random_credits = Math.floor(Math.random() * 15 + 1);
        // add netid and credits to dictionary
        netid_credits[netid] = random_credits;
        // print name, netid, credits to page
        text.innerHTML = "Intercepting...<br>Intercepted!<br><br>Name: " + fullName + "<br>NetID: " + rotc13(netid) + "<br>Credits: " + random_credits;
        text.style.marginTop = "0px";
        let mySound = new Audio("./sounds/ike_scanner.wav");
        mySound.volume = 0.6;
        mySound.play();
    }, 5000);

    // event listener for exit button
    overlay.addEventListener("click", function(e) {
        if (e.target.value == "Exit") {
            clearInterval(interval);
            document.body.removeChild(overlay);
        }
    });
    
}

function rotc13(netid){
    let rotcid = '';
    for (let i = 0; i < netid.length; i++) {
       if(netid[i]>='a' && netid[i]<='z'){
        rotcid += String.fromCharCode(((netid[i].charCodeAt(0)-97)+13)%26 + 97);
       }
       else{
        rotcid+=netid[i];
       }
    }
    console.log(rotcid);
    return rotcid;
}
function laptop() {
    if (!laptop_interacted_flag) {
        laptop_interacted_flag = true;
        // hints_available += 1;
    }
    
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

    var text_box = document.createElement("p");
    text_box.style.position = "relative";
    text_box.style.top = "15%";
    text_box.style.left = "20%";
    text_box.style.display = "block";
    text_box.style.type = "text";
    text_box.style.fontSize = "12px";
    text_box.style.width = "200px";
    text_box.style.border = "2px solid #000000";
    text_box.style.padding = "2px";
    text_box.innerText = "We can use these programs to intercept and change network packets! The intercept program will intercept packets and display the important data inside. Then submit the necessary data to change the packet!"                          // -------------------- TODO -------------------

    var second_box = document.createElement("p");
    second_box.style.position = "relative";
    second_box.style.top = "39%";
    second_box.style.left = "20%";
    second_box.style.display = "block";
    second_box.style.type = "text";
    second_box.style.fontSize = "12px";
    second_box.style.width = "400px";
    second_box.style.border = "2px solid #000000";
    second_box.style.padding = "2px";
    second_box.innerText = "Something about those netids looks strange. Could it be a code? It reminds me of something called...ROT13... That is, \'rotation by 13 places\'..."                          // -------------------- TODO -------------------
    second_box.hidden = "hidden";


    var response_box = document.createElement("p");
    response_box.style.position = "absolute";
    response_box.style.top = "25%";
    response_box.style.left = "60%";
    response_box.style.display = "none";
    response_box.style.type = "text";
    response_box.style.fontSize = "12px";
    response_box.style.width = "100px";
    response_box.style.padding = "2px";

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
    submit.id = "submit";
    submit.type = "button";
    submit.value = "Submit";
    submit.style.display = "block";
    submit.style.width = "100%";

    // Create packet intercept button element
    var intercept = document.createElement("input");
    intercept.id = "intercept";
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
    overlay.appendChild(text_box);
    overlay.appendChild(response_box);
    overlay.appendChild(form);

    // add the overlay div to the document body
    document.body.appendChild(overlay);

    // add event listener to intercept and submit button
    overlay.addEventListener("click", function (e) {
        if (e.target.value == "Intercept") {
            interceptPacket();
            overlay.appendChild(second_box);
        } else if (e.target.id == "submit") {
            // check value of credits using netid
            if (netid_credits[input.value] != undefined ) {
                if (netid_credits[input.value] >= 10) {
                    valid_credits_flag = true;
                    response_box.style.display = "block";
                    response_box.style.border =  "2px solid #02c025";
                    response_box.innerText = "Nice! Let's see if that worked!"
                } else {
                    valid_credits_flag = false;
                    response_box.style.display = "block";
                    response_box.style.border =  "2px solid #ff0000";
                    response_box.innerText = "That user doesn't have more than 10 credits.";
                }
            } else {
                //alert("NetID not found.");
                response_box.style.display = "block";
                response_box.style.border =  "2px solid #ff0000";
                response_box.innerText = "NetID not found.";
            }
            setTimeout(function() {
                response_box.style.display = "none";
            }, 3000)
        } else if (e.target.value == "Exit") {
            document.body.removeChild(overlay);
        }
    })
}

function squirrelText() {
    var b = document.getElementById("bubbleDIV");
    var text = document.getElementById("squirrelText");
    /*if (!laptop_interacted_flag && failed_swipe) {
        text.innerHTML = 'I think I have something on my laptop that can help us!';
        b.style.top = "280px";
        b.style.display = "block";
        return;
    } else {
        //text.innerHTML = "We made it to Ikenberry Dining Hall! Let's get something to eat! Click on me if you need any hints!"
        if (default_text_up) {
            text.innerHTML = "Let's check in with the cashier so we can get something to eat!";
            b.style.display = "block";
            default_text_up = !default_text_up;
            return;
        }
        if (player_bubble_up) {
            b.style.display = "none";
            player_bubble_up = !player_bubble_up;
            return;
        }
    }*/
    current_hint += 1;
    current_hint = current_hint % hints_available;
    switch (current_hint) {
        case 0:
            b.style.display = "none";
            break;
        case 1:
            text.innerHTML = "Let's check in with the cashier so we can get something to eat!";
            b.style.display = "block";
            break;
        case 2:
            text.innerHTML = 'I think I have something on my laptop that can help us!';
            b.style.top = "280px";
            b.style.display = "block";
            break;
        default:
            // NOTHING
    }    
}