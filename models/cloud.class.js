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

    number() {
        return Math.round(Math.random());
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}