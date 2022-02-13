var testing = {
  collisionTesting: function() { 
    //HeadOnCollisionDetection will test if, when two visualObjects, possesing same size coliding surfaces,
    //that they do not overlap OR fail to touch.
    function HeadOnCollisionDetectionLeft(window) {
      var collisionError = "Head on left side collision Failed: ";

      gameObjects = [];
      gameObjects.push(new Game.movingObject(100, 100, 200, 100, "red", windowSpecs, 5));
      gameObjects.push(new Game.visualObject(100, 100, 20, 100, "blue", windowSpecs));
      gameObjects.push(new Game.collisionDetector(gameObjects[0],gameObjects[1],windowSpecs));
      window.setup()

      var intervalID = setInterval(function() {
        window.clear();

        gameObjects.forEach((i) => {
            i.draw(window);
        });

        gameObjects[0].moveLeft();
        gameObjects[2] = new Game.collisionDetector(gameObjects[0],gameObjects[1],windowSpecs);
        var critialValueOfMo = gameObjects[0].getXpos();
        var critialValueOfVo = gameObjects[1].getXpos() + gameObjects[1].getWidth();
        var moErrorLabel = " Left x position of moving object: ";
        var voErrorLabel = " Right x position of visual object: ";
        if (gameObjects[2].checkCollision() || gameObjects[2].windowCollision()) {
          if (critialValueOfMo != critialValueOfVo)
            console.log(collisionError + moErrorLabel + critialValueOfMo + voErrorLabel + critialValueOfVo);
          window.takeDown();
          clearInterval(intervalID);
          HeadOnCollisionDetectionRight(window);
        }
      }, 30);
    }
    function HeadOnCollisionDetectionRight(window) {
      var collisionError = "Head on right side collision Failed: ";

      gameObjects = [];
      gameObjects.push(new Game.movingObject(100, 100, 20, 100, "red", windowSpecs, 5));
      gameObjects.push(new Game.visualObject(100, 100, 200, 100, "blue", windowSpecs));
      gameObjects.push(new Game.collisionDetector(gameObjects[0],gameObjects[1],windowSpecs));
      window.setup()

      var intervalID = setInterval(function() {
        window.clear();

        gameObjects.forEach((i) => {
            i.draw(window);
        });

        gameObjects[0].moveRight();
        gameObjects[2] = new Game.collisionDetector(gameObjects[0],gameObjects[1],windowSpecs);
        var critialValueOfMo = gameObjects[0].getXpos() + gameObjects[0].getWidth();
        var critialValueOfVo = gameObjects[1].getXpos();
        var moErrorLabel = " Right x position of moving object: ";
        var voErrorLabel = " Left x position of visual object: ";
        if (gameObjects[2].checkCollision() || gameObjects[2].windowCollision()) {
          if (critialValueOfMo != critialValueOfVo)
            console.log(collisionError + moErrorLabel + critialValueOfMo + voErrorLabel + critialValueOfVo);
          window.takeDown();
          clearInterval(intervalID);
          HeadOnCollisionDetectionTop(window)
        }
      }, 30);
    }
    function HeadOnCollisionDetectionTop(window) {
      var collisionError = "Head on top side collision Failed: ";

      gameObjects = [];
      gameObjects.push(new Game.movingObject(100, 100, 20, 300, "red", windowSpecs, 5));
      gameObjects.push(new Game.visualObject(100, 100, 20, 100, "blue", windowSpecs));
      gameObjects.push(new Game.collisionDetector(gameObjects[0],gameObjects[1],windowSpecs));
      window.setup()

      var intervalID = setInterval(function() {
        window.clear();

        gameObjects.forEach((i) => {
            i.draw(window);
        });

        gameObjects[0].moveUp();
        gameObjects[2] = new Game.collisionDetector(gameObjects[0],gameObjects[1],windowSpecs);
        var critialValueOfMo = gameObjects[0].getYpos();
        var critialValueOfVo = gameObjects[1].getYpos() + gameObjects[1].getHeight();
        var moErrorLabel = " Top y position of moving object: ";
        var voErrorLabel = " Bottom y position of visual object: ";
        if (gameObjects[2].checkCollision() || gameObjects[2].windowCollision()) {
          if (critialValueOfMo != critialValueOfVo)
            console.log(collisionError + moErrorLabel + critialValueOfMo + voErrorLabel + critialValueOfVo);
          window.takeDown();
          clearInterval(intervalID);
          HeadOnCollisionDetectionBottom(window)
        }
      }, 30);
    }

    function HeadOnCollisionDetectionBottom(window) {
          var collisionError = "Head on bottom side collision Failed: ";

          gameObjects = [];
          gameObjects.push(new Game.movingObject(100, 100, 20, 100, "red", windowSpecs, 5));
          gameObjects.push(new Game.visualObject(100, 100, 20, 300, "blue", windowSpecs));
          gameObjects.push(new Game.collisionDetector(gameObjects[0],gameObjects[1],windowSpecs));
          window.setup()

          var intervalID = setInterval(function() {
            window.clear();

            gameObjects.forEach((i) => {
                i.draw(window);
            });

            gameObjects[0].moveDown();
            gameObjects[2] = new Game.collisionDetector(gameObjects[0],gameObjects[1],windowSpecs);
            var critialValueOfMo = gameObjects[0].getYpos() + gameObjects[0].getHeight();
            var critialValueOfVo = gameObjects[1].getYpos();
            var moErrorLabel = " Top y position of moving object: ";
            var voErrorLabel = " Bottom y position of visual object: ";
            if (gameObjects[2].checkCollision() || gameObjects[2].windowCollision()) {
              if (critialValueOfMo != critialValueOfVo)
                console.log(collisionError + moErrorLabel + critialValueOfMo + voErrorLabel + critialValueOfVo);
              window.takeDown();
              clearInterval(intervalID);
            }
          }, 30);
    }

    //   |=======|
    //   |=======|
    //   |=======|
    //   |=======|
    //       \=======\ (Target Oject)
    //       \=======\
    //       \=======\
    //       \=======\
    function OffSetCollisionDetectionTopLeft() {

    }
    //       \=======\
    //       \=======\
    //       \=======\
    //       \=======\
    //   |=======| (Target Oject)
    //   |=======|
    //   |=======|
    //   |=======|
    function OffSetCollisionDetectionTopRight() {

    }
    //       \=======\ (Target Oject)
    //       \=======\
    //       \=======\
    //       \=======\
    //   |=======|
    //   |=======|
    //   |=======|
    //   |=======|
    function OffSetCollisionDetectionBottomLeft() {

    }
    //   |=======| (Target Oject)
    //   |=======|
    //   |=======|
    //   |=======|
    //       \=======\
    //       \=======\
    //       \=======\
    //       \=======\
    function OffSetCollisionDetectionBottomRight() {

    }
    //                  |=======|
    //                  |=======|
    //                  |=======|\=======\ (Target Object)
    //                  |=======|\=======\
    //                           \=======\
    //                           \=======\
    //
    function OffSetCollisionDetectionLeftTop() {

    }
    //                           \=======\ (Target Object)
    //                           \=======\
    //                  |=======|\=======\
    //                  |=======|\=======\
    //                  |=======|
    //                  |=======|
    function OffSetCollisionDetectionLeftBottom() {

    }
    //
    //                           \=======\
    //                           \=======\
    //   (Target Object)|=======|\=======\
    //                  |=======|\=======\
    //                  |=======|
    //                  |=======|
    function OffSetCollisionDetectionRightTop() {

    }
    //   (Target Object)|=======|
    //                  |=======|
    //                  |=======|\=======\
    //                  |=======|\=======\
    //                           \=======\
    //                           \=======\
    //
    function OffSetCollisionDetectionRightBottom() {

    }

    HeadOnCollisionDetectionLeft(windowSpecs);

  }
};
