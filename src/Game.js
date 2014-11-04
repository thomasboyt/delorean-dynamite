var Coquette = require('coquette');
var TrackPiece = require('./TrackPiece');

class Game {
  constructor() {
    this.width = 500;
    this.height = 500;

    this.c = window.__coquette__ = new Coquette(this, "canvas", this.width, this.height, "#000");

    // create some example track pieces to test rendering
    var first = this.c.entities.create(TrackPiece, {
      // last piece is used to get the previous direction & width
      // (if null, use a default)
      last: null,

      // angle is relative from the previous piece's angle
      angle: 0,

      // number of lanes (may change for further granularity)
      width: 1.5
    });

    // var second = this.c.entities.create(TrackPiece, {
    //   last: first,
    //   angle: 30,
    //   width: 3
    // });

    // var third = this.c.entities.create(TrackPiece, {
    //   last: third,
    //   angle: -30,
    //   width: 3
    // });
  }
}

module.exports = Game;
