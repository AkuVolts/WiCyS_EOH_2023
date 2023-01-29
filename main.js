// variable declarations


// make the iframe

function start() {
    // load hint icon to be diplayed in all ongoing game scenes
    game_context = game_canvas.getContext("2d");
    hint_icon = loadCharacter("images/hint_icon_filled_64x64_x0.5.png", hint_x_pos, hint_y_pos, 32, 32);

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

    // load images first
    // - Note: the following line is needed to fix the problem of the background img not always
    // displaying when the page is refreshed
    // - Source: https://stackoverflow.com/questions/22889641/simple-html5-canvas-image-not-displaying
    background_img.addEventListener("load", drawBackground, false);

    function drawBackground() {}

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
    img.addEventListener("load", drawCharacter, false);

    function drawCharacter() {}

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

