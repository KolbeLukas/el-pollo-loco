class DrawableObject {
    x;
    y;
    height;
    width;
    img;
    imageCache = {};

    /**
     * loads a single image
     * @param {relativ image path} path 
     */
     loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * loads the images that belongs to an animation into an JSON
     * @param {Array with relative image path} arr 
     */
     loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * renders the image at the right position
     * @param {canvas in which all is positioned} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}