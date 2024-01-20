const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = 400;
const height = 400;

canvas.width = width;
canvas.height = height;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, width, height);

noise.seed(4)

const CE = new CircleEffect(canvas, ctx);
CE.begin();


/*
const circles = [];

let current_time = 0;
let time_scale = 4000;

function createCircle() {
    circles.push({radius: 100, time: performance.now()});
}

function drawCircle(circle, time) {
    let size = circle.radius * (time - circle.time) / time_scale;

    ctx.strokeStyle = "red";
    ctx.lineWidth = 25;
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
}

ctx.translate(width / 2, height / 2);

function loop() {
    ctx.fillStyle = "white";
    ctx.fillRect(-width, -height, width * 2, height * 2);
    current_time = performance.now();

    circles.forEach(element => {
        drawCircle(element, current_time);
    });

    requestAnimationFrame(loop);
}

loop();*/