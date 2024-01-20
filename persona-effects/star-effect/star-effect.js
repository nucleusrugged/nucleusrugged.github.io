class StarEffect {
    star_radius_min = 100;
    star_radius_max = 200;
    stars = [];
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    setup() {
        this.width = canvas.width;
        this.height = canvas.height;
        this.createStars();
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    createStars() {
        for(let x = 0; x < this.width / this.star_radius_min; x++) {
            for(let y = 0; y < this.height / this.star_radius_min; y++) {
                let star = new StarParticle(
                    x * this.star_radius_min + this.star_radius_min * Math.random() * 0.8, 
                    y * this.star_radius_min + this.star_radius_min * Math.random() * 0.8,
                    this.star_radius_max, this.star_radius_min, Math.random() > 0.5);

                this.stars.push(star);
            }
        }

        this.shuffleArray(this.stars);
    }

    render() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.stars.forEach(star => {
            star.render(this.ctx, performance.now());
        });
    }
}

class StarParticle {

    animation_speed = 2000;
    time_offset = 0
    number_of_stars = 5;
    points = 5;

    grow = false

    constructor(x, y, max_radius, min_radius, grow = false) {
        this.x = x;
        this.y = y;
        this.max_radius = max_radius;
        this.min_radius = min_radius;
        this.rotation = Math.random() * Math.PI;

        this.grow = grow;
        this.time_offset = Math.random() * this.animation_speed;

        this.step_size = Math.PI * 2 / (this.points * 2);
    }

    render(ctx, time) {
        time += this.time_offset;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        let color1 = "dimgrey";
        let color2 = "black";

        if(time % (this.animation_speed * 2) >= this.animation_speed) {
            color2 = "dimgrey";
            color1 = "black";
        } else {
            color1 = "dimgrey";
            color2 = "black";
        }

        ctx.beginPath();
        for(let i = 0; i <= this.points * 2; i++) {
            let x = Math.cos(this.step_size * i) * (i % 2 ? this.max_radius : this.min_radius);
            let y = Math.sin(this.step_size * i) * (i % 2 ? this.max_radius : this.min_radius);
            ctx.lineTo(x, y);
        }
        ctx.fillStyle = color1;
        ctx.closePath();
        ctx.fill();

        for(let star = 0; star < this.number_of_stars; star++) {
            let scale = (this.number_of_stars - star) / this.number_of_stars;

            ctx.beginPath();
            for(let i = 0; i <= this.points * 2; i++) {
                let radius = i % 2 ? this.max_radius : this.min_radius;
                let time_scale = ((time % this.animation_speed) / this.animation_speed);
                if(this.grow) {
                    time_scale = 1 - time_scale
                }
                time_scale *= (radius / this.number_of_stars)
                radius *= scale;
                radius -= time_scale
                let x = Math.cos(this.step_size * i) * radius;
                let y = Math.sin(this.step_size * i) * radius;
                ctx.lineTo(x, y);
            }
            ctx.fillStyle = star % 2 ? color1 : color2;
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    }
}