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
        keyboard.M = true;
    } else {
        document.getElementById('menu-overlay').classList.add('d-none');
        keyboard.M = false;
    }
}


function soundOn() {
    return document.getElementById('sound').checked;
}


function enableFullScreen() {
    canvas = document.getElementById('canvas');
    let container = document.getElementById('content');
    let input = document.getElementById('full-screen');
    if (input.checked) {
        container.requestFullscreen();
        canvas.classList.add('canvas-full-screen');
        console.log(input.checked);
    }
    else {
        document.exitFullscreen();
        canvas.classList.remove('canvas-full-screen');
    }
}


window.addEventListener('keydown', e => {
    if (e.key == 'ArrowRight' && !keyboard.M) {
        keyboard.RIGHT = true;
    }
    if (e.key == 'ArrowLeft' && !keyboard.M) {
        keyboard.LEFT = true;
    }
    if (e.key == ' ' && !keyboard.M) {
        keyboard.SPACE = true;
    }
    if (e.key == 'd' && !keyboard.M) {
        keyboard.D = true;
    }
    if (e.key == 'm') {
        if (document.getElementById('menu-overlay').classList.contains('d-none')) {
            keyboard.M = document.getElementById('menu-overlay').classList.remove('d-none');
            keyboard.M = true;
        } else {
            keyboard.M = document.getElementById('menu-overlay').classList.add('d-none');
            keyboard.M = false;
        }
    }
});


function test() {
    if (document.fullscreenElement) {
        console.log('fullscreen')
    } else {
        console.log('no')
    }
}


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

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.getElementById('full-screen').checked = false;
    }
});