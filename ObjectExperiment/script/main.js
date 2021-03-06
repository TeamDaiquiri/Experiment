
const dirDeltas = [{
        "x": -3,
        "y": 0
    }, {
        "x": 0,
        "y": -3
    }, {
        "x": +3,
        "y": 0
    }, {
        "x": 0,
        "y": +3
    }];


function createGame(gameSelector) {
    var gameCanvas = document.getElementById(gameSelector),
        bulletCanvas = document.getElementById('bullet-canvas'),
        ctxBul = bulletCanvas.getContext('2d'),
        enemyCanvas = document.getElementById('enemy-canvas'),
        ctxEnemy = enemyCanvas.getContext('2d'),
        enemyCount = 2,
        randomGeneratedNumber = 0,
        loopIterations = 0,
        ctxGame = gameCanvas.getContext('2d');

    gameCanvas.width = 1000;
    gameCanvas.height = 500;
    bulletCanvas.width = 1000;
    bulletCanvas.height = 500;
    enemyCanvas.width = 1000;
    enemyCanvas.height = 500;

    function createBullet(xCord, yCord) {
        var bulletSprite = createSprite({
            spritesheet: bulletImg,
            context: ctxBul,
            width: bulletImg.width / 2,
            height: bulletImg.height / 3,
            numberOfFrames: 3,
            loopTicksPerFrame: 5
        });

        var bulletBody = createPhysicalBody({
            x: xCord,
            y: yCord,
            speed: 2,
            width: bulletImg.width / 2,
            height: bulletImg.height / 3
        });

        return {
            sprite: bulletSprite,
            body: bulletBody
        };
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function createEnemy(xCord, yCord) {
        var bulletSprite = createSprite({
            spritesheet: shipImg,
            context: ctxEnemy,
            width: shipImg.width,
            height: shipImg.height / 3,
            numberOfFrames: 0,
            loopTicksPerFrame: 5
        });

        var enemyBody = createPhysicalBody({
            x: xCord,
            y: yCord,
            speed: 1,
            width: shipImg.width,
            height: shipImg.height / 3
        });

        return {
            sprite: bulletSprite,
            body: enemyBody
        };
    }
    var shipImg = document.getElementById('ship'),
        bulletImg = document.getElementById('bullet'),
        enemyImg = document.getElementById('enemy');

    var spriteBody = createSprite({
            spritesheet: shipImg,
            context: ctxGame,
            width: shipImg.width,
            height: shipImg.height / 3,
            numberOfFrames: 3,
            loopTicksPerFrame: 10
        }),
        bullets = [],
        myBody = createPhysicalBody({
            x: 400,
            y: 400,
            width: shipImg.width,
            height: shipImg.height / 3,
            speed: 7
        }),
        lastLocation = {
            x: myBody.x,
            y: myBody.y
        };
    spriteBody.render({
        x: myBody.x,
        y: myBody.y
    }, lastLocation);


    // Enemy generator
    var enemyes = [],
        enemyBullets = [];


    function GenerateEnemy(enemyes, count) {
        var offset = 1.5,
            boundOfRow = Math.floor((enemyCanvas.height / 2) / (offset * shipImg.height)),
            boundCol = Math.floor(enemyCanvas.width / (offset * shipImg.width)),
            generated = 0;

        for (var row = 0; row < boundOfRow; row += 1) {
            for (col = 0; col < boundCol; col += 1) {
                if (getRandomNumber(0, 2)) {
                    enemyes.push(createEnemy(col * (offset * shipImg.width), row * (offset * shipImg.height)));
                    if ((generated += 1) > count) {
                        return;
                    }
                }
            }
        }

    }

    function CheckBounds(x, y, canv, itemWidth, itemHeight) {
        if ((x < 0) || (x + itemWidth >= canv.width) || (y <= 0) || (y + itemHeight >= canv.height)) {
            return true;
        }
        return false;
    }

    function getOpositeMovement(numb) {
        if (numb === 0) {
            return 2;
        }
        if (numb === 1) {
            return 3;
        }
        if (numb === 2) {
            return 0;
        }
        if (numb === 3) {
            return 1;
        }
    }
    function  CheckFriendlyCollision(enemyes, neighbour) {
        var areColliding = false;
        enemyes.forEach(function (item, index) {
            if (neighbour !== item) {
                if (neighbour.body.colidesWith(item.body, 20)) {
                    areColliding =  true;
                }
            }
        });
        return areColliding;
    }

    function BulletInteraction(bullets, enemyes) {
         bullets.forEach(function(item, index) {
            var lastBullet = item.body.move(dirDeltas[1]),
                offsetX = 15,
                offsetY = 15,
                offsetWidth = 30,
                offsetHeight = 30;
            item.sprite.update();
            item.sprite.render({
                x: item.body.x,
                y: item.body.y - offsetY
            }, lastBullet);
            for (var i = 0, len = enemyes.length; i < len; i += 1) {
                var el = enemyes[i].body;

                if (item.body.colidesWith(el)) {
                    console.log(enemyes.length);
                    enemyes.splice(i, 1);
                    bullets.splice(index, 1);
                    ctxEnemy.clearRect(
                        el.x - offsetX,
                        el.y - offsetY,
                        el.width + offsetWidth,
                        el.height + offsetHeight
                    );
                    ctxBul.clearRect(
                        item.body.x - offsetX,
                        item.body.y - offsetY,
                        item.body.width + offsetWidth,
                        item.body.height + offsetHeight
                    );
                    break;
                }
            }
            if (item.body.y <= 0) {
                bullets.splice(index, 1);
                ctxBul.clearRect(
                    item.body.x,
                    item.body.y,
                    item.body.width,
                    item.body.height
                );
            }
        });
    }

    function EnemyBulletInteraction (enemyBullets) {
        enemyBullets.forEach(function(item, index) {
            var lastBullet = item.body.move(dirDeltas[3]);

            item.sprite.update();
            item.sprite.render({
                x: item.body.x,
                y: item.body.y
            }, lastBullet);
            if (CheckBounds(item.body.x, item.body.y, bulletCanvas, item.body.width, item.body.height) || (item.body.colidesWith(myBody))) {
                
                 ctxBul.clearRect(
                        item.body.x,
                        item.body.y,
                        item.body.width + 20,
                        item.body.height +10
                    );
            }
            if (item.body.colidesWith(myBody)) {
                    enemyBullets.splice(index, 1);

                }
        });
    }
     function EnemyInteraction(randomGeneratedNumber, enemyes) {
        enemyes.forEach(function(item, index) {
            var offset = 5;
            var prevEnemyPosition = item.body.move(dirDeltas[randomGeneratedNumber]);
            if (CheckBounds(item.body.x, item.body.y, bulletCanvas, item.body.width, item.body.height) || CheckFriendlyCollision(enemyes, item)) {
                prevEnemyPosition = item.body.move(dirDeltas[getOpositeMovement(randomGeneratedNumber)]);
            }
            item.sprite.update();
            item.sprite.render({
                x: item.body.x,
                y: item.body.y
            }, prevEnemyPosition);
            if (getRandomNumber(0, 40) === 0) {
                enemyBullets.push(createBullet(item.body.x + offset, item.body.y + offset));
            }
        });
    }

     function ChangeEnemyDirection(steps) {
        loopIterations += 1;
        if (loopIterations === steps) {
            loopIterations = 0;
            randomGeneratedNumber = getRandomNumber(0, 4);
            console.log(randomGeneratedNumber);
        }
    }
    function gameLoop() {
        ctxGame.clearRect(0, 0, ctxGame.width, ctxGame.height);

        // var lastLocation = myBody.move(dirDeltas[1]);
        spriteBody.render({
            x: myBody.x,
            y: myBody.y
        }, lastLocation);

        BulletInteraction(bullets, enemyes);
       
        ChangeEnemyDirection(15);

        EnemyBulletInteraction( enemyBullets);
        
        EnemyInteraction(randomGeneratedNumber,enemyes);

        if (enemyes.length === 0) {
            enemyCount += 1;
            GenerateEnemy(enemyes, enemyCount);
        }

        window.requestAnimationFrame(gameLoop);
    }

    document.body.addEventListener('keydown', function(ev) {
        var offset = 5;
        if ((37 <= ev.keyCode) && (ev.keyCode <= 40)) {
            lastLocation = myBody.move(dirDeltas[ev.keyCode - 37]);
            spriteBody.update();
        } else if (ev.keyCode === 32) {
            var bullet = createBullet(myBody.x + offset, myBody.y + offset);
            bullets.push(bullet);
        }
    });
    document.body.addEventListener('keyup', function(ev) {
        spriteBody.restart();
    });

    function CheckCollisions() {

    }

    gameLoop();
}
createGame('game-canvas');
