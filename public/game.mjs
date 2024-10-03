import Player from './Player.mjs';
import Collectible from './Collectible.mjs';


const socket = io();
const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');
let dir = null;

ctx.font = '30px Fantasy';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = 'white';
ctx.strokeRect(3, 70, canvas.width-6, canvas.height-73);
ctx.fillStyle = 'white';
ctx.fillText('Controls: WASD', 5, 50);
ctx.fillText('Collect The Stars!!', 250, 50);
ctx.fillText('Rank: ', 500, 50);

// canvas width: 640, canvas height: 480
socket.on('newPlayer', (id, stardata)=>{
    let x = 3 + Math.random()*(canvas.width-48);
    let y = 70 + Math.random()*(canvas.height-115);
    let player = new Player({x:x, y:y, score:0, id:id});
    let playerImg = new Image();
    playerImg.src = "assets/bluemoon.png"
    playerImg.onload =()=>ctx.drawImage(playerImg, x, y, 40, 40);
    console.log('x: '+stardata.x)
    console.log('y: '+stardata.y)
    console.log('value: '+stardata.value)
    console.log('id: '+stardata.id)
    let starImg = new Image();
    starImg.src = "assets/star.png";
    starImg.onload =()=>ctx.drawImage(starImg, stardata.x, stardata.y, 20, 20);

    window.addEventListener("keydown", ({ key }) => {
        if(key == 'W' || key == 'w'){
            if(player.y<=70){
                return
            }
            dir = 'up'
        }
        if(key == 'A' || key == 'a'){
            if(player.x<=3){
                return
            }
            dir = 'left'
        }
        if(key == 'S' || key == 's'){
            if(player.y>=canvas.height-45){
                return
            }
            dir = 'down'
        }
        if(key == 'D' || key == 'd'){
            if(player.x>=canvas.width-45){
                return
            }
            dir = 'right'
        }
        player.movePlayer(dir, 8);
        console.log('x is '+player.x);
        console.log('y is '+player.y);
        ctx.drawImage(playerImg, player.x, player.y, 40, 40);
      });
});

/*
let starImg = new Image();
starImg.src = "assets/star.png";
starImg.onload =()=>ctx.drawImage(starImg, 3 + Math.random()*(canvas.width-26), 70 + Math.random()*(canvas.height-93), 20, 20);

let opponentImg = new Image();
opponentImg.src = "assets/redmoon.png"
opponentImg.onload =()=>ctx.drawImage(opponentImg, 3 + Math.random()*(canvas.width-48), 70 + Math.random()*(canvas.height-115), 40, 40);
*/