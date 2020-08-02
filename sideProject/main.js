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
//    - if type is "null" the a blue rectangle will appear in its place
var visualObject = function(width, height, xpos, ypos, type, window) {
  this.defaultColor = "#0000FF"; // Blue
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
    ctx.fillStyle = this.defaultColor;
    ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
  };


};

var movingObject = function(xpos, ypos, velocity) {
  // To Do implement visual object first
};

function mainLoop(window, gameObjects) {
  window.canvasDoc.getContext("2d").clearRect(0, 0, window.width, window.height);
  gameObjects.forEach((i) => {
      i.draw(window);
  });
  gameObjects[0].setHeight(gameObjects[0].getHeight() + 5);


}

function initGame(window, gameObjects) {
  window.setup();
  gameObjects.push(new visualObject(100,100,20,20,"null", window));
  setInterval( mainLoop, 30, window, gameObjects );
}
