// variable declarations
let coins = 0;
const union = new Buildings(121, 193, 43, 83, "How do data breaches happen? Turns out that human error plays a big role: in fact, one study found that human error was a major cause of 95% of data breaches. That’s why cybersecurity systems need to be careful about how much access they give users, to limit the damage they can cause.");
const altgeld = new Buildings(189, 345, 83, 43, "Cryptography is based on protecting information through different algorithms, or ways of encoding your messages. These algorithms usually have keys, specific values used to hide and then reveal information, and you either need to have those keys or spend millions of years to crack the code. The keys can be symmetric, where you encode and decode with the same value, or asymmetric, where you encode with a public key value and decode with a private key, only known by the receiver.");
const morrow = new Buildings(313, 29, 67, 40, "Are aliens real? Some people believe so, and think that crop circles contain hidden messages. If so, then maybe the reason we view it as a hoax is because we don’t have the tools to decrypt their codes, and if our cryptography methods got to the right point, maybe we’d be able to exchange messages back and forth. More likely, though, is that crop circles are man-made creations, but it’s a fun thought exercise.");
const english = new Buildings(281, 421, 63, 35, "What kinds of techniques can you use to break unknown codes? One way is to rely on the letter frequencies, both of individual and of combinations of letters. The most common English letter is ‘e’ and the least common is ‘z’, so if the frequencies in the coded text look different, you can use these proportions to try and crack substitution ciphers.");
const siebel = new Buildings(13, 29, 55, 35, "Where did malware start? The first computer worm was created in 1971 and called “Creeper”. It printed the message \"I'M THE CREEPER. CATCH ME IF YOU CAN!\" as it moved across the system. The second worm and first antivirus, Reaper, was created to delete Creeper.");
const grainger = new Buildings(49, 137, 39, 51, "Did you know that “phone phreaking” was the ancestor of hacking? In the 1960’s and 70’s, people would make noises that sounded like the tones phone operators used, fooling the system into letting them make free calls across the world. Famous “phone phreaks” include Steve Jobs and Steve Wozniak, the founders of Apple. Many phone phreaks later went on to become computer hackers during the 1980’s.");
const cif = new Buildings(49, 317, 39, 59, "Is computer security important for schools? The answer is yes, just like it is for all big organizations: they have a lot of systems and data that they need for their daily functioning, and if anything happens to those systems or data, it could cause major issues. One historical Illinois college, known as Lincoln college, was forced to shut down due to a combination of COVID and a bad ransomware attack. Another ransomware attack on the Baltimore County School Systems cost the schools 10 million and caused issues that lasted over a year. ");
const main = new Buildings(576, 265, 44, 55, "How do websites keep our information safe? OpenSSL is one of the most commonly used cryptographic libraries in the world, and is used by the majority of HTTPS websites. It allows people to safely communicate over computer networks without having to worry about other users eavesdropping, makes sure they’re talking to who they want to talk to, and keeps the data safe from being changed. OpenSSL is also open source, so the code behind OpenSSL is free for anyone to see and help add to.");
const aces = new Buildings(581, 133, 51, 51, "What are the most dangerous places to target with a cyberattack? You might think of banks or airplanes, but you probably didn’t consider the food industry. Our food chain is fragile, and if one link in that chain breaks it can cause major issues. And as the agriculture industry becomes more and more online, it’s also becoming a tempting target for ransomware, malware that encrypts data and asks for money to unlock it. That’s why some researchers are paying close attention to how to keep agriculture systems safe and secure.");
const lumis = new Buildings(189, 97, 51, 23, "The future is quantum! Current cryptography methods rely on pure math and algorithms and are pretty difficult to break, taking a classical computer trillions of years to crack. If quantum computing becomes a reality, though, then all these combinations can be tested at the same time, making it easy to discover the right combination. That’s why researchers are currently working on new and innovative ways to harness quantum properties in new cryptographic algorithms, with the most famous known method being Quantum Key Distribution.");
const lincoln = new Buildings(397, 353, 71, 35, "What was the worst malware? Some might say “Mydoom”, the fastest spreading email virus and also the most expensive computer virus ever, costing an estimated $38 million. It was first found in 2004, but its aftereffects lasted till 2009. Even after multiple investigations and a $500,000 bounty, the original creator still is unknown.");
const follinger = new Buildings(505, 201, 43, 59, " If you voted on election day in 2022 in Champaign County, you may have noticed that voting seemed to be going particularly slowly. That was because of repeated DDOS attacks on the website and servers, causing connectivity issues. Denial of service attacks are attacks where a website is flooded with traffic until it can no longer handle it and is overwhelmed. If these attacks are all coming from one device, it’s easier to manage, but if there are many different devices all sending in requests, it’s harder to figure out which ones are malicious and to limit their requests. The second type is what’s called a distributed denial of service (DDos) attack.");


  const game_canvas = document.getElementById("myCanvas");
  const game_context = game_canvas.getContext("2d");
  let scene_pic;
  let curr_pic;
  let start_pic;
  
  function start() {
    start_pic = loadBackground("images/start_page.png");
    scene_pic = loadBackground("images/main_page_map.png");
    curr_pic = start_pic;
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

  
  // Get the canvas context and save the original region data
  const originalData = game_context.getImageData(0, 0, canvas.width, canvas.height);

  // call highlight function when mouse is over a building
  canvas.addEventListener("mouseover", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    x = mousePos.x;
    y = mousePos.y;


    // calling the highlight function according to the building
    if (x >= union.x && x <= union.x + union.width && y >= union.y && y <= union.y + union.height) {
      highlightOnHover(canvas, union.x, union.y, union.width, union.height);
    } else if (x >= altgeld.x && x <= altgeld.x + altgeld.width && y >= altgeld.y && y <= altgeld.y + altgeld.height) {
      highlightOnHover(canvas, altgeld.x, altgeld.y, altgeld.width, altgeld.height);
    } else if (x >= morrow.x && x <= morrow.x + morrow.width && y >= morrow.y && y <= morrow.y + morrow.height) {
      highlightOnHover(canvas, morrow.x, morrow.y, morrow.width, morrow.height);
    } else if (x >= siebel.x && x <= siebel.x + siebel.width && y >= siebel.y && y <= siebel.y + siebel.height) {
      highlightOnHover(canvas, siebel.x, siebel.y, siebel.width, siebel.height);
    } else if (x >= grainger.x && x <= grainger.x + grainger.width && y >= grainger.y && y <= grainger.y + grainger.height) {
      highlightOnHover(canvas, grainger.x, grainger.y, grainger.width, grainger.height);
    } else if (x >= english.x && x <= english.x + english.width && y >= english.y && y <= english.y + english.height) {
      highlightOnHover(canvas, english.x, english.y, english.width, english.height);
    } else if (x >= main.x && x <= main.x + main.width && y >= main.y && y <= main.y + main.height) {
      highlightOnHover(canvas, main.x, main.y, main.width, main.height);
    } else if (x >= aces.x && x <= aces.x + aces.width && y >= aces.y && y <= aces.y + aces.height) {
      highlightOnHover(canvas, aces.x, aces.y, aces.width, aces.height);
    } else if (x >= lumis.x && x <= lumis.x + lumis.width && y >= lumis.y && y <= lumis.y + lumis.height) {
      highlightOnHover(canvas, lumis.x, lumis.y, lumis.width, lumis.height);
    } else if (x >= lincoln.x && x <= lincoln.x + lincoln.width && y >= lincoln.y && y <= lincoln.y + lincoln.height) {
      highlightOnHover(canvas, lincoln.x, lincoln.y, lincoln.width, lincoln.height);
    } else if (x >= follinger.x && x <= follinger.x + follinger.width && y >= follinger.y && y <= follinger.y + follinger.height) {
      highlightOnHover(canvas, follinger.x, follinger.y, follinger.width, follinger.height);
    } else if (x >= cif.x && x <= cif.x + cif.width && y >= cif.y && y <= cif.y + cif.height) {
      highlightOnHover(canvas, cif.x, cif.y, cif.width, cif.height);
    }
  }, false);

  // Add a mouseout listener to restore the original canvas data
  canvas.addEventListener('mouseout', function(e) {
    game_context.putImageData(originalData, 0, 0);
  });

  canvas.addEventListener("click", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    x = mousePos.x;
    y = mousePos.y;

    // calling the highlight function according to the building
    if (x >= union.x && x <= union.x + union.width && y >= union.y && y <= union.y + union.height) {
      displayFacts(union.fact);
    } else if (x >= altgeld.x && x <= altgeld.x + altgeld.width && y >= altgeld.y && y <= altgeld.y + altgeld.height) {
      displayFacts(altgeld.fact);
    } else if (x >= morrow.x && x <= morrow.x + morrow.width && y >= morrow.y && y <= morrow.y + morrow.height) {
      displayFacts(morrow.fact);
    } else if (x >= siebel.x && x <= siebel.x + siebel.width && y >= siebel.y && y <= siebel.y + siebel.height) {
      displayFacts(siebel.fact);
    } else if (x >= grainger.x && x <= grainger.x + grainger.width && y >= grainger.y && y <= grainger.y + grainger.height) {
      displayFacts(grainger.fact);
    } else if (x >= english.x && x <= english.x + english.width && y >= english.y && y <= english.y + english.height) {
      displayFacts(english.fact);
    } else if (x >= main.x && x <= main.x + main.width && y >= main.y && y <= main.y + main.height) {
      displayFacts(main.fact);
    } else if (x >= aces.x && x <= aces.x + aces.width && y >= aces.y && y <= aces.y + aces.height) {
      displayFacts(aces.fact);
    } else if (x >= lumis.x && x <= lumis.x + lumis.width && y >= lumis.y && y <= lumis.y + lumis.height) {
      displayFacts(lumis.fact);
    } else if (x >= lincoln.x && x <= lincoln.x + lincoln.width && y >= lincoln.y && y <= lincoln.y + lincoln.height) {
      displayFacts(lincoln.fact);
    } else if (x >= follinger.x && x <= follinger.x + follinger.width && y >= follinger.y && y <= follinger.y + follinger.height) {
      displayFacts(follinger.fact);
    } else if (x >= cif.x && x <= cif.x + cif.width && y >= cif.y && y <= cif.y + cif.height) {
      displayFacts(cif.fact); 
    }
  }, false);



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
  

  canvas.addEventListener('mousemove', function(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    // do something with the mouse position
  });
}

/**
 * 
 * Highlights buildings on the canvas when the mouse hovers over them.
 * @param canvas game canvas
 * @param x x-coordinate of the building
 * @param y y-coordinate of the building
 * @param width width of the building
 * @param height height of the building
 * @param highlightColor color we want to highlight the building with
 */
function highlightOnHover(canvas, x, y, width, height, highlightColor) {
    game_context.clearRect(0, 0, canvas.width, canvas.height);
    game_context.fillStyle = highlightColor;
    game_context.fillRect(x, y, width, height);
}

// display facts on clicking the buildings
function displayFacts(canvas, fact) {
    game_context.font = "bold 24px Arial";
    game_context.textAlign = "center";
  
    // Calculate the position to display the fact in the middle of the canvas
    const a = canvas.width / 2;
    const b = canvas.height / 2;
  
    // Draw the fact in the middle of the canvas
    game_context.fillText(fact, a, b);
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