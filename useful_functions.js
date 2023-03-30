
  // get the canvas element and context (context allows you to draw on the canvas)
  const game_canvas = document.getElementById("myCanvas");
  const game_context = game_canvas.getContext("2d");


  /* HTML TEXT ATTRIBUTES */
  const ongoing_game_text = document.getElementsByClassName("ongoing");
  const completed_game_text = document.getElementsByClassName("complete");


  // current character info
  let char_pic;  // current character picture being displayed
  let char_x_pos = 587;  // x pos of top left corner of char img
  let char_y_pos = 282;  // y pos of top left corner of char img

  const char_speed = 3;  // number of pixels the character img moves in a frame

  // booleans representing if the specific arrow key is being pressed by user
  let is_key_up = false;
  let is_key_right = false;
  let is_key_down = false;
  let is_key_left = false;

  /* PUZZLE ATTRIBUTES */
  // combination lock puzzle
  let allowed_combo_keys = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57]  // e.which codes
  let lock_combo_string = " ";  // needs to have a space in between in order for backspace to work
  let is_lock_combo_incorrect_message_visible = false;  // determines whether to display incorrect message                  
  let is_lock_unlocked = false; // keeps track of whether the puzzle is complete

  // computer password puzzle
  let allowed_password_keys = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
                               83, 84, 85, 86, 87, 88, 89, 90] // e.which codes
  let computer_password_string = " ";  // needs to have a space in between in order for backspace to work
  let is_password_incorrect_message_visible = false;  // determines whether to display incorrect message
  let is_computer_unlocked = false;  // keeps track of whether the puzzle is complete

  // terminal
  let current_directory = "~";  // start in root directory
  let directory_archive = ["~"];
  let subdirectories, executables_in_current;  // stores content of current directory
  
  let currently_in_executable = false;
  let executing_ls_command = false;
  let curr_executable_name = "";
  
  let terminal_archive = [""];  // for up and down functionality to see terminal command history
  let user_input = "";  // stores what the user types in the terminal
  let num_inputs = 0;  // used for creating dividers that store user input
  let input_number = num_inputs;  // used for moving between commands
  

  /**
   * Updates game visuals and stats.
   */
  function update() {
    // step 1 - clear the canvas
    clearCanvas();

    // step 2 - update character position + scene
    // update characteristics for start screen
    if (is_start_scene) {
      // update start screen position
      game_start_screen.style.left = game_canvas.offsetLeft + "px";
      game_start_screen.style.top = game_canvas.offsetTop + "px";
    } else {
      // hide start screen with text once game starts (i.e. stop the blinking)
      game_start_screen.style.visibility = "hidden";
    }

    moveCharacter();
    step_counter++;

    // update any task scene by switching in between puzzle images
    zoomInOnItem();

    // update game scene by switching between rooms
    changeRooms();

    // update positioning and visibility for terminal - ensure it overlaps game canvas
    // source1: https://www.w3schools.com/jsref/prop_element_offsettop.asp
    // source2: https://www.w3schools.com/jsref/prop_style_left.asp
    game_terminal.style.left = game_canvas.offsetLeft + 50 + "px";
    game_terminal.style.top = game_canvas.offsetTop + 54 + "px";

    // only display scrolling text box when terminal is open
    // source: https://stackoverflow.com/questions/21070101/show-hide-div-using-javascript
    if (is_terminal_scene) {
      game_terminal.style.visibility = "visible";
    } else {
      game_terminal.style.visibility = "hidden";
    }

    // update positioning of hint view
    positionHints();

    // step 3 - redraw
    // redraw scene
    draw(scene_pic, 0, 0, 700, 500);

    // redraw character only if it is in a room (i.e. not a puzzle scene)
    if (scene_pic == bedroom_scene || scene_pic == kitchen_scene || scene_pic == livingroom_scene) {
      draw(char_pic, char_x_pos, char_y_pos, 64, 64);
    }

    // redraw hint only if not on starting or ending scene
    if (!is_start_scene && !is_end_scene) {
      draw(hint_icon, hint_x_pos, hint_y_pos, 32, 32);
    }
    
    // display text (needs to be after scene pics are drawn in order to be seen)
    displayUserInput();
    displayComboLockHint();
    displayIncorrectMessage();

    console.log("x:", char_x_pos)
    console.log("y:", char_y_pos)

    // check to see if all tasks are done--if yes, render ending scene instead and play music
    displayCompleteGameScene();
  }

  /* FUNCTIONS FOR CHARACTER MOVEMENT */
  /**
   * Moves the character by updating its position and determining which pose the character takes.
   * 
   * A character is only allowed to move when it is in a room, within the bounds of a room, and
   * hint view is not displayed.
   */
  function moveCharacter() {
    if (!is_hint_view_displayed && (scene_pic == bedroom_scene || scene_pic == kitchen_scene || scene_pic == livingroom_scene)) {  
      // move up
      if (is_key_up && (char_y_pos - char_speed >= 0) && (char_y_pos - char_speed <= 436)) {
        char_y_pos -= char_speed;

        changeSteps(false, false, false);
      }

      // move right 
      if (is_key_right && (char_x_pos + char_speed >= 0) && (char_x_pos + char_speed <= 636)) {
        char_x_pos += char_speed;

        changeSteps(true, false, (char_pic == char_left1 || char_pic == char_left2));
      }

      // move down
      if (is_key_down && (char_y_pos + char_speed >= 0) && (char_y_pos + char_speed <= 436)) {
        char_y_pos += char_speed;

        changeSteps(false, false, false);
      }

      // move left
      if (is_key_left && (char_x_pos - char_speed >= 0) && (char_x_pos - char_speed <= 636)) {
        char_x_pos -= char_speed;

        changeSteps(false, true, (char_pic == char_right1 || char_pic == char_right2));
      }
    }
  }

  /* RECORD KEY DOWNS (i.e. for closing windows, hints, etc) */
  /**
   * Listens for a user key down.
   * 
   * If a user presses one of the special key downs, the functionality defined for that
   * key down is executed.
   * 
   * ESCAPE - closes out of zoomed in windows (including hints)
   * ENTER - submits the user input; can be a lock combination, computer password, or terminal command
   * BACKSPACE - removes a character from the user input
   */
  document.addEventListener('keydown', logKey)

  function logKey(key) {
    
    if (key.code === "Escape") {
      key.preventDefault();

      if (is_hint_view_displayed) {
        // close out hint view
        changeHintVisibility("hidden");
        is_hint_view_displayed = false;
      } else {
        if (is_whiteboard_scene) {
          // zoom out of whiteboard
          scene_pic = current_room;
          
          // need the following to prevent the character from triggering the zoom in again
          moveOutOfDetectionZone(whiteboard_left_bound, whiteboard_right_bound, whiteboard_bottom_bound, whiteboard_top_bound);

          // update values
          is_whiteboard_scene = false;
          if (current_room === bedroom_scene) {
            is_bedroom_scene = true;
          }
        }

        if (is_computer_scene) {  
          // zoom out of computer
          scene_pic = current_room;

          // move out of the zone that triggered zoom in
          moveOutOfDetectionZone(computer_left_bound, computer_right_bound, computer_bottom_bound, computer_top_bound);

          // update values of the game scene
          is_computer_scene = false;
          if (current_room === livingroom_scene) {
            is_livingroom_scene = true;
          }

          // clear text
          computer_password_string = " ";
          if (is_password_incorrect_message_visible) {
            is_password_incorrect_message_visible = false;
          }
        }

        if (is_combo_lock_scene) {
          // zoom out of combo lock
          scene_pic = current_room;

          // move out of the zone that triggered zoom in
          moveOutOfDetectionZone(combo_lock_left_bound, combo_lock_right_bound, combo_lock_bottom_bound, combo_lock_top_bound);

          // update values
          is_combo_lock_scene = false;
          if (current_room === kitchen_scene) {
            is_kitchen_scene = true;
          }

          // clear text
          lock_combo_string = " ";
          if (is_lock_combo_incorrect_message_visible) {
            is_lock_combo_incorrect_message_visible = false;
          }
        }

        if (is_fridge_scene) {
          // zoom out of fridge
          scene_pic = current_room;

          // move out of the zone that triggered zoom in
          moveOutOfDetectionZone(fridge_left_bound, fridge_right_bound, fridge_bottom_bound, fridge_top_bound);

          // update values
          is_fridge_scene = false;
          if (current_room === kitchen_scene) {
            is_kitchen_scene = true;
          }
        }

        if (is_toaster_scene) {
          // zoom out of toaster
          scene_pic = current_room;

          // move out of the zone that triggered zoom in
          moveOutOfDetectionZone(toaster_left_bound, toaster_right_bound, toaster_bottom_bound, toaster_top_bound);

          // update values
          is_toaster_scene = false;
          if (current_room === kitchen_scene) {
            is_kitchen_scene = true;
          }
        }

        if (is_coffee_maker_scene) {
          // zoom out of toaster
          scene_pic = current_room;

          // move out of the zone that triggered zoom in
          moveOutOfDetectionZone(coffee_maker_left_bound, coffee_maker_right_bound, coffee_maker_bottom_bound, coffee_maker_top_bound);

          // update values
          is_coffee_maker_scene = false;
          if (current_room === kitchen_scene) {
            is_kitchen_scene = true;
          }
        }

        if (is_terminal_scene) {
          // zoom out of terminal
          scene_pic = current_room;

          // move out of the zone that triggered zoom in
          moveOutOfDetectionZone(computer_left_bound, computer_right_bound, computer_bottom_bound, computer_top_bound);

          // update values
          is_terminal_scene = false;
          if (current_room === livingroom_scene) {
            is_livingroom_scene = true;
          }

          // reset terminal
          resetTerminal();
        }  // closing terminal conditional

      }  // closing conditional that checks if hints are displayed

    }  // closing the escape key conditional

    if (key.code === "Backspace") {

      if (is_combo_lock_scene) {
        if (is_lock_combo_incorrect_message_visible) {
          is_lock_combo_incorrect_message_visible = false;
        }

        if (lock_combo_string.length > 0) {
          // user only needs to delete the numbers they inputted, not the spaces
          if (lock_combo_string[lock_combo_string.length - 1] == " ") {
            lock_combo_string = lock_combo_string.substring(0, lock_combo_string.length - 1);
          }

          // delete a character
          lock_combo_string = lock_combo_string.substring(0, lock_combo_string.length - 1);
        }

        // play sound effect
        lock_sound.play();
      }  // closing lock scene conditional

      if (is_computer_scene) {
        if (is_password_incorrect_message_visible) {
          is_password_incorrect_message_visible = false;
        }

        if (computer_password_string.length <= 1) {
          // keep the blank space
          computer_password_string = " ";
        } else {
          // delete a character
          computer_password_string = computer_password_string.substring(0, computer_password_string.length - 1);
        }

        // play sound effect
        computer_sound.play();
      }  // closing computer scene conditional

      if (is_terminal_scene) {        
        // delete a character
        user_input = user_input.substring(0, user_input.length - 1);
      }

    }  // closing the backspace key conditional

    if (key.code === "Enter") {
      if (is_start_scene) {
        // enter game and spawn the user in the bedroom
        scene_pic = bedroom_scene;
        current_room = bedroom_scene;
        is_start_scene = false;
        is_bedroom_scene = true;

        // play bgm
        bgm.play();
      } else if (is_terminal_scene) {

        // execute user input and display the output into terminal
        let terminal_output = executeUserInput();
        displayTerminalOutput(terminal_output);

        // remove cursor from current line, so it'll only be displayed on the next line
        // source: https://developer.mozilla.org/en-US/docs/Web/API/Node/lastChild
        let current_divider = document.getElementById("input" + num_inputs);
        current_divider.removeChild(current_divider.lastChild);

        // create new divider to hold next line of user input
        // source1: https://www.encodedna.com/javascript/append-or-add-text-to-div-using-javascript.htm
        // source2: https://developer.mozilla.org/en-US/docs/Web/API/Element/append
        let new_divider = document.createElement("div");
        ++num_inputs;
        new_divider.id = "input" + num_inputs;

        // display current directory for new line
        let directory_display = getFullDirectory()
        let text = document.createTextNode(directory_display);
        new_divider.appendChild(text);
        
        game_terminal.append(new_divider);
        game_terminal.scrollTop = game_terminal.scrollHeight;  // scroll down to show the newly added element/line

        // reset user input text
        user_input = "";
        terminal_archive.push(user_input);
        input_number = num_inputs;

      } else {
        checkPasswordCorrectness();
      }
    }

    // check for key downs for alphanumeric characters
    updateUserInput(key);

  }  // closing log key function



  /* FUNCTIONS FOR PUZZLES */
  /**
   * Updates the user input for combo lock, computer password, and terminal puzzles. Is
   * only updated when the keys the user presses are part of the allowed keys for that puzzle.
   * 
   * @param key The keyboard key the user presses.
   */
  function updateUserInput(key) {

    if (key.code === "Space") {
      key.preventDefault();
    }

    if (is_combo_lock_scene) {
      // check if the key pressed is allowed and if the input has reached its max length
      if (allowed_combo_keys.includes(key.which) && lock_combo_string.length < 9) {
        // play sound effect of lock moving
        lock_sound.play();

        // remove incorrect message text
        if (is_lock_combo_incorrect_message_visible) {
          is_lock_combo_incorrect_message_visible = false;
        }

        // automatically add spaces between numbers for user
        if ((lock_combo_string.length) % 3 == 0) {
          lock_combo_string += " ";
        }

        // add user input
        lock_combo_string += String.fromCharCode(key.which);
      }
    }  // closing lock conditional

    if (is_computer_scene) {
      // check if the key pressed is allowed and if the input has reached its max length
      if (allowed_password_keys.includes(key.which) && computer_password_string.length < 18) {
        // play sound effect of typing keys
        computer_sound.play()

        // remove incorrect message text
        if (is_password_incorrect_message_visible) {
          is_password_incorrect_message_visible = false;
        }

        // add user input
        computer_password_string += String.fromCharCode(key.which);
      }    
    }  // closing computer password conditional

    if (is_terminal_scene) {
      
      if (key.key === "Shift" ||
          key.key === "Alt" ||
          key.key === "Meta" ||
          key.key === "Control" ||
          key.key === "Backspace" ||
          key.key === "Enter" ||
          key.key === "ArrowRight" ||
          key.key === "ArrowLeft" ||
          key.key === "Escape" ||
          key.key === "CapsLock") {
        // do nothing
      } else if (key.key === "ArrowUp") {
        // display previous terminal command from current command
        if (input_number - 1 >= 0) {
          user_input = terminal_archive[input_number - 1];
          --input_number;
        }
      } else if (key.key === "ArrowDown") {
        // display next terminal command from current command
        if (input_number + 1 <= num_inputs) {
          user_input = terminal_archive[input_number + 1];
          ++input_number;
        }
      } else if (key.key === "Tab") {
        // prevent default behavior
        key.preventDefault();

        // autocomplete the current command the user has inputted, if possible
        autocompleteInput();
      } else {
        // add to user input and store it
        user_input += key.key;
        terminal_archive[num_inputs] = user_input;

        // make new command typed out the most recent command (used
        // for arrowup and arrowdown keys for viewing terminal archive)
        input_number = num_inputs;
      }

    }  // closing terminal conditional

  }  // closing updateUserInput() function


  /**
   * Checks if the password submitted by the user is correct for both the combo lock and
   * computer puzzles.
   */
  function checkPasswordCorrectness() {

    if (!is_lock_unlocked && is_combo_lock_scene) {
      if (lock_combo_string === " 86 37 49") {  // correct combo

        // zoom out of cabinet
        scene_pic = current_room;
        is_kitchen_scene = true;

        moveOutOfDetectionZone(combo_lock_left_bound, combo_lock_right_bound, combo_lock_bottom_bound, combo_lock_top_bound);

        if (scene_pic === kitchen_scene) {
          is_combo_lock_scene = false;
        }

        // update status of puzzle
        is_lock_unlocked = true;
        document.getElementById("makeToast").innerHTML = " &#10004 Make Toast &#127838";
        
        // play sound effects
        lock_open_sound.play();
        toaster_pop_sound.play();

      } else {  // incorrect combo
        is_lock_combo_incorrect_message_visible = true;

        // play sound effects
        lock_fail_sound.play();
      }
    }  // closing lock conditional

    if (!is_computer_unlocked && is_computer_scene) {
      
      if (computer_password_string === " DELILAH") {  // correct password

        // show terminal
        scene_pic = terminal_scene;
        is_terminal_scene = true;
        is_computer_scene = false;

        // update status of computer => unlocked
        is_computer_unlocked = true;
        document.getElementById("unlockComputer").innerHTML = " &#10004 Unlock the Computer &#128187";
      
      } else {  // incorrect password
        if (!is_password_incorrect_message_visible) {
          is_password_incorrect_message_visible = true;
        }
      }

    }  // closing computer password conditional

  }  // closing check password correctness function


  /**
   * Displays the text the user types in the combination lock text box, computer password text box,
   * and computer terminal.
   */
  function displayUserInput() {
    if (is_combo_lock_scene) {
      game_context.font = "25px Comic Sans MS";
      game_context.fillStyle = "black";
      game_context.fillText(lock_combo_string, 290, 443);
    }

    if (is_computer_scene) {
      game_context.font = "25px Comic Sans MS";
      game_context.fillStyle = "black";
      game_context.fillText(computer_password_string, 144, 270);
    }

    if (is_terminal_scene) {
      // source: https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild

      // create the replacement elements
      let replacement_divider = document.createElement("div");
      let directory_display = getFullDirectory();
      let replacement_text = document.createTextNode(directory_display + user_input);
      // source for cursor block: https://www.w3schools.com/charsets/ref_utf_block.asp
      let cursor = document.createTextNode("\u258A");
      replacement_divider.appendChild(replacement_text);
      replacement_divider.appendChild(cursor);

      // retrieve the element to replace
      let divider_to_replace = document.getElementById("input" + num_inputs);

      // rename dividers so new divider will have original divider name (for consistency)
      divider_to_replace.id = "old" + num_inputs;
      replacement_divider.id = "input" + num_inputs;

      // replace current input line with updated user input
      game_terminal.replaceChild(replacement_divider, divider_to_replace);
    }
  }


  /**
   * Displays a message saying the user input submitted is not correct. Is used for
   * the combo lock and computer password puzzles.
   */
  function displayIncorrectMessage() {

    // check to see if the input the user submitted was marked as incorrect
    if (is_lock_combo_incorrect_message_visible) {
      game_context.font = "25px Comic Sans MS";
      game_context.fillStyle = "red";
      // position the error message below the input box
      game_context.fillText("Combo incorrect. Please try again.", 150, 480);
    }

    // check to see if the input the user submitted was marked as incorrect
    if (is_password_incorrect_message_visible) {
      game_context.font = "25px Comic Sans MS";
      game_context.fillStyle = "red";
      // position the error message below the input box
      game_context.fillText("Password incorrect. Please try again.", 130, 350);
    }

  }
  
  /**
   * Executes the input the user submits in terminal and outputs corresponding messages based
   * on the input the user submits. Is called after the user submits their input by pressing
   * the ENTER key.
   * 
   * @return String representing the output message for the submitted user input in terminal
   */
  function executeUserInput() {
    // split the user input to process it easier
    let command_to_process = [];
    user_input = user_input.trim();
    if (user_input != "") {
      command_to_process = user_input.split(" ");
    }
    let output_text = "";

    // update variables that store the contents of the current directory
    subdirectories = directory[current_directory]["directories"];
    executables_in_current = directory[current_directory]["executables"];

    // check commands
    if (command_to_process.length != 0) {  // only check commands if command exists
      
      if (currently_in_executable) {  // execute executable
        output_text = executeExecutable(command_to_process);
      } else if (command_to_process[0] === "cd") {
        output_text = executeCdCommand(command_to_process);
      } else if ((command_to_process.length === 1 || command_to_process.length === 2)
          && command_to_process[0].toLowerCase() == "ls") {  // "ls" or "ls" + valid_subdir_name
        output_text = executeLsCommand(command_to_process);
      } else if (command_to_process[0].slice(0, 2) === "./") {

        // check if given executable is in the current directory
        if (checkExecutableExistence(command_to_process[0].slice(2))) {
          // enter executable
          currently_in_executable = true;
          curr_executable_name = command_to_process[0].slice(2);
          output_text = getExecutableWelcomeMessage();
        } else {
          output_text = "Error: specified executable does not exist.";
        }

      } else if (command_to_process.length === 1 && command_to_process[0].toLowerCase() === "exit") {
        output_text = "Error: nothing to exit from.";
      } else {
        output_text = "Error: Invalid Command";
      }
    }
    return output_text;
  }
