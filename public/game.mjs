import Player from './Player.mjs';
import Collectible from './Collectible.mjs';


const socket = io();
const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

ctx.font = '30px Fantasy';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = 'white';
ctx.strokeRect(3, 70, canvas.width-6, canvas.height-73);
ctx.fillStyle = 'white';
ctx.fillText('Controls: WASD', 5, 50);
ctx.fillText('Grab the coin!!', 250, 50);
ctx.fillText('Rank: ', 500, 50);
ctx.fillText
