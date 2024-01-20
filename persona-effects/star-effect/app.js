const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = 800;
const height = 600;

canvas.width = width;
canvas.height = height;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, width, height);

const SE = new StarEffect(canvas, ctx);