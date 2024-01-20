const img1 = document.getElementById("zebra");
const img2 = document.getElementById("nepal")
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let width = 400;
let height = 400;

let img = img1;

const UE = new UmbrellaEffect(canvas, ctx);
UE.on_wait = switchImages;
const SE = new StarEffect(canvas, ctx);

img1.addEventListener("load", setup);

function setup() {
    width = img.width;
    height = img. height;

    canvas.width = width;
    canvas.height = height;

    canvas.addEventListener("click", startAnimation)

    UE.setup();
    SE.setup();

    loop();
}

let wait = false;

function loop() {

    if(UE.state !== UE.states.ended && UE.state !== UE.states.start) {
        SE.render();
    }
    ctx.save();
    UE.render(ctx)

    if(UE.state === UE.states.wait) {
        wait = true;
    }

    if(!wait) {
       ctx.drawImage(img, 0, 0);
    }

    if(UE.state !== UE.states.wait) {
        wait = false;
    }

    ctx.restore();

    requestAnimationFrame(loop)
}

function switchImages() {
    if(img === img1) {
        img = img2;
    } else {
        img = img1;
    }
}

function startAnimation() {
    if(UE.state === UE.states.ended || UE.state === UE.states.start) {
        UE.startAnimation();
    }
}