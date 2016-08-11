function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var canvas = document.getElementById("background-canvas"),
    context = canvas.getContext("2d"),
    stars = 500,
    colorrange = [0,60,240];


    window.setInterval(clear, 2000);

    function clear(){
        context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        shine();
    }

    function shine(){for (var i = 0; i < stars; i++) {
        var x = Math.random() * canvas.offsetWidth;
        y = Math.random() * canvas.offsetHeight,
            radius = Math.random() * 1.2,
            hue = colorrange[getRandom(0, colorrange.length - 1)],
            sat = getRandom(50, 100);
        context.beginPath();
        context.arc(x, y, radius, 0, 360);
        context.fillStyle = "hsl(" + hue + ", " + sat + "%, 88%)";
        context.fill();
    }}
