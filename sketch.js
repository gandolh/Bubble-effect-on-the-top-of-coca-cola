let ps = []; //particle system array

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    for (let psi of ps) {
        psi.run();
        psi.addParticle();
    }

}
function mousePressed() {
    ps.push(new particleSystem(mouseX, mouseY)); //ading new particle system
}
class Particle {
    constructor(x, y) {
        this.location = createVector(x, y);
        this.acceleration = createVector(0, 0.05);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.lifespan = 255;
    }
    update() {
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.lifespan -= 2;
    }
    isDead() {
        return this.lifespan <= 0;
    }
    display() {
        stroke(255, this.lifespan);
        strokeWeight(2);
        fill(255, this.lifespan)
        ellipse(this.location.x, this.location.y, 16, 16);
    }
}
class particleSystem {
    constructor(x, y) {
        this.particles = [];
        this.location = createVector(x, y);
        for (let i = 0; i < 10; i++) this.particles.push(new Particle(this.location.x, this.location.y));

    }
    run() {
        for (let i = this.particles.length - 1; i > 0; i--) {
            this.particles[i].update();
            this.particles[i].display();
            if (this.particles[i].isDead()) {
                this.particles.splice(i, 1);
            }
        }

    }
    addParticle() {
        this.particles.push(new Particle(this.location.x, this.location.y));

    }
}