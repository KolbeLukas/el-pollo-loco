class Coin extends MovableObject {
    bar = new CoinBar();
    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }
    img = 'img/8_coin/coin.png';
    collecting_sound = new Audio('audio/collect-coin.wav');

    constructor(x) {
        super().loadImage(this.img);
        this.x = x + Math.random() * 200;
        this.y = Math.random() * 300;
        this.height = 150;
        this.width = 150;
    }
}