class Coin extends MovableObject {
    img = 'img/8_coin/coin_3.png';

    constructor(x, y) {
        super().loadImage(this.img);
        this.x = x + Math.random() * 100;
        this.y = y + Math.random() * 20;
        this.height = 50;
        this.width = 50;
    }
}