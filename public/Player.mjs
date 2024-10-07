const playerWidth = 40, playerHeight = 40;
const starWidth = 20, starHeight = 20;

class Player {
  constructor({x, y, score, id}) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
 }

  movePlayer(dir, speed) {
    switch(dir) {
      case "up":
        this.y -= speed
        break
      case "left":
        this.x -= speed
        break
      case "down":
        this.y += speed
        break
      case "right":
        this.x += speed
        break
      default:
        break
    }
}

  collision(item) {
    return this.x > item.x + starWidth || item.x > this.x + playerWidth || this.y > item.y + starHeight || item.y > this.y + playerHeight?
    false:
    true;
    }
  
  calculateRank(arr) {

  }
}

export default Player;
