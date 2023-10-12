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

// Node.js common core global modules
const fs = require('fs');
const path = require('path');

const crc32 = require('crc/crc32');
const { format } = require('date-fns');

const myArgs = process.argv.slice(2);

function tokenApp() {
  if(DEBUG) console.log('tokenApp()');

  switch (myArgs[1]) {
  case '--count':
      if(DEBUG) console.log('token.tokenCount() --count');
      // tokenCount();
      break;
  case '--list':
      if(DEBUG) console.log('token.tokenList() --list');
      // tokenList();
      break; 
  case '--new':
      if (myArgs.length < 3) {
          console.log('invalid syntax. node myapp token --new [username]')
          myEmitter.emit('log', 'token.newToken() --new', 'WARNING', 'invalid syntax, usage displayed');
      } else {
          // newToken(myArgs[2]);
      }
      break;
  case '--upd':
      if (myArgs.length < 5) {
          console.log('invalid syntax. node myapp token --upd [option] [username] [new value]')
          myEmitter.emit('log', 'token.updateToken() --upd', 'WARNING', 'invalid syntax, usage displayed');
      } else {
          // updateToken(myArgs);
      }
      break;
  case '--fetch':
      if (myArgs.length < 3) {
          console.log('invalid syntax. node myapp token --fetch [username]')
          myEmitter.emit('log', 'token.fetchRecord() --fetch', 'WARNING', 'invalid syntax, usage displayed');
      } else {
          // fetchRecord(myArgs[2]);
      }
      break;
  case '--search':
      if(DEBUG) console.log('token.searchToken()');
  //    searchToken();
      break;
  case '--help':
  case '--h':
  default:
      fs.readFile(__dirname + "/views/token.txt", (error, data) => {
          if(error) throw error;              
          console.log(data.toString());
      });
  }
}

module.exports = {
  tokenApp,
  // newToken,
  // tokenCount,
  // fetchRecord,
}