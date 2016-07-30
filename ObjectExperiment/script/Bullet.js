

function createGame(gameSelector) {
	var gameCanvas = $(gameSelector)[0],
		ctxGame = gameCanvas.getContext('2d');

		ctxGame.width = 500;
		ctxGame.height = 500;


//BULLET BEGIN
function Bullet(ctx, x, y, width, height, direction, speed) {
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.direction = direction;
	this.speed = speed;
}


Bullet.prototype.draw = function () {
	this.ctx.strokeStyle="#86AB44";
    this.ctx.fillStyle = '#D9E17B';
   this.ctx.beginPath();
   this.ctx.moveTo(this.x, this.y);
    this.ctx.quadraticCurveTo( this.x + (this.width / 2), this.y + (2 * this.height), this.x + this.width, this.y);
    this.ctx.fill();
    this.ctx.stroke();
};

Bullet.prototype.move = function (delta) {

	this.x += (this.speed * delta.x);
	this.y += (this.speed * delta.y);
};
//BULLET END


const dirDeltas = [{
            "x": +1,
            "y": 0
        }, {
            "x": 0,
            "y": +1
        }, {
            "x": -1,
            "y": 0
        }, {
            "x": 0,
            "y": -1
        }];

var bul = new Bullet(ctxGame, 50, 50, 100, 30, 0, 1);
bul.draw();



  function gameLoop() {
        ctxGame.clearRect(0, 0, ctxGame.width, ctxGame.height);

        bul.draw();
        bul.move(dirDeltas[bul.direction]);
        window.requestAnimationFrame(gameLoop);

    }
gameLoop();
}
createGame('#game-canvas');
