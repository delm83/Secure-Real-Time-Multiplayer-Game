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
let nano_Id = nanoId();
let x = 3 + Math.random()*614;
let y = 70 + Math.random()*387;
let stardata = {x: x, y: y, value: 1, id: nano_Id}

io.on('connection', socket=> {
  console.log('A user connected: ' + socket.id);

  socket.emit('newPlayer', socket.id, stardata);

  socket.on('disconnect', ()=> {
      console.log('A user disconnected: ' + socket.id);
  });
});

http.listen(()=> console.log('Server started!'));

module.exports = app; // For testing
