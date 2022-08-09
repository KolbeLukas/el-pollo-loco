let canvas;
let world;
let keyboard = new Keyboard();


function initGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-game').classList.add('d-none');
    document.getElementById('menu').classList.add('small');
    document.getElementById('menu-overlay').classList.add('d-none');
    keyboard.ESC = false;
}


function openMenu() {
    if (document.getElementById('menu-overlay').classList.contains('d-none')) {
        document.getElementById('menu-overlay').classList.remove('d-none');
        keyboard.ESC = true;
    } else {
        document.getElementById('menu-overlay').classList.add('d-none');
        keyboard.ESC = false;
    }
}


function soundOn() {
    return document.getElementById('sound').checked;
}


function enableFullScreen() {
    canvas = document.getElementById('canvas');
    let container = document.getElementById('content');
    let input = document.getElementById('full-screen')
    if (input.checked) {
        container.requestFullscreen();
        canvas.classList.add('canvas-full-screen');
    }
}


window.addEventListener('keydown', e => {
    if (e.key == 'ArrowRight' && !keyboard.ESC) {
        keyboard.RIGHT = true;
    }
    if (e.key == 'ArrowLeft' && !keyboard.ESC) {
        keyboard.LEFT = true;
    }
    if (e.key == ' ' && !keyboard.ESC) {
        keyboard.SPACE = true;
    }
    if (e.key == 'd' && !keyboard.ESC) {
        keyboard.D = true;
    }
    if (e.key == 'Escape') {
        if (document.getElementById('menu-overlay').classList.contains('d-none')) {
            keyboard.ESC = document.getElementById('menu-overlay').classList.remove('d-none');
            keyboard.ESC = true;
        } else {
            keyboard.ESC = document.getElementById('menu-overlay').classList.add('d-none');
            keyboard.ESC = false;
        }
    }
});


window.addEventListener('keyup', e => {
    if (e.key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.key == 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.key == ' ') {
        keyboard.SPACE = false;
    }
    if (e.key == 'd') {
        keyboard.D = false;
    }
});