class SmallChicken extends MovableObject {
    y = 380;
    height = 60;
    width = 67.428;
    isNear = false;
    dead = false;
    openMenu = false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMG_DEATH = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    standart_sound = new Audio('audio/chicken.mp3');
    hit_sound = new Audio('audio/hit_chicken.mp3');

    constructor(x) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = x + Math.random() * 300;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animateWalking();
        this.animateDeadImg();
        this.animateWalkingImg();
    }

    /**
     * lets the smallchicken walk
     */
    animateWalking() {
        setInterval(() => {
            if (!this.dead && !this.openMenu && gameStarted) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }


    animateDeadImg() {
        setInterval(() => {
            if (this.dead) {
                this.loadImage(this.IMG_DEATH);
            }
        }, 100);
    }

    /**
     * renders the images in a certain speed after each other and sets the sound
     */
    animateWalkingImg() {
        setInterval(() => {
            if (!this.dead && !this.openMenu) {
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