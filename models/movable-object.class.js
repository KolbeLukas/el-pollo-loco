class MovableObject {
    x = 80;
    y = 120;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;

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

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}