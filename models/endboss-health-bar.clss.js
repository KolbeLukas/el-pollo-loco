class EndbossHealthBar extends DrawableObject {
    width = 263.606;
    height = 70;
    x = 445;
    y = -10;
    IMAGES_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/orange-0.png',
        'img/7_statusbars/2_statusbar_endboss/orange-20.png',
        'img/7_statusbars/2_statusbar_endboss/orange-40.png',
        'img/7_statusbars/2_statusbar_endboss/orange-60.png',
        'img/7_statusbars/2_statusbar_endboss/orange-80.png',
        'img/7_statusbars/2_statusbar_endboss/orange-100.png'
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}