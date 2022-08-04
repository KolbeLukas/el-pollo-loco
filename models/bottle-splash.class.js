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

    constructor(x, y) {
        super().loadImage(this.IMAGES_SPLASH[0]);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.animate();
    }
    
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 1000 / 15);
    }
}