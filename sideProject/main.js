var windowSpecs = {
  width: 1000,
  height: 800,
  canvasDoc: document.getElementById("Game"),
  setup: function() {
    this.canvasDoc.setAttribute("width", this.width+"px");
    this.canvasDoc.setAttribute("height", this.height+"px");
  },
  clear: function() {
    this.canvasDoc.getContext("2d").clearRect(0, 0, this.canvasDoc.width, this.canvasDoc.height);
  },
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

  //  getter/setter for xpos
  this.getXpos = function() {
    return this.visualToMakeMoving.xpos;
  };
  this.setXpos = function(newXpos) {
    this.visualToMakeMoving.xpos = newXpos;
  };

  //  getter/stter for ypos
  this.getYpos = function() {
    return this.visualToMakeMoving.ypos;
  };
  this.setYpos = function(newYpos) {
    this.visualToMakeMoving.ypos = newYpos;
  };

  //   getter/setter for width
  this.getWidth = function() {
    return this.visualToMakeMoving.width;
  };
  this.setWidth = function(newWidth) {
    this.visualToMakeMoving.width = newWidth;
  };

  // getter/setter for height
  this.getHeight = function() {
    return this.visualToMakeMoving.height;
  };
  this.setHeight = function(newHeight) {
    this.visualToMakeMoving.height = newHeight;
  };

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

// used to verifiy if the movingobject("mo") collides with a visualobject("vo")
var collisionDetector = function(mo, vo, window) {

  var leftXOfMo    = mo.getXpos();
  var rightXOfMo   = mo.getXpos() + mo.getWidth();
  var topYOfMo     = mo.getYpos();
  var bottomOfMo   = mo.getYpos() + mo.getHeight();

  var leftXOfVo    = vo.getXpos();
  var rightXOfVo   = vo.getXpos() + vo.getWidth();
  var topYOfVo     = vo.getYpos();
  var bottomOfVo   = vo.getYpos() + vo.getHeight();

  var leftWindowBorder = 0;
  var rightWindowBorder = window.width;
  var topWindowBorder = 0;
  var bottomWindowBorder = window.height;

  // check left collision of mo
  this.leftCollision = function() {
    if( ( (leftXOfVo <=  leftXOfMo + mo.getVelocity()) && (leftXOfMo + mo.getVelocity() <= rightXOfVo) )
      && ( ( topYOfVo <= topYOfMo &&  topYOfMo  <= bottomOfVo )
      ||   ( topYOfVo <= bottomOfMo && bottomOfMo <= bottomOfVo ) ) ) {
        return true;
      }
      return false;
  };
  // check right collision
  this.rightCollision = function() {
    if( ( (leftXOfVo <= rightXOfMo + mo.getVelocity()) && (rightXOfMo + mo.getVelocity() <= rightXOfVo) )
      && ( ( topYOfVo <= topYOfMo && topYOfMo <= bottomOfVo )
      || ( topYOfVo <= bottomOfMo && bottomOfMo <= bottomOfVo )) ) {
        return true;
      }
      return false;
  };
  // check top collision
  this.topCollision = function() {
    if( ( (topYOfVo <= topYOfMo + mo.getVelocity()) && (topYOfMo + mo.getVelocity() <= bottomOfVo) )
    && ( ( leftXOfVo <= leftXOfMo && leftXOfMo <= rightXOfVo )
    || ( leftXOfVo <= rightXOfMo && rightXOfMo <= rightXOfVo ) ) ) {
      return true;
    }
    return false;
  };
  // check bottom collisin
  this.bottomCollision = function() {
    if( ( (topYOfVo <= bottomOfMo + mo.getVelocity()) && (bottomOfMo + mo.getVelocity() <= bottomOfVo) )
      && ( ( leftXOfVo <= leftXOfMo && leftXOfMo <= rightXOfVo )
      || ( leftXOfVo <= rightXOfMo && rightXOfMo <= rightXOfVo ) ) ) {
        return true;
    }
    return false;
  };

  this.topWindowCollision = function() {
    if( topYOfMo <= topWindowBorder ) {
      return true;
    }
    return false;
  };

  this.bottomWindowCollision = function() {
    if( bottomOfMo >= bottomWindowBorder ) {
      return true;
    }
    return false;
  };

  this.rightWindowCollision = function() {
    if( rightXOfMo >= rightWindowBorder ) {
      return true;
    }
    return false;
  };

  this.leftWindowCollision = function() {
    if( leftXOfMo <= leftWindowBorder ) {
      return true;
    }
    return false;
  };

  this.windowCollision = function() {

    if(this.topWindowCollision()
      || this.bottomWindowCollision()
      || this.leftWindowCollision()
      || this.rightWindowCollision()) {
      return true;
    }
    return false;
  };

  this.checkCollision = function() {

    if( this.leftCollision()
      || this.rightCollision()
      || this.topCollision()
      || this.rightCollision()){
      return true;
    }
    return false;
  }
};

function mainLoop(window, gameObjects) {
  window.clear();
  gameObjects.forEach((i) => {
      i.draw(window);
  });

  var CD = new collisionDetector(gameObjects[0], gameObjects[1], window);
  if (!CD.checkCollision()){
    gameObjects[0].moveDown();
  }
  else if(! (CD.leftWindowCollision() || CD.rightWindowCollision()) ){
    gameObjects[0].moveLeft();
  }



}

function initGame(window, gameObjects) {
  window.setup();
  gameObjects.push(new movingObject(100, 100, 20, 20, "red", window, 5));
  gameObjects.push(new visualObject(100, 100, 20, 500, "blue", window));
  setInterval( mainLoop, 30, window, gameObjects );
}
