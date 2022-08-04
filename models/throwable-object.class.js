class ThrowableObject extends MovableObject {
    width = 70;
    height = 70;
    offset = {
        top: 60,
        bottom: 60,
        left: 60,
        right: 60
    }
    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.throw();
        this.animate();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25)
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 1000 / 15);
    }
}