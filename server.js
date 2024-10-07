require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai');
const socket = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const nanoId = require('nano-id');

const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner.js');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/assets', express.static(process.cwd() + '/assets'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//The client should not be able to guess/sniff the MIME type
app.use(helmet.noSniff())

//Prevent XSS attacks
app.use(helmet.xssFilter())

//Do not cache anything from the website in the client
app.use(helmet.noCache())

//The headers say that the site is powered by PHP 7.4.3
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.4.3' }))

//For FCC testing purposes and enables user to connect from outside the hosting platform
app.use(cors({origin: '*'})); 

// Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  }); 

//For FCC testing purposes
fccTestingRoutes(app);
    
// 404 Not Found Middleware
app.use(function(req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const portNum = process.env.PORT || 3000;

// Set up server and tests
const server = app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
  if (process.env.NODE_ENV==='test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (error) {
        console.log('Tests are not valid:');
        console.error(error);
      }
    }, 1500);
  }
});

const http = require('http').createServer(server);
const io = socket(server);
let players = [];
let stardata = generateStar();

// get ReferenceError: Cannot access 'generateStar' before initialization when using arrow function
function generateStar(){
  const randX = 3 + Math.random()*614;
  const randY = 70 + Math.random()*387;
  const randId = nanoId();
  return {x: randX, y: randY, value: 1, id: randId}
}

io.on('connection', socket=> {
  console.log('A user connected: ' + socket.id);
  
  socket.on('updatePlayers', updatedPlayer => {
    // find if the updated player is already in the array using id and update it if it is
    players = players.map(player => player.playerObj.id == updatedPlayer.playerObj.id ? updatedPlayer : player);
    // add the updatedPlayer to the array if it is not already present
    if (players.filter(player => player.playerObj.id == updatedPlayer.playerObj.id).length == 0) {
      players = [...players, updatedPlayer];
    }
    io.emit('updateGame', players, stardata);
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected: ' + socket.id);
    // remove disconnected player from array
    players = players.filter(player => player.playerObj.id != socket.id);
    io.emit('updateGame', players, stardata);
  })

});

http.listen(()=> console.log('Server started!'));

module.exports = app; // For testing