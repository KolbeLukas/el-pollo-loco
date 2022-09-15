class BottleSplash extends MovableObject {
    width = 70;
    height = 70;
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    sound = new Audio('audio/bottle-splash.mp3');

    constructor(x, y) {
        super().loadImage(this.IMAGES_SPLASH[0]);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.animate();
    }

    /**
     * renders the images in a certain speed after each other
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 1000 / 15);
    }
}