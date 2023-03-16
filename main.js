// variable declarations
let coins = 0;
const union = new Buildings(121, 193, 43, 83, "");
const altgeld = new Buildings(189, 345, 83, 43, "");
const morrow = new Buildings(313, 29, 67, 40, "");
const english = new Buildings(281, 421, 63, 35, "");
const siebel = new Buildings(13, 29, 55, 35, "");
const grainger = new Buildings(49, 137, 39, 51, "");
const cif = new Buildings(49, 317, 39, 59, "");
const main = new Buildings(576, 265, 44, 55, "");
const aces = new Buildings(581, 133, 51, 51, "");
const lumis = new Buildings(189, 97, 51, 23, "");
const lincoln = new Buildings(397, 353, 71, 35, "");
const follinger = new Buildings(505, 201, 43, 59, "");


function start() {
  var canvas = document.getElementById("myCanvas");
  var game_context = canvas.getContext("2d");
  // game_context.fillStyle = 'red';
  // game_context.fillRect(10, 10, 50, 50);


  // load background image
  // const background_img = loadBackground("main_page_map.png");
  img_url = "main_page_map.png";
  const background_img = new Image();
  background_img.src = img_url;
  background_img.onload = function () {
      // Draw the background image on the canvas
  game_context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);


    // hint_icon = loadCharacter("images/hint_icon_filled_64x64_x0.5.png", hint_x_pos, hint_y_pos, 32, 32);

    // load initial game setting components
    


    // load zoomed in puzzle images
    

    // load completed puzzle images
    

    // load initial character components
    
    // initialize values for starting game scene
    


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
    background_img.onload = function () {
      // Draw the background image on the canvas
      game_context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      
      // Other canvas drawing operations go here
    };

    // load images first
    // - Note: the following line is needed to fix the problem of the background img not always
    // displaying when the page is refreshed
    // - Source: https://stackoverflow.com/questions/22889641/simple-html5-canvas-image-not-displaying
    // background_img.addEventListener("load", drawBackground, false);
    // draw(background_img, 0, 0, 700, 500);
    // function drawBackground() {}

    return background_img;
  }


  /**
   * General function to initially load components that don't take up the entire canvas
   * (i.e. character). Similar to loadBackground(), this function loads the image into the
   * page and must be called prior to drawing.
   *
   * @param img_url String representing the path to the image
   * @param x Integer representing the x-coordinate of where the image should be positioned in the canvas
   * @param y Integer representing the y-coordinate of where the image should be positioned in the canvas
   * @param width Integer representing the width of the image
   * @param height Integer representing the height of the image
   * @return Object representing the component image
   */
  // general function to initially load and draw components (i.e. character)
  function loadCharacter(img_url, x, y, width, height) {
    const img = new Image();
    img.src = img_url;

    // load images first
    // - Note: the following line is needed to fix the problem of the background img not always
    // displaying when the page is refreshed
    // - Source: https://stackoverflow.com/questions/22889641/simple-html5-canvas-image-not-displaying
    // img.addEventListener("load", drawCharacter, false);
    

    // function drawCharacter() {}
    img = draw(img, x, y, width, height);

    return img;
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

  canvas.addEventListener('mousemove', function(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    // do something with the mouse position
  });
