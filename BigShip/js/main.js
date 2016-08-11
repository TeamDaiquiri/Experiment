window.addEventListener('load', function() {

    'use strict';

    var WIDTH = 1200,
        HEIGHT = 700;

    var bgCanvas = document.getElementById('background-canvas'),
        bgContext = bgCanvas.getContext('2d');

    bgCanvas.width = WIDTH;
    bgCanvas.height = HEIGHT;

    var shipCanvas = document.getElementById('ship-canvas'),
        shipContext = shipCanvas.getContext('2d'),
        shipImg = document.getElementById('ship');

    shipCanvas.width = WIDTH;
    shipCanvas.height = HEIGHT;

    var enemyCanvas = document.getElementById('enemy-canvas'),
        enemyContext = enemyCanvas.getContext('2d'),
        enemyImg = document.getElementById('enemy');

    enemyCanvas.width = WIDTH;
    enemyCanvas.height = HEIGHT;

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
        singleShipHeight = ship.height/ship.rowsCount,
        shipStartX = WIDTH/2 - singleShipWidth/2,
        shipStartY = HEIGHT - singleShipHeight - 10;

    var enemy = createGameObject({
      spritesheet: enemyImg,
      context: enemyContext,
      width: enemyImg.width,
      height: enemyImg.height,
      colsCount: 3,
      rowsCount: 2,
      colIndex: 0,
      rowIndex: 0,
      loopTicksCount: 0,
      loopTicksPerFrame: 25,
    });

    var singleEnemyWidth = enemy.width/enemy.colsCount,
        singleEnemyHeight = enemy.height/enemy.rowsCount,
        enemyStartX = WIDTH/2,
        enemyStartY = 10;

    function gameLoop() {

      ship
        .render(
          {x: shipStartX, y: shipStartY},
          {x: shipStartX, y: shipStartY})
        .update(true);

      enemy
        .render(
          {x: enemyStartX, y: enemyStartY},
          {x: enemyStartX, y: enemyStartY})
        .update(false);

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
