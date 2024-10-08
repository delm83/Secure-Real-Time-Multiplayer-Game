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

  collision(item, elementSizes) {
    return this.x > item.x + elementSizes.starWidth || item.x > this.x + elementSizes.playerWidth || this.y > item.y + elementSizes.starHeight || item.y > this.y + elementSizes.playerHeight?
    false:
    true;
    }
  
  calculateRank(arr) {
    let ranking;
    let sortedPlayers = arr.toSorted((a, b) => b.score - a.score);
    for (let player of sortedPlayers) {
      if (this.id == player.id) {
        ranking = sortedPlayers.indexOf(player)+1;
      }
    }
    return `Rank: ${ranking}/${arr.length}`
  }
}

export default Player;
