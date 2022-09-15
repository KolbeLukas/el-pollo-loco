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
    music = new Audio('audio/music.mp3');
    GameOverScreen = new Endscreen('img/9_intro_outro_screens/game_over/game over!.png', this.character.x - 80)
    LostScreen = new Endscreen('img/9_intro_outro_screens/game_over/oh no you lost!.png', this.character.x - 80);

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.update();
        this.updateCollisions();
    }


    setWorld() {
        this.character.world = this;
    }

    /**
     * updates if a certain condition is true
     */
    update() {
        setInterval(() => {
            this.playMusic();
            this.checkThrowObjects();
            this.checkIsNear();
            this.checkActuellTime();
            this.checkOpenMenu();
        }, 1000 / 40);
    }

    /**
     * updates if something collides
     */
    updateCollisions() {
        setInterval(() => {
            this.checkEnemyCollisions();
            if (this.throwableObjects.length > 0) {
                this.checkThrowenBottleCollision();
            }
            this.checkCoinCollision();
            this.checkBottleCollision();
        }, 1000 / 40);
    }

    /**
     * checks if music should play
     */
    playMusic() {
        if (musicOn()) {
            this.music.play();
        } else {
            this.music.pause();
        }
    }

    /**
     * checks if the character is colliding with an object
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.isFalling() && (enemy instanceof Chicken || enemy instanceof SmallChicken)) {
                this.enemyIsDead(enemy);
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

    /**
     * checks if the character is near an object
     */
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

    /**
     * checks if the character is throwing a bottle and in which direction
     */
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
        } else {
            this.noBottleLeft(time);
        }
    }

    /**
     * 
     * @param {the actuell time} time 
     */
    noBottleLeft(time) {
        if (this.keyboard.D && this.character.bottles == 0 && time - this.last_throw > 1000) {
            if (soundOn()) {
                this.character.no_bottle_sound.play();
            }
            this.last_throw = time;
        }
    }

    /**
     * sets the direction in which the bottle is thrown
     */
    setThrowDirection() {
        if (!this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, 10);
            this.throwableObjects.push(bottle);
        } else {
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100, -10);
            this.throwableObjects.push(bottle);
        }
    }

    /**
     * checks if the thrown bottle collides with an object and triggers the bottle splash animation
     */
    checkThrowenBottleCollision() {
        this.level.enemies.forEach(enemy => {
            this.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(enemy)) {
                    this.bottleSplash(bottle);
                    this.bottleHitEnemy(enemy);
                }
                if (bottle.y > this.canvas.height - 100) {
                    this.bottleSplash(bottle);
                }
            });
        });
    }

    /**
     * 
     * @param {the enemy that got hit} enemy 
     */
    bottleHitEnemy(enemy) {
        if (enemy == this.endboss) {
            this.endboss.hit();
        } else {
            this.enemyIsDead(enemy);
        }
    }

    /**
     * removes the enemy form the game
     * @param {the chicken that dies} enemy 
     */
    enemyIsDead(enemy) {
        if (soundOn()) {
            enemy.hit_sound.play();
        }
        enemy.dead = true;
        this.death_enemies.push(enemy);
        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
    }

    /**
     * sets where the bottle splash animation is located
     * @param {the bottle that has been thrown} bottle 
     */
    bottleSplash(bottle) {
        let splash = new BottleSplash(bottle.x, bottle.y);
        this.splashBottles.push(splash);
        if (soundOn()) {
            splash.sound.play();
        }
        setTimeout(() => {
            this.splashBottles.splice(splash);
        }, 1000 / 2.5);
        this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
    }

    /**
     * checks if the character collides with a coin and removes it from the game
     */
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

    /**
     * checks if the character collides with a bottle to collect and removes it from the game
     */
    checkBottleCollision() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle) && !this.endboss.isDead()) {
                this.character.collectBottle();
                if (soundOn()) {
                    bottle.collecting_sound.play();
                }
                this.bottleBar.setPercentage(this.character.bottles);
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                this.bottleRespawnTime(bottle);
            }
        });
    }

    /**
     * sets the respawn time of the bottle
     * @param {the bottle that has been collected} bottle 
     */
    bottleRespawnTime(bottle) {
        this.bottleRespawn.push(bottle);
        setTimeout(() => {
            this.level.bottles.push(bottle)
        }, 10000);
    }

    /**
     * get the actuell time
     */
    checkActuellTime() {
        let newTime = new Date().getTime();
        this.time = newTime;
    }

    /**
     * checkes if the menu is open and what happens if it is
     */
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

    /**
     * adds all the objecte images and refreshes it self every few milliseconds 
     * with the animation changes or end the game
     */
    draw() {
        if (!this.keyboard.M) {
            this.ctx.translate(this.camera_x, 0);
            this.drawBackground();
            this.drawEnemies();
            this.drawCharacterItems();
            this.ctx.translate(-this.camera_x, 0);
            this.drawStatusBars();
            this.ctx.translate(this.camera_x, 0);
            this.addToMap(this.character);
            this.ctx.translate(-this.camera_x, 0);
        }
        this.repeat();
        this.endGame();
    }

    /**
     * adds the background to the game
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * adds the enemies to the game
     */
    drawEnemies() {
        this.addObjectsToMap(this.death_enemies);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * adds the items to the game
     */
    drawCharacterItems() {
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.splashBottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
    }

    /**
     * adds the statusbars to the game
     */
    drawStatusBars() {
        this.addToMap(this.character.healthBar);
        if (this.character.isNear(this.endboss, 520, 470)) {
            this.addToMap(this.endboss.healthBar);
        }
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
    }

    /**
     * draws the game with updated frames
     */
    repeat() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * adds the endscreen to the game
     */
    endGame() {
        if (this.character.isDead() || this.endboss.isDead()) {
            this.youLost();
            this.youWon();
            this.keyboard = 0;
        }
    }

    /**
     * renders the losing screen
     */
    youLost() {
        if (this.character.isDead()) {
            this.addToMap(this.LostScreen);
            document.getElementById('restart').classList.remove('d-none');
            setTimeout(() => {
                this.character.dead_sound.muted = true;
            }, 1100);
        }
    }

    /**
     * renders the winning screen
     */
    youWon() {
        if (this.endboss.isDead()) {
            this.addToMap(this.GameOverScreen);
            document.getElementById('restart').classList.remove('d-none');
            this.character.snoring_sound.muted = true;
            this.endboss.standart_sound.pause();
            setTimeout(() => {
                this.endboss.dead_sound.muted = true;
            }, 1000);
        }
    }

    /**
     * 
     * @param {an array with different objects (enemies...)} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * 
     * @param {movable object} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * 
     * @param {movable object} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * 
     * @param {movable object} mo 
     */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}