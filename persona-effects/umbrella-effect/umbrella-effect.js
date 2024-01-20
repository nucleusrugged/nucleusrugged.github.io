"use strict"

class UmbrellaEffect {
   
    states = {
        start: 0,
        shrink: 1,
        wait: 2,
        grow: 3,
        ended: 4,
    }

    state = 0;

    animation_start_time = 0;
    animation_time_shrink = 3000;
    animation_time_grow = 3000;
    animation_time_wait = 1000;

    umbrellas = [];
    number_of_umbrellas = 5
   
    on_wait = false;

    constructor(canvas, ctx) {
        this.canvas = canvas;
    }

    setup() {
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.umbrella_start_size = Math.max(width, height);

        for(let i = 0; i < this.number_of_umbrellas; i++) {
            this.createUmbrella(Math.random() * this.width, Math.random() * this.height);
        }
    }

    createUmbrella(x, y) {
        this.umbrellas.push(new UmbrellaParticle(x, y));
    }

    drawUmbrellas(ctx, size) {
        ctx.beginPath();
        this.umbrellas.forEach(umbrella => {
            umbrella.render(ctx, size);
        });
        ctx.clip();
    }

    startAnimation() {
        this.animation_start_time = performance.now();
        this.state = this.states.shrink;
    }

    render(ctx) {
        switch(this.state) {
            case this.states.shrink:
                this.shrink(ctx);
                break;

            case this.states.wait:
                this.wait(ctx);
                break;

            case this.states.grow:
                this.grow(ctx);
                break;

            case this.states.start:
            case this.states.ended:
                break;
        }
    }

    shrink(ctx) {
        let time = performance.now() - this.animation_start_time;
        if(time < this.animation_time_shrink) {
            this.drawUmbrellas(ctx, this.umbrella_start_size * (1 - time / this.animation_time_shrink));
        } else {
            if(typeof this.on_wait === "function") {
                this.on_wait();
            }
            this.state = this.states.wait;
            this.animation_start_time = performance.now();
        }
    }

    wait(ctx) {
        let time = performance.now() - this.animation_start_time;
        if(time < this.animation_time_wait) {
           //this.drawUmbrellas(ctx, 0);
        } else {
            this.umbrellas.forEach(umbrella => {
                umbrella.setPosition(Math.random() * this.width, Math.random() * this.height);
            })
            this.state = this.states.grow;
            this.animation_start_time = performance.now();
        }
    }

    grow(ctx) {
        let time = performance.now() - this.animation_start_time;
        if(time < this.animation_time_grow) {
            this.drawUmbrellas(ctx, this.umbrella_start_size * (time / this.animation_time_grow) + 0.1);
        } else {
            this.state = this.states.ended;
        }
    }
}


class UmbrellaParticle {

    sides = 7;
    curve = 0.80

    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.start_rotation = Math.random() * Math.PI;
        this.rotation_dir = Math.random() * 2 - 1;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    render(ctx, radius) {
        let time = performance.now() / 500
        let step_size = Math.PI * 2 / this.sides;

        //ctx.translate(this.x, this.y);
        //ctx.rotate((this.start_rotation + time) * this.rotation_dir);

        for(let i = 0; i <= this.sides; i++) {
            let pos_x = this.x + radius * Math.cos(step_size * i + (this.start_rotation + time) * this.rotation_dir);
            let pos_y = this.y + radius * Math.sin(step_size * i + (this.start_rotation + time) * this.rotation_dir);
    
            if(i !== 0) {
                let cpx = this.x + (radius * this.curve) * Math.cos(step_size * (i - 0.5) + (this.start_rotation + time) * this.rotation_dir);
                let cpy = this.y + (radius * this.curve) * Math.sin(step_size * (i - 0.5) + (this.start_rotation + time) * this.rotation_dir);
    
                ctx.quadraticCurveTo(cpx, cpy, pos_x, pos_y)
            } else {
                ctx.moveTo(pos_x, pos_y);
            }
        }
    }
}