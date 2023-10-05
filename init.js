/*************************
 * File Name: init.js
 * Purpose: The routines to initialize the app
 * 
 * Commands:
myapp init --all      creates the folder structure and config file
myapp init --mk       creates the folder structure
myapp init --cat      creates the config file with default settings
 *
 * Created Date: 09 Jan 2022
 * Authors:
 * PJR - Peter Rawsthorne
 * Revisions:
 * Date, Author, Description
 * 09 Jan 2022, PJR, File created
 * 12 Feb 2022, PJR, added createFiles() for init, config, and token views
 * 13 Oct 2022, PJR, re-hydrated project from the spring
 * 05 Oct 2023, PJR, altered for lecture prep
 *************************/
// Node.js common core global modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Add logging to the CLI project by using eventLogging
// load the logEvents module
const logEvents = require('./logEvents');
// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on('log', (event, level, msg) => logEvents(event, level, msg));

function createFolders() {
    if(DEBUG) console.log('init.createFolders()');
    myEmitter.emit('log', 'init.createFolders()', 'INFO', 'All folders should be created.');
};

function createFiles() {
    if(DEBUG) console.log('init.createFiles()');
    myEmitter.emit('log', 'init.createFiles()', 'INFO', 'Files should be created.');
};

const myArgs = process.argv.slice(2);
function initializeApp() {
    if(DEBUG) console.log('initializeApp()');
    myEmitter.emit('log', 'initializeApp()', 'INFO', 'init feature was called.');
    
    switch (myArgs[1]) {
    case '--all':
        if(DEBUG) console.log('--all createFolders() & createFiles()');
        createFolders();
        createFiles();
        myEmitter.emit('log', 'init --all', 'INFO', 'Create all folders and files.');
        break;
    case '--cat':
        if(DEBUG) console.log('--cat createFiles()');
        // TODO: Do all the folders exist? See issue #6
        createFiles();
        myEmitter.emit('log', 'init --cat', 'INFO', 'Create all files.');
        break;
    case '--mk':
        if(DEBUG) console.log('--mk createFolders()');
        createFolders();
        myEmitter.emit('log', 'init --mk', 'INFO', 'Create all folders.');
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/views/init.txt", (error, data) => {
            if(error) throw error;              
            console.log(data.toString());
        });
    }
}

module.exports = {
    initializeApp,
  }