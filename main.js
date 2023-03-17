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
const game_canvas = document.getElementById("myCanvas");
  const game_context = game_canvas.getContext("2d");
  let scene_pic;
  function start() {
    scene_pic = loadBackground("images/main_page_map.png");

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