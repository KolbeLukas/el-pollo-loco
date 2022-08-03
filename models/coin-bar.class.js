class CoinBar extends DrawableObject {
    width = 188.29;
    height = 50;
    IMAGES_COINCOUNT = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/100.png'
    ];
    amount = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINCOUNT);
        this.x = 5;
        this.y = 40;
        this.setPercentage(0);
    }

    setPercentage(amount) {
        this.amount = amount;
        let path = this.IMAGES_COINCOUNT[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.amount == 5) {
            return 5;
        } else if (this.amount == 4) {
            return 4;
        } else if (this.amount == 3) {
            return 3;
        } else if (this.amount == 2) {
            return 2;
        } else if (this.amount == 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
