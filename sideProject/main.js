var windowSpecs = {
  width: 1000,
  height: 800,
  canvasDoc: document.getElementById("Game"),
  setup: function() {
    this.canvasDoc.setAttribute("width", this.width+"px");
    this.canvasDoc.setAttribute("height", this.height+"px");
  },
  clear: function() {
    this.canvasDoc.clearRect(0, 0, this.canvasDoc.width, this.canvasDoc.height);
  }
};

// The most base visual compnet in this project is a "visualObject"
// A visual object is to be inherited by other objects that may move, interacte, or cause other objects to deconstruct themselves...
// type is used to comunicate interactions between
var visualObject = function(width, height, xpos, ypos, type, window) {

};

var movingObject = function(xpos, ypos, velocity) {
  // To Do implement visual object first
};

function mainLoop(window) {
  ctx = window.canvasDoc.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0,0,150,75);
}

function initGame(window) {
  window.setup();
  setInterval( mainLoop, 30, window );
}
