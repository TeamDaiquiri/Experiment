window.addEventListener('load', function() {

    'use strict';

    var WIDTH = 1200,
        HEIGHT = 700;

    var shipCanvas = document.getElementById('ship-canvas'),
        shipContext = shipCanvas.getContext('2d'),
        shipImg = document.getElementById('ship');

    shipCanvas.width = WIDTH;
    shipCanvas.height = HEIGHT;

    var ship = createGameObject({
      spritesheet: shipImg,
      context: shipContext,
      width: shipImg.width,
      height: shipImg.height,
      colsCount: 1,
      rowsCount: 3,
      colIndex: 0,
      rowIndex: 0,
      loopTicksCount: 0,
      loopTicksPerFrame: 25,
    });

    var singleShipWidth = ship.width/ship.colsCount,
        singleShipHeight = ship.height/ship.rowsCount;

    var shipStartX = WIDTH/2 - singleShipWidth/2,
        shipStartY = HEIGHT - singleShipHeight - 10;

    function gameLoop() {

      ship
        .render(
          {x: shipStartX, y: shipStartY},
          {x: shipStartX, y: shipStartY})
        .update();

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
