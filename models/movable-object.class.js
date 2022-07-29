class MovableObject {
    x = 80;
    y = 120;
    height;
    width;
    img;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {
        
    }
}