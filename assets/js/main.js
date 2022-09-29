let name = ``;
let game = {};
let panel = 'start';
let $ = function (domElement) { return document.querySelector(domElement);}

let nav = () => {
    document.onclick = (event) => {
        event.preventDefault();
        switch (event.path[0].id) {
            case "startGame":
                go('game', 'd-block');
                break;
            case "restart":
                go('game', 'd-block');
                for(let child of $('.elements').querySelectorAll(".element"))
                    child.remove();
                break;
        }
    }
}

let go = (page, attribute) => {
    let pages = ['start', 'game', 'end'];
    panel = page;
    $(`#${panel}`).setAttribute('class', attribute);
    pages.forEach(e => {
        if(page !== e) {
            $(`#${e}`).setAttribute('class', 'd-none');
        }
    })
}

let checkName = () => {
    name = $('#nameInput').value.trim();
    if(name !== "") {
        localStorage.setItem('userName', name);
        $(`#startGame`).removeAttribute(`disabled`)
    }else {
        $(`#startGame`).setAttribute(`disabled`, `disables`);
    }
}

let startLoop = () => {
    let inter = setInterval(() => {
        if(panel !== "start") clearInterval(inter);
        checkName();
    }, 100)
}

let checkStorage = () => {
    if(localStorage.getItem('userName') !== null)
        $('#nameInput').value = localStorage.getItem('userName');
}

window.onload = () => {
    checkStorage();
    nav();
    startLoop();
    setInterval(() => {
        if(panel === "game") {
            game = new Game();
            game.start();
            panel = "game process";
        }
    }, 500)
}