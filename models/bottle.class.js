class Bottle extends MovableObject {
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLE[this.number()]);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
    }
    number() {
        return Math.round(Math.random());
    }
}