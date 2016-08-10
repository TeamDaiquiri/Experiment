function createSprite(options) {

    'use strict';

    var clearOffset = 20;

    function render(drawCoordinates , clearCoordinates) {
        var self = this;

        self.context.clearRect(
            clearCoordinates.x - clearOffset,
            clearCoordinates.y - clearOffset,
            self.width + clearOffset * 2,
            self.height + clearOffset * 2
        );

        self.context.drawImage(
            self.spritesheet,
            0,
            self.frameIndex * self.height,
            self.width,
            self.height,
            drawCoordinates.x,
            drawCoordinates.y,
            self.width,
            self.height
        );

        return self;
    }

    function update() {
        var self = this;

        self.loopTicksCount += 1;

        if(self.loopTicksCount >= self.loopTicksPerFrame) {

            self.loopTicksCount = 0;

            self.frameIndex += 1;

            if(self.frameIndex >= self.numberOfFrames) {
                self.frameIndex = 0;
            }
        }

        return self;
    }
    function restart () {
        var self = this;

        self.frameIndex = 0;

        return self;
    }

    var sprite = {
        spritesheet: options.spritesheet,
        context: options.context, // drawing context
        width: options.width, // width of a single sprite
        height: options.height, // height of a single sprite
        numberOfFrames: options.numberOfFrames,
        loopTicksPerFrame: options.loopTicksPerFrame,
        frameIndex: 1,
        loopTicksCount: 0,
        render: render,
        update: update,
        restart: restart
    };

    return sprite;
}