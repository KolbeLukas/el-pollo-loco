class HealthBar extends DrawableObject {
    width = 225.948;
    height = 60;
    x = 5;
    y = -10;
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/100.png'
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(100);
    }


    /**
     * sets the size of the healthbar
     * @param {how much health has the character left} amount 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * 
     * @returns how much health the character has left
     */
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