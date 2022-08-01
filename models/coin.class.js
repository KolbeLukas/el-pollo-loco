class Coin extends MovableObject {
    img = 'img/8_coin/coin_2.png';

    constructor(x, y) {
        super().loadImage(this.img);
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
    }
}