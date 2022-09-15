let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    if (localStorage.getItem('sound') == null) {
        document.getElementById('sound').checked = true;
    } else {
        document.getElementById('sound').checked = JSON.parse(localStorage.getItem('sound'));
    }
    document.getElementById('music').checked = JSON.parse(localStorage.getItem('music'));
}


function initGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-game').classList.add('d-none');
    document.getElementById('hud').classList.remove('d-none');
    document.getElementById('menu').classList.add('small');
    document.getElementById('menu-overlay').classList.add('d-none');
    keyboard.M = false;
    gameStarted = true;
}


function openMenu() {
    if (document.getElementById('menu-overlay').classList.contains('d-none')) {
        document.getElementById('menu-overlay').classList.remove('d-none');
        if (world) {
            world.keyboard.M = true;
        }
    } else {
        document.getElementById('menu-overlay').classList.add('d-none');
        if (world) {
            world.keyboard.M = false;
        }
    }
}


function closeMenu() {
    document.getElementById('menu-overlay').classList.add('d-none');
    world.keyboard.M = false;
}

function doNotCloseMenu(event) {
    event.stopPropagation();
}


function openNextSettingPage(next, active) {
    document.getElementById(next).classList.remove('d-none');
    document.getElementById(active).classList.add('d-none');
}


function sound() {
    localStorage.setItem('sound', document.getElementById('sound').checked);
}

function music() {
    localStorage.setItem('music', document.getElementById('music').checked);
}


function soundOn() {
    return document.getElementById('sound').checked;
}


function musicOn() {
    return document.getElementById('music').checked;
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


document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.getElementById('full-screen').checked = false;
    }
});