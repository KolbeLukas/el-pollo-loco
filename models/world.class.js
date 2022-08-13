class World {
    character = new Character();
    level = level_1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    throwableObjects = [];
    splashBottles = [];
    bottleRespawn = [];
    last_throw = new Date().getTime();
    death_enemies = [];
    endboss = this.level.enemies[0];
    time;
    music = new Audio('audio/music.wav');
    GameOverScreen = new Endscreen('img/9_intro_outro_screens/game_over/game over!.png', this.character.x - 80)
    LostScreen = new Endscreen('img/9_intro_outro_screens/game_over/oh no you lost!.png', this.character.x - 80);

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.update();
    }


    setWorld() {
        this.character.world = this;
    }
    

    update() {
        setInterval(() => {
            this.playMusic();
            this.checkEnemyCollisions();
            this.checkThrowObjects();
            if (this.throwableObjects.length > 0) {
                this.checkThrowenBottleCollision();
            }
            this.checkCoinCollision();
            this.checkBottleCollision();
            this.checkIsNear();
            this.checkActuellTime();
            this.checkOpenMenu();
        }, 1000 / 40);
    }


    playMusic() {
        if (soundOn()) {
            this.music.play();
        } else {
            this.music.pause();
        }
    }


    checkEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.isFalling() && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
                this.chickenIsDead(enemy);
                enemy.standart_sound.pause();
            } else if (this.character.isColliding(enemy) && !this.endboss.isDead()) {
                this.character.hit();
                if (enemy == this.endboss) {
                    enemy.attacke = true;
                }
            } else {
                enemy.attacke = false;
            }
        });
    }


    checkIsNear() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isNear(enemy, 435, 80) && enemy instanceof Endboss) {
                enemy.isNear = true;
                enemy.standart_sound.muted = false;
            } else if (this.character.isNear(enemy, 150, 80) && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
                enemy.isNear = true;
                enemy.standart_sound.muted = false;
            } else {
                enemy.standart_sound.muted = true;
            }
        })
    }


    checkThrowObjects() {
        let time = new Date().getTime();
        if (this.keyboard.D && this.character.bottles > 0 && time - this.last_throw > 1500 && !this.character.isDead()) {
            this.character.time = new Date().getTime();
            this.setThrowDirection();
            this.character.bottles--;
            this.bottleBar.setPercentage(this.character.bottles);
            if (soundOn()) {
                this.character.throwing_sound.play();
            }
            this.last_throw = time;
        } else if (this.keyboard.D && this.character.bottles == 0 && time - this.last_throw > 1000) {
            if (soundOn()) {
                this.character.no_bottle_sound.play();
            }
            this.last_throw = time;
        }
    }


    setThrowDirection() {
        if (!this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, 10);
            this.throwableObjects.push(bottle);
        } else {
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100, -10);
            this.throwableObjects.push(bottle);
        }
    }


    checkThrowenBottleCollision() {
        this.level.enemies.forEach(enemy => {
            this.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(enemy)) {
                    this.bottleSplash(bottle);
                    if (enemy instanceof Chicken) {
                        this.chickenIsDead(enemy);
                    } else {
                        enemy.hitBoss();
                    }
                }
                if (bottle.y > this.canvas.height - 100) {
                    this.bottleSplash(bottle);
                }
            });
        });
    }


    chickenIsDead(enemy) {
        if (soundOn()) {
            enemy.hit_sound.play();
        }
        enemy.dead = true;
        this.death_enemies.push(enemy);
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    }


    bottleSplash(bottle) {
        let splash = new BottleSplash(bottle.x, bottle.y);
        this.splashBottles.push(splash);
        if (soundOn()) {
            splash.sound.play();
        }
        setTimeout(() => {
            this.splashBottles = [];
        }, 1000 / 2.5);
        this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
    }


    checkCoinCollision() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                if (soundOn()) {
                    coin.collecting_sound.play();
                }
                this.coinBar.setPercentage(this.character.coins);
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
            }
        });
    }


    checkBottleCollision() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle) && !this.endboss.isDead()) {
                this.character.collectBottle();
                if (soundOn()) {
                    bottle.collecting_sound.play();
                }
                this.bottleBar.setPercentage(this.character.bottles);
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.bottleRespawn.push(bottle);
                setTimeout(() => {
                    this.level.bottles.push(bottle)
                }, 10000);
            }
        });
    }


    checkActuellTime() {
        let newTime = new Date().getTime();
        this.time = newTime;
    }


    checkOpenMenu() {
        if (this.keyboard.M) {
            this.level.enemies.forEach(enemy => {
                enemy.openMenu = true;
                enemy.standart_sound.pause();
            });
            this.character.openMenu = true;
            this.character.snoring_sound.pause();
        } else {
            this.level.enemies.forEach(enemy => {
                enemy.openMenu = false;
            });
            this.character.openMenu = false;
        }
    }


    draw() {
        if (!this.keyboard.ESC) {
            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.throwableObjects);
            this.addObjectsToMap(this.splashBottles);
            this.addObjectsToMap(this.death_enemies);
            this.addObjectsToMap(this.level.bottles);
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.character.healthBar);
            if (this.character.isNear(this.endboss, 520, 470)) {
                this.addToMap(this.endboss.healthBar);
            }
            this.addToMap(this.coinBar);
            this.addToMap(this.bottleBar);
            this.ctx.translate(this.camera_x, 0);
            this.addToMap(this.character);
            this.ctx.translate(-this.camera_x, 0);
        }
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
        if (this.character.isDead() || this.endboss.isDead()) {
            this.endGame();
        }
    }


    endGame() {
        if (this.character.isDead()) {
            this.addToMap(this.LostScreen);
            this.character.dead_sound.muted = true;
            document.getElementById('restart').classList.remove('d-none');
        }
        if (this.endboss.isDead()) {
            this.addToMap(this.GameOverScreen);
            document.getElementById('restart').classList.remove('d-none');
            this.character.snoring_sound.muted = true;
            this.endboss.standart_sound.pause();
            setTimeout(() => {
                this.endboss.dead_sound.muted = true;
            }, 1000);
        }
        this.keyboard = 0;
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        // mo.drawFrame2(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}