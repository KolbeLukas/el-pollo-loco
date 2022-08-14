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

    /**
     * sets how high and fast an object jumps or falls
     */
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

    /**
     * 
     * @returns if an object is on the ground or above (jumps)
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }

    /**
     * iterats through the image collection
     * @param {the image collection of an object that belong to one animation} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
 
    /**
     * 
     * @param {the object that is colliding with the character} mo 
     * @returns if the coordinates of the two objects collide
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    /**
     * 
     * @param {the object that is near the character} mo 
     * @param {how high the distance has to be, if the object is in front of the character} ahead 
     * @param {how high the distance has to be, if the object is behind the character} behind 
     * @returns if the characte is near an object
     */
    isNear(mo, ahead, behind) {
        return this.x + this.width + ahead -this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left - behind < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * 
     * @returns if the object moves to the bottom
     */
    isFalling() {
        return this.speedY > - 32 &&
            this.speedY < 0;
    }

    /**
     * raises the coin count of the character
     */
    collectCoin() {
        this.coins += 1;
    }

    /**
     * raises the bottle count of the character
     */
    collectBottle() {
        this.bottles += 1;
    }

    /**
     * reduces the health after the objects collide with each other (every 1 second)
     */
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

    /**
     * 
     * @returns that the object got hit and is an information for the animation
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * 
     * @returns that the health of the object is 0
     */
    isDead() {
        return this.health == 0;
    }

    /**
     * set the new x coordinat in the right direction
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * set the new x coordinat in the left direction
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * sets how fast the object is jumping
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * 
     * @param {time that has to past} time 
     * @returns if the time that passed is higher than it has to be
     */
    idle(time) {
        let timePassed = this.world.time - this.time;
        timePassed = timePassed / 1000;
        return timePassed > time;
    }
}