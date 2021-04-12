var windowSpecs = {
  width: 800,
  height: 800,
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

var controler = {

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
      this.visualToMakeMoving.setXpos(newXpos);
    };

    //  getter/stter for ypos
    this.getYpos = function() {
      return this.visualToMakeMoving.ypos;
    };
    this.setYpos = function(newYpos) {
      this.visualToMakeMoving.setYpos(newYpos);
    };

    //   getter/setter for width
    this.getWidth = function() {
      return this.visualToMakeMoving.width;
    };
    this.setWidth = function(newWidth) {
      this.visualToMakeMoving.setWidth(newWidth);
    };

    // getter/setter for height
    this.getHeight = function() {
      return this.visualToMakeMoving.height;
    };
    this.setHeight = function(newHeight) {
      this.visualToMakeMoving.setHeight(newHeight);
    };

    //  getter/setter for velocity
    this.getVelocity = function() {
      return this.velocity;
    }
    this.setVelocity = function(newVelocity) {
      this.velocity = newVelocity;
    }

    // these functions may need simplified for later reading and review
    this.moveLeft = function() { this.visualToMakeMoving.setXpos(this.visualToMakeMoving.getXpos() - velocity[0]); };
    this.moveRight = function() { this.visualToMakeMoving.setXpos(this.visualToMakeMoving.getXpos() + velocity[0]); };
    this.moveUp = function() { this.visualToMakeMoving.setYpos(this.visualToMakeMoving.getYpos() - velocity[1]); };
    this.moveDown = function() { this.visualToMakeMoving.setYpos(this.visualToMakeMoving.getYpos() + velocity[1]); };

    this.draw = function(window) {
      this.visualToMakeMoving.draw(window);
    }

  },

  physicsObject: function(width, height, xpos, ypos, color, window, velocity, vectors) {
    // these functions may need simplified for later reading and review
    this.movingToMakePhysics = new Game.movingObject(width, height, xpos, ypos, color, window, velocity);
    this.vectors = vectors; // vector has format (vectorID, x acceleation, y acceleation)

    this.getXpos = function() { return this.movingToMakePhysics.getXpos();}
    this.getYpos = function() { return this.movingToMakePhysics.getYpos();}
    this.getWidth = function() { return this.movingToMakePhysics.getWidth();}
    this.getHeight= function() { return this.movingToMakePhysics.getHeight();}
    this.getVelocity= function() {return this.movingToMakePhysics.getVelocity();}
    this.setVelocity= function(newVelocity) {return this.movingToMakePhysics.setVelocity(newVelocity);}

    this.addVector = function(vector) {
      this.vectors.push(vector);
    }

    this.removeVector = function(vectorID) {
          this.vectors = this.vectors.filter(function(ele){
          return ele[0] != vectorID;
      });
    }

    this.bounceX = function(decayX = -1, decayY = 1) {
      this.setVelocity([this.getVelocity()[0] * decayX , this.getVelocity()[1]*decayY]);
      for (var i = 0; i < this.vectors.length; i++) {
        this.setVelocity([(this.getVelocity()[0] - this.vectors[i][1]) , this.getVelocity()[1]]);
      }
    }
    this.bounceY = function(decayX = 1, decayY = -1) {
      console.log(this.getVelocity()[1])
      this.setVelocity([this.getVelocity()[0] * decayX , (this.getVelocity()[1] * decayY)]);
      for (var i = 0; i < this.vectors.length; i++) {
        this.setVelocity([this.getVelocity()[0] , (this.getVelocity()[1] - this.vectors[i][2])]);
      }
    }

    this.update = function() {
      for (var i = 0; i < this.vectors.length; i++) {
        this.setVelocity([this.getVelocity()[0] + this.vectors[i][1] , this.getVelocity()[1] + this.vectors[i][2]]);
        this.movingToMakePhysics.visualToMakeMoving.setXpos(this.getXpos() + this.movingToMakePhysics.getVelocity()[0]); //For some reason I cannot explain
        this.movingToMakePhysics.visualToMakeMoving.setYpos(this.getYpos() + this.movingToMakePhysics.getVelocity()[1]); //I am required to access visualToMakeMoving
      }
    }

    this.draw = function(window) {
      this.movingToMakePhysics.draw(window);
    }
  },

  CollisionHandeler: function(mo1,mo2) {

    this.movingObjectOne = mo1;
    this.movingObjectTwo = mo2;
    this.collisionDetector = new Game.collisionDetector(this.movingObjectOne,this.movingObjectTwo, windowSpecs);
    this.topWindowCollisionHandeler;
    this.bottomWindowCollisionHandeler;
    this.rightWindowCollisionHandeler;
    this.leftWindowCollisionHandeler;

    this.onLeftWindowCollision = function(functionCall) {
        this.leftWindowCollisionHandeler = functionCall;
    };

    this.onRightWindowCollision = function(functionCall) {
      this.rightWindowCollisionHandeler = functionCall;
    };

    this.onTopWindowCollision = function(functionCall) {
      this.topWindowCollisionHandeler = functionCall;
    };

    this.onBottomWindowCollision = function(functionCall) {
      this.bottomWindowCollisionHandeler = functionCall;
    };

    this.draw = function() {
      if (this.collisionDetector.bottomWindowCollision()) { this.bottomWindowCollisionHandeler(); }
      if (this.collisionDetector.topWindowCollision()) { this.topWindowCollisionHandeler(); }
      if (this.collisionDetector.rightWindowCollision()) { this.rightWindowCollisionHandeler(); }
      if (this.collisionDetector.leftWindowCollision()) { this.leftWindowCollisionHandeler(); }
    };

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

    gameObjects[1].collisionDetector = new Game.collisionDetector(gameObjects[0], new Game.movingObject(100, 100, 200, 100, "red", windowSpecs, 5), window);

    gameObjects[0].update();
  },

  // To start the game use initGame( windowSpec, listOfObjects );
  initGame: function(window, gameObjects) {
    window.setup();
    gameObjects.push(new Game.physicsObject(50, 50, 100, 200, "red", window, [12,-.5], [["gravitiy", 0, 2]]));
    gameObjects.push(new Game.CollisionHandeler(gameObjects[0], gameObjects[0]));

    gameObjects[1].onLeftWindowCollision(function() {
      gameObjects[0].movingToMakePhysics.visualToMakeMoving.setXpos(0);

      gameObjects[0].bounceX(-1,1);
    })
    gameObjects[1].onRightWindowCollision(function() {
      gameObjects[0].movingToMakePhysics.visualToMakeMoving
        .setXpos(windowSpecs.width-gameObjects[0].movingToMakePhysics.visualToMakeMoving.getWidth());
      gameObjects[0].bounceX(-1,1);
    })
    gameObjects[1].onTopWindowCollision(function() {
      gameObjects[0].movingToMakePhysics.visualToMakeMoving.setYpos(0);
      gameObjects[0].bounceY(1,-1);
    })
    gameObjects[1].onBottomWindowCollision(function() {
      gameObjects[0].movingToMakePhysics.visualToMakeMoving
        .setYpos(windowSpecs.height-gameObjects[0].movingToMakePhysics.visualToMakeMoving.getHeight());
      gameObjects[0].bounceY(1,-1);
    })

    var interval = setInterval(Game.mainLoop, 15, window, gameObjects);
    //window.takeDown();
  }
}
