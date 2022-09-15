class BottleOnGround extends MovableObject {
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    collecting_sound = new Audio('audio/collect-bottle.mp3');

    constructor(x) {
        super().loadImage(this.IMAGES_BOTTLE[this.number()]);
        this.x = x + Math.random() * 400;
        this.y = 380;
        this.height = 54.192;
        this.width = 30;
    }

    /**
     * 
     * @returns a random number in between 0 and 1
     */
    number() {
        return Math.round(Math.random());
    }
}