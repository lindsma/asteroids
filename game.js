(function gameSetup() {
    'use strict';
    // var asteroidElem = event.detail;
    var shipElem = document.getElementById('ship');

    var ship = {
      velocity: 0,
      angle: 0,
      element: shipElem,
      top: 0,
      left: 0
    }

    var shipsCurrentAngle = ship.angle;
    var shipsCurrentVelocity = ship.velocity;

    // Create your "ship" object and any other variables you might need...


    var allAsteroids = [];
    shipElem.addEventListener('asteroidDetected', function (event) {
        // You can detect when a new asteroid appears with this event.
        // The new asteroid's HTML element will be in:  event.detail

        // What might you need/want to do in here?

        if ("asteroidDetected") {
          allAsteroids.push(event.detail);
        }
    });

    /**
     * Use this function to handle when a key is pressed. Which key? Use the
     * event.keyCode property to know:
     *
     * 37 = left   rotate -25deg
     * 38 = up += 10px
     * 39 = right  rotate 25deg
     * 40 = down -= 10px
     *
     * @param  {Event} event   The "keyup" event object with a bunch of data in it
     * @return {void}          In other words, no need to return anything
     */
    function handleKeys(event) {
        console.log(event.keyCode);
        if (event.keyCode === 37) {
          shipsCurrentAngle = ship.angle -= 5;
          console.log(shipsCurrentAngle);
        }
        else if (event.keyCode === 38) {
          shipsCurrentVelocity = ship.velocity += 1;
        }
        else if (event.keyCode === 39) {
          shipsCurrentAngle = ship.angle += 5;
        }
        else if (event.keyCode === 40) {
          shipsCurrentVelocity = ship.velocity -= 1;
        } else {
          console.log("Not a valid key!");
        }
        // Implement me!
        getShipMovement(shipsCurrentVelocity, shipsCurrentAngle);
    }
    document.querySelector('body').addEventListener('keyup', handleKeys);

    /**
     * This is the primary "game loop"... in traditional game development, things
     * happen in a loop like this. This function will execute every 20 milliseconds
     * in order to do various things. For example, this is when all game entities
     * (ships, etc) should be moved, and also when things like hit detection happen.
     *
     * @return {void}
     */
    function gameLoop() {
        // This function for getting ship movement is given to you (at the bottom).
        // NOTE: you will need to change these arguments to match your ship object!
        // What does this function return? What will be in the `move` variable?
        // Read the documentation! continuously looking for updated values
      var move = getShipMovement(shipsCurrentVelocity, shipsCurrentAngle);

      ship.top += move.top;
      ship.left += move.left;

      var moveTop = (String(-ship.top) + "px");
      var moveLeft = (String(ship.left) + "px");

      var changeAngle = "rotate(" + String(shipsCurrentAngle) + "deg)";
        // Move the ship here!
        ship.element.style.top = moveTop;
        ship.element.style.left = moveLeft;
        ship.element.style.transform = changeAngle;
        // Time to check for any collisions (see below)...
        checkForCollisions();

    }

    /**
     * This function checks for any collisions between asteroids and the ship.
     * If a collision is detected, the crash method should be called with the
     * asteroid that was hit:
     *    crash(someAsteroidElement);
     *
     * You can get the bounding box of an element using:
     *    someElement.getBoundingClientRect();
     *
     * A bounding box is an object with top, left, width, and height properties
     * that you can use to detect whether one box is on top of another.
     *
     * @return void
     */
    function checkForCollisions() {
      // Implement me!
      for (var check = 0; check < allAsteroids.length; check++) {
        if (ship.element.getBoundingClientRect().bottom > allAsteroids[check].getBoundingClientRect().top && ship.element.getBoundingClientRect().top < allAsteroids[check].getBoundingClientRect().bottom && ship.element.getBoundingClientRect().right > allAsteroids[check].getBoundingClientRect().left && ship.element.getBoundingClientRect().left < allAsteroids[check].getBoundingClientRect().right) {
          crash(allAsteroids[check]);
        }
      }
    }


    /**
     * This event handler will execute when a crash occurs
     *
     * return {void}
     */
    document.querySelector('main').addEventListener('crash', function () {
        console.log('A crash occurred!');

        alert("You Lose!");

        // What might you need/want to do in here?

    });



    /** ************************************************************************
     *             These functions and code are given to you.
     *
     *                   !!! DO NOT EDIT BELOW HERE !!!
     ** ************************************************************************/

     var loopHandle = setInterval(gameLoop, 20);

     /**
      * Executes the code required when a crash has occurred. You should call
      * this function when a collision has been detected with the asteroid that
      * was hit as the only argument.
      *
      * @param  {HTMLElement} asteroidHit The HTML element of the hit asteroid
      * @return {void}
      */
    function crash(asteroidHit) {
        document.querySelector('body').removeEventListener('keyup', handleKeys);
        asteroidHit.classList.add('hit');
        document.querySelector('#ship').classList.add('crash');

        var event = new CustomEvent('crash', { detail: asteroidHit });
        document.querySelector('main').dispatchEvent(event);
    }

    /**
     * Get the change in ship position (movement) given the current velocity
     * and angle the ship is pointing.
     *
     * @param  {Number} velocity The current speed of the ship (no units)
     * @param  {Number} angle    The angle the ship is pointing (no units)
     * @return {Object}          The amount to move the ship by with regard to left and top position (object with two properties)
     */
    function getShipMovement(velocity, angle) {
        return {
            left: (velocity * Math.sin(angle * Math.PI / 180)),
            top: (velocity * Math.cos(angle * Math.PI / 180))
        };
    }

})();
