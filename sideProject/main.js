var windowSpecs = {
  width: 1200,
  height: 1800,
  canvasDoc: document.getElementById("Game"),
  setup: function() {
    this.canvasDoc.setAttribute("width", this.width+"px");
    this.canvasDoc.setAttribute("height", this.height+"px");
  },
  clear: function() {
    this.canvasDoc.getContext("2d").clearRect(0, 0, this.canvasDoc.width, this.canvasDoc.height);
  },
  takeDown: function() {
    this.canvasDoc.setAttribute("width", "0px");
    this.canvasDoc.setAttribute("height", "0px");
  }
};

var listOfObjects = [];

var Game = {
  // The most base visual compnet in this project is a "visualObject"
  // A visual object is to be inherited by other objects that may move, interacte, or cause other objects to deconstruct themselves...
  // type is used to comunicate interactions between
  visualObject: function(width, height, xpos, ypos, color, window) {
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
  },

  // Constructs a visualObject and updates it xpos and
  // ypos by and given velocity per call by the mainLoop
  movingObject: function(width, height, xpos, ypos, color, window, velocity) {
    this.visualToMakeMoving = new Game.visualObject(width, height, xpos, ypos, color, window);
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

  },

  physicsObject: function(width, height, xpos, ypos, color, window, velocity, vectors) {
    // these functions may need simplified for later reading and review
    this.movingToMakePhysics = new Game.movingObject(width, height, xpos, ypos, color, window, velocity);
    this.vectors = vectors; // vector has format (vectorID, x acceleation, y acceleation)

    this.addVector = function(vector) {
      this.vectors.push(vector);
    }

    this.removeVector = function(vectorID) {
          this.vectors = this.vectors.filter(function(ele){
          return ele[0] != vectorID;
      });
    }

    this.bounceX = function() {
      this.movingToMakePhysics.setVelocity([this.movingToMakePhysics.getVelocity()[0] * -1 , this.movingToMakePhysics.getVelocity()[1]]);
      for (var i = 0; i < this.vectors.length; i++) {
        this.movingToMakePhysics.setVelocity([(this.movingToMakePhysics.getVelocity()[0]  - this.vectors[i][1]) , this.movingToMakePhysics.getVelocity()[1]]);
      }
    }
    this.bounceY = function() {
      console.log(this.movingToMakePhysics.getVelocity()[1])
      this.movingToMakePhysics.setVelocity([this.movingToMakePhysics.getVelocity()[0] , (this.movingToMakePhysics.getVelocity()[1] * -1)]);
      for (var i = 0; i < this.vectors.length; i++) {
        this.movingToMakePhysics.setVelocity([this.movingToMakePhysics.getVelocity()[0] , (this.movingToMakePhysics.getVelocity()[1] - this.vectors[i][2])]);
      }
    }

    this.update = function() {
      for (var i = 0; i < this.vectors.length; i++) {
        this.movingToMakePhysics.setVelocity([this.movingToMakePhysics.getVelocity()[0] + this.vectors[i][1] , this.movingToMakePhysics.getVelocity()[1] + this.vectors[i][2]]);
        this.movingToMakePhysics.visualToMakeMoving.setXpos(this.getXpos() + this.movingToMakePhysics.getVelocity()[0]);
        this.movingToMakePhysics.visualToMakeMoving.setYpos(this.getYpos() + this.movingToMakePhysics.getVelocity()[1]);
      }
    }

    this.getXpos = function() {return this.movingToMakePhysics.getXpos()};
    this.getYpos = function() {return this.movingToMakePhysics.getYpos()};
    this.getWidth = function() {return this.movingToMakePhysics.getWidth()};
    this.getHeight = function() {return this.movingToMakePhysics.getWidth()};

    this.draw = function(window) {
      this.movingToMakePhysics.draw(window);
    }
  },

  // used to verifiy if the movingobject("mo") collides with a visualobject("vo")
  collisionDetector: function(mo, vo, window) {

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
    // Possible nessessity to remove the <= and change it to <
    this.leftCollision = function() {
      if( ( (leftXOfVo <=  leftXOfMo) && (leftXOfMo <= rightXOfVo) )
        && ( ( topYOfVo < topYOfMo &&  topYOfMo  < bottomOfVo )
        || ( topYOfVo < bottomOfMo && bottomOfMo <= bottomOfVo ) ) ) {
          console.log("Left Collision Detected");
          return true;
        }
        return false;
    };
    // check right collision of mo
    // Possible nessessity to remove the <= and change it to <
    this.rightCollision = function() {
      if( ( (leftXOfVo <= rightXOfMo) && (rightXOfMo < rightXOfVo) )
        && ( ( topYOfVo < topYOfMo && topYOfMo < bottomOfVo )
        || ( topYOfVo <= bottomOfMo && bottomOfMo <= bottomOfVo )) ) {
          console.log("Right Collision Detected");
          return true;
        }
        return false;
    };
    // check top collision of mo
    // Possible nessessity to remove the <= and change it to <
    this.topCollision = function() {
      if( ( (topYOfVo < topYOfMo) && (topYOfMo <= bottomOfVo) )
      && ( ( leftXOfVo < leftXOfMo && leftXOfMo < rightXOfVo )
      || ( leftXOfVo <= rightXOfMo && rightXOfMo <= rightXOfVo ) ) ) {
        console.log("Top Collision Detected");
        return true;
      }
      return false;
    };
    // check bottom collisin of mo
    // Possible nessessity to remove the <= and change it to <
    this.bottomCollision = function() {
      if( ( (topYOfVo <= bottomOfMo) && (bottomOfMo < bottomOfVo) )
        && ( ( leftXOfVo < leftXOfMo && leftXOfMo < rightXOfVo )
        || ( leftXOfVo <= rightXOfMo && rightXOfMo <= rightXOfVo ) ) ) {
          console.log("Bottom Collision Detected");
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
        || this.bottomCollision()){
        return true;
      }
      return false;
    }
    this.draw = function(){return;};

  },

  mainLoop: function(window, gameObjects) {
    window.clear();
    gameObjects.forEach((i) => {
        i.draw(window);
    });

    var CD = new Game.collisionDetector(gameObjects[0], new Game.movingObject(100, 100, 200, 100, "red", windowSpecs, 5), window);

    if (CD.leftWindowCollision()){
      gameObjects[0].movingToMakePhysics.visualToMakeMoving.setXpos(0);

      gameObjects[0].bounceX();
    }
    if (CD.rightWindowCollision()){
      gameObjects[0].movingToMakePhysics.visualToMakeMoving
        .setXpos(windowSpecs.width-gameObjects[0].movingToMakePhysics.visualToMakeMoving.getWidth());
      gameObjects[0].bounceX();
    }
    if (CD.topWindowCollision()){
      gameObjects[0].movingToMakePhysics.visualToMakeMoving.setYpos(0);
      gameObjects[0].bounceY();
    }
    if (CD.bottomWindowCollision()) {
      gameObjects[0].movingToMakePhysics.visualToMakeMoving
        .setYpos(windowSpecs.height-gameObjects[0].movingToMakePhysics.visualToMakeMoving.getHeight());
      gameObjects[0].bounceY();
    }

    gameObjects[0].update();
  },

  // To start the game use initGame( windowSpec, listOfObjects );
  initGame: function(window, gameObjects) {
    window.setup();
    gameObjects.push(new Game.physicsObject(100, 100, 100, 200, "red", window, [15,-12], [["gravitiy", 0, 1]]));
    var interval = setInterval(Game.mainLoop, 30, window, gameObjects);
    //window.takeDown();
  }
}
