class CoinBar extends DrawableObject {
    width = 225.948;
    height = 60;
    IMAGES_COINCOUNT = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];
    amount = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COINCOUNT);
        this.x = 5;
        this.y = 30;
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