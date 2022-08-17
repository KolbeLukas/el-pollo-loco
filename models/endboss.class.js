class Endboss extends MovableObject {
    y = 60;
    x = 2500;
    height = 406.805;
    width = 350;
    health = 100;
    isNear = false;
    speed = 1;
    attacke = false;
    openMenu = false;
    i = 0;
    offset = {
        top: 80,
        bottom: 80,
        left: 60,
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
    IMAGES_ATTACKE = [
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
        this.animateWalking();
        this.animateDeadImg();
        this.animateHurtImg();
        this.animateAttackeImg();
        this.animateAlertImg();
        this.animateWalkingImg();
    }

    /**
     * renders the images in a certain speed after each other and sets the sound
     */
    animateDeadImg() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                if (soundOn()) {
                    this.dead_sound.play();
                }
            }
        }, 1000 / 6);
    }

    
    animateHurtImg() {
        setInterval(() => {
            if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
                this.standart_sound.pause();
                if (soundOn()) {
                    this.hit_sound.play();
                }
            }
        }, 1000 / 6);
    }


    animateAttackeImg() {
        setInterval(() => {
            if (this.attacke && !this.isDead()) {
                this.playAnimation(this.IMAGES_ATTACKE);
                if (soundOn()) {
                    this.attack_sound.play();
                }
            }
        }, 1000 / 8);
    }


    animateAlertImg() {
        setInterval(() => {
            if (this.isNear && !this.attacke && !this.isHurt() && !this.isDead() && !this.openMenu && this.i < 8) {
                this.playAnimation(this.IMAGES_ALERT);
                this.i++;
            }
        }, 1000 / 4);
    }


    animateWalkingImg() {
        setInterval(() => {
            if (this.isNear && !this.attacke && !this.isHurt() && !this.isDead() && !this.openMenu && this.i > 8) {
                this.playAnimation(this.IMAGES_WALKING);
                if (soundOn()) {
                    this.standart_sound.play();
                }
                this.i++;
            }
        }, 1000 / 4);
    }

    /**
     * lets the endboss walk after a certain time
     */
    animateWalking() {
        setInterval(() => {
            if (this.isNear && !this.attacke && !this.isDead() && !this.openMenu) {
                if (this.i < 7) {
                    return;
                } else {
                    this.moveLeft();
                }
            }
        }, 1000 / 60);
    }
}