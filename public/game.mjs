import Player from './Player.mjs';
import Collectible from './Collectible.mjs';


const socket = io();
const canvas = document.getElementById('game-window');
const ctx = canvas.getContext('2d');

ctx.fillRect(0, 0, canvas.width, canvas.height);
