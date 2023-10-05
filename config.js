const fs = require('fs');
const myArgs = process.argv.slice(2);

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

function displayConfig() {
    if(DEBUG) console.log('config.displayConfig()');
    myEmitter.emit('log', 'config.displayConfig()', 'INFO', 'display config.json displayed');
}

function resetConfig() {
    if(DEBUG) console.log('config.resetConfig()');
    myEmitter.emit('log', 'config.resetConfig()', 'INFO', 'reset config.json to original state.');
}

function setConfig() {
    if(DEBUG) console.log('config.setConfig()');
    if(DEBUG) console.log(myArgs);
    myEmitter.emit('log', 'config.setConfig()', 'INFO', `config.json "${myArgs[2]}": updated to "${myArgs[3]}"`);
}

function configApp() {
    if(DEBUG) console.log('configApp()');

    switch (myArgs[1]) {
    case '--show':
        if(DEBUG) console.log('--show');
        displayConfig();
        break;
    case '--reset':
        if(DEBUG) console.log('--reset');
        resetConfig();
        break;
    case '--set':
        if(DEBUG) console.log('--set');
        setConfig();
        break;
    case '--help':
    case '--h':
    default:
        fs.readFile(__dirname + "/views/config.txt", (error, data) => {
            if(error) throw error;              
            console.log(data.toString());
        });
    }
}

module.exports = {
    configApp,
  }