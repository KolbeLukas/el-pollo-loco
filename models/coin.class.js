class Coin extends MovableObject {
    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }
    img = 'img/8_coin/coin.png';
    collecting_sound = new Audio('audio/collect-coin.wav');

    constructor(x, y) {
        super().loadImage(this.img);
        this.x = x + Math.random() * 100;
        this.y = y + Math.random() * 20;
        this.height = 150;
        this.width = 150;
    }
}