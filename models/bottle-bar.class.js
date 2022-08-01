class BottleBar extends DrawableObject {
    width = 225.948;
    height = 60;
    IMAGES_BOTTLECOUNT = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    amount = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLECOUNT);
        this.x = 5;
        this.y = 90;
        this.setPercentage(0);
    }

    setPercentage(amount) {
        this.amount = amount;
        let path = this.IMAGES_BOTTLECOUNT[this.resolveImageIndex()];
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