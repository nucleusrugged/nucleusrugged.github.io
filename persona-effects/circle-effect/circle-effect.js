class CircleEffect {

    circles = [];
    time_scale = 2000;

    last_update = 0;

    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    addCircle(x, y, radius) {
        this.circles.unshift(new CirclePattern(x, y, radius));
    }

    drawCircles() {
        let time = performance.now();
        this.circles.forEach(circle => {
            circle.draw(this.ctx, circle.radius * (time - circle.time) / this.time_scale);
        });
    }

    begin() {
        if(performance.now() - this.last_update > 2000) {
            this.last_update = performance.now();
            this.addCircle(this.canvas.width / 2, this.canvas.height / 2, 100)
        }
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawCircles();
        requestAnimationFrame(this.begin.bind(this));
    }
}

class CirclePattern {

    steps = 100;

    constructor(x, y ,radius) {
        this.time = performance.now();
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.noise_x = Math.random();
        this.noise_y = Math.random();
    }

    draw(ctx, size) {

        let step_size = (Math.PI * 2) / this.steps;
        let noise_offset = (performance.now() - this.time) * 0.0001;

        let line_scale = (performance.now() - this.time) / 100

        ctx.beginPath();

        for(let i = 0; i < this.steps; i++) {
            let noise_scale = noise.simplex2(
                this.noise_x + noise_offset + Math.cos(i * step_size) * 0.2,
                this.noise_y + noise_offset + Math.sin(i * step_size) * 0.2
            );

            let x = this.x + size * Math.cos(i * step_size) + noise_scale * size / 5;
            let y = this.y + size * Math.sin(i * step_size) + noise_scale * size / 5;

            ctx.lineTo(x, y);
        }
 
        ctx.closePath();
        ctx.lineWidth = Math.min(50, 50 * line_scale);
        ctx.strokeStyle = "darkred";
        ctx.stroke();

        ctx.beginPath();

        for(let i = 0; i < this.steps; i++) {
            let noise_scale = noise.simplex2(
                this.noise_x + noise_offset + Math.cos(i * step_size) * 0.22,
                this.noise_y + noise_offset + Math.sin(i * step_size) * 0.22
            );

            let x = this.x + size * Math.cos(i * step_size) + noise_scale * size / 6;
            let y = this.y + size * Math.sin(i * step_size) + noise_scale * size / 6;

            ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.lineWidth = Math.min(30, 30 * line_scale);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}