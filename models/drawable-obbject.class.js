class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * 
     * @param {relativ image path} path 
     */
     loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array with relative image path} arr 
     */
     loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}