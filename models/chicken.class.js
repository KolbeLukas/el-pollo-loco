class Chicken extends MovableObject {
    y = 360;
    height = 81.64;
    width = 80;
    isNear = false;
    dead = false;
    openMenu = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMG_DEATH = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    standart_sound = new Audio('audio/chicken.wav');
    hit_sound = new Audio('audio/hit_chicken.wav');

    constructor(x) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = x + Math.random() * 300;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * renders the images in a certain speed after each other and sets the sound
     */
    animate() {
        setInterval(() => {
            if (!this.dead && !this.openMenu && gameStarted) {
                this.moveLeft();
            }
        }, 1000 / 60);


        setInterval(() => {
            if (this.dead) {
                this.loadImage(this.IMG_DEATH);
            } else if(!this.openMenu) {
                this.loadImage(this.IMG_DEATH);
                this.playAnimation(this.IMAGES_WALKING);
                if (this.isNear) {
                    if (soundOn()) {
                        this.standart_sound.play();
                    }
                }
            }
        }, 1000 / 6.5);
    }
}