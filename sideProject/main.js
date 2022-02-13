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

  physicsObject: function(width, height, xpos, ypos, color, window, velocity, vectors) {
    // these functions may need simplified for later reading and review
    this.vectors = vectors; // vector has format (vectorID, x acceleation, y acceleation)

    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
    this.window = window;

    this.velocity = velocity;

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

    this.addVector = function(vector) {
      this.vectors.push(vector);
    }

    //  getter/setter for velocity
    this.getVelocity = function() {
      return this.velocity;
    }
    this.setVelocity = function(newVelocity) {
      this.velocity = newVelocity;
    }

    // these functions may need simplified for later reading and review
    this.moveLeft = function() { this.setXpos(this.getXpos() - velocity); };
    this.moveRight = function() { this.setXpos(this.getXpos() + velocity); };
    this.moveUp = function() { this.setYpos(this.getYpos() - velocity); };
    this.moveDown = function() { this.setYpos(this.getYpos() + velocity); };


    this.removeVector = function(vectorID) {
          this.vectors = this.vectors.filter(function(ele){
          return ele[0] != vectorID;
      });
    };

    this.bounceX = function(decayX = 1) {
      this.setVelocity([this.getVelocity()[0] * -1 , this.getVelocity()[1] * decayX]);
      for (var i = 0; i < this.vectors.length; i++) {
        this.setVelocity([(this.getVelocity()[0]  - this.vectors[i][1]) , this.getVelocity()[1]*decayX]);
      }
    };

    this.bounceY = function(decayY = 1) {
      console.log(this.getVelocity()[1])
      this.setVelocity([this.getVelocity()[0]*decayY , (this.getVelocity()[1] * (-1 * decayY))]);
      for (var i = 0; i < this.vectors.length; i++) {
        this.setVelocity([this.getVelocity()[0]*decayY , (this.getVelocity()[1] - this.vectors[i][2])]);
      }
    };

    this.update = function() {
      for (var i = 0; i < this.vectors.length; i++) {
        this.setVelocity([this.getVelocity()[0] + this.vectors[i][1] , this.getVelocity()[1] + this.vectors[i][2]]);
        this.setXpos(this.getXpos() + this.getVelocity()[0]);
        this.setYpos(this.getYpos() + this.getVelocity()[1]);
      }
    };

    var ctx = this.window.canvasDoc.getContext("2d");
    this.draw = function(window){
      ctx.fillStyle = this.color;
      ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
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
  squareTimesTen: function() {

  },
  updateVelocityOnWindowCollision: function(square, collisionDetectorObject, newVelocityFactor) {
    if (collisionDetectorObject.leftWindowCollision()){
      square.setXpos(0);

      square.bounceX(newVelocityFactor);
    }
    if (collisionDetectorObject.rightWindowCollision()){
      square.setXpos(windowSpecs.width-square.getWidth());
      square.bounceX(newVelocityFactor);
    }
    if (collisionDetectorObject.topWindowCollision()){
      square.setYpos(0);
      square.bounceY(newVelocityFactor);
    }
    if (collisionDetectorObject.bottomWindowCollision()) {
      square.setYpos(windowSpecs.height-square.getHeight());
      square.bounceY(newVelocityFactor);
    }
  },

  mainLoop: function(window, gameObjects) {
    window.clear();
    gameObjects.forEach((i) => {
      i.draw(window);
    });
    //var CD = new Game.collisionDetector(gameObjects[0], new Game.movingObject(100, 100, 200, 100, "red", windowSpecs, 5), window);
    gameObjects.forEach((i) => {
      CD = new Game.collisionDetector(i, new Game.physicsObject(100, 100, 1, 1, "red", window, [Math.floor(Math.random() * 50), -1 * (Math.floor(Math.random() * 50))], [["gravitiy", 0, 1] ]), window);
      Game.updateVelocityOnWindowCollision(i, CD, 1.045);
      i.update();

    });
  },

  // To start the game use initGame( windowSpec, listOfObjects );
  initGame: function(window, gameObjects) {
    window.setup();
    for(var i = 0; i < 1; i++) {
      gameObjects.push(new Game.physicsObject(100, 100, 1, 1, "red", window, [Math.floor(Math.random() * 50), -1 * (Math.floor(Math.random() * 50))], [["gravitiy", 0, 1] ]));
    }
    var interval = setInterval(Game.mainLoop, 30, window, gameObjects);
    //window.takeDown();
  }
}
