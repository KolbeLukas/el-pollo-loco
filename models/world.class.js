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
    last_throw = new Date().getTime();
    death_enemies = [];

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
            this.checkEnemyCollisions();
            this.checkThrowObjects();
            if (this.throwableObjects.length > 0) {
                this.checkThrowenBottleCollision();
            }
            this.checkCoinCollision();
            this.checkBottleCollision();
        }, 25);
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.isFalling() && enemy instanceof Chicken) {
                enemy.death_sound.play();
                enemy.dead = true;
                this.death_enemies.push(enemy);
                this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
            } else if (this.character.isColliding(enemy)) {
                this.character.hit();
            }
        });
    }

    checkThrowObjects() {
        let time = new Date().getTime();
        if (this.keyboard.D && this.character.bottles > 0 && time - this.last_throw > 500) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.bottles--;
            this.bottleBar.setPercentage(this.character.bottles);
            this.character.throwing_sound.play();
            this.last_throw = time;
        } else if (this.keyboard.D && this.character.bottles == 0 && time - this.last_throw > 1000) {
            this.character.no_bottle_sound.play();
            this.last_throw = time;
        }
    }

    checkThrowenBottleCollision() {
        this.level.enemies.forEach(enemy => {
            this.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(enemy)) {
                    this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                    if (enemy instanceof Chicken) {
                        console.log('chicken hit')
                        enemy.dead = true;
                        this.death_enemies.push(enemy);
                        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                    } else {
                        enemy.hitBoss();
                    }
                }
                if (bottle.y > this.canvas.height) {
                    this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                }
            });
        });
    }

    checkCoinCollision() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin();
                coin.collecting_sound.play();
                this.coinBar.setPercentage(this.character.coins);
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
            }
        })
    }

    checkBottleCollision() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle();
                bottle.collecting_sound.play();
                this.bottleBar.setPercentage(this.character.bottles);
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
            }
        })
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.death_enemies);
        this.addObjectsToMap(this.level.coins);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.character.healthBar);
        if (this.character.isNear(this.level.enemies[0])) {
            this.addToMap(this.level.enemies[0].healthBar);
        }
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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
        mo.drawFrame(this.ctx);
        mo.drawFrame2(this.ctx);

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