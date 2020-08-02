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

var listOfObjects = [];

// The most base visual compnet in this project is a "visualObject"
// A visual object is to be inherited by other objects that may move, interacte, or cause other objects to deconstruct themselves...
// type is used to comunicate interactions between
var visualObject = function(width, height, xpos, ypos, color, window) {
  this.defaultColor = "#0000FF"; // Blue
  if (color == "null") {
    this.color = this.defaultColor;
  }
  else {
    this.color = color;
  }
  this.xpos = xpos;
  this.ypos = ypos;
  this.width = width;
  this.height = height;
  this.window = window;

  //  getter/setter for xpos
  this.getXpos = function() {
    return this.xpos;
  };
  this.setXpos = function(newXpos) {
    this.xpos = newXpos;
  };

  //  getter/stter for ypos
  this.getYpos = function() {
    return this.ypos;
  };
  this.setYpos = function(newYpos) {
    this.ypos = newYpos;
  };

  //   getter/setter for width
  this.getWidth = function() {
    return this.width;
  };
  this.setWidth = function(newWidth) {
    this.width = newWidth;
  };

  // getter/setter for height
  this.getHeight = function() {
    return this.height;
  };
  this.setHeight = function(newHeight) {
    this.height = newHeight;
  };

  var ctx = this.window.canvasDoc.getContext("2d");
  this.draw = function(window){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
  };
};

// Constructs a visualObject and updates it xpos and
// ypos by and given velocity per call by the mainLoop
var movingObject = function(width, height, xpos, ypos, color, window, velocity) {
  this.visualToMakeMoving = new visualObject(width, height, xpos, ypos, color, window);
  this.velocity = velocity;

  //  getter/setter for velocity
  this.getVelocity = function() {
    return this.velocity;
  }
  this.setVelocity = function(newVelocity) {
    this.velocity = newVelocity;
  }

  // these functions may need simplified for later reading and review
  this.moveLeft = function() { this.visualToMakeMoving.setXpos(this.visualToMakeMoving.getXpos() - velocity); };
  this.moveRight = function() { this.visualToMakeMoving.setXpos(this.visualToMakeMoving.getXpos() + velocity); };
  this.moveUp = function() { this.visualToMakeMoving.setYpos(this.visualToMakeMoving.getYpos() - velocity); };
  this.moveDown = function() { this.visualToMakeMoving.setYpos(this.visualToMakeMoving.getYpos() + velocity); };

  this.draw = function(window) {
    this.visualToMakeMoving.draw(window);
  }

};

function mainLoop(window, gameObjects) {
  window.canvasDoc.getContext("2d").clearRect(0, 0, window.width, window.height);
  gameObjects.forEach((i) => {
      i.draw(window);
  });
}

function initGame(window, gameObjects) {
  window.setup();
  gameObjects.push(new movingObject(100, 100, 20, 20, "red", window, 5));
  setInterval( mainLoop, 30, window, gameObjects );
}
