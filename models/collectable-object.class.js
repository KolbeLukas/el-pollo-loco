class CollectableObject extends MovableObject {
    IMAGES_COIN = 'img/8_coin/coin_2.png';

    constructor(x, y) {
        super().loadImage(this.IMAGES_COIN);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
    }
}