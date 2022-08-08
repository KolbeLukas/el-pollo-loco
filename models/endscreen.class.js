class Endscreen extends DrawableObject {
    width = 720;
    height = 480;
    x = 0;
    y = 0;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}