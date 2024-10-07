import Player from './Player.mjs';
import Collectible from './Collectible.mjs';

const socket = io();
const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');
const speed = 8;
const myImg = new Image();
myImg.src = "assets/bluemoon.png"
const opponentImg = new Image();
opponentImg.src = "assets/redmoon.png"
const starImg = new Image();
starImg.src = "assets/star.png";
let dir = null;
let myPlayer;

// canvas width: 640, canvas height: 480

socket.on('connect', () => {
    window.addEventListener("keydown", movePlayer);
    const x = 3 + Math.random()*(canvas.width-48);
    const y = 70 + Math.random()*(canvas.height-115);
    myPlayer = new Player({ x: x, y: y, score: 0, id: socket.id })
    socket.emit('updatePlayers', {playerObj: myPlayer});
    console.log('connected to server with id '+myPlayer.id);
  })

socket.on('updateGame', players=> {  
    requestAnimationFrame(()=>{
      updateGame(players);
    });
  })

  const updateGame=players=>{
    canvas.width = canvas.width;
    ctx.font = '30px Fantasy';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(3, 70, canvas.width-6, canvas.height-73);
    ctx.fillStyle = 'white';
    ctx.fillText('Controls: WASD', 5, 50);
    ctx.fillText('Collect The Stars!!', 250, 50);
    ctx.fillText('Rank: ', 500, 50);
    for (let player of players) {
      console.log(player);
        ctx.drawImage(player.playerObj.id == myPlayer.id ? myImg : opponentImg, player.playerObj.x, player.playerObj.y, 40, 40);
      }
    requestAnimationFrame(()=>{
        updateGame(players);
      });
  }
  
  const movePlayer=key=>{
      if(key.keyCode == 87){
          if(myPlayer.y<=70){
              return
           }
          dir = 'up';
        }
      if(key.keyCode == 65){
          if(myPlayer.x<=3){
              return
            }
          dir = 'left';
        }
      if(key.keyCode == 83){
          if(myPlayer.y>=canvas.height-45){
              return
            }
          dir = 'down';
        }
      if(key.keyCode == 68){
          if(myPlayer.x>=canvas.width-45){
              return
            }
          dir = 'right';
        }
      myPlayer.movePlayer(dir, speed);
      socket.emit('updatePlayers', {playerObj: myPlayer});
      };