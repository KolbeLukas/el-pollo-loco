class Cloud extends MovableObject {
    y = 20;
    height = 300;
    width = 533.34;
    speed = 0.1;
    IMAGES = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ];

    constructor(x) {
        super().loadImage(this.IMAGES[this.number()]);

        this.x = x;
        this.animate();
    }

    /**
     * 
     * @returns a random number in between 0 and 1
     */
    number() {
        return Math.round(Math.random());
    }

    /**
     * renders the images in a certain speed after each other
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}