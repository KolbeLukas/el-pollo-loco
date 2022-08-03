class Bottle extends MovableObject {
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/3_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/4_salsa_bottle_on_ground.png'
    ];
    collecting_sound = new Audio('audio/collect-bottle.wav');

    constructor(x) {
        super().loadImage(this.IMAGES_BOTTLE[this.number()]);
        this.x = x + Math.random() * 400;
        this.y = 380;
        this.height = 54.192;
        this.width = 30;
    }
    
    number() {
        return Math.round(Math.random());
    }
}