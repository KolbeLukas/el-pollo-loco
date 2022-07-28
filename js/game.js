let canvas;
let ctx;
let character = new MovableObject();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    console.log('character', character);
}