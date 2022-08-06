class Chicken extends MovableObject {
    y = 380;
    height = 61.23;
    width = 60;
    isNear = false;
    dead = false;
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

    animate() {
        setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.dead) {
                this.playAnimation(this.IMAGES_WALKING);
                if (this.isNear) {
                    this.standart_sound.play();
                }
            } else {
                this.loadImage(this.IMG_DEATH);
            }
        }, 1000 / 6.5);
    }
}