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
    offset = {
        top: 110,
        bottom: 10,
        left: 20,
        right: 30
    };
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
        'img/2_character_pepe/4_hurt/nH-41.png',
        'img/2_character_pepe/4_hurt/nH-42.png',
        'img/2_character_pepe/4_hurt/nH-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    world;
    walking_sound = new Audio('audio/walking.wav');
    jump_sound = new Audio('audio/jump.wav');
    no_bottle_sound = new Audio('audio/nope.wav');
    throwing_sound = new Audio('audio/throwing.wav');
    getting_hit_sound = new Audio('audio/hit.wav');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
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
                this.otherDirection = false;
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }
            if (this.world.keyboard.LEFT && this.x > -100) {
                this.moveLeft();
                this.otherDirection = true;
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.currentImage = 0;
                this.jump();
                this.jump_sound.play();
            }
            this.world.camera_x = -this.x + 80;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.world.keyboard.RIGHT && !this.isAboveGround() && !this.isHurt() || this.world.keyboard.LEFT && !this.isAboveGround() && !this.isHurt()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 80);


        setInterval(() => {
            if (this.isHurt()) {
                this.getting_hit_sound.play();
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 1000 / 3);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            }
        }, 1000 / 5);
    }
}