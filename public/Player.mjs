class Player {
  constructor({x, y, score, id}) {
    this.x = x;
    this.y = y;
    this.score = score;
    this.id = id;
 }

  movePlayer(dir, speed) {
    switch(dir) {
      case "W":
      case "w":
        this.y -= speed
        break
      case "A":
      case "a":
        this.x -= speed
        break
      case "S":
      case "s":
        this.y += speed
        break
      case "D":
      case "d":
        this.x += speed
        break
      default:
        break
    }

  }

  collision(item) {

  }

  calculateRank(arr) {

  }
}

export default Player;
