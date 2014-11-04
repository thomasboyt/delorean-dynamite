var LANE_WIDTH = 50;

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

    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(250 - width/2, 500);
    ctx.lineTo(250 - width/2, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(250 + width/2, 500);
    ctx.lineTo(250 + width/2, 0);
    ctx.stroke();

    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 100, 100);

    ctx.fillStyle = 'blue';
    ctx.fillRect(300, 300, 100, 100);

    ctx.fillStyle = 'blue';
    ctx.fillRect(300, 300, 100, 100);
  }

  _drawInternal() {
    var ctx = this.trackCanvas.getContext('2d');

    this._drawLines(ctx);

    return ctx;
  }

  draw(ctx) {
    var internal = this._drawInternal();

    var img = this.trackCanvas;
    var scalingFactor = 15;
    var pixelWidth = 200;
    var x = 0;
    var y = 300;

    var h = img.height,
        w = img.width,

        // The number of slices to draw.
        numSlices = Math.abs(pixelWidth),

        // The width of each source slice.
        sliceHeight = w / numSlices,

        // Whether to draw the slices in reverse order or not.
        polarity = (pixelWidth > 0) ? 1 : -1,

        // How much should we scale the width of the slice 
        // before drawing?
        heightScale = Math.abs(pixelWidth) / h,

        // How much should we scale the height of the slice 
        // before drawing? 
        widthScale = (1 - scalingFactor) / numSlices;

    for(var n = 0; n < numSlices; n++) {

      // Source: where to take the slice from.
      var sx = 0,
          sy = sliceHeight * n,
          sWidth = w,
          sHeight = sliceHeight;

      // Destination: where to draw the slice to 
      // (the transformation happens here).
      // var dx = x + (sliceWidth * n * widthScale * polarity),
      var dx = x + ((w * widthScale * n) / 2),
          dy = y + (sliceHeight * n * heightScale * polarity),
          dWidth = w * (1 - (widthScale * n)),
          dHeight = sliceHeight * heightScale;

      ctx.drawImage(img, sx, sy, sWidth, sHeight,
                    dx, dy, dWidth, dHeight);
    }

  }
}

module.exports = TrackPiece;
