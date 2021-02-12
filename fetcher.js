/* Fetcher.js - Node app which takes a URL as a command-line argument
as well as a local file path and download the resource to the specified path */

const request = require("request");
const fs = require("fs");
const userArgs = process.argv.slice(2); //array for user input - chops first two elements
const URL = userArgs[0]; //stores command line URL from user
const filePath = userArgs[1]; //stores file path from user

const fetcher = (URL, filePath) => { //function which takes URL and filepath arguments
  
  request(`${URL}/${filePath}`, (error, response, body) => {
    console.log("Error:", error); //Print error message if there is an error
    console.log("Status Code:", response && response.statusCode); // Print the response status code

    //Prints message indicating downloaded resource to specified file path
    fs.writeFile(filePath, body, () => {
      console.log(`Downloaded and saved ${fs.statSync(filePath).size} bytes to ${filePath}`);
    });
  });
};

fetcher(URL, filePath); //calls function with two command line inputs as parameters