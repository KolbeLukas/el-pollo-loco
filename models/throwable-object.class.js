class ThrowableObject extends MovableObject {
    width = 70;
    height = 70;
    offset = {
        top: 10, 
        bottom: 10,
        left: 10,
        right: 10
    };
    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y, direktion) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.x = x;
        this.y = y;
        this.throw(direktion);
        this.animate();
    }

    /**
     * sets how fast and far the bottle flies
     * @param {the direktion in which the bottle has to fly} direktion 
     */
    throw(direktion) {
        this.speedY = 10;
        this.applyGravity();
        setInterval(() => {
            this.x += direktion;
        }, 25)
    }

    /**
     * renders the images in a certain speed after each other and sets the sound
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_ROTATE);
        }, 1000 / 25);
    }
}