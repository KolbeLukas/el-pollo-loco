class Character extends MovableObject {
    x = 80;
    y = 150;
    height = 295.05;
    width = 150;
    speed = 4;
    health = 100;
    healthBar = new HealthBar();
    coins = 0;
    bottles = 0;
    openMenu = false;
    offset = {
        top: 110,
        bottom: 10,
        left: 20,
        right: 30
    };
    IMAGES_IDEL = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    world;
    snoring_sound = new Audio('audio/snoring.wav');
    walking_sound = new Audio('audio/walking.wav');
    jump_sound = new Audio('audio/jump.wav');
    no_bottle_sound = new Audio('audio/nope.wav');
    throwing_sound = new Audio('audio/throwing.wav');
    getting_hit_sound = new Audio('audio/character-hit.wav');
    dead_sound = new Audio('audio/character-dead.wav');

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDEL);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.snoring_sound.pause();
                this.time = new Date().getTime();
                this.otherDirection = false;
                if (!this.isAboveGround() && soundOn()) {
                    this.walking_sound.play();
                }
            }
            if (this.world.keyboard.LEFT && this.x > -100) {
                this.moveLeft();
                this.snoring_sound.pause();
                this.time = new Date().getTime();
                this.otherDirection = true;
                if (!this.isAboveGround() && soundOn()) {
                    this.walking_sound.play();
                }
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.currentImage = 0;
                this.jump();
                this.snoring_sound.pause();
                if (soundOn()) {
                    this.jump_sound.play();
                }
            }
            this.world.camera_x = -this.x + 80;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                if (soundOn()) {
                    this.dead_sound.play();
                }
            }
        }, 1000 / 5);

        setInterval(() => {
            if (this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
                if (soundOn()) {
                    this.getting_hit_sound.play();
                }
            }
        }, 1000 / 3);

        setInterval(() => {
            if (this.isAboveGround() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.time = new Date().getTime();
            }
        }, 1000 / 5);

        setInterval(() => {
            if (this.world.keyboard.RIGHT && !this.isAboveGround() && !this.isHurt() || this.world.keyboard.LEFT && !this.isAboveGround() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 1000 / 12);

        setInterval(() => {
            if (this.idle(0.2) && !this.idle(3) && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_IDEL)
            }
        }, 1000 / 6);

        setInterval(() => {
            if (this.idle(3) && !this.isHurt() && !this.isDead() && !this.openMenu) {
                this.playAnimation(this.IMAGES_LONGIDLE);
                if (soundOn()) {
                    this.snoring_sound.play();
                }
            }
        }, 1000 / 6);
    }
}