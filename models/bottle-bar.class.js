class BottleBar extends DrawableObject {
    width = 188.29;
    height = 50;
    IMAGES_BOTTLECOUNT = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/100.png'
    ];
    amount = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLECOUNT);
        this.x = 5;
        this.y = 80;
        this.setPercentage(1);
    }

    setPercentage(amount) {
        this.amount = amount;
        let path = this.IMAGES_BOTTLECOUNT[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.amount >= 9) {
            return 5;
        } else if (this.amount >= 7) {
            return 4;
        } else if (this.amount >= 5) {
            return 3;
        } else if (this.amount >= 3) {
            return 2;
        } else if (this.amount >= 1) {
            return 1;
        } else {
            return 0;
        }
    }
}