window.addEventListener('load', function() {

    'use strict';

    var WIDTH = 1200,
        HEIGHT = 700;

    var shipCanvas = document.getElementById('ship-canvas'),
        shipContext = shipCanvas.getContext('2d'),
        shipImg = document.getElementById('ship');

    shipCanvas.width = WIDTH;
    shipCanvas.height = HEIGHT;

    var frameIndex = 0,
        framesCount = 3;

    var loopTicksPerFrame = 20,
        loopTicksCount = 0;

    function gameLoop() {
        // clear previous frame
        shipContext.clearRect(
          WIDTH/2 - shipImg.width/2,
          HEIGHT - shipImg.height/framesCount - 10,
          shipImg.width,
          shipImg.height/framesCount
        );

        // draw next frame
        shipContext.drawImage(
          shipImg,
          0,
          frameIndex*shipImg.height/framesCount,
          shipImg.width,
          shipImg.height/framesCount,
          WIDTH/2 - shipImg.width/2,
          HEIGHT - shipImg.height/framesCount - 10,
          shipImg.width,
          shipImg.height/framesCount
        );

        // update frame
        loopTicksCount += 1;
        if (loopTicksCount > loopTicksPerFrame) {
          frameIndex+=1;
          frameIndex = frameIndex % framesCount;
          loopTicksCount = 0;
        }

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
