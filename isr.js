  /**
   * Resets the game terminal into its original state (empty in root directory) by
   * clearing the terminal history and text.
   */
  function resetTerminal() {
    // reset terminal history
    current_directory = "~";
    directory_archive = ["~"];
    terminal_archive = [""];
    user_input = "";
    currently_in_executable = false;

    // remove text from terminal display - https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
    while (num_inputs > 0) {
      let terminal_line = document.getElementById("input" + num_inputs);
      game_terminal.removeChild(terminal_line);

      let output_line = document.getElementById("output" + (num_inputs - 1));
      game_terminal.removeChild(output_line);
      
      --num_inputs;
    }
    input_number = num_inputs;
  }

    /* FUNCTIONS FOR TERMINAL PUZZLES */
  /**
   * Autocompletes the user input. Is called when the user presses the TAB key.
   * Only available when changing directory (cd) to a valid subdirectory or running
   * an executable that exists in the directory. Also available when listing out
   * the contents of a valid subdirectory.
   * 
   * For the 'cd' and 'ls' commmands, the user does not need to begin writing out the
   * subdirectory name if there's only one subdirectory. For running an executable, the
   * user needs to begin writing out the executable name.
   */
  function autocompleteInput() {
    // retrieve user-inputted command
    let command_to_process = [];
    if (user_input.trim() != "") {
      command_to_process = user_input.split(" ");
    }

    // retrieve directories and executables of current dir
    subdirectories = directory[current_directory]["directories"];
    executables_in_current = directory[current_directory]["executables"];
    
    if (command_to_process.length === 2) {  // can be ls or cd a directory
      if (command_to_process[0] === "cd" || command_to_process[0] === "ls") {
        // get work-in-progress directory name (i.e. what the user has typed out in the place of a dir)
        let possible_dir = command_to_process[1];

        // check if the work-in-progress directory is an actual subdirectory; if so, autocomplete
        // the user input to that directory
        for (let s = 0; s < subdirectories.length; ++s) {
          if (subdirectories[s].slice(0, possible_dir.length) === possible_dir) {
            // autocomplete directory name for user command
            user_input = command_to_process[0] + " " + subdirectories[s];
          }
        }
      } else if (command_to_process[0] === "python" || command_to_process[0] === "cat") {
        // get work-in-progress filename (i.e. what the user has typed out in the place of a file)
        let possible_file = command_to_process[1];

        // check if the work-in-progress filename is an actual file; if so, autocomplete
        // the user input to that file
        for (let e = 0; e < executables_in_current.length; ++e) {
          if (executables_in_current[e].slice(0, possible_file.length) === possible_file) {
            // autocomplete executable name for user command
            user_input = command_to_process[0] + " " + executables_in_current[e];
          }
        }
      }
    } else if (command_to_process.length === 1) {
      if (command_to_process[0].length > 2 && command_to_process[0].slice(0, 2) === "./") {
        // get work-in-progress executable name
        let possible_exe = command_to_process[0].slice(2, command_to_process[0].length);

        // check if the work-in-progress executable name is an actual executable; if so, autocomplete
        // the user input to that executable
        for (let e = 0; e < executables_in_current.length; ++e) {
          if (executables_in_current[e].slice(0, possible_exe.length) === possible_exe) {
            // autocomplete executable name for user command
            user_input = "./" + executables_in_current[e];
          }
        }
      }
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
      } else if (command_to_process.length === 2 && command_to_process[0].toLowerCase() === "python") {
        
        if (command_to_process[1].toLowerCase() === "show_ports.py") {
          display_ports = true;
          // output_text = "All Ports Shown";

          has_ran_show_ports = true;
          dialogue_idx = 13;  // hardcode to this dialogue
          dialogueBox(moonbucks_interior_scene);
        } else if (command_to_process[1].toLowerCase() === "scan_ports.py") {
          display_port_scan_output = true;
          // output_text = "Port Scan Complete";

          has_ran_show_ports = true;
          has_viewed_port_scan = true;
          has_ran_port_scan = true;
          dialogue_idx = 15;  // hardcode to this dialogue
          dialogueBox(moonbucks_interior_scene);
        } else {
          output_text = "Error: file does not exist.";
        }

      } else if (command_to_process.length === 2 && command_to_process[0].toLowerCase() === "cat") {
        
        if (command_to_process[1].toLowerCase() === "scan_ports.py") {
          display_port_scan_code = true;
          // output_text = "-- End of File --";

          has_ran_show_ports = true;
          has_viewed_port_scan = true;
          dialogue_idx = 14;  // hardcode to this dialogue
          dialogueBox(moonbucks_interior_scene);
        } else {
          output_text = "Error: file does not exist.";
        }

      } else {
        output_text = "Error: Invalid Command";
      }

    }

    return output_text;
  }


  /**
   * Executes the terminal change directory ('cd') command. Is able to execute the following
   * 'cd' commands:
   * - "cd" -- move into home directory
   * - "cd ../" -- move into previous directory
   * - "cd" + valid_subdirectory -- move into a subdirectory
   * 
   * @return String representing the output message for the submitted user input in terminal;
   *     if inputted 'cd' command is valid, outputs an empty string; else, outputs an error message
   */
  function executeCdCommand(command_to_process) {
    let output_text = "";

    if (command_to_process.length === 1) {  // "cd"

      // move to home directory if not already in it
      if (current_directory != "~") {
        current_directory = "~";
        directory_archive = ["~"];
      }

    } else if (command_to_process.length === 2) {  // "cd" + other command

      if (command_to_process[1] == "../") {  // "cd ../"
        if (current_directory != "~" && directory_archive.length != 1) {
          // move to parent/previous directory
          directory_archive.pop();
          current_directory = directory_archive[directory_archive.length - 1];
        }
      } else {  // check if it's a valid directory (i.e. if the user wants to move into a directory)
        let valid_directory = false;

        for (let s = 0; s < subdirectories.length; ++s) {
          if (subdirectories[s] === command_to_process[1]) {
            // change directory and save into archive
            current_directory = subdirectories[s];
            directory_archive.push(current_directory);
            valid_directory = true;
            break;
          }
        }

        if (!valid_directory) {
          output_text = "Error: specified directory not found.";
        }
      }

    } else {
      output_text = "Error: Invalid Command";
    }

    return output_text;
  }


  /**
   * Executes the terminal list directory command ('ls'). Is able to execute the following
   * 'ls' commands:
   * - "ls" -- lists the contents of the current directory
   * - "ls" + valid_subdirectory -- lists the contents of the specified directory
   * 
   * @return String representing the output message for the submitted user input in terminal;
   *     if inputted 'ls' command is valid, outputs a list of the directory's contents
   */
  function executeLsCommand(command_to_process) {
    executing_ls_command = true;
    
    let output_text = "";

    if (command_to_process.length === 1) {  // "ls"
      // display subdirectories and executables in current directory
      for (let i = 0; i < subdirectories.length; ++i) {
        output_text += subdirectories[i] + " ";
      }

      for (let j = 0; j < executables_in_current.length; ++j) {
        output_text += executables_in_current[j] + " ";
      }
    } else {  // "ls" + valid_subdir_name
      let dir = command_to_process[1];

      // check if the given directory is a valid subdirectory
      let is_subdirectory = false;
      for (let d = 0; d < subdirectories.length; ++d) {
        if (dir === subdirectories[d]) {
          is_subdirectory = true;
        }
      }

      // list out contents in the specified directory
      if (is_subdirectory) {
        let dir_contents = directory[dir];

        for (let i = 0; i < dir_contents["directories"].length; ++i) {
          output_text += dir_contents["directories"][i] + " ";
        }

        for (let j = 0; j < dir_contents["executables"].length; ++j) {
          output_text += dir_contents["executables"][j] + " ";
        }
      } else {
        output_text = "Error: specified directory not found.";
      }
    }

    return output_text;
  }


  /**
   * Colors the content names (i.e. subdirectories, executables) in a directory; is used for
   * the ls command.
   * 
   * @param output_text String containing the contents of a directory (output of the ls command)
   * @param output_divider HTML div that will hold the output of the ls command (i.e. the list
   *     of contents in the directory)
   */
   function colorDirectoryExecutable(output_text, output_divider) {
    let directory_contents = [];

    // split the output of contents of the directory - after ls command is executed
    output_text = output_text.trim();
    if (output_text != "") {
      directory_contents = output_text.split(" ");
    }

    // create span for coloring text and append to the output divider based on class
    for (let index = 0; index < directory_contents.length; ++index) {

      // source to create the span element: https://stackoverflow.com/questions/5802663/create-a-span-element-inside-another-element-using-javascript
      let ls_span = document.createElement("span");
      let check_exe_file = directory_contents[index].slice(-4);

      // color the text based on class - directory and executable
      if (check_exe_file === ".exe") {
        ls_span.className = "executable_file";
      } else {
        ls_span.className = "subdirectory";
      }

      // append to the divider after setting the colors
      ls_span.innerHTML = directory_contents[index] + " ";
      output_divider.appendChild(ls_span);
    }
  }


  /**
   * Executes the executable based on the user input command; only occurs when within an executable.
   * 
   * @param command_to_process An array containing the user input while in the executable
   * @return String representing the output message for the submitted user input in executable
   */
  function executeExecutable(command_to_process) {
    let output_text = "";

    if (command_to_process.length === 1 && command_to_process[0] === "exit") {
      currently_in_executable = false;
      current_coffee_state = "";
      output_text = "Exiting current executable.";
    } else {
      // redirect to the specific executable
      if (curr_executable_name === "lineDolphin.exe") {
        output_text = executeLineDolphinExecutable(command_to_process);
      } else if (curr_executable_name === "coffeeRequestSender.exe") {
        output_text = executeCoffeeRequestExecutable(command_to_process);
      } else if (curr_executable_name === "fridgeLoginPortal.exe") {
        output_text = executeFridgeLoginExecutable(command_to_process);
      }
    }

    return output_text;
  }


  /**
   * Executes the executable based on the user input command; only occurs if within the lineDolphin
   * executable.
   * 
   * @param command_to_process An array containing the user input while in the executable
   * @return String representing the output message for the submitted user input in lineDolphin executable;
   *     if user input is invalid, outputs an error message
   */
  function executeLineDolphinExecutable(command_to_process) {
    let output_text = "";

    if (command_to_process.length === 1 && command_to_process[0].toLowerCase() === "capture") {
      display_coffee_text = true;

      output_text = "STATUS: OK, READY TO BREW";
    } else {
      output_text = "Error: Invalid Command";
    }

    return output_text;
  }


  /**
   * Determines what instruction text to output to the terminal while in the coffeeSenderRequest executable and
   * stores the responses the user inputs for the coffeeSenderRequest.
   * 
   * @param command_to_process An array containing the user input while in the executable
   * @return String representing the instruction text for the user to respond to
   */
  function executeCoffeeRequestExecutable(command_to_process) {
    let output_text = "";

    if (command_to_process[0].toLowerCase() === "start" && current_coffee_state === "") {
      output_text = "What host would you like to send a request to?";
      current_coffee_state = "port";
    } else if (current_coffee_state === "port") {
      current_host_name = command_to_process[0].toLowerCase();
      output_text = "Which port number are you sending to?";
      current_coffee_state = "type";
    } else if (current_coffee_state === "type") {
      current_port_name = command_to_process[0].toLowerCase();
      output_text = "What type of request are you sending? (GET or POST)";
      current_coffee_state = "url";
    } else if (current_coffee_state === "url") {
      current_request_type = command_to_process[0].toLowerCase();
      output_text = "Which URL are you sending this request to?";
      current_coffee_state = "process";
    } else if (current_coffee_state === "process") {
      current_request_url = command_to_process[0].toLowerCase();

      // now we have all info, process and set error messages accordingly
      output_text = processCoffeeRequest();

      // reset coffee state
      current_coffee_state = "";
    } else {
      output_text = "Error: invalid command.";
      current_coffee_state = "";
    }

    return output_text;
  }


  /**
   * Verifies if the user's request for the coffeeRequestSender executable is valid and outputs
   * the corresponding message status or error.
   * 
   * @return String representing the corresponding message status or error to the user's input
   */
  function processCoffeeRequest() {
    let output_text = "";

    if (current_host_name != "mycyba") {
      output_text = "Error: could not reach specified host.";
    } else if (current_port_name != "5000") {
      output_text = "Error: host is reachable, but port number is incorrect.";
    } else if (current_request_type != "get") {
      output_text = "Error: not the expected request type.";
    } else if (current_request_url === "mycyba/brewer/brew") {
      output_text = "STATUS: BREW REQUEST RECEIVED. WILL PROCEED TO FULFILL REQUEST.";

      // update puzzle status
      is_coffee_brewed = true;
      document.getElementById("makeCoffee").innerHTML = " &#10004 Make Coffee &#9749";

      // play sound effect
      coffee_pour_sound.play();

    } else if (current_request_url === "mycyba/brewer/status") {
      output_text = "STATUS: OK, READY TO BREW";
    } else {
      output_text = "Error: valid request, but invalid URL.";
    }

    return output_text;
  }


  /**
   * Executes the fridgeLogin executable. Valid commands for this executable include the following:
   * - "stock" -- displays the fridge contents
   * - "lock" -- locks the fridge
   * - "unlock" -- unlocks the fridge
   * 
   * @param command_to_process An array containing the user input while in the executable
   * @return String describing whether the command was executed or, if invalid, an error message
   */
  function executeFridgeLoginExecutable(command_to_process) {
    let output_text = "";

    if (command_to_process.length === 1 && command_to_process[0] === "stock") {
      // display fridge contents
      output_text = "Current fridge contents: 1x baking soda. 6x bell pepper. 3x Golden Harbor Soup Dumplings. 1x half and half. 34x chicken eggs. 10x quail eggs.";
    
    } else if (command_to_process.length === 1 && command_to_process[0] === "lock") {
      // check if fridge is locked
      if (!is_fridge_unlocked) {
        output_text = "Fridge is already locked!";
      } else {
        // if fridge isn't locked, lock it
        output_text = "Fridge locked!";
        is_fridge_unlocked = false;

        // play sound effect of lock closing
        lock_fail_sound.play();
      }

    } else if (command_to_process.length === 1 && command_to_process[0] === "unlock") {
      // check if fridge is locked
      if (!is_fridge_unlocked) {
        output_text = "Fridge unlocked!";

        // update puzzle status
        is_fridge_unlocked = true;
        document.getElementById("openFridge").innerHTML = " &#10004 Open the Fridge &#127859";

        // play sound effect of lock opening
        lock_open_sound.play()
      } else {
        output_text = "Fridge is already unlocked!";
      }

    } else {
      // all other commands are invalid
      output_text = "Error: Invalid Command";
    }

    return output_text;
  }


  /**
   * Checks if the passed in executable exists in the current directory.
   * 
   * @param executable_name String representing the name of the executable to check
   *     existence for
   * @return Boolean representing whether the passed in executable exists
   */
  function checkExecutableExistence(executable_name) {
    for (let i = 0; i < executables_in_current.length; ++i) {
      if (executable_name === executables_in_current[i]) {
        return true;
      }
    }

    return false;
  }


  /**
   * Returns the messages that display upon opening a valid executable (i.e. the welcome message).
   * Contains the welcome messages for the following executables:
   * - lineDolphin
   * - coffeeRequestSender
   * - fridgeLoginPortal
   */
  function getExecutableWelcomeMessage() {
    if (curr_executable_name === "lineDolphin.exe") {
      return "Welcome to lineDolphin! Default configuration: display CyberCoffee traffic.";
    } else if (curr_executable_name === "coffeeRequestSender.exe") {
      return "Welcome to the coffee request portal! Here, one can send requests to the CYBA coffee brewer.";
    } else if (curr_executable_name === "fridgeLoginPortal.exe") {
      //return "Welcome to your smart fridge portal! Your username is GreenStreet. However, to access fridge features, you must authenticate yourself.";
      return "Welcome to your smart fridge control portal!";
    }
  }

  function displayTextOutput(output_divider, should_show, array_of_text) {
    if (should_show) {
      // output coffee brew message, if necessary
      for (let i=0; i < array_of_text.length; ++i) {
        let line_of_text = document.createTextNode(array_of_text[i]);
        output_divider.appendChild(line_of_text);
        output_divider.appendChild(document.createElement("br"))
      }
    }
  }

    /**
     * Displays output message for a terminal command in the game scene view.
     */
    function displayTerminalOutput(output_text) {
      // create divider to store output
      let output_divider = document.createElement("div");
      output_divider.id = "output" + num_inputs;

      displayTextOutput(output_divider, display_coffee_text, coffee_text);
      display_coffee_text = false;
      displayTextOutput(output_divider, display_ports, ports);
      display_ports = false;
      displayTextOutput(output_divider, display_port_scan_code, port_scan_code);
      display_port_scan_code = false;
      displayTextOutput(output_divider, display_port_scan_output, port_scan_output);
      display_port_scan_output = false;

      // if currently executing a ls command, then display directories
      // and executables in respective colors and append to output_divider
      if (executing_ls_command) {
        colorDirectoryExecutable(output_text, output_divider);
        executing_ls_command = false;
      } else {  // add output text into a text node
        let text = document.createTextNode(output_text);
        output_divider.appendChild(text);
      }

      // add divider containing output text to terminal
      game_terminal.append(output_divider);
    }


    /**
     * Returns a string of the full directory to display in a new line in the terminal.
     * 
     * @return String representing the full directory path
     */
    function getFullDirectory() {
      let directory_string = directory_archive[0];  // "~" directory

      if (currently_in_executable) {
        directory_string = curr_executable_name + "> ";
      } else {
        // add in rest of directories
        for (let dir = 1; dir < directory_archive.length; ++dir) {
          directory_string += "/" + directory_archive[dir]; 
        }
        
        // signal the end of the current working directory path
        directory_string += "$ ";
      }

      return directory_string;
    }