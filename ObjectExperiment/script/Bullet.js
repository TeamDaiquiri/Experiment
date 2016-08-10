function createGame(gameSelector) {
    var gameCanvas = document.getElementById(gameSelector),
        bulletCanvas = document.getElementById('bullet-canvas'),
        ctxBul = bulletCanvas.getContext('2d'),
        enemyCount = 2,
        loopIterations = 0,
        ctxGame = gameCanvas.getContext('2d');
    gameCanvas.width = 1000;
    gameCanvas.height = 500;
    bulletCanvas.width = 1000;
    bulletCanvas.height = 500;


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

    function createShoot() {
        var shootSprite = createSprite({
            spritesheet: shootImg,
            context: ctxBul,
            width: shootImg.width / 2,
            height: shootImg.height / 3,
            numberOfFrames: 3,
            loopTicksPerFrame: 5
        });

        var shootBody = createPhysicalBody({
            x: myBody.x + 5,
            y: myBody.y + 5,
            speed: 2,
            width: shootImg.width / 2,
            height: shootImg.height / 3
        });

        return {
            sprite: shootSprite,
            body: shootBody
        };
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function createEnemy() {
        var shootSprite = createSprite({
            spritesheet: enemyImg,
            context: ctxBul,
            width: enemyImg.width,
            height: enemyImg.height,
            numberOfFrames: 0,
            loopTicksPerFrame: 5
        });

        var enemyBody = createPhysicalBody({
            x: getRandomNumber(0, 1000),
            y: getRandomNumber(0, 250),
            speed: 1,
            width: enemyImg.width,
            height: enemyImg.height
        });

        return {
            sprite: shootSprite,
            body: enemyBody
        };
    }
    var shipImg = document.getElementById('ship'),
        shootImg = document.getElementById('shoot'),
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
            speed: 5
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
    var enemyes = [];

    function GenerateEnemy(count) {
        for (var i = 0; i < count; i += 1) {
            enemyes.push(createEnemy());
        }
    }

    function gameLoop() {
        ctxGame.clearRect(0, 0, ctxGame.width, ctxGame.height);

        // var lastLocation = myBody.move(dirDeltas[1]);
        spriteBody.render({
            x: myBody.x,
            y: myBody.y
        }, lastLocation);


        bullets.forEach(function(item, index) {
            var lastBullet = item.body.move(dirDeltas[1]),
                offsetY = 20;
            item.sprite.update();
            item.sprite.render({
                x: item.body.x,
                y: item.body.y - offsetY
            }, lastBullet);
           for(var i = 0, len = enemyes.length; i < len; i += 1) {
            var el = enemyes[i].body;

            if (item.body.colidesWith(el)) {
                console.log(enemyes.length);
                enemyes.splice(i, 1);
                bullets.splice(index, 1);
                 ctxBul.clearRect(
                    el.x,
                    el.y,
                    el.width,
                    el.height
                );
                console.log(enemyes.length);

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
       
            loopIterations = 0;
            enemyes.forEach(function(item, index) {
                var number = getRandomNumber(0, 4);
                var prevEnemyPosition = item.body.move(dirDeltas[number]);
                item.sprite.update();
                item.sprite.render({
                    x: item.body.x,
                    y: item.body.y
                }, prevEnemyPosition);

            });
        

        if (enemyes.length === 0) {
            enemyCount *= 2;
            GenerateEnemy(enemyCount);

        }
        
        window.requestAnimationFrame(gameLoop);
    }


    //Events
    document.body.addEventListener('keydown', function(ev) {
        if ((37 <= ev.keyCode) && (ev.keyCode <= 40)) {
            lastLocation = myBody.move(dirDeltas[ev.keyCode - 37]);
            spriteBody.update();
        } else if (ev.keyCode === 32) {
            var shoot = createShoot();
            bullets.push(shoot);

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
