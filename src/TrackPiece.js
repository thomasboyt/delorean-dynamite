var LANE_WIDTH = 10;


function getRGBAFor(imageData, offset) {
  offset = offset * 4;
  return [
    imageData.data[offset],
    imageData.data[offset+1],
    imageData.data[offset+2],
    imageData.data[offset+3]
  ];
}

function setRGBAIn(imageData, offset, rgba) {
  offset = offset * 4;

  imageData.data[offset] = rgba[0];
  imageData.data[offset+1] = rgba[1];
  imageData.data[offset+2] = rgba[2];
  imageData.data[offset+3] = rgba[3];
}


// current assumptions:
// - only one piece
// - player currently on bottom-most part of piece (render from this as origin)

class TrackPiece {
  constructor(game, opts) {
    this.game = game;
    this.opts = opts;

    this.width = opts.width * LANE_WIDTH;
    this.center = {x: 250, y: 250};

    this._setUpHiddenCanvas();
  }

  _setUpHiddenCanvas() {
    this.trackCanvas = document.getElementById('track-canvas');
    this.trackCanvas.width = this.game.width;
    this.trackCanvas.height = this.game.height;
  }

  update(dt) {
  }

  _drawLines(ctx) {
    var width = this.width;

    ctx.strokeStyle = 'white';

    ctx.beginPath();
    ctx.moveTo(250 - width/2, 500);
    ctx.lineTo(250 - width/2, 250);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(250 + width/2, 500);
    ctx.lineTo(250 + width/2, 250);
    ctx.stroke();
  }

  _drawInternal() {
    var ctx = this.trackCanvas.getContext('2d');

    this._drawLines(ctx);

    return ctx;
  }

  draw(ctx) {
    // so, imagine we've got a straight line:
    // |  |
    // |  |
    // |  |
    // this isn't actually represented as X and Y coordinates, but as X and *Z* coordinates (with Y always = 0)
    // the top of the line is the highest Z (most depth)
    //
    // x' = x / z
    // y' = y / z  // this is always 0, I guess?

    var internal = this._drawInternal();
    var originalData = internal.getImageData(0, 0, this.trackCanvas.width, this.trackCanvas.height);
    // return ctx.getImageData(0, 0, this.trackCanvas.width, this.trackCanvas.height);

    var x, y, originalOffset, newOffset, pixel, px, py, pz, sx, sy;

    var horizon = 220;
    var fov = 200;
    var imageData = ctx.createImageData(this.game.width, this.game.height);

    for (y = 0; y < this.game.height; y++) {
      for (x = 0; x < this.game.width; x++) {
        // do projection and putImageData
        // px = x;
        // py = y + horizon - fov;
        // pz = y + horizon;

        // sx = px / pz;
        // sy = py / pz;



        originalOffset = (Math.round(sy) * this.trackCanvas.width + Math.round(sx));
        newOffset = (Math.round(y) * this.game.width + Math.round(x));

        if (originalOffset > 0) {
          pixel = getRGBAFor(originalData, originalOffset);
          setRGBAIn(imageData, newOffset, pixel);
          debugger;
        }
        // original = drawn.getImageData(sx, sy, 1, 1);
        // ctx.putImageData(original, x, y);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }
}

module.exports = TrackPiece;
