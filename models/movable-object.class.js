class MovableObject extends DrawableObject {
    currentImage = 0;
    otherDirection = false;
    speedY = -32;
    acceleration = 2;
    lastHit = 0;
    time = new Date().getTime();
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);

        setInterval(() => {
            if (this.isDead()) {
                this.y -= this.speedY + 25;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
 

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    isNear(mo, ahead, behind) {
        return this.x + this.width + ahead -this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left - behind < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    isFalling() {
        return this.speedY > - 32 &&
            this.speedY < 0;
    }


    collectCoin() {
        this.coins += 1;
    }


    collectBottle() {
        this.bottles += 1;
    }


    hit() {
        let time = new Date().getTime();
        if (time - this.lastHit > 1000) {
            this.health -= 20;
            this.healthBar.setPercentage(this.health);
            if (this.health < 0) {
                this.health = 0;
            } else {
                this.lastHit = time;
            }
        }
    }


    hitBoss() {
        this.health -= 20;
        this.healthBar.setPercentage(this.health);
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    isDead() {
        return this.health == 0;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 30;
    }


    idle(x) {
        let timePassed = this.world.time - this.time;
        timePassed = timePassed / 1000;
        return timePassed > x;
    }
}