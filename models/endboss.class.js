class Endboss extends MovableObject {
    y = 60;
    height = 406.805;
    width = 350;
    health = 100;
    isNear = false;
    speed = 0.5;
    attacke = false;
    offset = {
        top: 80,
        bottom: 0,
        left: 15,
        right: 10
    };
    healthBar = new EndbossHealthBar();
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];
    IMAGES_ATTACKE =[
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    attack_sound = new Audio('audio/boss-attack.wav');
    standart_sound = new Audio('audio/chicken.wav');
    hit_sound = new Audio('audio/hit_chicken.wav');
    dead_sound = new Audio('audio/boss-dead.wav');

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACKE);
        this.x = 1500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.dead_sound.play();
            }
        }, 1000 / 6);

        setInterval(() => {
            if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
                this.standart_sound.pause();
                this.hit_sound.play();
            }
        }, 1000 / 6);

        setInterval(() => {
            if (this.attacke && !this.isDead()) {
                this.playAnimation(this.IMAGES_ATTACKE);
                this.attack_sound.play();
            }
        }, 1000 / 8);

        setInterval(() => {
            if (this.isNear && !this.attacke && !this.isHurt() && !this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isNear && !this.attacke && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
                this.standart_sound.play();
            }
        }, 1000 / 4);

        setInterval(() => {
            if (!this.isNear && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 1000 / 4);
    }
}