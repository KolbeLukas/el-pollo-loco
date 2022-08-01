class CollectableObject extends MovableObject {

    constructor(x, y, img) {
        super().loadImage(img);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
    }
}